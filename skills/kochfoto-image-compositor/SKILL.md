---
version: 1.0.0
name: kochfoto-image-compositor
description: |
  Structured image creation and scene composition for Kochfoto. Defines a schema
  for rendering tasks, controls interactions between user and agent, and enables
  building complex scenes from modular image creation steps. Use when: "create an
  image", "composite a scene", "render with references", "image workflow".
argument-hint: "[task-type] [scene-name]"
allowed-tools: Bash
---

# Kochfoto Image Compositor — Structured Scene Building

A schema-driven workflow for creating images and building complex scenes from
modular rendering tasks. Replaces ad-hoc image creation with precise controls
over what happens and when.

## How to Invoke

- **"Start an image task"** — Begin a new rendering task
- **"Composite scene [name]"** — Build a multi-layer scene
- **"Image workflow"** — Load this skill and show current state
- **"Render with schema"** — Execute a predefined task

---

## Core Concepts

### Rendering Task
A single atomic image creation operation with defined inputs and outputs.

### Scene
A composed result built from one or more rendering tasks (layers, elements,
post-processing).

### Asset Pool
Reference images, style guides, and previously generated outputs that can be
used as inputs to tasks.

---

## Schema: Rendering Task

Every image creation task follows this structure:

```yaml
task_id: "unique-id"           # Auto-generated or user-named
type: "generate|composite|upscale|style_transfer|mask|blend"
status: "draft|pending|rendering|review|approved|rejected"

# What to create
description:
  subject: "What is in the image"
  action: "What are they doing (optional)"
  environment: "Where is this happening"
  mood: "Emotional tone"

# Visual controls (all optional, be explicit)
visual:
  style: "editorial|documentary|catalog|fine-art|cinematic"
  composition: "rule-of-thirds|centered|leading-lines|frame-within-frame|asymmetrical"
  color_grade: "warm-golden|cool-blue|muted-earth|high-contrast|monochrome|prompt"
  lighting:
    type: "natural-window|golden-hour|overcast|studio|practical|mixed"
    direction: "front|side|back|top|under"
    quality: "soft|hard|diffused|dramatic"
  camera:
    lens: "35mm|50mm|85mm|24mm-wide|telephoto|macro"
    angle: "eye-level|low|high|overhead|dutch"
    depth_of_field: "shallow|deep|selective"
    film_stock: "portra-400|fuji-400h|ektachrome|none"
  media_type: "digital-photo|film-scan|polaroid|medium-format"

# References (assets from pool)
references:
  style: []      # Images to absorb style from
  subject: []    # Images of the subject/character
  environment: [] # Background/location images
  product: []    # Props/objects to include
  negative: []   # What to avoid

# Generation params
generation:
  model: "gpt_image_2|soul_2|flux_2|auto"
  aspect_ratio: "16:9|4:5|1:1|9:16"
  resolution: "1k|2k|4k"
  count: 1       # Variations to generate

# Pipeline hooks
output:
  save_to: "/path/or/pool-name"
  next_task: "task-id"  # Auto-trigger when approved
  tags: ["hero", "bts", "social"]
```

---

## Schema: Scene

A scene composes multiple tasks into a final deliverable:

```yaml
scene_id: "scene-name"
status: "planning|rendering|compositing|review|final"

elements:
  - element: "background"
    task_ref: "task-id"
    layer: 0
    blend: "normal"
  - element: "subject"
    task_ref: "task-id"
    layer: 1
    blend: "normal"
    mask: "auto|subject|manual"
  - element: "prop"
    task_ref: "task-id"
    layer: 2
    blend: "normal"

post_process:
  color_match: true
  grain: "none|subtle|heavy"
  vignette: false
  upscale: "2x|4x"

deliverable:
  format: "png|jpg|webp|psd"
  sizes: ["original", "social-1080", "email-600"]
```

---

## Interaction Protocol

This defines exactly what happens when you share images vs instructions.

### When You Share Images (without text)

**What I do:**
1. Save images to asset pool with auto-generated IDs
2. Classify each image: `style|subject|environment|product|reference`
3. Store metadata: dimensions, dominant colors, detected content
4. Reply with:
   > "Received 3 images:
   > - IMG-001: Environment (living room, warm tones)
   > - IMG-002: Style reference (editorial, shallow DOF)
   > - IMG-003: Subject (woman, green dress)
   >
   > What task should I use these for?"

### When You Share Text Instructions (without images)

