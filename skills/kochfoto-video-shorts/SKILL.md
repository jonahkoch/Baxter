---
version: 2.1.0
name: kochfoto-video-shorts
description: |
  Generate short video clips for Kochfoto using Higgsfield AI start/end frame
  animation. Full pipeline: composite scene generation → frame selection →
  animate transition. Use when: "make a composite video", "animate this scene",
  "create a clip", "composite a scene", "animate from start frame to end frame",
  "make a reels video", "I have a background and character", "composite workflow".
argument-hint: "[background] [character] [prop] [action+camera]"
allowed-tools: Bash
---

# Kochfoto Video Shorts — Start/End Frame Animation

Generate 3-5 second cinematic video shorts by compositing scenes from
separate elements (background + character + prop), then animating between
a start frame and an end frame.

For character-consistency across multiple videos (same face in many scenes),
use `skills/kochfoto-character-training/SKILL.md` instead.

## How to Invoke This Skill

Say any of these to trigger the full composite → animate workflow:
- "**Let's make a composite video**" — starts the full pipeline
- "**I have a background and character**" — signals you're ready to composite
- "**Composite workflow**" — shorthand for the full process
- "**Animate these frames**" — skips to Phase 3 if you already have composites
- "**Make a video short**" — general trigger, will ask for background/character

The assistant will guide you through each phase automatically.

---

## Prerequisites

1. **Higgsfield CLI authenticated** — See `skills/higgsfield-setup/SKILL.md`
2. **User provides:**
   - Background image (scene/location)
   - Character image(s) (person to place in scene)
   - Optional: Prop image(s) (object for character to hold/interact with)

---

## Workflow Overview

```
Background + Character + Prop → Composite Scenes → Select Start/End → Animate
```

Three phases:
1. **Composite scene generation** — Combine elements into still frames
2. **Frame selection** — User picks start frame and end frame
3. **Animation** — Generate video transitioning between frames

---

## Phase 1 — Composite Scene Generation

### Step 1: Save the source images

User drops images in chat. Save them locally:
```bash
cp /root/.openclaw/media/inbound/<bg>.jpg /tmp/background.jpg
cp /root/.openclaw/media/inbound/<char>.jpg /tmp/character.jpg
# Optional:
cp /root/.openclaw/media/inbound/<prop>.jpg /tmp/prop.jpg
```

### Step 2: Generate composite scenes

Use GPT Image 2 with reference images to composite the character into the
background scene. Generate multiple variations with different poses/placements.

```bash
higgsfield generate create gpt_image_2 \
  --prompt "A teenage boy with tousled blonde hair wearing a grey tank top and blue denim shorts leaning against a vintage red car on a sun-drenched steep cobblestone street in Lisbon, Portugal. Weathered turquoise azulejo-tiled building facade with arched doorway marked number 13. Hard midday Mediterranean sunlight, sharp shadows, photorealistic, cinematic composition." \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

**Generate multiple variations** by changing the pose/position in the prompt:
- Character leaning against the car
- Character sitting on steps in foreground
- Character standing in doorway
- Character walking up the street

Save each variation with a descriptive filename:
```bash
# After each generation, download the result
curl -sL <result_url> -o /tmp/composite_leaning_against_car.png
curl -sL <result_url> -o /tmp/composite_sitting_on_steps.png
```

### Step 3: Present options to user

Share the composite images. Ask the user to pick:
- Which composite(s) look best
- Which one should be the **start frame**
- Which one should be the **end frame**

---

## Phase 2 — Frame Selection

User picks start and end frames from the composites.

Save the selected frames:
```bash
cp /tmp/composite_leaning_against_car.png /tmp/start_frame.png
cp /tmp/composite_sitting_on_steps.png /tmp/end_frame.png
```

---

## Phase 3 — Animation

Animate the transition between start and end frames using Seedance 2.0.

```bash
higgsfield generate create seedance_2_0 \
  --prompt "Character walks toward the camera from start position to end position. Natural walking motion, relaxed gait. Camera pulls back and zooms out simultaneously. Character stays fully visible in frame throughout. Photorealistic cinematic quality." \
  --start-image /tmp/start_frame.png \
  --end-image /tmp/end_frame.png \
  --duration 5 \
  --aspect_ratio 16:9 \
  --wait \
  --wait-timeout 20m
