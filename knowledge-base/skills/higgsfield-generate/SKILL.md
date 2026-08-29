---
name: higgsfield-generate
description: Generate images and videos via Higgsfield AI through 30+ models including Nano Banana 2, Soul V2, Veo 3.1, Kling 3.0, Seedance 2.0, Flux 2, GPT Image 2, plus Marketing Studio for branded ad video/image. Use for text-to-image, image-to-image, image-to-video, and Marketing Studio generation.
triggers:
  - "generate an image"
  - "make a picture"
  - "create artwork"
  - "make a video"
  - "animate this photo"
  - "image-to-video"
  - "img2vid"
  - "edit this image with AI"
  - "stylize a photo"
  - "remix this image"
  - "produce a clip"
  - "render a scene"
  - "create an ad"
  - "make a UGC video"
  - "generate marketing video"
  - "make a product demo"
  - "create unboxing"
  - "TV spot"
  - "virtual try-on"
  - "product showcase"
  - "brand video"
  - "presenter video for product"
  - "import product from URL"
  - "create avatar for ad"
---

# Higgsfield Generate

Submit jobs to any Higgsfield model. Wraps the `higgsfield` CLI. Covers generic image/video gen and Marketing Studio (branded ads, avatars, products).

## Step 0 — Bootstrap

Before any other command, make sure the CLI is installed and authenticated:

1. If `higgsfield` is not on `$PATH`, install it:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh
   ```
2. If `higgsfield account status` fails with `Session expired` / `Not authenticated`, ask the user to run `higgsfield auth login` (interactive, opens a browser) and wait for them to confirm before continuing.

Skip both checks if `higgsfield account status` already prints account info.

## UX Rules

1. Be concise. No raw IDs, no JSON dumps in chat. Print result URL when ready.
2. No internal jargon. Don't narrate "calling higgsfield cost", "polling job".
3. Detect the user's language from the first message and reply in it. Technical args (`--aspect_ratio 16:9`) stay English.
4. Don't batch-ask. Pick a sane default model and ask one thing at a time only if genuinely missing.
5. Don't pre-estimate cost. Just submit unless the user asks.
6. Pass `--wait` to `generate create` so the command blocks until done and prints the result URL itself.

## Workflow — Generic Generation

1. **Pick a model.** Practical defaults from production use:

   **Image:**
   - Brand product visual → use `higgsfield-product-photoshoot` instead
   - Branded ad image with avatar + product → Marketing Studio Image
   - Aesthetic UGC / fashion editorial / lifestyle character → Soul 2.0
   - Cinematic still frame → Soul Cinema
   - Highly characterful creative persona → Soul Cast
   - Locations / environments / no-people scenes → Soul Location
   - Soul Character (reference id from `higgsfield-soul-id`) → Soul 2.0 for stills, Soul Cinema for cinematic
   - Fast and cheap iteration → Z Image
   - Character or cartoon-style work → Nano Banana 2
   - **Default for everything else → GPT Image 2**

   **Video:**
   - All advertising / commercial / branded ad video → Marketing Studio
   - **Default all-purpose serious video → Seedance 2.0**
   - Single-plane scene without strong dynamics, cheaper → Kling 3.0
   - Cheap clean shot without cuts → Seedance 1.5 Pro
   - Cinema-grade highest fidelity → Cinema Studio Video 3.0
   - Cheap with strong physics, no audio needed → Minimax Hailuo
   - Fast batch / volume → Veo 3.1 Lite

   For actual `--model` IDs, run `higgsfield model list --json | jq`.

2. **Pass media inputs straight to flags.** Media flags accept a local file path **or** a UUID. CLI auto-uploads paths and auto-detects job vs upload for UUIDs.

3. **Submit and wait in one shot:**
   ```bash
   higgsfield generate create <model> --prompt "..." [media flags] [param flags] --wait
   ```
   Blocks until terminal status and prints the result URL.

4. **Deliver.** Send the URL plus a one-line summary (model, duration if video).

## Media Flags

| Flag | Use for | Models that accept it |
|---|---|---|
| `--image <path-or-id>` | reference image | most image models, `seedance_2_0`, `veo3`, `marketing_studio_video` |
| `--start-image <path-or-id>` | first frame for transitions | `kling3_0`, `veo3_1`, `seedance_2_0`, `marketing_studio_video` |
| `--end-image <path-or-id>` | last frame for transitions | `kling3_0`, `seedance_2_0`, `marketing_studio_video` |
| `--video <path-or-id>` | reference video | `seedance_2_0` |
| `--audio <path-or-id>` | reference audio (lipsync, soundtrack match) | `seedance_2_0` |

## Common Params

Flags pass through to model schema. Use `higgsfield model get <model>` to discover.

```bash
# Image examples
higgsfield generate create gpt_image_2 --prompt "neon city at dusk" --aspect_ratio 16:9 --resolution 2k --wait
higgsfield generate create nano_banana_2 --prompt "anime character concept" --image ./ref.png --wait