**What I do:**
1. Parse instructions into a `Rendering Task` schema (draft status)
2. Identify missing controls (unspecified lighting? no lens?)
3. Ask targeted questions to fill gaps:
   > "Draft task created for 'couple on balcony at sunset'.
   > I need:
   > - Lens preference? (35mm documentary vs 85mm portrait)
   > - Lighting: golden hour natural or strobes?
   > - Any style references from the pool?"
4. Once complete, queue for render or hold for approval

### When You Share Images + Instructions Together

**What I do:**
1. Save images to pool (as above)
2. Parse instructions, auto-link referenced images by description
3. Build complete task schema with references populated
4. Confirm before rendering:
   > "Task 'balcony-couple-01' ready:
   > - Subject: couple embracing
   > - Environment: IMG-001 (terrace, city view)
   > - Style: IMG-002 (golden hour, film look)
   > - Camera: 35mm, eye-level, shallow DOF
   > - Model: GPT Image 2, 4:5, 2k
   >
   > Render now? (yes / adjust / save draft)"

### When You Reference Previous Outputs

**What I do:**
1. Look up task by ID or description
2. Present options: reuse as reference, upscale, re-render with changes, composite
3. Maintain lineage (this output came from that task)

---

## Quick-Start: Minimal Task

Skip the full schema with shorthand:

```
You: "Image task: couple on balcony, golden hour, 35mm film look, ref IMG-001"
```

I expand to full schema, confirm, render.

---

## Workflow Patterns

### Pattern A: Single Hero Image
```
User shares style refs → User describes subject → I draft task →
User confirms/adjusts → Render → Review → Final
```

### Pattern B: Multi-Element Composite
```
User shares background + subject refs → I draft scene plan →
User approves elements → Render background task → Render subject task →
Composite with masking → Review → Final
```

### Pattern C: Style Exploration
```
User shares 3 style refs → I generate same subject with each style →
User picks winner → Render final at full resolution
```

### Pattern D: Iterative Refinement
```
Render v1 → User: "warmer, more shadow, less perfect" →
I adjust schema (color_grade: warm-golden, lighting: dramatic) →
Render v2 → Compare side-by-side → Pick or continue
```

---

## Commands

| You say | What happens |
|---------|-------------|
| "New task" | I ask for description, build draft schema |
| "Use [image] as [style/subject/env]" | Classify and add to asset pool |
| "Draft for [scene]" | Show current schema without rendering |
| "Render [task-id]" | Execute generation |
| "Compare [task-a] and [task-b]" | Side-by-side review |
| "Scene plan" | Show all tasks in current scene |
| "Asset pool" | List all saved references |
| "Clone [task] with [changes]" | Copy schema, apply diffs, new task ID |

---

## Session State

I maintain in session:
- `asset_pool`: All images you've shared this session
- `tasks`: All rendering tasks (draft → final)
- `scenes`: Multi-element compositions
- `current_scene`: What we're building right now

---

## Example Session

```
You: [shares 2 images]
Me: Received 2 images:
    - IMG-001: Environment (bright modern kitchen)
    - IMG-002: Style ref (warm editorial, film grain)
    What task?

You: New task — family looking at photo album in that kitchen,
     warm editorial style, 35mm, soft window light

Me: Draft task 'family-kitchen-01':
    Subject: family (2 adults, 2 kids) gathered around photo album
    Environment: IMG-001 (bright modern kitchen)
    Style: IMG-002 (warm editorial, film grain)
    Camera: 35mm, eye-level, soft window light, shallow DOF
    Model: GPT Image 2, 4:5, 2k
    Missing: What should they wear? Any specific poses?

You: Casual, kids on parent's lap, looking at album not camera

Me: Updated. Render now?

You: Yes

Me: [renders, shares result]
    Task 'family-kitchen-01' → STATUS: review
    Approve, revise, or save?

You: More shadow on faces, less bright

Me: Adjusting lighting: soft window → dramatic side-light.
    Rendering v2...
```

---

## Integration with Video Workflow

Any approved image task can become:
- **Start/end frame** for video shorts (see `kochfoto-video-shorts` skill)
- **Style reference** for another task
- **Element in a composite scene**

Tag tasks with `video-ready` to auto-populate frame pool.

---

## File Storage

Tasks and scenes are saved to:
```
memory/image-tasks/
  YYYY-MM-DD/
    tasks/        # Individual task schemas (YAML)
    scenes/       # Scene compositions (YAML)
    assets/       # Reference images
    outputs/      # Generated images
```

---

## Related Skills

- `kochfoto-video-shorts` — Animate approved frames into video
- `kochfoto-character-training` — Train consistent subjects
- `higgsfield-generate` — Low-level Higgsfield CLI access
