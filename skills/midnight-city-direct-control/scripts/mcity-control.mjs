#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import { buildingModelCommand } from "./building-model.mjs";
import { readLeaderboard } from "./leaderboards.mjs";
import { buildGroupRequest, groupCommandHelp } from "./group-commands.mjs";
import { cp, mkdir, mkdtemp, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  buildProgressionAction,
  findContentDefinition,
  progressionCommandHelp,
  progressionOutcomeFields,
} from "./progression-actions.mjs";

const DEFAULT_ENGAGE_DURATION_MS = 600_000;
const DEFAULT_SLEEP_DURATION_MS = 28_800_000;
const ACTION_CONFIRM_TIMEOUT_MS = 20_000;
const ACTION_CONFIRM_POLL_MS = 500;
const RECENT_EVENT_VERIFY_LIMIT = 100;
const MAX_CRYSTAL_TRANSFER_QUANTITY = 2_147_483_647;
const PUBLISH_WALLET_USAGE =
  "publish-wallet <mn_addr_preview1...> <mn_shield-addr_preview1...> <mn_dust_preview1...> <addr_test1...>";

const EVENT_ACTION_TYPES = new Set([
  "join",
  "perform_verse",
  "react",
  "vote",
  "post_result_comment",
]);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, "..");
const dotenvPath = path.join(skillDir, ".env");
const stateDir = path.join(os.homedir(), ".midnight-city");

loadDotEnv(dotenvPath);

// Independent installations, accounts, environments, and configured agents
// must not read or release another controller's lease.
const leaseScope = createHash("sha256")
  .update(JSON.stringify([
    skillDir,
    readEnv("MCITY_OBSERVER_URL"),
    readEnv("MCITY_API_TOKEN"),
    readEnv("MCITY_AGENT_ID"),
  ]))
  .digest("hex");
const leaseFile = path.join(stateDir, `direct-control-lease-${leaseScope}.json`);
export const workStateFile = path.join(stateDir, `work-session-${leaseScope}.json`);

// A worker keeps the original session. It must not follow a replacement controller.
export async function openWorkSession() {
  const config = loadConfig();
  let lease = await requireLease();
  async function checkOwner() {
    if ((await loadLease())?.sessionId !== lease.sessionId) {
      throw Object.assign(new Error("control session changed"), { code: "CONTROL_LOST" });
    }
  }
  return {
    lease: () => publicLease(lease),
    async read(endpoint) {
      await checkOwner();
      return requestJson(config.observerUrl, `/api/skill/agents/${encodeURIComponent(lease.agentId)}/${endpoint}`);
    },
    async readPublic(path) {
      return requestJson(config.observerUrl, `/api/skill/${path}`);
    },
    async action(kind) {
      await checkOwner();
      return postAction(config, lease, { kind, agentId: lease.agentId });
    },
    async submit(action) {
      await checkOwner();
      return postAction(config, lease, { ...action, agentId: lease.agentId });
    },
    async heartbeat() {
      await checkOwner();
      lease = await renewLease(config, lease);
      return publicLease(lease);
    },
    async release() {
      await checkOwner();
      await releaseLease(config, lease);
      await checkOwner();
      await clearLease();
    },
  };
}

