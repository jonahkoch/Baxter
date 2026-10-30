#!/usr/bin/env node

// Owns one timed work session and its local status. The coordinator owns work cycles.
import { randomUUID } from "node:crypto";
import { realpathSync } from "node:fs";
import { mkdir, open, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { openWorkSession, workStateFile } from "./mcity-control.mjs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const POLL_MS = 30_000;
const PENDING_POLL_MS = 2_000;
const CONFIRM_MS = 30_000;
const lockFile = `${workStateFile}.lock`;
const stopFile = `${workStateFile}.stop`;

export function parseDuration(value) {
  const match = /^([1-9][0-9]*)(s|m|h)$/.exec(value ?? "");
  const duration = match && Number(match[1]) * { s: 1000, m: 60_000, h: 3_600_000 }[match[2]];
  if (!Number.isSafeInteger(duration) || duration <= 0) {
    throw new Error("duration must be a positive whole number with s, m, or h, such as 1h");
  }
  return duration;
}

function agentState(response, agentId) {
  const agent = response?.agent;
  if (agent?.id !== agentId || typeof agent.isPerformingJob !== "boolean") {
    throw new Error("observer must return agent.isPerformingJob; update the observer before running work sessions");
  }
  return agent;
}

function controlLost(error) {
  return error?.code === "CONTROL_LOST" || [401, 403, 404, 409].includes(error?.status);
}

function transient(error) {
  return error?.status === 429 || error?.status >= 500 ||
    ["TimeoutError", "AbortError"].includes(error?.name) ||
    (error instanceof TypeError && error.message === "fetch failed");
}

function eventList(response) {
  if (!Array.isArray(response?.recentEvents)) throw new Error("invalid recent-events response");
  return response.recentEvents;
}

function readXp(response) {
  const entries = Object.entries(response?.skills ?? {});
  if (!entries.length || entries.some(([, row]) => !Number.isSafeInteger(row?.xp) || row.xp < 0)) {
    throw new Error("invalid skill XP response");
  }
  return Object.fromEntries(entries.map(([skill, row]) => [skill, row.xp]));
}

// Confirm the stop event and the server state before releasing this session.
export async function stopWork(client, { now = Date.now, wait = sleep } = {}) {
  await client.heartbeat();
  const agentId = client.lease().agentId;
  const before = new Set(eventList(await client.read("recent-events?limit=100")).map((event) => event.eventId));
  await client.action("stop_job");
  const deadline = now() + CONFIRM_MS;
  let confirmed = false;
  while (now() <= deadline) {
    const events = eventList(await client.read("recent-events?limit=100"));
    for (const event of events) {
      if (before.has(event.eventId) || event.payload?.agentId !== agentId) continue;
      const payload = event.payload;
      if (payload.kind === "activity_completed" && payload.activity === "stop_job") confirmed = true;
      if (payload.kind === "action_failed" && payload.actionKind === "stop_job") {
        if (payload.reason !== "agent is not performing a job") throw new Error(payload.reason);
        confirmed = true;
      }
    }
    const agent = agentState(await client.read("context"), agentId);
    if (confirmed && !agent.isPerformingJob) return;
    await wait(500);
  }
  throw new Error("stop was not confirmed; server work may still be active");
}

export async function runWorkSession(client, {
  durationMs, save, shouldStop = async () => false, now = Date.now, wait = sleep,
}) {
  const lease = client.lease();
  const state = {
    agentId: lease.agentId, sessionId: lease.sessionId,
    startedAt: now(), endsAt: now() + durationMs, state: "starting", reason: null,
    lastCheckedAt: null, lastHeartbeatAt: null, lastProgressAt: null, lastXpCheckedAt: null,
    initialXp: null, currentXp: null, xpGained: {}, isPerformingJob: null,
    stopConfirmed: false, finishedAt: null,
  };
  let started = false;
  let pending = null;
  let nextPoll = 0;
  let nextHeartbeat = 0;
  let nextProgress = 0;
  let initialized = false;
  let lost = false;
  let interrupted = false;
  let failure = null;
  const publish = () => save({ ...state, updatedAt: now() });
  const updateXp = async () => {
    const xp = readXp(await client.read("progression"));
    if (state.currentXp && Object.keys(xp).some((skill) => xp[skill] > state.currentXp[skill])) {
      state.lastProgressAt = now();
    }
    state.initialXp ??= xp;
    state.currentXp = xp;
    state.lastXpCheckedAt = now();
    state.xpGained = Object.fromEntries(Object.entries(xp).map(([skill, total]) => [skill, total - state.initialXp[skill]]));
    nextProgress = now() + POLL_MS;
  };
  await publish();
  try {
    while (now() < state.endsAt && !(await shouldStop())) {
      try {
        if (now() >= nextHeartbeat) {
          const renewed = await client.heartbeat();
          state.lastHeartbeatAt = now();
          nextHeartbeat = now() + renewed.heartbeatIntervalMs;
          await publish();
        }
        if (now() >= nextPoll) {
          const agent = agentState(await client.read("context"), state.agentId);
          state.lastCheckedAt = now();
          state.isPerformingJob = agent.isPerformingJob;
          state.profession ??= agent.profession;
          if (agent.profession !== state.profession || agent.activeModule?.locksCommonActions ||
              (!agent.isPerformingJob && (agent.activeAction || started))) {
            interrupted = true;
            state.state = "interrupted";
            state.reason = "profession, action, or work state changed outside this session";
            break;
          }
          if (!initialized) {
            initialized = true;
            await updateXp();
          }
          nextPoll = now() + POLL_MS;
          if (agent.isPerformingJob) {
            started = true;
            pending = null;
            state.state = agent.activeAction ? "working" : "waiting";
            state.reason = agent.activeAction ? null : "server work is enabled and waiting for a resource";
          } else if (pending) {
            const events = eventList(await client.read("recent-events?limit=100"));
            const rejection = events.find((event) => !pending.before.has(event.eventId) &&
              event.payload?.agentId === state.agentId && event.payload.kind === "action_failed" &&
              event.payload.actionKind === "perform_job");
            if (rejection) {
              pending = null;
              const reason = rejection.payload.reason;
              if (!/^no available reachable \w+ source$/.test(reason ?? "")) throw new Error(reason ?? "work was rejected");
              state.state = "waiting";
              state.reason = reason;
            } else {
              if (now() - pending.at >= CONFIRM_MS) throw new Error("work start was not confirmed");
              nextPoll = now() + PENDING_POLL_MS;
            }
          } else {
            const events = eventList(await client.read("recent-events?limit=100"));
            pending = { at: now(), before: new Set(events.map((event) => event.eventId)) };
            state.state = "starting";
            state.reason = "waiting for the server to confirm work";
            nextPoll = now() + PENDING_POLL_MS;
            await publish();
            // Keep pending after a transport failure. Read state before any retry.
            await client.action("perform_job");
          }
          if (now() >= nextProgress) await updateXp();
          await publish();
        }
      } catch (error) {
        if (!transient(error)) throw error;
        state.state = "retrying";
        state.reason = error.message;
        await publish();
        await wait(Math.min(5000, Math.max(0, state.endsAt - now())));
      }
      await wait(Math.min(1000, Math.max(0, state.endsAt - now())));
    }
  } catch (error) {
    failure = error;
    lost = controlLost(error);
  }

  try {
    if (!lost && !interrupted && initialized) {
      state.state = "stopping";
      await publish();
      if (started || pending || state.isPerformingJob) await stopWork(client, { now, wait });
      else if (agentState(await client.read("context"), state.agentId).isPerformingJob) {
        throw new Error("work started outside this session; inspect live context before stopping it");
      }
      state.isPerformingJob = false;
      state.lastCheckedAt = now();
      state.stopConfirmed = true;
      try { await updateXp(); } catch (error) { state.progressReadError = error.message; }
      await client.release();
    }
  } catch (error) {
    failure = error;
    lost = controlLost(error);
  }
  if (failure) {
    state.state = lost ? "control_lost" : "failed";
    state.reason = failure.message;
  } else if (!interrupted) {
    state.state = state.stopConfirmed ? "stopped" : "cancelled";
    state.reason = now() >= state.endsAt ? "duration reached" : "stop requested";
  }
  state.finishedAt = now();
  await publish();
  return state;
}

async function readJson(file) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}

