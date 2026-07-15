---
version: 2.2.0
name: kochfoto-video-shorts
description: |
  Generate short video clips for Kochfoto using Higgsfield AI start/end frame
  animation. Structured workflow: collect elements → confirm → composition
  instructions → generate one scene at a time → approve → repeat → select
  start/end frames → action description → animate. Use when: "make a composite
  video", "animate this scene", "create a clip", "composite workflow",
  "I have a background and character".
argument-hint: "[background] [character] [prop] [composition] [action]"
allowed-tools: Bash
---

# Kochfoto Video Shorts — Start/End Frame Animation

Generate 3-5 second cinematic video shorts by compositing scenes from
separate elements (background + character + prop), then animating between
a start frame and an end frame.

For character-consistency across multiple videos (same face in many scenes),
use `skills/kochfoto-character-training/SKILL.md` instead.

## How to Invoke This Skill

Say any of these to trigger the workflow:
- "**Let's make a composite video**"
- "**I have a background and character**"
- "**Composite workflow**"
- "**Animate these frames**" — skips to Phase 4 if you already have composites
- "**Make a video short**"

---

## Prerequisites

1. **Higgsfield CLI authenticated** — See `skills/higgsfield-setup/SKILL.md`
2. **User provides source images:**
   - Background image (scene/location)
   - Character image(s) (person to place in scene)
   - Optional: Prop image(s) (object for character to hold/interact with)

---

## Workflow Overview

```
Collect Elements → Confirm All Present → Composition Instructions →
Generate Scene 1 → Approve/Revise → Generate Scene 2 → Approve/Revise → ... →
Select Start/End Frames → Action Description → Animate
```

Four phases:
1. **Element Collection** — Gather all source images
2. **Composition** — Generate one scene at a time with explicit approval
3. **Frame Selection** — Identify start and end frames from approved scenes
4. **Animation** — Generate video with user-provided action description

---

## Phase 1 — Element Collection

### Step 1: Save the source images

User drops images in chat. Save them locally:
```bash
cp /root/.openclaw/media/inbound/<bg>.jpg /tmp/background.jpg
cp /root/.openclaw/media/inbound/<char>.jpg /tmp/character.jpg
# Optional:
cp /root/.openclaw/media/inbound/<prop>.jpg /tmp/prop.jpg
```

### Step 2: Confirm all elements are present

**Do NOT generate anything yet.**

List all collected elements and ask for confirmation:
> "Here are the elements I've collected:
> - Background: [description]
> - Character: [description]
> - Prop: [description] (or 'none')
>
> Are all elements accounted for? Let me know if anything is missing."

**Wait for explicit confirmation** that all elements are present before proceeding.

---

## Phase 2 — Composition

### Step 3: Ask for composition instructions

Once all elements are confirmed, ask the user:
> "How would you like the elements arranged? For example:
> - Where should the character be positioned?
> - What pose should they be in?
> - Should they be holding the prop?
> - Any specific lighting or mood?"

### Step 4: Generate ONE composite scene

Use the composition instructions to craft the prompt. Generate **one scene at a time** using GPT Image 2.

