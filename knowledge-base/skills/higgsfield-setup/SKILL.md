---
name: higgsfield-setup
description: Set up Higgsfield AI generation capabilities on a fresh server or after auth breakage. Covers CLI install, credential transfer from Mac, workspace config, and first-generation smoke test. Use when setting up Higgsfield, fixing auth, reinstalling, or configuring a new server.
triggers:
  - "set up Higgsfield"
  - "fix Higgsfield auth"
  - "Higgsfield not working"
  - "reinstall Higgsfield"
  - "new server Higgsfield"
---

# Higgsfield Setup & Recovery

Complete guide to getting Higgsfield image/video generation working on this
server. Also works as a recovery playbook if auth breaks.

---

## Phase 1 — Install the Skill

```bash
openclaw skills install higgsfield-generate
```

This downloads the skill from ClawHub to `~/.openclaw/workspace/skills/higgsfield-generate/`.

---

## Phase 2 — Install the Higgsfield CLI

```bash
curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh
```

Installs `higgsfield`, `higgs`, and `hf` to `/usr/local/bin`.

Verify:
```bash
higgsfield --version
```

---

## Phase 3 — Transfer Credentials from Mac

**The CLI must be authenticated on the Mac FIRST**, then credentials are copied
to the server. The server cannot complete browser OAuth (headless).

### On the Mac:

1. Install CLI if not already:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh
   ```

2. Authenticate (opens browser):
   ```bash
   higgsfield auth login
   ```

3. Retrieve the credentials file:
   ```bash
   cat ~/.config/higgsfield/credentials.json
   ```

   Expected output format:
   ```json
   {
     "auth_version": 2,
     "access_token": "oat_...",
     "refresh_token": "MT...",
     "expires_at": 1783999271,
     "token_type": "bearer",
     "scope": "email profile offline_access user:org:read"
   }
   ```

### On the server:

1. Create config directory:
   ```bash
   mkdir -p ~/.config/higgsfield
   chmod 700 ~/.config/higgsfield
   ```

2. Write credentials (paste the exact JSON from Mac):
   ```bash
   cat > ~/.config/higgsfield/credentials.json << 'EOF'
   {
     "auth_version": 2,
     "access_token": "oat_REPLACE_THIS",
     "refresh_token": "MT_REPLACE_THIS",
     "expires_at": 1783999271,
     "token_type": "bearer",
     "scope": "email profile offline_access user:org:read"
   }
   EOF
   chmod 600 ~/.config/higgsfield/credentials.json
   ```

3. Verify token is recognized:
   ```bash
   higgsfield auth token
   ```
   Should print the access token, not an error.

---

## Phase 4 — Configure Workspace

1. Discover workspace ID via API (since `workspace list` may fail):
   ```bash
   curl -s -H "Authorization: Bearer $(higgsfield auth token)" \
     "https://fnf-api-gw.higgsfield.ai/fnf/developer/v2alpha/account/workspaces" | \
     python3 -m json.tool
   ```

2. Write workspace config:
   ```bash
   cat > ~/.config/higgsfield/config.json << 'EOF'
   {
     "workspace_id": "YOUR_WORKSPACE_ID_HERE"
   }
   EOF
   chmod 600 ~/.config/higgsfield/config.json
   ```

3. Set workspace via CLI:
   ```bash
   higgsfield workspace set YOUR_WORKSPACE_ID_HERE
   ```

4. Verify:
   ```bash
   higgsfield workspace status
   higgsfield account status
   ```

---

## Phase 5 — Smoke Test

Generate a test image:

```bash
higgsfield generate create image_auto \
  --prompt "A romantic outdoor wedding ceremony at golden hour, soft bokeh" \
  --aspect_ratio 16:9 \
  --wait \
  --wait-timeout 5m
```

If a URL prints, everything works.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `command not found: higgsfield` | Run Phase 2 (CLI install) |
| `Not authenticated` / `Session expired` | Credentials file missing or wrong format. Re-run Phase 3. |
| `Stored credentials use an older auth flow` | Missing `"auth_version": 2` in credentials.json. Re-copy from Mac. |
| `No workspace selected` | Run Phase 4 (workspace setup) |
| `request failed (no response received)` | Token may be expired. Re-authenticate on Mac and re-transfer. |
| `Method Not Allowed` on API calls | Wrong endpoint path. Use CLI commands, not direct API. |

---

## Files Created

- `~/.config/higgsfield/credentials.json` — OAuth tokens (chmod 600)
- `~/.config/higgsfield/config.json` — Workspace ID (chmod 600)
- `~/.openclaw/workspace/skills/higgsfield-generate/` — Skill code from ClawHub

---

## Workspace Details (Snapshot)

*Update this section whenever workspace/plan changes.*

- **Workspace ID:** `10613b61-2593-4729-844c-dcaf35784a56`
- **Type:** private
- **Plan:** ultimate
- **User Role:** owner
- **Credits:** ~3894.6 (as of 2026-07-13)
