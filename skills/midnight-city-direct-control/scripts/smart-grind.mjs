#!/usr/bin/env node
// Simple smart grind — uses gather crypto_terminal in a loop
// Fixed to use needs/inventory endpoints (context no longer returns vitals)
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
  // Read context to keep lease alive
  const res = run(`${CONTROL} context`);
  if (res?.agent) {
    leaseExpires = Date.now() + 300000; // 5 min from now
    return res.agent;
  }
  return null;
}

async function getNeeds() {
  const res = run(`${CONTROL} needs`);
  if (res?.hunger) {
    return res.hunger.value ?? 0;
  }
  return 0;
}

async function getLoadState() {
  const res = run(`${CONTROL} inventory`);
  if (res?.load) {
    return {
      state: res.load.state ?? "normal",
      memeCoins: res.inventory?.meme_coin ?? 0,
    };
  }
  return { state: "normal", memeCoins: 0 };
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

async function gather() {
  const res = run(`${CONTROL} gather crypto_terminal`);
  if (res?.outcome?.status === "confirmed") {
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

  // Get hunger and load from correct endpoints
  const hunger = await getNeeds();
  const loadInfo = await getLoadState();

  console.log(new Date().toISOString(), `hunger=${hunger} load=${loadInfo.state} memeCoins=${loadInfo.memeCoins}`);

  // Eat if hungry
  if (hunger >= 80) {
    await eat();
    return;
  }

  // Sell if loaded
  if (loadInfo.state === "overburdened" || loadInfo.state === "heavy") {
    await sell();
    return;
  }

  // Gather from crypto terminal
  await gather();
}

async function main() {
  console.log(new Date().toISOString(), "Smart Grind starting (gather-based)...");
  await connect();

  // Main loop — gather every 15 seconds
  while (true) {
    await tick();
    await setTimeout(15000);
  }
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
