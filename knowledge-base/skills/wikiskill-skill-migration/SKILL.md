---
name: wikiskill-skill-migration
description: Migrate an existing skill from legacy format to WikiSkill format (SKILL.md + PURPOSE.md). Use when converting old skills to the new structure, or when creating a new skill that should follow WikiSkill conventions.
triggers:
  - "migrate skill"
  - "convert skill to wikiskill"
  - "create new skill"
  - "skill restructure"
---

# Skill Migration — Skill

## When to Use

**MIGRATE when:**
- An existing skill lives outside `knowledge-base/skills/` (e.g., `workspace/skills/old-name/`)
- An existing skill has no PURPOSE.md
- An existing skill's SKILL.md has no YAML frontmatter
- A new skill is being created and should follow WikiSkill format

**SKIP when:**
- Skill already has SKILL.md + PURPOSE.md with proper frontmatter
- Skill already lives in `knowledge-base/skills/`

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

## New Skill Creation

Follow the same format. The only difference: no source skill to migrate from.

Key decisions when creating a new skill:
- **Scope:** What does this skill NOT cover? (Prevents bloat)
- **Triggers:** What phrases should activate it?
- **Entry point:** What's the first thing to do when this skill loads?
