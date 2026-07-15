---
version: 1.0.0
name: kochfoto-character-training
description: |
  Train consistent AI characters for Kochfoto using Higgsfield Soul ID.
  Pipeline: upload reference photos → train Soul character → generate scenes
  → animate to video. Use when: "train my character", "create a Soul ID",
  "make a consistent character", "set up character for video shorts",
  "character keeps changing between generations".
argument-hint: "[character_name] [reference_photos]"
allowed-tools: Bash
---

# Kochfoto Character Training — Soul ID Pipeline

Train a personalized face model so characters stay consistent across
image generations and video clips. One-time setup per character.

This is a separate, more involved workflow than the start/end frame
animation shortcut. Use this when you need the same face to appear
reliably across multiple scenes and videos.

---

## Prerequisites

1. **Higgsfield CLI authenticated** — See `skills/higgsfield-setup/SKILL.md`
2. **`higgsfield-soul-id` skill installed**
   ```bash
   openclaw skills install higgsfield-soul-id
   ```
   Skill location: `~/.openclaw/workspace/skills/higgsfield-soul-id/SKILL.md`
3. **Character reference sheet** from user:
   - 3 face angles: front, right profile, left profile
   - 2 body shots: front full-body, back full-body
   - Optional: side profile body shot

---

## Phase 1 — Character Training (Soul ID)

### 1. Upload face reference images

```bash
higgsfield upload create ./character_face_front.jpg
higgsfield upload create ./character_face_left.jpg
higgsfield upload create ./character_face_right.jpg
```

Capture the upload IDs returned.

### 2. Create Soul Character

```bash
higgsfield soul-id create \
  --name "CharacterName" \
  --image <upload_id_1> \
  --image <upload_id_2> \
  --image <upload_id_3> \
  --wait
```

Training takes ~10-30 minutes. The command returns a `soul_ref_id` when done.

For cinematic/video work specifically:
```bash
higgsfield soul-id create \
  --name "CharacterName" \
  --soul-cinematic \
  --image <upload_id_1> \
  --image <upload_id_2> \
  --image <upload_id_3> \
  --wait
```

### 3. Verify

```bash
higgsfield soul-id list
```

---

## Phase 2 — Scene Composition (Still Image)

Generate a hero frame combining character + prop + background.

### Pick the right model:

| Scene type | Model |
|-----------|-------|
| Character-focused, fashion/lifestyle | Soul 2.0 |
| Cinematic still, dramatic lighting | Soul Cinema |
| General scene, no people | Soul Location |
| Fast iteration, testing | Z Image |

### Generate with Soul reference:

```bash
higgsfield generate create text2image_soul_v2 \
  --prompt "A young woman in a flowing red dress standing in a sunlit forest clearing, holding an antique brass compass, dappled light through trees, cinematic composition" \
  --soul-id <soul_ref_id> \
  --aspect_ratio 9:16 \
  --wait
```

Capture the resulting image URL or job ID.

---

## Phase 3 — Video Generation (Image-to-Video)

Animate the hero frame with camera moves and action.

### Best models for short clips:

| Use case | Model | Notes |
|----------|-------|-------|
| All-around best quality | Seedance 2.0 | Most consistent, best motion |
| Cheaper, single-plane | Kling 3.0 | Good for simple camera moves |
| Fast batch/volume | Veo 3.1 Lite | Lower fidelity, faster |

### Submit with camera + action prompt:

```bash
higgsfield generate create seedance_2_0 \
  --prompt "camera slowly dollies in toward the character, subtle wind moves her hair, she looks down at the compass then glances up, golden hour light" \
  --start-image <hero_frame_image_id_or_path> \
  --duration 5 \
  --aspect_ratio 9:16 \
  --wait \
  --wait-timeout 15m
```

**Camera move vocabulary that works:**
- `camera dollies in / out`
- `camera slowly pans left / right`
- `camera orbits around the subject`
- `camera cranes up / down`
- `static shot with subtle motion`
- `handheld subtle shake`

**Action vocabulary:**
- `character looks up / down / left / right`
- `subtle breathing motion`
- `wind moves hair / clothing`
- `character takes a step forward`
- `slow blink`

---

## Phase 4 — Iteration Loop