```

**Key parameters:**
- `--start-image` — First frame (local path or job ID)
- `--end-image` — Last frame (local path or job ID)
- `--duration` — 3-5 seconds
- `--aspect_ratio` — `16:9` for cinematic, `9:16` for Reels/TikTok

---

## Iteration

| What to change | How |
|---------------|-----|
| Composite scene | Regenerate with different pose/placement in prompt |
| Camera movement | Add to prompt: "camera dollies in/out", "camera pans left/right", "camera pulls back and zooms out", "static camera with slight zoom" |
| Character action | Add to prompt: "character walks toward camera", "character sits down", "character looks around", "character performs an action" |
| Duration | Change `--duration` to 3, 4, or 5 |
| Format | Change `--aspect_ratio` to `9:16` for vertical |

---

## Camera + Action Prompt Vocabulary

**Camera moves:**
- `camera dollies in / out`
- `camera slowly pans left / right`
- `camera orbits around the subject`
- `camera cranes up / down`
- `camera pulls back and zooms out simultaneously`
- `static shot with subtle motion`
- `handheld subtle shake`

**Character actions:**
- `character walks toward camera`
- `character sits down`
- `character looks up / down / left / right`
- `subtle breathing motion`
- `wind moves hair / clothing`

---

## Full Example

```bash
# Phase 1: Composite scene generation
# User provided: background.jpg, character.jpg

higgsfield generate create gpt_image_2 \
  --prompt "Character leaning against vintage red car on Lisbon cobblestone street. Hard midday sunlight, photorealistic, cinematic." \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
# → Download result as /tmp/composite_start.png

higgsfield generate create gpt_image_2 \
  --prompt "Character sitting on stone steps in foreground of same Lisbon street. Same lighting, same scene, different pose." \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
# → Download result as /tmp/composite_end.png

# Phase 2: User selects frames (already done above)

# Phase 3: Animation
higgsfield generate create seedance_2_0 \
  --prompt "Character walks from car toward camera and sits on steps. Camera pulls back and zooms out." \
  --start-image /tmp/composite_start.png \
  --end-image /tmp/composite_end.png \
  --duration 5 \
  --aspect_ratio 16:9 \
  --wait \
  --wait-timeout 20m
```

---

## Session Learnings

**What works well:**
- GPT Image 2 composites background + character reliably with `--image` refs
- Generating 2-4 composite variations gives user options to choose from
- Seedance 2.0 handles camera movement prompts reasonably well
- `--end-image` flag works for controlling the final frame
- 5-second duration is the sweet spot for short-form content

**What to watch for:**
- Character gets cropped if camera doesn't pull back/zoom out during approach
- Add "character stays fully visible in frame throughout" if cropping is an issue
- Lighting consistency across composites matters — mention "same lighting" in prompts
- Always ask user to explicitly confirm start and end frames before animating

**Prompt patterns that worked:**
- "Camera pulls back and zooms out simultaneously" — prevents cropping
- "Same scene, different pose" — keeps composites consistent
- Reference images as `--image` flags — GPT Image 2 composites them naturally

---

## Limitations & Honest Notes

| Issue | Reality | Mitigation |
|-------|---------|------------|
| Character consistency | Face/body may shift between composites since there's no trained model | Use same character reference, keep pose descriptions tight |
| Camera precision | "Dolly in" is interpreted loosely — not frame-accurate | Treat prompts as suggestions, not commands |
| Prop interaction | Character grasping a prop is hit-or-miss | Position prop naturally in composite frame, prompt subtle interaction |
| Hands | AI video hands are still unreliable | Keep hands out of frame or in natural relaxed poses |
| Composite quality | GPT Image 2 handles compositing well but not perfectly | Review composites carefully before selecting frames |

---

## Credit Estimates

| Step | Approx Cost |
|------|-------------|
| Composite image (GPT Image 2) | ~5-20 credits each |
| 5-second video (Seedance 2.0) | ~50-150 credits |
| **Total per clip** | ~60-190 credits |

---

## Platform Specs

| Platform | Aspect Ratio | Duration | Tips |
|----------|-------------|----------|------|
| TikTok / Reels | 9:16 | 3-5s | Vertical, fast hook |
| Instagram Feed | 1:1 or 4:5 | 3-5s | Center subject |
| YouTube Shorts | 9:16 | 3-5s | Same as TikTok |
| Website hero | 16:9 | 5s | Cinematic, slow moves |

---

## Related Skills

- **`kochfoto-character-training`** — Train consistent characters with Soul ID
- **`higgsfield-setup`** — Install and authenticate Higgsfield CLI
- **`higgsfield-soul-id`** — Train Soul characters (lower-level, direct CLI)