```bash
higgsfield generate create gpt_image_2 \
  --prompt "[Use composition instructions to craft detailed scene description]" \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --image /tmp/prop.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Step 5: Present for approval

Share the generated composite with the user.

**Do NOT generate the next scene until explicitly approved.**

Ask:
> "Here's the composite. Does this work for you?
> - Approve and we'll move to the next scene
> - Request changes and I'll regenerate
> - Or tell me if you want a different pose/position"

### Step 6: Repeat for additional scenes

Once approved, ask:
> "What should the next scene be? Different pose, different position, different action?"

Use their response to craft the next prompt. Repeat Steps 4-5 for each additional scene.

**Typical workflow generates 2-4 scenes** to have options for start/end frames.

Save each approved scene:
```bash
curl -sL <result_url> -o /tmp/composite_<description>.png
```

---

## Phase 3 — Frame Selection

### Step 7: Identify start and end frames

After all scenes are generated and approved, present the collection:
> "Here are all the approved scenes. Which one should be the start frame and which should be the end frame for the animation?"

User selects:
- **Start frame** — the beginning of the animation
- **End frame** — the final frame of the animation

Save the selected frames:
```bash
cp /tmp/composite_<start>.png /tmp/start_frame.png
cp /tmp/composite_<end>.png /tmp/end_frame.png
```

---

## Phase 4 — Animation

### Step 8: Ask for scene action description

Before animating, ask the user:
> "What action should happen between the start and end frames? Describe the movement.
> For example:
> - 'Character walks toward camera and sits down'
> - 'Character turns around and walks away'
> - 'Character approaches holding the prop'
>
> Also, any camera movement? (pull back, static, dolly in, etc.)"

### Step 9: Generate animation

Use the action description to craft the animation prompt. Generate the video using Seedance 2.0.

```bash
higgsfield generate create seedance_2_0 \
  --prompt "[User's action description]. Camera [movement]. Character stays fully visible in frame throughout. Photorealistic cinematic quality." \
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
| Composite scene | Regenerate with revised composition instructions |
| Camera movement | Add to prompt: "camera dollies in/out", "camera pans left/right", "camera pulls back and zooms out", "static camera with slight zoom" |
| Character action | Use user's action description directly in animation prompt |
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
# Phase 1: Element Collection
# User provided: background.jpg, character.jpg, prop.jpg

# Phase 2: Composition
# User said: "Character leaning against vintage red car, relaxed"
higgsfield generate create gpt_image_2 \
  --prompt "Character leaning against vintage red car on Lisbon cobblestone street, relaxed posture. Hard midday sunlight, photorealistic, cinematic." \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
# → Share result, get approval
# → User approves, save as /tmp/composite_leaning.png

# User said: "Now character sitting on steps in foreground"
higgsfield generate create gpt_image_2 \
  --prompt "Character sitting on stone steps in foreground of same Lisbon street. Same lighting, same scene, relaxed seated pose." \
  --image /tmp/background.jpg \
  --image /tmp/character.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
# → Share result, get approval
# → User approves, save as /tmp/composite_sitting.png

# Phase 3: Frame Selection
# User picks: start=leaning, end=sitting
cp /tmp/composite_leaning.png /tmp/start_frame.png
cp /tmp/composite_sitting.png /tmp/end_frame.png

# Phase 4: Animation
# User said: "Character walks from car toward camera and sits on steps"
higgsfield generate create seedance_2_0 \
  --prompt "Character walks from car toward camera and sits on steps. Camera pulls back and zooms out. Character stays fully visible." \
  --start-image /tmp/start_frame.png \
  --end-image /tmp/end_frame.png \
  --duration 5 \
  --aspect_ratio 16:9 \
  --wait \
  --wait-timeout 20m
```

---

## Session Learnings

**What works well:**
- Generating one scene at a time with explicit approval prevents wasted credits
- User's composition instructions lead to better prompts than guessing
- User's action description directly informs the animation prompt
- Seedance 2.0 handles camera movement prompts reasonably well
- `--end-image` flag works for controlling the final frame
- 5-second duration is the sweet spot for short-form content

**What to watch for:**
- Character gets cropped if camera doesn't pull back/zoom out during approach
- Add "character stays fully visible in frame throughout" if cropping is an issue
- Lighting consistency across composites matters — mention "same lighting" in prompts
- Always get explicit approval before generating the next scene
- Always get explicit action description before animating

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
| Composite quality | GPT Image 2 handles compositing well but not perfectly | Review composites carefully before approving |

---

## Credit Estimates

| Step | Approx Cost |
|------|-------------|
| Composite image (GPT Image 2) | ~5-20 credits each |
| 5-second video (Seedance 2.0) | ~50-150 credits |
| **Total per clip** | ~60-190 credits (varies by number of scenes) |

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