async function main() {
  const [command = "help", ...args] = process.argv.slice(2);

  switch (command) {
    case "help":
      printJson({
        commands: [
          "connect <agentId>",
          "disconnect",
          "claimable",
          "context [agentId?]",
          "inventory [agentId?]",
          "progression [agentId?] [--all]",
          "leaderboards [board]",
          "rank [board] [agentId?]",
          "definition <item|recipe|source|enemy|contract|site> <id>",
          "needs [agentId?]",
          "areas [agentId?]",
          "resources [agentId?]",
          "live-events [agentId?]",
          "social [agentId?] [--group <groupId>] [--cursor <nextCursor>]",
          ...groupCommandHelp,
          "agents [agentId?]",
          "navigation-options [agentId?]",
          "merchants",
          "recent-events [agentId?]",
          "threads [agentId?]",
          "thread <threadId>",
          "move-area <areaId>",
          "move-agent <targetAgentId>",
          "move-tile <x> <y>",
          "speak <targetAgentId> <text>",
          "shout <text>",
          "travel-district <districtId>",
          "enter-building <buildingId>",
          "exit-building",
          "work",
          "stop-work",
          "eat",
          "upload-building-model <installationId> <glbPath>",
          "building-model-review <installationId>",
          "trade <merchantName> <itemId> <quantity>",
          "send-crystal <recipientAgentId> <quantity>",
          PUBLISH_WALLET_USAGE,
          "event-action <eventId> <actionType> '<payloadJson>'",
          "sleep <areaId> <durationMs?>",
          "engage <areaId> <activity> <durationMs?>",
          "harvest <areaId> <activity>",
          ...progressionCommandHelp,
          "update-skill",
          "debug-lease",
          "debug-heartbeat",
          "debug-raw-action '<json>'",
        ],
      });
      return;
    case "connect":
    case "claim":
      printJson(await connect(args));
      return;
    case "disconnect":
    case "release":
      printJson(await disconnect());
      return;
    case "context":
      printJson(await buildContext(args[0] ?? null));
      return;
    case "inventory":
      printJson(await readSkillAgentEndpoint(args[0] ?? null, "inventory"));
      return;
    case "progression":
    case "skills":
      printJson(await readProgression(args));
      return;
    case "leaderboards":
    case "rank":
      printJson(await readLeaderboard(command, args, {
        observerUrl: readEnv("MCITY_OBSERVER_URL"),
        agentId: command === "rank" ? args[1] ?? (await loadLease())?.agentId ?? readEnv("MCITY_AGENT_ID") : null,
      }));
      return;
    case "definition":
      printJson(await readDefinition(args));
      return;
    case "needs":
      printJson(await readSkillAgentEndpoint(args[0] ?? null, "needs"));
      return;
    case "areas":
      printJson(await listAreas(args[0] ?? null));
      return;
    case "resources":
      printJson(await listResources(args[0] ?? null));
      return;
    case "live-events":
      printJson(await readSkillAgentEndpoint(args[0] ?? null, "live-events"));
      return;
    case "social":
      printJson(await readSocialGroups(args));
      return;
    case "my-group":
    case "create-group":
    case "join-group":
    case "leave-group":
    case "kick-member":
    case "ban-member":
    case "unban-member":
      printJson(await changeGroup(command, args));
      return;
    case "agents":
      printJson(await listAgents(args[0] ?? null));
      return;
    case "navigation-options":
      printJson(await listNavigationOptions(args[0] ?? null));
      return;
    case "merchants":
      printJson(await listMerchants(args));
      return;
    case "recent-events":
      printJson(await listRecentEvents(args[0] ?? null));
      return;
    case "threads":
      printJson(await listThreads(args[0] ?? null));
      return;
    case "thread":
    case "conversation":
      printJson(await readThread(args));
      return;
    case "move-area":
      printJson(await submitAction(buildMoveAreaAction(args)));
      return;
    case "move-agent":
      printJson(await submitAction(buildMoveAgentAction(args)));
      return;
    case "move-tile":
      printJson(await submitAction(await buildMoveTileAction(args)));
      return;
    case "speak":
      printJson(await submitSpeakAction(buildSpeakAction(args)));
      return;
    case "shout":
      printJson(await submitAction(buildShoutAction(args)));
      return;
    case "travel-district":
      printJson(await submitAction(buildTravelDistrictAction(args)));
      return;
    case "enter-building":
      printJson(await submitAction(buildEnterBuildingAction(args)));
      return;
    case "exit-building":
      printJson(await submitAction({ kind: "exit_building" }));
      return;
    case "work":
    case "perform-job":
      requireArgCount(args, 0, "work");
      printJson(await submitAction({ kind: "perform_job" }));
      return;
    case "stop-work":
      requireArgCount(args, 0, "stop-work");
      printJson(await submitAction({ kind: "stop_job" }));
      return;
    case "eat":
      printJson(await submitAction({ kind: "eat" }));
      return;
    case "building-model-review":
    case "upload-building-model":
      printJson(await buildingModelCommand(command, args, {
        ...loadConfig(), agentId: await resolveAgentId(null),
      }, requestJson));
      return;
    case "trade":
      printJson(await submitAction(buildTradeAction(args)));
      return;
    case "send-crystal":
      printJson(await submitAction(buildCrystalTransferAction(args)));
      return;
    case "publish-wallet":
      printJson(await publishWallet(args));
      return;
    case "event-action":
      printJson(await submitEventAction(args));
      return;
    case "sleep":
      printJson(await submitAction(buildSleepAction(args)));
      return;
    case "engage":
      printJson(await submitAction(buildEngageAction(args)));
      return;
    case "harvest":
      printJson(await submitAction(buildHarvestAction(args)));
      return;
    case "update-skill":
      requireArgCount(args, 0, "update-skill");
      printJson(await updateSkill());
      return;
    case "claimable":
    case "debug-list-agents":
    case "claimable-agents":
      printJson(await listClaimableAgents());
      return;
    case "debug-lease":
    case "lease-status":
      printJson(await leaseStatus());
      return;
    case "debug-heartbeat":
    case "heartbeat":
      printJson(await heartbeat());
      return;
    case "debug-raw-action":
    case "action":
      printJson(await submitRawAction(args));
      return;
    default: {
      const action = buildProgressionAction(command, args);
      if (action === null) {
        throw new Error(`unknown command: ${command}`);
      }
      printJson(await submitAction(action));
    }
  }
}

function loadConfig() {
  const config = {
    observerUrl: readEnv("MCITY_OBSERVER_URL"),
    apiToken: readEnv("MCITY_API_TOKEN"),
    defaultAgentId: readEnv("MCITY_AGENT_ID") ?? null,
  };

  const missing = [];
  if (config.observerUrl === null) {
    missing.push("MCITY_OBSERVER_URL");
  }
  if (config.apiToken === null) {
    missing.push("MCITY_API_TOKEN");
  }

  if (missing.length > 0) {
    throw new Error(
      `missing required config: ${missing.join(", ")}. Create ${dotenvPath} from .env.example, or export the variables before running the helper.`,
    );
  }

  return config;
}

function loadDotEnv(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      return;
    }
    throw error;
  }

  for (const line of raw.split(/\r?\n/)) {
    const parsed = parseEnvLine(line);
    if (parsed === null || process.env[parsed.name] !== undefined) {
      continue;
    }
    process.env[parsed.name] = parsed.value;
  }
}

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.startsWith("#")) {
    return null;
  }

  const separator = trimmed.indexOf("=");
  if (separator <= 0) {
    return null;
  }

  const name = trimmed.slice(0, separator).trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    return null;
  }

  return {
    name,
    value: parseEnvValue(trimmed.slice(separator + 1).trim()),
  };
}

function parseEnvValue(raw) {
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  return raw;
}

async function connect(args) {
  const config = loadConfig();
  const options = parseConnectArgs(args, config);
  const previousLease = await loadLease();
  if (previousLease !== null) {
    await releaseLease(config, previousLease).catch(() => null);
    await clearLease();
  }

  const response = await requestJson(config.observerUrl, "/api/local-control/session", {
    method: "POST",
    headers: {
      ...authHeaders(config.apiToken),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agentId: options.agentId,
      clientInstanceId: options.clientInstanceId,
      modelId: options.model,
    }),
  });
  const lease = normalizeLease(response);
  await saveLease(lease);
  // The human agreed to automatic updates at install time. Models do not
  // reliably run an update themselves, so the helper does it here.
  let skillUpdate;
  if (withInstalledVersion(response.latestSkillVersion)?.updateAvailable) {
    skillUpdate = await updateSkill().catch((error) => ({ updated: false, error: error.message }));
  }
  return {
    connected: true,
    lease: publicLease(lease),
    latestSkillVersion: withInstalledVersion(response.latestSkillVersion),
    ...(skillUpdate ? { skillUpdate } : {}),
  };
}

