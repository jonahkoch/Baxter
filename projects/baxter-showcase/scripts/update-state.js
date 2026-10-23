#!/usr/bin/env node
/**
 * Helper script for Baxter to update the showcase state.
 *
 * Usage:
 *   node scripts/update-state.js --window <id> --field <key> --value <val>
 *   node scripts/update-state.js --set-progress <id> <percent>
 *   node scripts/update-state.js --set-status <id> <status>
 *   node scripts/update-state.js --add-window '<json>'
 *   node scripts/update-state.js --remove-window <id>
 *
 * After updating, commits and pushes to GitHub (if configured).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_PATH = path.join(__dirname, '..', 'public', 'latest-world.json');

function loadState() {
  return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
}

function saveState(state) {
  state.timestamp = Math.floor(Date.now() / 1000);
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
  console.log(`State updated. New timestamp: ${state.timestamp}`);
}

function run() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('No args provided. State left unchanged.');
    console.log('Use --help for usage.');
    return;
  }

  if (args.includes('--help')) {
    console.log(`
Usage:
  --window <id> --field <key> --value <val>   Update a window field
  --set-progress <id> <percent>               Update project progress (0-100)
  --set-status <id> <status>                  Update status: active|paused|complete|idea
  --add-window '<json>'                       Add a new window from JSON string
  --remove-window <id>                        Remove a window by ID
  --raw '<full-json>'                         Replace entire state (careful!)
  --push                                      Git commit + push after update

Examples:
  node update-state.js --window project-midnight-city --field progress --value 80
  node update-state.js --set-status project-polymarket paused
  node update-state.js --add-window '{"id":"new-idea","title":"💡 New Idea",...}'
`);
    return;
  }

  const state = loadState();
  let changed = false;

  // --raw: replace entire state
  const rawIdx = args.indexOf('--raw');
  if (rawIdx !== -1) {
    const raw = JSON.parse(args[rawIdx + 1]);
    Object.assign(state, raw);
    changed = true;
  }

  // --window + --field + --value
  const winIdx = args.indexOf('--window');
  if (winIdx !== -1) {
    const winId = args[winIdx + 1];
    const fieldIdx = args.indexOf('--field');
    const valueIdx = args.indexOf('--value');
    if (fieldIdx !== -1 && valueIdx !== -1) {
      const field = args[fieldIdx + 1];
      let value = args[valueIdx + 1];
      // Try parse as number or JSON
      if (!isNaN(value)) value = Number(value);
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (value === 'null') value = null;
      else try { value = JSON.parse(value); } catch { /* keep string */ }

      const win = state.windows.find(w => w.id === winId);
      if (win) {
        win[field] = value;
        changed = true;
        console.log(`Updated ${winId}.${field} = ${JSON.stringify(value)}`);
      } else {
        console.error(`Window "${winId}" not found.`);
        process.exit(1);
      }
    }
  }

  // --set-progress
  const progIdx = args.indexOf('--set-progress');
  if (progIdx !== -1) {
    const winId = args[progIdx + 1];
    const progress = parseInt(args[progIdx + 2], 10);
    const win = state.windows.find(w => w.id === winId);
    if (win) {
      win.progress = progress;
      changed = true;
      console.log(`Updated ${winId} progress = ${progress}%`);
    } else {
      console.error(`Window "${winId}" not found.`);
      process.exit(1);
    }
  }

  // --set-status
  const statusIdx = args.indexOf('--set-status');
  if (statusIdx !== -1) {
    const winId = args[statusIdx + 1];
    const status = args[statusIdx + 2];
    const win = state.windows.find(w => w.id === winId);
    if (win) {
      win.status = status;
      changed = true;
      console.log(`Updated ${winId} status = ${status}`);
    } else {
      console.error(`Window "${winId}" not found.`);
      process.exit(1);
    }
  }

  // --add-window
  const addIdx = args.indexOf('--add-window');
  if (addIdx !== -1) {
    const winJson = JSON.parse(args[addIdx + 1]);
    state.windows.push(winJson);
    changed = true;
    console.log(`Added window: ${winJson.id}`);
  }

  // --remove-window
  const remIdx = args.indexOf('--remove-window');
  if (remIdx !== -1) {
    const winId = args[remIdx + 1];
    const idx = state.windows.findIndex(w => w.id === winId);
    if (idx !== -1) {
      state.windows.splice(idx, 1);
      changed = true;
      console.log(`Removed window: ${winId}`);
    } else {
      console.error(`Window "${winId}" not found.`);
      process.exit(1);
    }
  }

  if (changed) {
    saveState(state);

    // --push: git commit + push
    if (args.includes('--push')) {
      try {
        execSync('git add public/latest-world.json', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
        execSync(`git commit -m "update showcase state: ${state.timestamp}"`, { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
        execSync('git push', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
        console.log('Pushed to GitHub.');
      } catch (e) {
        console.error('Git push failed:', e.message);
        process.exit(1);
      }
    }
  } else {
    console.log('No changes made.');
  }
}

run();
