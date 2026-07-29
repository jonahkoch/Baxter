# AI Video Creation for Kochfoto

Active project: Designing a video creation skill tailored for photography workflows.

## Goal
Build an OpenClaw skill that generates video content for:
- Client pitch reels
- Behind-the-scenes (BTS) content
- Social media cuts

## Key Constraints
- MIT or permissive license only (no AGPL/GPL)
- Must handle real photos well (not just motion graphics)
- Reasonable render times (<5 min for 30s output ideal)
- Photographers' workflow, not motion designers'

## Findings Log

### 2025-04-17: OpenMontage Evaluation
**Verdict:** Don't use as-is

**What works:**
- Agent-first architecture (YAML manifests + Markdown skills)
- Zero-API-key path exists (Piper TTS, free stock, Remotion, FFmpeg)
- Quality gates (pre-compose validation, post-render review)

**Blockers:**
- AGPLv3 license — viral clause creates legal issues for client work
- 15 min render for 21s of motion graphics (too slow)
- Doesn't handle actual photos well
- 12 pipelines / 52 tools / 500+ skills — overkill

**Better path:**
Use Remotion directly (MIT-licensed, same engine) and build minimal custom pipeline. Strip 8 of 12 pipelines — most are overkill for client pitches and BTS.

## Open Questions

- [ ] What's the current AI video workflow?
- [ ] Where does Baxter fit in? (orchestration vs execution vs tracking)
- [ ] Which video types are highest priority? (pitches, BTS, social, something else)

## Next Steps

1. Document Jonah's current workflow
2. Identify friction points where an agent helps
3. Design minimal Remotion-based skill
4. Build → Test → Iterate

---

## Related
- OpenMontage repo: https://github.com/calesthio/OpenMontage
- Engine: Remotion (https://www.remotion.dev/) — MIT licensed