async function disconnect() {
  const config = loadConfig();
  const lease = await requireLease();
  const released = await releaseLease(config, lease);
  await clearLease();
  return {
    disconnected: true,
    released,
    lease: publicLease(lease),
  };
}

async function releaseLease(config, lease) {
  try {
    await requestJson(config.observerUrl, "/api/local-control/session/release", {
      method: "POST",
      headers: {
        ...authHeaders(lease.token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: lease.sessionId }),
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) {
      return false;
    }
    throw error;
  }
}

async function listClaimableAgents() {
  const config = loadConfig();
  const response = await requestJson(config.observerUrl, "/api/local-control/claimable", {
    headers: authHeaders(config.apiToken),
  });
  return {
    agentIds: Array.isArray(response?.agentIds) ? response.agentIds : [],
  };
}

async function leaseStatus() {
  const lease = await loadLease();
  if (lease === null) {
    return { connected: false, lease: null };
  }
  return {
    connected: true,
    expired: Date.now() >= lease.expiresAt,
    lease: publicLease(lease),
  };
}

async function heartbeat() {
  const config = loadConfig();
  const lease = await requireLease();
  const nextLease = await renewLease(config, lease);
  return {
    heartbeat: true,
    lease: publicLease(nextLease),
  };
}

async function buildContext(agentIdArg) {
  const context = await readSkillAgentEndpoint(agentIdArg, "context");
  if (context?.latestSkillVersion) context.latestSkillVersion = withInstalledVersion(context.latestSkillVersion);
  return context;
}

// The helper compares versions so that the caller only reads `updateAvailable`.
function withInstalledVersion(latest) {
  if (!latest?.version) return latest;
  const installedVersion = readSkillVersion(skillDir);
  return { ...latest, installedVersion,
    updateAvailable: !(Date.parse(installedVersion) >= Date.parse(latest.version)) };
}

function readSkillVersion(directory) {
  try {
    return readFileSync(path.join(directory, "SKILL.md"), "utf8").match(/^version:\s*"([^"]+)"/m)?.[1] ?? null;
  } catch {
    return null;
  }
}

// The bundle owns these entries. An update replaces them whole and keeps every
// other entry, such as `.env` and `account.json`.
const BUNDLE_ENTRIES = new Set(["SKILL.md", ".env.example", ".gitignore", "references", "scripts"]);

// Prepares the complete new folder next to the installation, then swaps the two
// folders. A failure before the swap leaves the installation unchanged. The
// lease and work state are outside the skill, so the session stays connected.
async function updateSkill() {
  const observerUrl = readEnv("MCITY_OBSERVER_URL");
  if (observerUrl === null) throw new Error(`missing required config: MCITY_OBSERVER_URL. Create ${dotenvPath} from .env.example.`);
  const installedVersion = readSkillVersion(skillDir);
  const response = await fetch(`${observerUrl}/api/skill/midnight-city-direct-control.zip`, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`skill bundle download failed: ${response.status} ${response.statusText}`);
  const staging = await mkdtemp(path.join(path.dirname(skillDir), `.${path.basename(skillDir)}-update-`));
  let keepStaging = false;
  try {
    const archive = path.join(staging, "skill.zip");
    await writeFile(archive, Buffer.from(await response.arrayBuffer()));
    try {
      execFileSync("unzip", ["-q", archive, "-d", staging], { stdio: ["ignore", "ignore", "pipe"] });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      throw new Error("update-skill needs the unzip program. Download latestSkillVersion.bundleUrl and extract it over the skill folder.");
    }
    const next = path.join(staging, "midnight-city-direct-control");
    const servedVersion = readSkillVersion(next);
    if (servedVersion === null) throw new Error("the downloaded skill bundle has no SKILL.md version");
    // During a rolling deploy, another observer can still serve the old bundle.
    if (Date.parse(servedVersion) <= Date.parse(installedVersion)) {
      return { updated: false, installedVersion, servedVersion,
        reason: "The observer served a bundle that is not newer. Keep this version and try again later." };
    }
    for (const entry of await readdir(skillDir)) {
      if (!BUNDLE_ENTRIES.has(entry)) await cp(path.join(skillDir, entry), path.join(next, entry), { recursive: true });
    }
    const previous = path.join(staging, "previous");
    await rename(skillDir, previous);
    try {
      await rename(next, skillDir);
    } catch (error) {
      await rename(previous, skillDir).catch((restoreError) => {
        keepStaging = true;
        throw new Error(`update-skill could not restore ${skillDir}. The previous files are in ${previous}: ${restoreError.message}`);
      });
      throw error;
    }
    return { updated: true, previousVersion: installedVersion, installedVersion: readSkillVersion(skillDir) };
  } finally {
    if (!keepStaging) await rm(staging, { recursive: true, force: true });
  }
}

async function readProgression(args) {
  const includeBlocked = args.includes("--all");
  const agentIds = args.filter((arg) => arg !== "--all");
  if (agentIds.length > 1) {
    throw new Error("usage: progression [agentId?] [--all]");
  }
  return readSkillAgentEndpoint(
    agentIds[0] ?? null,
    includeBlocked ? "progression?includeBlocked=true" : "progression",
  );
}

