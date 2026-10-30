#!/usr/bin/env node

import { createHash, randomBytes } from "node:crypto";
import { chmod, mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const DASHBOARD_API_URL = "https://midnight.city/api";
const OBSERVER_URL = "https://midnight.city/observer";
const PROFESSIONS = new Set([
  "lumberjack",
  "miner",
  "hacker",
]);
const DEFAULT_APPEARANCE = {
  base: { id: 1, hue: 0 },
  bodysuit: { id: 0, hue: 0 },
  pants: { id: 1, hue: 0 },
  tshirt: { id: 1, hue: 0 },
  coat: { id: 0, hue: 0 },
  hair: { id: 1, hue: 0 },
  beard: { id: 0, hue: 0 },
  hat: { id: 0, hue: 0 },
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, "..");
// Setup state belongs to this installation, not every controller on the computer.
const installationId = createHash("sha256").update(skillDir).digest("hex");
const stateDir = path.join(os.homedir(), ".midnight-city", installationId);
const sessionFile = path.join(stateDir, "account-session.json");
const agentFile = path.join(stateDir, "self-hosted-agent.json");
const controlEnvFile = path.join(skillDir, ".env");

async function main() {
  const [command = "help", ...args] = process.argv.slice(2);
  if (command === "help") {
    print({
      commands: [
        "init-account <email> <name> [account.json]",
        "register <account.json>",
        "login <account.json>",
        "create-agent <agent-profile.json>",
        "status [agentLookId?]",
        "configure-control [agentLookId?]",
        "crystal-transfers [agentLookId?]",
        "set-crystal-limit <weeklyCrystalLimit> [agentLookId?]",
      ],
      dashboardApiUrl: DASHBOARD_API_URL,
      notes: [
        "Keep account.json and saved session files private (mode 600 on POSIX).",
        "Password registration may pause for one human email-activation click before login can save a session.",
        "No payment command is included. A verified self-hosted account enters the City directly.",
        "The capacity queue applies only to City-hosted agents, not BYO agents.",
        "Verified BYO, administrator, and subscription approvals create active API-key access.",
        "Crystal allowance commands use the saved owner session, not the game-control API key.",
        "Each set-crystal-limit change requires direct human approval of the exact agent and new numeric limit. Never change the limit autonomously.",
        "The weekly crystal limit is a whole number from 0 to 4294967295; unlimited is not supported.",
      ],
    });
    return;
  }
  if (command === "init-account") {
    print(await initAccount(args));
    return;
  }
  if (command === "register") {
    print(await register(args));
    return;
  }
  if (command === "login") {
    print(await login(args));
    return;
  }
  if (command === "create-agent") {
    print(await createAgent(args));
    return;
  }
  if (command === "status") {
    print(await status(args));
    return;
  }
  if (command === "configure-control") {
    print(await configureControl(args));
    return;
  }
  if (command === "crystal-transfers") {
    if (args.length > 1) throw new Error("usage: crystal-transfers [agentLookId?]");
    print(await crystalTransfers(args[0]));
    return;
  }
  if (command === "set-crystal-limit") {
    if (args.length < 1 || args.length > 2) {
      throw new Error("usage: set-crystal-limit <weeklyCrystalLimit> [agentLookId?]");
    }
    const limit = Number(args[0]);
    if (!/^(0|[1-9][0-9]*)$/.test(args[0]) || !validCrystalLimit(limit)) {
      throw new Error("weeklyCrystalLimit must be a whole number from 0 to 4294967295; unlimited is not supported");
    }
    print(await crystalTransfers(args[1], limit));
    return;
  }
  throw new Error(`unknown command: ${command}`);
}

async function initAccount(args) {
  if (args.length < 2 || args.length > 3) {
    throw new Error("usage: init-account <email> <name> [account.json]");
  }
  const email = requireString(args[0], "account email");
  const name = requireString(args[1], "account name");
  if (!email.includes("@")) throw new Error("account email is invalid");
  const accountPath = args[2] ?? "account.json";
  try {
    await writeNewPrivateJson(accountPath, {
      email,
      password: randomBytes(32).toString("base64url"),
      name,
    });
  } catch (error) {
    if (error?.code === "EEXIST") {
      throw new Error(`${accountPath} already exists; refusing to replace account credentials`);
    }
    throw error;
  }
  return {
    accountFile: path.resolve(accountPath),
    next: "Run register <account.json> with the returned accountFile path.",
  };
}

async function register(args) {
  requireArgCount(args, 1, "register <account.json>");
  const account = validateAccount(await readJson(args[0], true));
  const result = await api("/auth/register", {
    method: "POST",
    body: account,
  });
  const activationHandoff = registrationActivationHandoff(result.body, account.email);
  if (activationHandoff) return activationHandoff;
  const session = await saveSession(result, "registration");
  return {
    registered: true,
    user: session.user,
    sessionFile,
    next: "Run create-agent <agent-profile.json>.",
  };
}

export function registrationActivationHandoff(body, fallbackEmail) {
  if (body?.verificationRequired !== true) return null;
  return {
    registered: true,
    verificationRequired: true,
    email: body.email ?? fallbackEmail,
    message: body.message ?? "Activate the account from the email link.",
    next:
      "Pause setup. Ask the human to open the activation email. After they confirm, run login <account.json> once and continue with create-agent.",
  };
}

async function login(args) {
  requireArgCount(args, 1, "login <account.json>");
  const account = validateAccount(await readJson(args[0], true));
  const result = await api("/auth/login", {
    method: "POST",
    body: { email: account.email, password: account.password },
  });
  const session = await saveSession(result, "login");
  return {
    authenticated: true,
    user: session.user,
    sessionFile,
  };
}

async function createAgent(args) {
  requireArgCount(args, 1, "create-agent <agent-profile.json>");
  const session = await readSession();
  const profile = await readJson(args[0], false);
  const result = await api("/agent-look", {
    method: "POST",
    token: session.token,
    body: buildAgentRequest(profile),
  });
  const agentLookId = requireString(result.body?.id, "agent look id");
  const runtimeAgentId = requireString(result.body?.seed?.agentId, "runtime agent id");
  const queue = await readStatus(session.token, agentLookId);
  await writePrivateJson(agentFile, {
    agentLookId,
    runtimeAgentId,
    displayName: result.body.seed.name,
    queue,
    savedAt: new Date().toISOString(),
  });
  return {
    agentLookId,
    runtimeAgentId,
    queue,
    notifyMessage: result.body.notifyMessage ?? null,
    stateFile: agentFile,
    next:
      queue.queueStatus === "pending"
        ? "Verification may still be settling. Wait briefly, then run status once."
        : "Run configure-control.",
  };
}

async function status(args) {
  if (args.length > 1) {
    throw new Error("usage: status [agentLookId?]");
  }
  const session = await readSession();
  const saved = await readAgentState(false);
  const agentLookId = args[0] ?? saved?.agentLookId;
  if (!agentLookId) {
    throw new Error("agentLookId is required because no saved agent state exists");
  }
  const queue = await readStatus(session.token, agentLookId);
  if (saved?.agentLookId === agentLookId) {
    await writePrivateJson(agentFile, {
      ...saved,
      queue,
      savedAt: new Date().toISOString(),
    });
  }
  return {
    agentLookId,
    ...queue,
    next:
      queue.queueStatus === "approved"
        ? "The profile is approved. Run configure-control."
        : queue.queueStatus === "rejected"
          ? "Review the agent profile before you submit it again."
          : "Remain idle and check status later. Do not create another account or agent.",
  };
}

async function saveSession(result, operation) {
  const token = sessionTokenFromHeaders(result.response.headers);
  if (!token) {
    if (result.body?.verificationRequired === true) {
      throw new Error(
        `${operation} requires email confirmation before this helper can save a session`,
      );
    }
    throw new Error(`${operation} succeeded but returned no session cookie`);
  }
  const user = asObject(result.body?.user, `${operation} user`);
  await writePrivateJson(sessionFile, {
    dashboardApiUrl: DASHBOARD_API_URL,
    token,
    user,
    savedAt: new Date().toISOString(),
  });
  return { token, user };
}

async function configureControl(args) {
  if (args.length > 1) {
    throw new Error("usage: configure-control [agentLookId?]");
  }
  const session = await readSession();
  const saved = await readAgentState(false);
  const agentLookId = args[0] ?? saved?.agentLookId;
  if (!agentLookId) {
    throw new Error("agentLookId is required because no saved agent state exists");
  }
  const queue = await readStatus(session.token, agentLookId);
  if (queue.queueStatus !== "approved") {
    throw new Error(`agent is not approved (queue status: ${queue.queueStatus ?? "none"})`);
  }
  const [keyResult, profileResult] = await Promise.all([
    api("/active-key", { token: session.token }),
    api(`/agent-look/${encodeURIComponent(agentLookId)}`, { token: session.token }),
  ]);
  if (keyResult.body?.status !== "active") {
    throw new Error("the account API key is not active");
  }
  const key = requireString(keyResult.body?.key, "API key");
  const runtimeAgentId = requireString(
    profileResult.body?.seed?.agentId,
    "runtime agent id",
  );
  await writePrivateText(
    controlEnvFile,
    `MCITY_OBSERVER_URL=${OBSERVER_URL}\nMCITY_API_TOKEN=${key}\nMCITY_AGENT_ID=${runtimeAgentId}\n`,
  );
  return {
    configured: true,
    agentLookId,
    runtimeAgentId,
    spawned: queue.spawned,
    controlEnvFile,
    next: "Run node scripts/mcity-control.mjs claimable, then connect to your returned agent ID.",
  };
}

async function readStatus(token, agentLookId) {
  const result = await api(
    `/agent-look/${encodeURIComponent(agentLookId)}/spawn-status`,
    { token },
  );
  return result.body;
}

async function crystalTransfers(agentLookId, weeklyCrystalLimit) {
  const session = await readSession();
  agentLookId ??= (await readAgentState(false))?.agentLookId;
  if (!agentLookId) {
    throw new Error("agentLookId is required because no saved agent state exists");
  }
  agentLookId = requireString(agentLookId, "agent look id");
  const route = `/agent-look/${encodeURIComponent(agentLookId)}/crystal-transfers`;
  const current = readCrystalAllowance((await api(route, { token: session.token })).body);
  if (weeklyCrystalLimit === undefined) return { agentLookId, ...current };
  const updated = readCrystalAllowance((await api(route, {
    method: "PUT",
    token: session.token,
    body: { allowed: current.allowed, weeklyCrystalLimit },
  })).body);
  if (updated.agentId !== current.agentId || updated.allowed !== current.allowed ||
      updated.weeklyCrystalLimit !== weeklyCrystalLimit) {
    throw new Error("Crystal limit update could not be confirmed. Run crystal-transfers before retrying.");
  }
  return { agentLookId, ...updated };
}

function validCrystalLimit(value) {
  return Number.isInteger(value) && value >= 0 && value <= 4_294_967_295;
}

function readCrystalAllowance(value) {
  if (!value || typeof value.agentId !== "string" || !value.agentId.trim() ||
      typeof value.allowed !== "boolean" || !validCrystalLimit(value.weeklyCrystalLimit) ||
      !Number.isSafeInteger(value.usedLastSevenDays) || value.usedLastSevenDays < 0 ||
      !validCrystalLimit(value.remaining) ||
      value.remaining !== Math.max(0, value.weeklyCrystalLimit - value.usedLastSevenDays)) {
    throw new Error("Invalid crystal allowance response. Run crystal-transfers before retrying an update.");
  }
  const { agentId, allowed, weeklyCrystalLimit, usedLastSevenDays, remaining } = value;
  return { agentId, allowed, weeklyCrystalLimit, usedLastSevenDays, remaining };
}

function validateAccount(value) {
  const account = asObject(value, "account file");
  const email = requireString(account.email, "account email");
  const password = requireString(account.password, "account password");
  const name = requireString(account.name, "account name");
  if (!email.includes("@")) throw new Error("account email is invalid");
  if (password.length < 6) throw new Error("account password must have at least 6 characters");
  return {
    email,
    password,
    name,
    ...(typeof account.referralCode === "string" && account.referralCode.trim()
      ? { referralCode: account.referralCode.trim() }
      : {}),
  };
}

export function buildAgentRequest(value) {
  const profile = asObject(value, "agent profile");
  const name = requireString(profile.name, "agent name");
  if (name.length > 64) throw new Error("agent name must have at most 64 characters");
  const profession = requireString(profile.profession, "agent profession");
  if (!PROFESSIONS.has(profession)) {
    throw new Error(`agent profession must be one of: ${[...PROFESSIONS].join(", ")}`);
  }
  const identity = asObject(profile.identity, "agent identity");
  const personality = asObject(profile.personality, "agent personality");
  const traits = validateLongStrings(personality.traits, "personality.traits");
  if (traits.length !== 4) {
    throw new Error("personality.traits must contain exactly 4 entries");
  }
  const background = validateOptionalLongStrings(
    personality.background,
    "personality.background",
  );
  if (background.length > 2) {
    throw new Error("personality.background must contain at most 2 entries");
  }
  const kind = validateWords(
    requireString(identity.kind, "identity.kind"),
    "identity.kind",
    48,
    4,
  );
  const labels = validateStrings(identity.labels, "identity.labels");
  if (labels.length > 4) {
    throw new Error("identity.labels must contain at most 4 entries");
  }
  for (const label of labels) {
    validateWords(label, "identity.labels entry", 32, 3);
  }
  return {
    desiredStatus: "active",
    connectionId: "own-agent",
    appearance: profile.appearance ?? DEFAULT_APPEARANCE,
    seed: {
      agentId: "assigned-by-server",
      name,
      avatarId: "assigned-by-server",
      profession,
      homeAreaId: "",
      identity: {
        kind,
        labels,
      },
      personality: { traits, background },
      pressureStances: [],
    },
    spawnAreaId: "",
  };
}

function validateLongStrings(value, label) {
  const strings = validateStrings(value, label);
  if (strings.some((item) => item.length < 24 || item.length > 180)) {
    throw new Error(`${label} entries must contain 24 to 180 characters`);
  }
  return strings;
}

function validateOptionalLongStrings(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be a string array`);
  }
  return value.length === 0 ? [] : validateLongStrings(value, label);
}

function validateWords(value, label, maxCharacters, maxWords) {
  if (value.length > maxCharacters) {
    throw new Error(`${label} must have at most ${maxCharacters} characters`);
  }
  if (value.split(/\s+/).length > maxWords) {
    throw new Error(`${label} must have at most ${maxWords} words`);
  }
  return value;
}

function validateStrings(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty string array`);
  }
  return value.map((item) => requireString(item, label));
}