async function writeJson(file, value) {
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value)}\n`, { mode: 0o600 });
  await rename(temporary, file);
}

function processAlive(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) throw new Error("invalid worker PID");
  try { process.kill(pid, 0); return true; }
  catch (error) { if (error.code === "ESRCH") return false; if (error.code === "EPERM") return true; throw error; }
}

export async function readWorkStatus() {
  const state = await readJson(workStateFile);
  if (!state) return { state: "not_started", workerAlive: false };
  const lock = await readJson(lockFile);
  const workerAlive = lock?.runId === state.runId && processAlive(lock.pid);
  return {
    ...state, workerAlive,
    observationAgeMs: state.lastCheckedAt === null ? null : Date.now() - state.lastCheckedAt,
    state: !state.finishedAt && !workerAlive ? "worker_exited"
      : !state.finishedAt && Date.now() - state.updatedAt > 60_000 ? "unresponsive" : state.state,
  };
}

async function acquireLock() {
  await mkdir(path.dirname(workStateFile), { recursive: true, mode: 0o700 });
  const previous = await readJson(lockFile);
  if (previous) {
    if (processAlive(previous.pid)) throw new Error("a work session is already running; use status or stop");
    throw new Error("the previous worker exited; run stop to check server work before starting again");
  }
  const run = { runId: randomUUID(), pid: process.pid };
  const file = await open(lockFile, "wx", 0o600);
  try { await file.writeFile(JSON.stringify(run)); } finally { await file.close(); }
  return run;
}

async function runCommand(durationMs) {
  const run = await acquireLock();
  let stopping = false;
  const signalStop = () => { stopping = true; };
  process.on("SIGINT", signalStop);
  process.on("SIGTERM", signalStop);
  let lastReport;
  try {
    const client = await openWorkSession();
    const result = await runWorkSession(client, {
      durationMs,
      shouldStop: async () => stopping || (await readJson(stopFile))?.runId === run.runId,
      save: async (state) => {
        const value = { ...run, ...state };
        await writeJson(workStateFile, value);
        const report = JSON.stringify([state.state, state.reason, state.xpGained]);
        if (report !== lastReport) process.stdout.write(`${JSON.stringify(value)}\n`);
        lastReport = report;
      },
    });
    if (result.state !== "stopped") process.exitCode = 1;
  } finally {
    process.off("SIGINT", signalStop);
    process.off("SIGTERM", signalStop);
    await rm(lockFile, { force: true });
  }
}

async function stopCommand() {
  let status = await readWorkStatus();
  if (status.workerAlive) {
    await writeJson(stopFile, { runId: status.runId });
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      await sleep(250);
      status = await readWorkStatus();
      if (!status.workerAlive) break;
    }
    if (status.workerAlive) throw new Error("worker has not confirmed the stop; check status");
  }
  if (status.state === "not_started") throw new Error("no saved work session; use mcity-control.mjs stop-work for existing server work");
  if (!status.stopConfirmed) {
    const client = await openWorkSession();
    if (client.lease().sessionId !== status.sessionId) throw new Error("control session changed; the saved worker cannot stop it");
    await stopWork(client);
    await client.release();
    const { workerAlive, observationAgeMs, ...saved } = status;
    await writeJson(workStateFile, {
      ...saved, state: "stopped", reason: "stop confirmed after worker exit",
      isPerformingJob: false, stopConfirmed: true, finishedAt: Date.now(), updatedAt: Date.now(),
    });
  }
  const lock = await readJson(lockFile);
  if (lock?.runId === status.runId && !processAlive(lock.pid)) await rm(lockFile);
  process.stdout.write(`${JSON.stringify(await readWorkStatus())}\n`);
}

async function main() {
  const [command = "help", ...args] = process.argv.slice(2);
  if (command === "run" && args.length === 1) return runCommand(parseDuration(args[0]));
  if (command === "status" && !args.length) return process.stdout.write(`${JSON.stringify(await readWorkStatus())}\n`);
  if (command === "stop" && !args.length) return stopCommand();
  if (command === "help" && !args.length) {
    return process.stdout.write('Connect first. Commands: run <duration>, status, stop. Example: run 1h.\n');
  }
  throw new Error("usage: mcity-work.mjs run <duration> | status | stop");
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
