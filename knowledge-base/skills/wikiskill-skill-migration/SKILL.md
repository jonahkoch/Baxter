---
name: wikiskill-skill-migration
description: Migrate an existing skill from legacy format to WikiSkill format, or load a WikiSkill from the knowledge base. Use when converting old skills, creating new skills, or loading a skill from baxter-repo/knowledge-base/skills/.
triggers:
  - "migrate skill"
  - "convert skill to wikiskill"
  - "create new skill"
  - "skill restructure"
  - "wikiskill"
  - "WikiSkill"
  - "WikiSkills"
  - "wikiskills"
  - "wikiSkill"
  - "wikiSkills"
  - "Wikiskill"
  - "Wikiskills"
  - "load the wikiskill"
  - "load the WikiSkill"
---

# Skill Migration & Loading — Skill

## When to Use

**MIGRATE when:**
- An existing skill lives outside `knowledge-base/skills/` (e.g., `workspace/skills/old-name/`)
- An existing skill has no PURPOSE.md
- An existing skill's SKILL.md has no YAML frontmatter
- A new skill is being created and should follow WikiSkill format

**LOAD when:**
- User says "Load the WikiSkill [name]" or any WikiSkill trigger phrase
- User wants to use a skill from `baxter-repo/knowledge-base/skills/`

**SKIP when:**
- Skill already has SKILL.md + PURPOSE.md with proper frontmatter
- Skill already lives in `knowledge-base/skills/` and user didn't ask to load it

## Migration Steps

### Step 1: Read Source Skill

Read the existing skill file(s). Note:
- Name and description
- Trigger phrases
- Procedural content
- Any project-specific context

### Step 2: Create SKILL.md

```yaml
---
name: skill-name
description: One-sentence description of what this skill does and when to use it.
triggers:
  - "phrase that activates this skill"
  - "another trigger phrase"
---

# Skill Name

## Pre-Execution Checklist

1. Step one
2. Step two

## Main Content

Migrate the procedural instructions from the original skill.

## Available Tools

- tool-name: what it's for

## Session Workflow

1. Step one
2. Step two
3. Step three
```

### Step 3: Create PURPOSE.md

```yaml
---
name: skill-name
---

# Purpose: skill-name

## Motivation

Why this skill exists. What problem it solves.

## Wiki Patterns Addressed

- Pattern name — how this skill relates to it

## Evolution History

| Iteration | Date | Change | Decision |
|-----------|------|--------|----------|
| 0 | YYYY-MM-DD | Initial creation / migration | Migrated from legacy format |

## Related Skills

- `other-skill` — how it relates

## Known Limitations

- What's incomplete or could be improved
```

### Step 4: Update References

- If the old skill lives in `workspace/skills/`, leave it in place for now (don't delete yet)
- Update `knowledge-base/wiki/index.md` to reference the new skill location
- Log the migration in `knowledge-base/wiki/skill-impact.md`

## Post-Migration Checklist

- [ ] SKILL.md has YAML frontmatter with name, description, triggers
- [ ] PURPOSE.md has Motivation, Evolution History, Related Skills
- [ ] Both files committed to `knowledge-base/skills/{skill-name}/`
- [ ] Wiki index updated
- [ ] skill-impact.md logged
- [ ] Old skill location noted (don't delete until validated)

## Loading a WikiSkill

When the user says "Load the WikiSkill [name]" or triggers with any WikiSkill variant:

1. **Parse the skill name** from the user's request (e.g., "kochfoto-agents", "cardano-expert")
2. **Read the SKILL.md** from `baxter-repo/knowledge-base/skills/{name}/SKILL.md`
3. **Read the PURPOSE.md** from `baxter-repo/knowledge-base/skills/{name}/PURPOSE.md`
4. **Load the skill** — follow the pre-execution checklist and workflow from SKILL.md
5. **Note the source** — tell the user "Loaded WikiSkill {name} from knowledge base"

**If the skill doesn't exist:**
- Check `workspace/skills/` for a legacy version
- Offer to migrate it on the spot
- Or suggest available WikiSkills from `knowledge-base/skills/`

## New Skill Creation

Follow the same format. The only difference: no source skill to migrate from.

Key decisions when creating a new skill:
- **Scope:** What does this skill NOT cover? (Prevents bloat)
- **Triggers:** What phrases should activate it?
- **Entry point:** What's the first thing to do when this skill loads?
