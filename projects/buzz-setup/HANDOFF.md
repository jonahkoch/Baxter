# Buzz/OpenClaw Integration Setup — Handoff Document

**Status:** BLOCKED — NIP-FI (Federated Identity) authentication issue  
**Date:** 2026-11-14  
**Next Action Required:** Resolve CLI auth or find alternative bot approval method

---

## What We Were Doing

Setting up the OpenClaw Buzz channel plugin so the agent (Baxter) can receive messages from Buzz Communities rooms and respond.

---

## Current State

### ✅ Completed

1. **Buzz plugin installed** on OpenClaw gateway (`@openclaw/buzz` v2026.11.3)
2. **Relay connectivity verified** — TLS handshake successful to `wss://jonahkoch.communities.buzz.xyz`
3. **Bot identity generated** by OpenClaw:
   - **Bot npub:** `npub1qgl6qltp03pj9t9333ta5a4xc8qfzzf258dkmmrhkn827gnfh6csr8q5f6`
   - **Bot hex public key:** `023fa07d617c4322acb18c57da76a6c1c091092aa1db6dec77b4ceaf2269beb1`
4. **Room identified:** `5218c6f3-3b84-4d7f-b783-961659d4067c` (Midnight City)
5. **Buzz CLI installed** on Mac and paired with desktop app

### ❌ Blocked

**Cannot add bot to room because CLI lacks NIP-FI authentication token.**

Every `buzz` command fails with:
```json
{"error":"auth_error","message":"auth error: relay requires authentication (authentication required); if it enforces federated identity (NIP-FI), set BUZZ_FEDERATED_IDENTITY_TOKEN to your own NIP-FA sign-in session (a human session for this key, not an agent grant) and BUZZ_FEDERATED_IDENTITY_ADAPTER to its adapter, which mints the assertion","retryable":false}
```

---

## What Was Tried

| Attempt | Result |
|---------|--------|
| `buzz auth desktop pair` | ✅ Paired with desktop app |
| `buzz channels add-member --role bot` | ❌ Auth error — needs NIP-FI token |
| Browser cookie extraction (`__cf_bm`) | ❌ Cloudflare cookie, not session token |
| Browser Local/Session Storage | ❌ Empty — no tokens stored |
| `buzz auth --help` | ℹ️ Only `desktop` subcommand available |
| Web UI member add | ❌ No "Add member" or "Bot role" UI found |

---

## Key Information

### Relay
- **URL:** `wss://jonahkoch.communities.buzz.xyz`
- **Auth:** NIP-FI (Federated Identity) enforced
- **Type:** Hosted/closed relay (not local dev)

### Bot Identity (OpenClaw-generated)
- **npub:** `npub1qgl6qltp03pj9t9333ta5a4xc8qfzzf258dkmmrhkn827gnfh6csr8q5f6`
- **hex:** `023fa07d617c4322acb18c57da76a6c1c091092aa1db6dec77b4ceaf2269beb1`

### User Identity (Jonah's personal)
- **hex:** `e14d7b2d7da7e657f855cca70726d5c1c855cf57f2790361ea46a6d826c1e1fd`
- **Has:** `BUZZ_RELAY_URL` and `BUZZ_PRIVATE_KEY` env vars set

### Target Room
- **UUID:** `5218c6f3-3b84-4d7f-b783-961659d4067c`
- **Name:** Midnight City
- **Join link:** `buzz://channel/5218c6f3-3b84-4d7f-b783-961659d4067c`

---

## What Needs to Happen Next

### Option 1 — Fix CLI Auth (Preferred)

Get a valid `BUZZ_FEDERATED_IDENTITY_TOKEN` and `BUZZ_FEDERATED_IDENTITY_ADAPTER` so the CLI can authenticate.

**Possible paths:**
- Check if Buzz desktop app stores a token in `~/Library/Application Support/xyz.block.buzz.desktop/`
- Use browser dev tools Network tab to capture the token during login
- Contact Communities.buzz support for NIP-FI adapter documentation
- Check if there's a `buzz-admin` CLI with different auth

### Option 2 — Web UI Admin Panel

Find a web-based admin interface that allows adding bots:
- Try `https://jonahkoch.communities.buzz.xyz/admin`
- Try `https://jonahkoch.communities.buzz.xyz/settings`
- Look for "Bots", "Integrations", "API Keys", or "Members" section

### Option 3 — Relay Admin Configuration

If Jonah has relay admin access:
- Add bot public key to workspace community:
  ```bash
  buzz-admin add-member --pubkey 023fa07d617c4322acb18c57da76a6c1c091092aa1db6dec77b4ceaf2269beb1 --role member
  ```
- Or disable NIP-FI requirement for bot keys

### Option 4 — Use Join Link

Test if the bot can join via the join link and if that grants sufficient permissions:
- The join link is: `buzz://channel/5218c6f3-3b84-4d7f-b783-961659d4067c`
- Unknown if this grants "Bot" role or just "Member"

---

## Commands to Resume

Once auth is resolved:

```bash
# Add bot to room with Bot role
buzz channels add-member \
  --channel 5218c6f3-3b84-4d7f-b783-961659d4067c \
  --pubkey 023fa07d617c4322acb18c57da76a6c1c091092aa1db6dec77b4ceaf2269beb1 \
  --role bot

# Then on OpenClaw gateway, complete setup
openclaw channels add --channel buzz
# (Select default account, it should auto-discover the room)
```

---

## References

- OpenClaw Buzz docs: https://docs.openclaw.ai/channels/buzz
- Bot public key: `023fa07d617c4322acb18c57da76a6c1c091092aa1db6dec77b4ceaf2269beb1`
- Room UUID: `5218c6f3-3b84-4d7f-b783-961659d4067c`
- Relay: `wss://jonahkoch.communities.buzz.xyz`