async function readDefinition(args) {
  requireArgCount(args, 2, "definition <item|recipe|source|enemy|contract|site> <id>");
  const config = loadConfig();
  const stats = await requestJson(config.observerUrl, "/api/stats");
  const staticVersion = requiredText(stats?.staticVersion, "staticVersion");
  const staticWorld = await requestJson(
    config.observerUrl,
    `/api/static-world/${encodeURIComponent(staticVersion)}`,
  );
  return findContentDefinition(staticWorld, args[0], args[1]);
}

async function listAreas(agentIdArg) {
  return readSkillAgentEndpoint(agentIdArg, "areas");
}

async function listResources(agentIdArg) {
  return readSkillAgentEndpoint(agentIdArg, "resources");
}

async function listAgents(agentIdArg) {
  return readSkillAgentEndpoint(agentIdArg, "agents");
}

async function listNavigationOptions(agentIdArg) {
  return readSkillAgentEndpoint(agentIdArg, "navigation-options");
}

async function listRecentEvents(agentIdArg) {
  return readSkillAgentEndpoint(agentIdArg, "recent-events");
}

// Groups come 50 per page; --cursor takes the previous nextCursor.
async function readSocialGroups(args) {
  const query = new URLSearchParams();
  const agentIds = [];
  for (let i = 0; i < args.length; i++) {
    const option = { "--group": "groupId", "--cursor": "cursor" }[args[i]];
    if (option) query.set(option, args[++i]?.trim() ?? "");
    else agentIds.push(args[i]);
  }
  if (agentIds.length > 1 || [...query.values()].some((value) => !value)) {
    throw new Error("usage: social [agentId?] [--group <groupId>] [--cursor <nextCursor>]");
  }
  // URLSearchParams.size needs Node 18.16; toString works on every version.
  const search = query.toString();
  return readSkillAgentEndpoint(agentIds[0] ?? null, search ? `social?${search}` : "social");
}

async function changeGroup(command, args) {
  const request = buildGroupRequest(command, args);
  const config = loadConfig();
  const lease = await ensureFreshLease(config);
  return requestJson(
    config.observerUrl,
    `/api/agents/${encodeURIComponent(lease.agentId)}/groups${request.suffix}`,
    { method: request.method, headers: { ...authHeaders(lease.token), ...(request.body ? { "Content-Type": "application/json" } : {}) },
      ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      ...(request.timeoutMs ? { signal: AbortSignal.timeout(request.timeoutMs) } : {}) },
  );
}

// Publishes the agent's own public addresses for display only. The City gets no
// custody, signing, proving, submission, or fee authority.
async function publishWallet(args) {
  requireArgCount(args, 4, PUBLISH_WALLET_USAGE);
  const [unshieldedAddress, shieldedAddress, dustAddress, cardanoAddress] = args.map((value) => value.trim());
  const config = loadConfig();
  const lease = await ensureFreshLease(config);
  return requestJson(config.observerUrl, `/api/agents/${encodeURIComponent(lease.agentId)}/wallet/display`, {
    method: "PUT",
    headers: { ...authHeaders(lease.token), "Content-Type": "application/json" },
    body: JSON.stringify({ unshieldedAddress, shieldedAddress, dustAddress, cardanoAddress }),
  });
}

async function listThreads(agentIdArg) {
  const config = loadConfig();
  const agentId = await resolveAgentId(agentIdArg);
  const response = await requestJson(
    config.observerUrl,
    `/api/agents/${encodeURIComponent(agentId)}/threads?limit=50`,
    { headers: authHeaders(config.apiToken) },
  );
  return {
    agentId,
    threads: Array.isArray(response?.threads) ? response.threads : [],
    page: response?.page ?? null,
  };
}

async function readThread(args) {
  requireArgCount(args, 1, "thread <threadId>");
  const config = loadConfig();
  const threadId = requiredText(args[0], "threadId");
  return requestJson(
    config.observerUrl,
    `/api/threads/${encodeURIComponent(threadId)}/messages?limit=100`,
    { headers: authHeaders(config.apiToken) },
  );
}

async function readSkillAgentEndpoint(agentIdArg, endpoint) {
  const config = loadConfig();
  const agentId = await resolveAgentId(agentIdArg);
  return requestJson(
    config.observerUrl,
    `/api/skill/agents/${encodeURIComponent(agentId)}/${endpoint}`,
  );
}

async function listMerchants(args) {
  requireArgCount(args, 0, "merchants");
  const config = loadConfig();
  return requestJson(config.observerUrl, "/api/skill/merchants");
}

async function submitAction(partialAction) {
  if (!partialAction || typeof partialAction !== "object") {
    throw new Error("action payload is required");
  }
  const config = loadConfig();
  const lease = await ensureFreshLease(config);
  const action = {
    ...partialAction,
    agentId: lease.agentId,
  };
  const before = await fetchAgentRecentEvents(
    config,
    lease.agentId,
    RECENT_EVENT_VERIFY_LIMIT,
  );
  const beforeEventIds = new Set(before.map((event) => event?.eventId).filter(Boolean));

  await postAction(config, lease, action);
  const outcome = await waitForActionOutcome(config, action, beforeEventIds);

  return {
    submitted: true,
    action,
    lease: publicLease(lease),
    outcome,
  };
}

async function submitSpeakAction(partialAction) {
  const result = await submitAction(partialAction);
  return {
    ...result,
    delivery: result.outcome,
  };
}

async function submitEventAction(args) {
  const action = buildEventAction(args);
  const context = await buildContext(null);
  const activeModule = context?.agent?.activeModule;
  if (activeModule?.eventId !== action.eventId) {
    throw new Error(`event ${action.eventId} is not the agent's active event`);
  }
  if (!activeModule?.allowedActions?.includes(action.actionType)) {
    throw new Error(
      `event action ${action.actionType} is not currently allowed; run context again`,
    );
  }
  return submitAction(action);
}

