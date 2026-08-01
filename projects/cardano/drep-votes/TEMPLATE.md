# DRep Vote Rationale Template

**Locked-in format — Version 1.0**
**Date:** 2026-08-01

Use this template for every governance vote rationale. Consistency makes your reasoning traceable, auditable, and easier to produce.

---

## Header Block

```markdown
# DRep Vote Rationale: [Proposal Short Name]

**Governance Action:** [gov_action...]
**Proposal:** [One-line description]
**Vote:** [Yes / No / Abstain]
**DRep:** Jonah Koch
**Date:** [YYYY-MM-DD]
**Rubric:** Treasury Rule Book v17 (Unified Commercial, Infrastructure, Marketing and Public-Goods Edition)
```

---

## Summary

**Required:** Under 300 characters. One sentence. State vote + core reason.

Example:
> Voted No. Mission valid but structure doesn't earn ₳4.09M: single-key custody, advisory-only councils, non-binding replacement, mixed-proposal bundling.

---

## Rationale

**Required.** Write using the no-ai-slop-copywriter skill. Human voice, direct, specific. No AI patterns.

Structure:
1. **State your vote clearly**
2. **Acknowledge what's working** (if anything) — builds credibility
3. **Name the blocking issue(s)** — be specific, not vague
4. **Explain why the issue matters** — connect to your principles
5. **State what would change your vote** — constructive path forward
6. **Close with your core principle** — the rule that drives the decision

Length: 300–600 words for standard proposals. Longer only if complexity demands it.

---

## Rubric Assessment (v17)

**Required for all votes.** This is the evidence trail. Even if the vote is obvious, run the checks and record them.

### 1. Constitutional Preflight (Hard Gates)

| Check | Finding | Verdict |
|-------|---------|---------|
| Governance-action content | [Confirmed / Mutable / Missing] | Pass / Concern / Fail |
| Self-contained withdrawal | [All incorporated / Depends on off-chain / Incomplete] | Pass / Concern / Fail |
| Administrator & oversight | [Named, independent / Partial / Missing] | Pass / Concern / Fail |
| Custody & disbursement | [Script escrow / Single-key / Unclear] | Pass / Fail / Concern |
| Dispute & recovery | [Binding / Non-binding / Missing] | Pass / Concern / Fail |
| NCL & capacity | [Verified / Pending / Breach] | Pass / Pending / Fail |

**Note any hard-gate failures here.** A single failure in custody, NCL breach, or material opacity → No.

### 2. Request-Size Classification

| Test | Result | Band |
|------|--------|------|
| Nominal request | [₳ amount] | Small / Medium / Large / Very Large / Systemic |
| Required score for Yes | — | [Threshold] |
| Your score (if scored) | — | [Score / 100] |

**Move up one band for:** concentrated custody, full upfront withdrawal, unproven administrator, weak recovery rights, category dominance.

### 3. Mixed-Proposal Analysis (if applicable)

| WP | Purpose | Economic Substance | Scorecard |
|----|---------|-------------------|-----------|
| WP1 | [Description] | [Public good / Commercial / Infrastructure] | [Scorecard] |

**Rule:** Each workstream must pass its own hard gates. Do not average failed into passing.

### 4. Five Forms of Public Return

| Form | Present? | Durability |
|------|----------|-----------|
| Public asset | [Yes / No / Partial] | [Durable / Conditional / Fragile] |
| Public service | [Yes / No / Partial] | [Durable / Conditional / Fragile] |
| Institutional capacity | [Yes / No / Partial] | [Durable / Conditional / Fragile] |
| Public learning | [Yes / No / Partial] | [Durable / Conditional / Fragile] |
| Avoided loss | [Yes / No / Partial] | [Durable / Conditional / Fragile] |

### 5. 32-Hard-Rules Test (Key Rules Applied)

| Rule | Application | Verdict |
|------|-------------|---------|
| Rule [number]: [name] | [How it applies to this proposal] | ✅ / ⚠️ / ❌ |

Focus on the rules most relevant to the proposal type. Minimum 3–5 rules.

### 6. Score Override Discipline

| Situation | Application | Result |
|-----------|-------------|--------|
| [e.g., Passing score but failed hard gate] | [Specific application] | Yes / No / Abstain |

---

## Aligned DRep References

**Required if you consulted other DReps.** List who you checked and their position.

- **[DRep name]** — [Yes / No / Abstain] ([Brief reason if notable])

---

## What Would Change My Vote

**Required.** Be specific. This is your constructive feedback to the proposer.

1. [Specific change]
2. [Specific change]
3. [Specific change]

---

## Optional Sections

Add these only when relevant:

### Prior Funding Disclosure
If the applicant has prior Treasury/Catalyst funding:
- What was funded
- What was delivered
- What was not delivered (and why)
- Whether this proposal addresses prior gaps

### Decentralization Delta
| Delta | Assessment |
|-------|-----------|
| Positive / Neutral / Negative | [Explanation] |

### Post-Funded Tracking Commitment
For Yes votes, note what you'll track:
- Milestones promised vs. delivered
- Budget discipline
- Retained impact at 90/180/365 days
- Whether you'd vote to renew

---

## Checklist Before Publishing

- [ ] Summary under 300 characters
- [ ] Rationale uses human voice (read aloud test)
- [ ] No AI-slop patterns (binary contrasts, throat-clearing, faux-insight, colon reveals, importance puffery, summary-recap endings)
- [ ] Constitutional preflight run
- [ ] Request-size classified
- [ ] Hard-gate failures named explicitly
- [ ] Aligned DReps consulted (if applicable)
- [ ] Conditions for changing vote stated
- [ ] File named: `gov_action[full_id].md`
- [ ] Committed and pushed to GitHub

---

## File Naming Convention

```
gov_action[full_governance_action_id].md
```

Example:
```
gov_action19apfhh339syqd0gkrxw6zr6pghdfspckr6vagjrpwnr0hx53lxpsq637y3t.md
```

---

## Example Files

- `gov_action19apfhh339syqd0gkrxw6zr6pghdfspckr6vagjrpwnr0hx53lxpsq637y3t.md` — dOSPO/OMF (No)
- `gov_action1k02990lhw6wh74t7c6ufw3mqaek9ujtvyan99dj5qv5kvcs7pn8sqcw2nc5.md` — Wirex (No)
