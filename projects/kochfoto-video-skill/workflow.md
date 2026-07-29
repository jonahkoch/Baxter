# Kochfoto AI Video Workflow

## Current Pipeline

### Stage 1: Character/Scene Generation
- **Input:** Photo references + text prompts
- **Tool:** Text-to-image (specific tool? Midjourney, SD, DALL-E?)
- **Output:** Character sheets, scene backgrounds
- **Tracking needed:** Prompts, seed IDs, reference photos used

### Stage 2: Video Generation
- **Input:** Generated characters/scenes as references
- **Platform:** Higgsfield
- **Tools used:**
  - Kling (video generation)
  - Seedance (video generation)
  - Cinema Studio (cinematic effects)
  - Nano Banana (?? — need clarification)
- **Output:** Video clips
- **Tracking needed:** Which tool per clip, generation settings, cost per run

### Stage 3: Voice Generation
- **Tool:** Text-to-voice (ElevenLabs?)
- **Output:** Voiceover audio files
- **Tracking needed:** Voice ID, script versions, timing

### Stage 4: Lip Sync
- **Tool:** Lipsync Studio (Higgsfield)
- **Input:** Video + voiceover
- **Output:** Synced video
- **Tracking needed:** Audio-video pairing, sync quality notes

### Stage 5: Final Edit
- **Tool:** Adobe Premiere
- **Work:** Sound design, final assembly, color
- **Output:** Master file

### Stage 6: Publish
- **Platforms:** Instagram, X, YouTube, Vimeo, LinkedIn
- **Needs:** Format variants, captions, scheduling

## Pain Points (To Address)

1. **Asset tracking** — Which character version matches which scene?
2. **Prompt management** — What worked last time?
3. **Cost tracking** — Higgsfield runs add up, what's the burn?
4. **Quality gates** — Catch bad generations before they propagate
5. **Premiere handoff** — Organized assets, not a dumped folder
6. **Multi-platform publishing** — Resize, reformat, caption for each platform

## Baxter's Potential Roles

### Phase 1: Documentarian (Start Here)
- I track what you create, organize by project
- Log prompts, seeds, reference images
- Build a "recipe book" of what works
- Cost tracking per project

### Phase 2: Pre-flight Checker
- Before you hit "generate," I validate inputs
- Check reference image consistency
- Flag aspect ratio mismatches
- Verify voice script timing vs video length

### Phase 3: Pipeline Operator
- You hand me a project brief, I queue the stages
- Generate characters → queue video gen → prep voiceover → sync
- Monitor Higgsfield outputs, retry failures
- Package assets for Premiere import

### Phase 4: Semi-Autonomous Creator
- You give me a concept, I propose the full pipeline
- Generate options, you pick, I execute the rest
- Handle the tedious: reformat for 5 platforms, upload scheduling

## Immediate Next Steps

1. **Pick one project** — upcoming video you need to make
2. **I'll shadow** — Document every step, build the tracking template
3. **Identify first handoff** — What's the most annoying/tedious part?

## Questions

- Which text-to-image tool for Stage 1?
- What's Nano Banana do?
- Current cost tracking? (Rough monthly spend on Higgsfield?)
- Premiere workflow — do you use Productions, bins, specific naming?
- Publishing — manual upload or any scheduling tools?