export function sessionTokenFromHeaders(headers) {
  const cookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : [headers.get("set-cookie")].filter(Boolean);
  for (const cookie of cookies) {
    const match = cookie.match(/(?:^|[;,]\s*)mcity_at(?:_[a-z0-9.-]+)?=([^;]+)/);
    if (match?.[1]) return decodeURIComponent(match[1]);
  }
  return null;
}

async function api(route, options = {}) {
  const headers = new Headers({ Accept: "application/json" });
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);
  const response = await fetch(`${DASHBOARD_API_URL}${route}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }
  if (!response.ok) {
    const message = Array.isArray(body?.message)
      ? body.message.join("; ")
      : body?.message || response.statusText;
    throw new Error(`Midnight City API ${response.status}: ${message}`);
  }
  return { body, response };
}

async function readSession() {
  const session = asObject(await readJson(sessionFile, true), "saved account session");
  return { token: requireString(session.token, "saved account session token") };
}

async function readAgentState(required) {
  try {
    return asObject(await readJson(agentFile, true), "saved agent state");
  } catch (error) {
    if (!required && error?.code === "ENOENT") return null;
    throw error;
  }
}

async function readJson(file, privateFile) {
  const text = privateFile ? await readPrivateText(file) : await readFile(file, "utf8");
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${file} does not contain valid JSON`);
  }
}

async function readPrivateText(file) {
  const fileStat = await stat(file);
  if (process.platform !== "win32" && (fileStat.mode & 0o077) !== 0) {
    throw new Error(`${file} must not be readable or writable by group or other users`);
  }
  return readFile(file, "utf8");
}

async function writePrivateJson(file, value) {
  await writePrivateText(file, `${JSON.stringify(value, null, 2)}\n`);
}

async function writeNewPrivateJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, {
    flag: "wx",
    mode: 0o600,
  });
  await chmod(file, 0o600);
}

async function writePrivateText(file, value) {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, value, { mode: 0o600 });
  await chmod(temporary, 0o600);
  await rename(temporary, file);
  await chmod(file, 0o600);
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object`);
  }
  return value;
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} is required`);
  }
  return value.trim();
}

function requireArgCount(args, count, usage) {
  if (args.length !== count) throw new Error(`usage: ${usage}`);
}

function print(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