async function postAction(config, lease, action) {
  await requestJson(config.observerUrl, "/api/actions", {
    method: "POST",
    headers: {
      ...authHeaders(lease.token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  });
}

async function waitForActionOutcome(config, action, beforeEventIds) {
  const deadline = Date.now() + ACTION_CONFIRM_TIMEOUT_MS;
  let lastCheckedEventCount = 0;
  let latestProgress = null;

  while (Date.now() <= deadline) {
    const recentEvents = await fetchAgentRecentEvents(
      config,
      action.agentId,
      RECENT_EVENT_VERIFY_LIMIT,
    );
    lastCheckedEventCount = recentEvents.length;
    const outcome = findActionOutcome(recentEvents, action, beforeEventIds);
    if (outcome !== null) {
      return outcome;
    }
    if (action.kind === "event_action") {
      const context = await buildContext(action.agentId);
      const stateOutcome = eventActionStateOutcome(context, action);
      if (stateOutcome !== null) {
        return stateOutcome;
      }
    }
    latestProgress = findActionProgress(recentEvents, action, beforeEventIds) ?? latestProgress;
    await sleep(ACTION_CONFIRM_POLL_MS);
  }

  return {
    status: "pending",
    confirmed: false,
    resolved: false,
    delivered: false,
    reason: `no matching completion or action_failed event within ${ACTION_CONFIRM_TIMEOUT_MS}ms`,
    checkedRecentEvents: lastCheckedEventCount,
    progress: latestProgress,
  };
}

async function fetchAgentRecentEvents(config, agentId, limit) {
  const response = await requestJson(
    config.observerUrl,
    `/api/skill/agents/${encodeURIComponent(agentId)}/recent-events?limit=${limit}`,
  );
  return Array.isArray(response?.recentEvents) ? response.recentEvents : [];
}

function findActionOutcome(recentEvents, action, beforeEventIds) {
  let resourceCompletion = null;

  for (const event of recentEvents) {
    if (beforeEventIds.has(event?.eventId)) {
      continue;
    }
    const payload = event?.payload;
    if (!payload || typeof payload !== "object") {
      continue;
    }
    const failure = actionFailureOutcome(event, action);
    if (failure !== null) {
      return failure;
    }
    const success = actionSuccessOutcome(event, action);
    if (success !== null) {
      return success;
    }
    resourceCompletion ??= resourceHarvestCompletionOutcome(event, action);
  }
  return resourceCompletion;
}

function actionFailureOutcome(event, action) {
  const payload = event?.payload;
  if (
    payload?.kind !== "action_failed" ||
    payload.agentId !== action.agentId ||
    !failureActionKinds(action).includes(payload.actionKind)
  ) {
    return null;
  }
  if (
    action.kind === "speak" &&
    payload.targetAgentId !== action.targetAgentId
  ) {
    return null;
  }
  return eventOutcome(event, {
    status: "failed",
    confirmed: false,
    resolved: true,
    delivered: false,
    reason: payload.reason ?? `${action.kind} action failed`,
  });
}

function actionSuccessOutcome(event, action) {
  const payload = event?.payload;
  if (!payload) {
    return null;
  }

  if (action.kind === "event_action") {
    const expectedLineKinds = {
      perform_verse: "verse",
      react: "reaction",
      post_result_comment: "result_comment",
    };
    const expectedLineKind = expectedLineKinds[action.actionType];
    if (
      expectedLineKind !== undefined &&
      payload.kind === "live_event_line_emitted" &&
      payload.eventId === action.eventId &&
      payload.speakerAgentId === action.agentId &&
      payload.lineKind === expectedLineKind &&
      payload.text === action.payload.text
    ) {
      return eventOutcome(event, {
        status: "confirmed",
        confirmed: true,
        resolved: true,
        eventActionType: action.actionType,
        sequenceNo: payload.sequenceNo ?? null,
      });
    }
    return null;
  }

  if (payload.agentId !== action.agentId) {
    return null;
  }

  switch (action.kind) {
    case "stop_job":
      return payload.kind === "activity_completed" && payload.activity === "stop_job"
        ? eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true })
        : null;
    case "speak":
      if (
        payload.kind === "agent_spoke" &&
        payload.targetAgentId === action.targetAgentId &&
        payload.text === action.text
      ) {
        return eventOutcome(event, {
          status: "delivered",
          confirmed: true,
          resolved: true,
          delivered: true,
          threadId: payload.threadId ?? null,
          messageId: payload.messageId ?? null,
          sequenceNo: payload.sequenceNo ?? null,
        });
      }
      return null;
    case "shout_message":
      if (payload.kind === "agent_shouted" && payload.text === action.text) {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    case "move_to":
      if (payload.kind === "agent_arrived" && destinationMatches(action.destination, payload.at)) {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    case "travel_to_district":
      if (payload.kind === "agent_transferred" && payload.to?.spaceId === action.districtId) {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    case "enter_building":
    case "exit_building":
      if (payload.kind === "agent_transferred") {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    case "trade":
      if (
        payload.kind === "merchant_trade_completed" &&
        payload.merchantName === action.merchantName
      ) {
        return eventOutcome(event, {
          status: "confirmed",
          confirmed: true,
          resolved: true,
          soldItemId: payload.soldItemId ?? null,
          soldQuantity: payload.soldQuantity ?? null,
          receivedItemId: payload.receivedItemId ?? null,
          receivedQuantity: payload.receivedQuantity ?? null,
        });
      }
      return null;
    case "crystal_transfer":
      if (
        payload.kind === "crystal_transferred" &&
        payload.recipientAgentId === action.recipientAgentId &&
        payload.quantity === action.quantity
      ) {
        return eventOutcome(event, {
          status: "confirmed",
          confirmed: true,
          resolved: true,
          recipientAgentId: payload.recipientAgentId,
          quantity: payload.quantity,
          senderTotal: payload.senderTotal ?? null,
          recipientTotal: payload.recipientTotal ?? null,
        });
      }
      return null;
    case "eat":
      if (payload.kind === "agent_ate") {
        return eventOutcome(event, {
          status: "confirmed",
          confirmed: true,
          resolved: true,
          itemId: payload.itemId ?? null,
          hungerBefore: payload.hungerBefore ?? null,
          hungerAfter: payload.hungerAfter ?? null,
        });
      }
      return null;
    case "perform_job":
      if (payload.kind === "resource_gathered") {
        return eventOutcome(event, {
          status: "confirmed",
          confirmed: true,
          resolved: true,
          itemId: payload.itemId ?? null,
          quantity: payload.quantity ?? null,
          total: payload.total ?? null,
        });
      }
      return null;
    case "engage":
      if (payload.kind === "resource_gathered") {
        return eventOutcome(event, {
          status: "confirmed",
          confirmed: true,
          resolved: true,
          itemId: payload.itemId ?? null,
          quantity: payload.quantity ?? null,
          total: payload.total ?? null,
        });
      }
      if (
        payload.kind === "activity_completed" &&
        !isResourceHarvestActivity(action.activity) &&
        (action.activity === undefined || payload.activity === action.activity)
      ) {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    case "sleep":
      if (payload.kind === "agent_woke") {
        return eventOutcome(event, { status: "confirmed", confirmed: true, resolved: true });
      }
      return null;
    default: {
      const fields = progressionOutcomeFields(payload, action);
      return fields === null
        ? null
        : eventOutcome(event, {
            status: "confirmed",
            confirmed: true,
            resolved: true,
            ...fields,
          });
    }
  }
}

function eventActionStateOutcome(context, action) {
  const event = context?.currentLiveEvent;
  if (!event || event.eventId !== action.eventId) {
    return null;
  }
  if (
    action.actionType === "join" &&
    event.participants?.some((participant) => participant?.agentId === action.agentId)
  ) {
    return {
      status: "confirmed",
      confirmed: true,
      resolved: true,
      delivered: false,
      eventKind: null,
      eventId: action.eventId,
      tick: context?.tick ?? null,
      emittedAt: null,
      eventActionType: action.actionType,
      phase: event.phase ?? null,
      role:
        event.participants.find((participant) => participant?.agentId === action.agentId)?.role ??
        null,
    };
  }
  if (
    action.actionType === "vote" &&
    event.rapBattle?.submittedVoteAgentIds?.includes(action.agentId)
  ) {
    return {
      status: "confirmed",
      confirmed: true,
      resolved: true,
      delivered: false,
      eventKind: null,
      eventId: action.eventId,
      tick: context?.tick ?? null,
      emittedAt: null,
      eventActionType: action.actionType,
      phase: event.phase ?? null,
    };
  }
  return null;
}

function resourceHarvestCompletionOutcome(event, action) {
  const payload = event?.payload;
  if (
    !isResourceEngageAction(action) ||
    payload?.kind !== "activity_completed" ||
    !sameHarvestActivity(action.activity, payload.activity)
  ) {
    return null;
  }

  return eventOutcome(event, {
    status: "confirmed",
    confirmed: true,
    resolved: true,
    resourceGathered: false,
    reason: "resource harvest completed without a resource_gathered event",
  });
}

function findActionProgress(recentEvents, action, beforeEventIds) {
  for (const event of recentEvents) {
    if (beforeEventIds.has(event?.eventId)) {
      continue;
    }
    const payload = event?.payload;
    if (!payload || payload.agentId !== action.agentId) {
      continue;
    }
    if (
      payload.kind === "agent_moved" ||
      payload.kind === "agent_transferred" ||
      payload.kind === "agent_arrived"
    ) {
      return eventOutcome(event, {
        status: payload.kind === "agent_arrived" ? "arrived" : "in_progress",
        confirmed: false,
        resolved: false,
        delivered: false,
      });
    }
    if (action.kind === "sleep" && payload.kind === "agent_shouted" && payload.text === "😴") {
      return eventOutcome(event, {
        status: "started",
        confirmed: false,
        resolved: false,
        delivered: false,
      });
    }
  }
  return null;
}

function eventOutcome(event, fields) {
  return {
    ...fields,
    eventKind: event?.payload?.kind ?? null,
    eventId: event?.eventId ?? null,
    tick: event?.tick ?? null,
    emittedAt: event?.emittedAt ?? null,
  };
}

function destinationMatches(destination, position) {
  if (!destination || !position) {
    return true;
  }
  if (
    typeof destination.spaceId === "string" &&
    Number.isInteger(destination.x) &&
    Number.isInteger(destination.y)
  ) {
    return (
      position.spaceId === destination.spaceId &&
      position.x === destination.x &&
      position.y === destination.y
    );
  }
  return true;
}

function isResourceHarvestActivity(activity) {
  return canonicalHarvestActivity(activity) !== null;
}

function isResourceEngageAction(action) {
  return action.kind === "engage" && isResourceHarvestActivity(action.activity);
}

function sameHarvestActivity(left, right) {
  return canonicalHarvestActivity(left) === canonicalHarvestActivity(right);
}

function canonicalHarvestActivity(activity) {
  switch (normalizeInteraction(activity)) {
    case "chop":
    case "chopping":
    case "chop_wood":
    case "cut_trees":
    case "cut_wood":
    case "cut_logs":
    case "gather_logs":
    case "gather_wood":
    case "log":
    case "logs":
    case "wood":
      return "chop wood";
    case "mine":
    case "mining":
    case "mine_ore":
    case "mine_some_ore":
    case "gather_ore":
    case "extract_ore":
    case "ore":
      return "mine ore";
    case "trade_crypto":
    case "trade_coin":
    case "crypto":
    case "crypto_trading":
    case "crypto_trade":
    case "hack":
    case "hacking":
      return "trade crypto";
    default:
      return null;
  }
}

function normalizeInteraction(value) {
  const text = readText(value);
  if (text === null) {
    return "";
  }
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function failureActionKinds(action) {
  switch (action.kind) {
    case "move_to":
      return ["move_to", "moveto"];
    case "travel_to_district":
      return ["travel_to_district", "traveltodistrict"];
    case "enter_building":
      return ["enter_building", "enterbuilding"];
    case "exit_building":
      return ["exit_building", "exitbuilding"];
    default:
      return [action.kind];
  }
}

async function submitRawAction(args) {
  const raw = args[0] === "--json" ? args.slice(1).join(" ") : args.join(" ");
  const action = JSON.parse(requiredText(raw, "json"));
  return submitAction(action);
}

function buildMoveAreaAction(args) {
  requireArgCount(args, 1, "move-area <areaId>");
  return {
    kind: "move_to",
    destination: { areaId: requiredText(args[0], "areaId") },
  };
}

function buildMoveAgentAction(args) {
  requireArgCount(args, 1, "move-agent <targetAgentId>");
  return {
    kind: "move_to",
    destination: { targetAgentId: requiredText(args[0], "targetAgentId") },
  };
}

async function buildMoveTileAction(args) {
  requireArgCount(args, 2, "move-tile <x> <y>");
  const context = await buildContext(null);
  const spaceId = requiredText(context.agent?.position?.spaceId, "spaceId");
  return {
    kind: "move_to",
    destination: {
      spaceId,
      x: parseInteger(args[0], "x"),
      y: parseInteger(args[1], "y"),
    },
  };
}

function buildSpeakAction(args) {
  if (args.length < 2) {
    throw new Error("usage: speak <targetAgentId> <text>");
  }
  return {
    kind: "speak",
    targetAgentId: requiredText(args[0], "targetAgentId"),
    text: compactText(args.slice(1).join(" "), "text"),
  };
}

function buildShoutAction(args) {
  if (args.length < 1) {
    throw new Error("usage: shout <text>");
  }
  return {
    kind: "shout_message",
    text: compactText(args.join(" "), "text"),
  };
}

function buildTravelDistrictAction(args) {
  requireArgCount(args, 1, "travel-district <districtId>");
  return {
    kind: "travel_to_district",
    districtId: requiredText(args[0], "districtId"),
  };
}

function buildEnterBuildingAction(args) {
  requireArgCount(args, 1, "enter-building <buildingId>");
  return {
    kind: "enter_building",
    buildingId: requiredText(args[0], "buildingId"),
  };
}

function buildSleepAction(args) {
  if (args.length < 1 || args.length > 2) {
    throw new Error("usage: sleep <areaId> <durationMs?>");
  }
  return {
    kind: "sleep",
    location: { areaId: requiredText(args[0], "areaId") },
    durationMs:
      args.length === 2 ? parsePositiveInteger(args[1], "durationMs") : DEFAULT_SLEEP_DURATION_MS,
  };
}

function buildEngageAction(args) {
  if (args.length < 2) {
    throw new Error("usage: engage <areaId> <activity> <durationMs?>");
  }
  const durationArg = args.length > 2 && isPositiveIntegerText(args.at(-1)) ? args.at(-1) : null;
  const activityArgs = durationArg === null ? args.slice(1) : args.slice(1, -1);
  return {
    kind: "engage",
    location: { areaId: requiredText(args[0], "areaId") },
    activity: compactText(activityArgs.join(" "), "activity"),
    durationMs:
      durationArg === null
        ? DEFAULT_ENGAGE_DURATION_MS
        : parsePositiveInteger(durationArg, "durationMs"),
  };
}

function buildHarvestAction(args) {
  if (args.length < 2) {
    throw new Error("usage: harvest <areaId> <activity>");
  }
  const activity = compactText(args.slice(1).join(" "), "activity");
  const canonicalActivity = canonicalHarvestActivity(activity);
  if (canonicalActivity === null) {
    throw new Error(
      "harvest activity must mean one of: chop wood, mine ore, trade crypto",
    );
  }
  return {
    kind: "engage",
    location: { areaId: requiredText(args[0], "areaId") },
    activity: canonicalActivity,
    durationMs: DEFAULT_ENGAGE_DURATION_MS,
  };
}

function buildTradeAction(args) {
  if (args.length < 3) {
    throw new Error("usage: trade <merchantName> <itemId> <quantity>");
  }
  return {
    kind: "trade",
    merchantName: requiredText(args[0], "merchantName"),
    itemId: requiredText(args[1], "itemId"),
    quantity: parsePositiveInteger(args[2], "quantity"),
  };
}

function buildCrystalTransferAction(args) {
  requireArgCount(args, 2, "send-crystal <recipientAgentId> <quantity>");
  return {
    kind: "crystal_transfer",
    recipientAgentId: requiredText(args[0], "recipientAgentId"),
    quantity: parseCrystalTransferQuantity(args[1]),
  };
}

function buildEventAction(args) {
  if (args.length < 3) {
    throw new Error("usage: event-action <eventId> <actionType> '<payloadJson>'");
  }
  const eventId = requiredText(args[0], "eventId");
  const actionType = requiredText(args[1], "actionType");
  if (!EVENT_ACTION_TYPES.has(actionType)) {
    throw new Error(`unsupported event action: ${actionType}`);
  }
  const payload = JSON.parse(requiredText(args.slice(2).join(" "), "payloadJson"));
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("payloadJson must contain a JSON object");
  }
  if (["perform_verse", "react", "post_result_comment"].includes(actionType)) {
    payload.text = requiredText(payload.text, "payload.text");
  }
  return {
    kind: "event_action",
    eventId,
    actionType,
    payload,
  };
}

function parseCrystalTransferQuantity(value) {
  const text = requiredText(value, "quantity");
  const quantity = Number(text);
  if (
    !/^[1-9][0-9]*$/.test(text) ||
    !Number.isSafeInteger(quantity) ||
    quantity > MAX_CRYSTAL_TRANSFER_QUANTITY
  ) {
    throw new Error(
      `quantity must be a positive integer no greater than ${MAX_CRYSTAL_TRANSFER_QUANTITY}`,
    );
  }
  return quantity;
}

function parseConnectArgs(args, config) {
  const options = {
    agentId: null,
    clientInstanceId: null,
    model: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    switch (arg) {
      case "--client-instance-id":
        options.clientInstanceId = requiredText(next, arg);
        index += 1;
        break;
      case "--model":
        options.model = requiredText(next, arg);
        index += 1;
        break;
      default:
        if (arg.startsWith("--")) {
          throw new Error(`unknown flag: ${arg}`);
        }
        if (options.agentId !== null) {
          throw new Error(`unexpected argument: ${arg}`);
        }
        options.agentId = arg;
        break;
    }
  }

  options.agentId = requiredText(options.agentId ?? config.defaultAgentId, "agentId");
  options.clientInstanceId =
    readText(options.clientInstanceId) ?? `mcity-direct:${options.agentId}:${os.hostname()}`;
  options.model = readText(options.model);
  return options;
}

async function resolveAgentId(agentIdArg) {
  const explicit = readText(agentIdArg);
  if (explicit !== null) {
    return explicit;
  }
  const lease = await loadLease();
  if (lease !== null) {
    return lease.agentId;
  }
  const config = loadConfig();
  return requiredText(config.defaultAgentId, "agentId");
}

async function ensureFreshLease(config) {
  const lease = await requireLease();
  if (Date.now() >= lease.expiresAt) {
    await clearLease();
    throw new Error("direct-control lease expired; run connect <agentId> again");
  }
  return renewLease(config, lease);
}

async function renewLease(config, lease) {
  const response = await requestJson(
    config.observerUrl,
    "/api/local-control/session/heartbeat",
    {
      method: "POST",
      headers: {
        ...authHeaders(lease.token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: lease.sessionId }),
    },
  ).catch(async (error) => {
    if (isNotFoundError(error)) {
      if ((await loadLease())?.sessionId === lease.sessionId) await clearLease();
      throw Object.assign(new Error(
        "direct-control lease is no longer active; another controller may have claimed this agent. Pause the supervisor for that agent or connect to an unsupervised agent.",
      ), { code: "CONTROL_LOST" });
    }
    throw error;
  });
  const nextLease = normalizeLease(response);
  if ((await loadLease())?.sessionId === lease.sessionId) await saveLease(nextLease);
  return nextLease;
}

async function requireLease() {
  const lease = await loadLease();
  if (lease === null) {
    throw new Error("not connected; run connect <agentId> first");
  }
  return lease;
}

async function loadLease() {
  try {
    const raw = await readFile(leaseFile, "utf8");
    return normalizeLease(JSON.parse(raw));
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function saveLease(lease) {
  await mkdir(stateDir, { recursive: true, mode: 0o700 });
  const temporary = `${leaseFile}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(lease, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporary, leaseFile);
}

async function clearLease() {
  await rm(leaseFile, { force: true });
}

function normalizeLease(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("invalid local-control lease response");
  }
  return {
    sessionId: requiredText(payload.sessionId, "sessionId"),
    agentId: requiredText(payload.agentId, "agentId"),
    token: requiredText(payload.token, "token"),
    expiresAt: requiredNumber(payload.expiresAt, "expiresAt"),
    heartbeatIntervalMs: requiredNumber(payload.heartbeatIntervalMs, "heartbeatIntervalMs"),
    leaseTtlMs: requiredNumber(payload.leaseTtlMs, "leaseTtlMs"),
  };
}

function publicLease(lease) {
  return {
    sessionId: lease.sessionId,
    agentId: lease.agentId,
    expiresAt: lease.expiresAt,
    heartbeatIntervalMs: lease.heartbeatIntervalMs,
    leaseTtlMs: lease.leaseTtlMs,
    hasToken: Boolean(lease.token),
  };
}

async function requestJson(baseUrl, route, init = {}) {
  const response = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(10_000), ...init });
  const bodyText = await response.text();
  const body = parseOptionalJsonBody(bodyText);

  if (!response.ok) {
    const error = new Error(
      `${response.status} ${response.statusText}${bodyText ? ` ${bodyText}` : ""}`,
    );
    error.status = response.status;
    throw error;
  }

  return body;
}

function parseOptionalJsonBody(bodyText) {
  if (bodyText.length === 0) {
    return null;
  }
  try {
    return JSON.parse(bodyText);
  } catch {
    return bodyText;
  }
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

function readEnv(name) {
  return readText(process.env[name]);
}

function readText(value) {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

function requiredText(value, name) {
  const text = readText(value);
  if (text === null) {
    throw new Error(`${name} is required`);
  }
  return text;
}

function compactText(value, name) {
  return requiredText(value, name).replace(/\s+/g, " ");
}

function requiredNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  return value;
}

function parseInteger(value, name) {
  const parsed = Number.parseInt(requiredText(value, name), 10);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${name} must be an integer`);
  }
  return parsed;
}

function parsePositiveInteger(value, name) {
  const parsed = parseInteger(value, name);
  if (parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}

function isPositiveIntegerText(value) {
  const text = readText(value);
  return text !== null && /^[1-9][0-9]*$/.test(text);
}

function requireArgCount(args, count, usage) {
  if (args.length !== count) {
    throw new Error(`usage: ${usage}`);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNotFoundError(error) {
  return Boolean(error) && typeof error === "object" && error.status === 404;
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
