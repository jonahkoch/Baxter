#!/usr/bin/env node
// Simple smart grind — keeps work going, eats when hungry, sells when loaded
import { execSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const AGENT_ID = "user-agent-66b0ebf2-f709-447a-b8e2-24d23a0f2fc3";
const SKILL_DIR = "/root/.openclaw/workspace/skills/midnight-city-direct-control";
const CONTROL = `node ${SKILL_DIR}/scripts/mcity-control.mjs`;

let sessionId = null;
let leaseExpires = 0;

function run(cmd) {
  try {
    return JSON.parse(execSync(cmd, { cwd: SKILL_DIR, encoding: "utf8", timeout: 30000 }));
  } catch (e) {
    console.error("CMD FAIL:", cmd, e.message);
    return null;
  }
}

async function connect() {
  const res = run(`${CONTROL} connect ${AGENT_ID}`);
  if (res?.connected) {
    sessionId = res.lease.sessionId;
    leaseExpires = res.lease.expiresAt;
    console.log(new Date().toISOString(), "Connected, lease until", new Date(leaseExpires).toISOString());
    return true;
  }
  console.error("Connect failed");
  return false;
}

async function heartbeat() {
  // Just read context to keep lease alive
  const res = run(`${CONTROL} context`);
  if (res?.agent) {
    leaseExpires = Date.now() + 300000; // 5 min from now
    return res.agent;
  }
  return null;
}

async function eat() {
  console.log(new Date().toISOString(), "Eating...");
  const res = run(`${CONTROL} eat`);
  if (res?.outcome?.status === "confirmed") {
    console.log(new Date().toISOString(), "Ate, hunger:", res.outcome.hungerBefore, "->", res.outcome.hungerAfter);
    return true;
  }
  return false;
}

async function sell() {
  console.log(new Date().toISOString(), "Checking merchants...");
  const merchants = run(`${CONTROL} merchants`);
  const buyer = merchants?.merchants?.find(m => m.trade?.itemId === "meme_coin" && m.trade?.direction === "buy");
  if (!buyer) {
    console.log("No meme coin buyer found");
    return false;
  }
  const inv = run(`${CONTROL} inventory`);
  const memeCount = inv?.inventory?.meme_coin ?? 0;
  if (memeCount <= 0) {
    console.log("No meme coins to sell");
    return false;
  }
  const qty = Math.min(memeCount, buyer.trade.quantity);
  console.log(new Date().toISOString(), `Selling ${qty} meme_coin to ${buyer.merchantName}...`);
  const res = run(`${CONTROL} trade "${buyer.merchantName}" meme_coin ${qty}`);
  if (res?.outcome?.status === "confirmed") {
    console.log(new Date().toISOString(), "Sold", qty, "meme coins");
    return true;
  }
  return false;
}

async function startWork() {
  console.log(new Date().toISOString(), "Starting work...");
  const res = run(`${CONTROL} work`);
  if (res?.submitted) {
    console.log(new Date().toISOString(), "Work submitted");
    return true;
  }
  return false;
}

async function tick() {
  const agent = await heartbeat();
  if (!agent) {
    console.log(new Date().toISOString(), "Lost connection, reconnecting...");
    await connect();
    return;
  }

  const hunger = agent.hunger?.value ?? 0;
  const isWorking = agent.isPerformingJob;
  const loadState = agent.load?.state ?? "normal";

  console.log(new Date().toISOString(), `hunger=${hunger} load=${loadState} working=${isWorking}`);

  // Eat if hungry
  if (hunger >= 80) {
    await eat();
    return;
  }

  // Sell if loaded
  if (loadState === "overburdened" || loadState === "loaded") {
    await sell();
    return;
  }

  // Start work if not working
  if (!isWorking) {
    await startWork();
  }
}

async function main() {
  console.log(new Date().toISOString(), "Smart Grind starting...");
  await connect();

  // Initial start
  await startWork();

  // Main loop — check every 2 minutes
  while (true) {
    await setTimeout(120000);
    await tick();
  }
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
