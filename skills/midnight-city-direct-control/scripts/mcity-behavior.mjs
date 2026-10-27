#!/usr/bin/env node

// Drives a priority list of behaviors against the controlled agent with no LLM call. The skill
// owns the whole loop: read, decide, submit, heartbeat, and control-loss
// recovery. Behaviors live in ./behaviors and depend only on the Ctx contract.
import { realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { openWorkSession } from "./mcity-control.mjs";
import { parseDuration } from "./mcity-work.mjs";
import { buildSkillCtx } from "./behaviors/skill-ctx.mjs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TICK_MS = 3_000; // between submitted actions
const IDLE_MS = 5_000; // when the behavior has nothing to do this tick

function controlLost(error) {
  return error?.code === "CONTROL_LOST" || [401, 403, 404, 409].includes(error?.status);
}

function transient(error) {
  return (
    error?.status === 429 ||
    error?.status >= 500 ||
    ["TimeoutError", "AbortError"].includes(error?.name) ||
    (error instanceof TypeError && error.message === "fetch failed")
  );
}

export async function loadBehavior(name) {
  if (!/^[a-z0-9-]+$/.test(name ?? "")) {
    throw new Error("behavior name must be lower-case letters, digits, or dashes");
  }
  const url = new URL(`./behaviors/${name}.mjs`, import.meta.url).href;
  const module = await import(url);
  const decide = module.decide ?? module.default?.decide;
  const meta = module.meta ?? module.default?.meta;
  if (typeof decide !== "function") {
    throw new Error(`behavior '${name}' must export decide(ctx)`);
  }
  if (!meta || !Array.isArray(meta.actionKinds) || !Array.isArray(meta.reads)) {
    throw new Error(`behavior '${name}' must export meta { actionKinds, reads }`);
  }
  return { decide, meta };
}

/**
 * Parse a run spec: a comma list of names ("grave-recovery,combat") or a JSON
 * array of names or { name, params } objects.
 */
export function parseSpec(spec) {
  const text = String(spec ?? "").trim();
  const raw = text.startsWith("[") ? JSON.parse(text) : text.split(",");
  if (!Array.isArray(raw) || raw.length === 0) throw new Error("empty behavior spec");
  return raw.map((entry) => {
    const item = typeof entry === "string" ? { name: entry.trim() } : entry;
    if (!item || typeof item.name !== "string") {
      throw new Error("each behavior must be a name or { name, params }");
    }
    const params = item.params ?? {};
    if (typeof params !== "object" || Array.isArray(params)) {
      throw new Error(`params for '${item.name}' must be an object`);
    }
    return { name: item.name, params };
  });
}

// The skill endpoint for each meta read. Progression uses includeBlocked so
// blocked capability rows (enemies gated by distance, level, or cooldown) are
// returned; plain progression omits them.
const READ_ENDPOINTS = {
  progression: "progression?includeBlocked=true",
  inventory: "inventory",
  resources: "resources",
  "live-events": "live-events",
};
// Reads that are not per agent (served under /api/skill/<path>).
const PUBLIC_READS = { merchants: "merchants" };

// The social read is paged. Group behaviors name their goal group, so read
// those groups. The agent's own group always comes back as `agentGroup`.
export async function readSocial(client, entries) {
  const groupIds = [...new Set(entries
    .filter((entry) => entry.behavior.meta.reads.includes("social"))
    .map((entry) => entry.params.groupId)
    .filter((groupId) => typeof groupId === "string" && groupId))];
  if (!groupIds.length) return client.read("social");
  const pages = await Promise.all(groupIds.map((groupId) => client.read(`social?groupId=${encodeURIComponent(groupId)}`)));
  return { ...pages[0], groups: pages.flatMap((page) => page.groups ?? []) };
}

export async function runBehaviorSession(client, entries, {
  durationMs,
  shouldStop = () => false,
  now = Date.now,
  wait = sleep,
  log = () => {},
}) {
  const lease = client.lease();
  const endsAt = now() + durationMs;
  const reads = [...new Set(entries.flatMap((entry) => entry.behavior.meta.reads))]
    .filter((read) => read !== "context");
  let nextHeartbeat = 0;
  let lastActionAt = 0;
  const ACTION_COOLDOWN_MS = 8_000; // cooldown after submission to let server reflect state
  const report = (state, detail = null) =>
    log({ agentId: lease.agentId, state, detail, at: now() });

  report("starting");
  while (now() < endsAt && !shouldStop()) {
    try {
      if (now() >= nextHeartbeat) {
        const renewed = await client.heartbeat();
        nextHeartbeat = now() + renewed.heartbeatIntervalMs;
      }
      // Skip while the agent is locked into an exclusive module (e.g. an event).
      const data = { context: await client.read("context") };
      // Skip while a previous action is still in-flight (travel, trade, etc.).
      if (data.context?.agent?.activeAction) {
        report("waiting", "previous action still in-flight");
        await wait(TICK_MS);
        continue;
      }
      if (now() - lastActionAt < ACTION_COOLDOWN_MS) {
        report("waiting", "action cooldown");
        await wait(TICK_MS);
        continue;
      }
      if (data.context?.agent?.activeModule?.locksCommonActions) {
        report("blocked", "agent is locked into an exclusive module");
        await wait(IDLE_MS);
        continue;
      }
      for (const read of reads) {
        data[read] = read === "social"
          ? await readSocial(client, entries)
          : PUBLIC_READS[read]
            ? await client.readPublic(PUBLIC_READS[read])
            : await client.read(READ_ENDPOINTS[read] ?? read);
      }
      // First behavior that is not idle decides.
      let decision = { kind: "idle" };
      let idleReason = null;
      for (const entry of entries) {
        decision = entry.behavior.decide(buildSkillCtx(data, entry.params));
        if (decision.kind !== "idle") break;
        if (!idleReason && decision.reason) idleReason = decision.reason;
      }
      if (decision.kind === "idle") {
        report("idle", idleReason);
        await wait(IDLE_MS);
        continue;
      }
      if (decision.kind === "done") {
        report("finished", "behavior reports the step is done");
        return { state: "finished" };
      }
      if (decision.kind === "blocked") {
        report("blocked", decision.reason);
        return { state: "blocked", reason: decision.reason };
      }
      // open_conversation is not a coordinator action. The user's AI writes
      // and sends the text with `speak`; the runner never submits it.
      if (decision.action.kind === "open_conversation") {
        report("needs_ai", decision.action.request);
        return { state: "needs_ai", request: decision.action.request };
      }
      await client.submit(decision.action);
      lastActionAt = now();
      report("acting", decision.action);
      await wait(TICK_MS);
    } catch (error) {
      if (controlLost(error)) {
        report("control_lost", error.message);
        return { state: "control_lost", reason: error.message };
      }
      if (!transient(error)) throw error;
      report("retrying", error.message);
      await wait(TICK_MS);
    }
  }
  const state = shouldStop() ? "stopped" : "finished";
  report(state);
  return { state };
}

async function runCommand(spec, durationMs) {
  const entries = await Promise.all(
    parseSpec(spec).map(async ({ name, params }) => ({
      behavior: await loadBehavior(name),
      params,
    })),
  );
  const client = await openWorkSession();
  let stopping = false;
  const signalStop = () => {
    stopping = true;
  };
  process.on("SIGINT", signalStop);
  process.on("SIGTERM", signalStop);
  try {
    const result = await runBehaviorSession(client, entries, {
      durationMs,
      shouldStop: () => stopping,
      log: (entry) => process.stdout.write(`${JSON.stringify(entry)}\n`),
    });
    if (result.state === "control_lost" || result.state === "blocked") process.exitCode = 1;
  } finally {
    process.off("SIGINT", signalStop);
    process.off("SIGTERM", signalStop);
    try {
      await client.release();
    } catch {
      // Releasing is best-effort; the lease expires on its own if this fails.
    }
  }
}

async function main() {
  const [command = "help", ...args] = process.argv.slice(2);
  if (command === "run" && args.length === 2) {
    return runCommand(args[0], parseDuration(args[1]));
  }
  if (command === "help" && !args.length) {
    return process.stdout.write(
      "Connect first. Command: run <spec> <duration>. <spec> is a comma list of\n" +
        "behaviors in priority order, or a JSON array of names or {name, params}.\n" +
        "Example: run grave-recovery,buy-salves,combat 30m.\n",
    );
  }
  throw new Error("usage: mcity-behavior.mjs run <spec> <duration>");
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