1. **Review the video** — Check character consistency, motion quality, camera feel
2. **Adjust prompt** — Add/subtract motion descriptors
3. **Rerun** — Reuse the same `--start-image` for consistency
4. **Vary duration** — 3s, 4s, 5s depending on platform (TikTok/Reels prefer shorter)

---

## Quick Start

```bash
# 1. Upload face photos
higgsfield upload create ./character_face_front.jpg
higgsfield upload create ./character_face_left.jpg
higgsfield upload create ./character_face_right.jpg

# 2. Train Soul (pick one variant)
higgsfield soul-id create --name "CharacterName" --soul-2 --image <id1> --image <id2> --image <id3> --wait
# OR for cinematic/video work:
higgsfield soul-id create --name "CharacterName" --soul-cinematic --image <id1> --image <id2> --image <id3> --wait

# 3. Generate hero frame (character + prop + scene)
higgsfield generate create text2image_soul_v2 \
  --prompt "YOUR SCENE DESCRIPTION HERE" \
  --soul-id <soul_ref_id> \
  --aspect_ratio 9:16 \
  --wait

# 4. Animate to video
higgsfield generate create seedance_2_0 \
  --prompt "camera slowly dollies in, subtle motion, YOUR ACTION HERE" \
  --start-image <hero_frame_id> \
  --duration 4 \
  --aspect_ratio 9:16 \
  --wait \
  --wait-timeout 15m
```

---

## Full Example — End to End

```bash
# 1. Train character (one-time)
higgsfield soul-id create --name "Elena" --image ./elena_front.jpg --image ./elena_left.jpg --image ./elena_right.jpg --wait
# → soul_ref_id: soul_abc123

# 2. Generate hero frame
higgsfield generate create text2image_soul_v2 \
  --prompt "Elena in a vintage 1920s flapper dress standing in an art deco ballroom, holding a crystal champagne glass, warm ambient lighting, reflections on marble floor" \
  --soul-id soul_abc123 \
  --aspect_ratio 9:16 \
  --wait
# → image_id: img_def456

# 3. Animate to video
higgsfield generate create seedance_2_0 \
  --prompt "camera slowly dollies in, Elena raises the champagne glass slightly and smiles, warm bokeh lights flicker in background, subtle film grain" \
  --start-image img_def456 \
  --duration 4 \
  --aspect_ratio 9:16 \
  --wait \
  --wait-timeout 15m
# → video_url: https://...
```

---

## Limitations & Honest Notes

| Issue | Reality | Mitigation |
|-------|---------|------------|
| Character drift | Face stays consistent (Soul ID), but clothing details, hair strands, and body proportions shift slightly frame-to-frame | Use tight framing, keep motion subtle |
| Camera precision | "Dolly in" is interpreted loosely — not frame-accurate | Treat prompts as suggestions, not commands |
| Full body consistency | Soul ID trains on face only; body shots help me write prompts but don't lock body proportions | Generate body-focused hero frames, avoid extreme angles |
| Prop interaction | Character grasping a prop is hit-or-miss | Position prop naturally in hero frame, prompt subtle interaction |
| Hands | AI video hands are still unreliable | Keep hands out of frame or in natural relaxed poses |

---

## Credit Estimates

| Step | Approx Cost |
|------|-------------|
| Soul ID training (one-time) | ~50-200 credits |
| Still image generation | ~5-20 credits |
| 5-second video (Seedance 2.0) | ~50-150 credits |
| **Total per character** | ~55-220 credits + training |

---

## Platform Specs

| Platform | Aspect Ratio | Duration | Tips |
|----------|-------------|----------|------|
| TikTok / Reels | 9:16 | 3-5s | Vertical, fast hook |
| Instagram Feed | 1:1 or 4:5 | 3-5s | Center subject |
| YouTube Shorts | 9:16 | 3-5s | Same as TikTok |
| Website hero | 16:9 | 5s | Cinematic, slow moves |

---

## File Naming Convention

```
project/
├── characters/
│   └── elena/
│       ├── face_front.jpg
│       ├── face_left.jpg
│       ├── face_right.jpg
│       ├── body_front.jpg
│       └── body_back.jpg
├── scenes/
│   └── art_deco_ballroom/
│       ├── hero_frame.png
│       └── video_v1.mp4
└── prompts.md
```