# Video examples
higgsfield generate create seedance_2_0 --prompt "camera dollies in" --start-image ./first.png --duration 8 --wait
higgsfield generate create text2image_soul_v2 --prompt "..." --soul-id <soul_ref_id> --wait
```

## Marketing Studio

Branded image/video gen: avatars + products + ad-style modes. Use models `marketing_studio_video` and `marketing_studio_image`.

### Concepts

- **Avatar** — presenter face. Curated `preset` (browse `higgsfield marketing-studio avatars list`) or `custom` (uploaded photos).
- **Product** — brand item with title + reference images. Imported from URL (`higgsfield marketing-studio products fetch --url ...`) or created from uploaded images.
- **Webproduct** — App Store / web page version. Auto-routes when fetching App Store URLs.

### Workflow — Quick Ad Video

1. **Get product.**
   - URL → `higgsfield marketing-studio products fetch --url <url> --wait`
   - Local images → `higgsfield upload create <photo>...` then `higgsfield marketing-studio products create --title "..." --image <id>...`
2. **Pick avatar.** Default: `higgsfield marketing-studio avatars list` and pick a preset. Custom: `higgsfield marketing-studio avatars create --name "..." --image <upload_id>`.
3. **Pick mode.** Default `ugc`. Other slugs: `ugc_how_to`, `ugc_unboxing`, `product_showcase`, `product_review`, `tv_spot`, `wild_card`, `ugc_virtual_try_on`, `virtual_try_on`.
4. **Generate (one-shot):**
   ```bash
   higgsfield generate create marketing_studio_video \
     --prompt "..." \
     --avatars '[{"id":"<avatar_id>","type":"preset"}]' \
     --product_ids '[<product_id>]' \
     --mode ugc \
     --duration 15 \
     --resolution 720p \
     --aspect_ratio 9:16 \
     --wait
   ```
5. **Deliver.** URL + one-line summary (mode, duration).

### Click-to-Ad Shortcut (URL-driven)

When the user gives a product URL and wants a marketing video in one go:

```bash
# 1. Trigger fetch
higgsfield marketing-studio products fetch --url https://shop.example.com/sneakers --wait

# 2. Generate — backend reuses the entity
higgsfield generate create marketing_studio_video \
  --url https://shop.example.com/sneakers \
  --mode ugc \
  --duration 15 \
  --aspect_ratio 9:16 \
  --wait
```

### Workflow — Marketing Image

Same as above but use `marketing_studio_image` model:

```bash
higgsfield generate create marketing_studio_image \
  --prompt "..." \
  --aspect_ratio 1:1 \
  --resolution 2k \
  --wait
```

## Errors

- `Missing required params: prompt` → user gave no prompt; ask for it.
- `Invalid values: aspect_ratio=99:99 (allowed: ...)` → bad enum; pick from allowed.
- `Unknown params: foo` → schema doesn't accept that flag; check `higgsfield model get <model>`.
- `Session expired` → `higgsfield auth login`.

## Reference Docs

- `references/model-catalog.md` — picking the right model for the task
- `references/prompt-engineering.md` — writing prompts that work
- `references/media-inputs.md` — image/video reference flows
- `references/troubleshooting.md` — common errors and fixes
- `references/marketing-avatars.md` — preset vs custom avatars
- `references/marketing-products.md` — URL fetch vs manual product create
- `references/marketing-modes.md` — every Marketing Studio mode
