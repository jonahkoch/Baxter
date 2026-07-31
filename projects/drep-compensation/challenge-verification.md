# Challenge Verification Mechanism

## Overview

This document defines how challenges are submitted, verified, and resolved in the DRep compensation scheme. The design prioritizes **objective, on-chain verifiable gates** for v1, with a clear path to more sophisticated verification.

> **Design principle:** Start with cryptographic/objective gates that require no human judgment. Expand to heuristic and subjective gates only after the base layer proves stable.

---

## Challenge Lifecycle

```
1. CHALLENGE SUBMITTED
   Probationary DRep identifies a compensated DRep's rationale
   and submits a challenge claim with evidence.

2. VERIFICATION PERIOD
   Challenge enters a verification window (e.g., 3 epochs).
   Objective gates are checked automatically.
   If objective gates are inconclusive, escalation path is triggered.

3. RESOLUTION
   ├─ Objective violation confirmed → Challenge succeeds
   ├─ No violation found → Challenge fails
   └─ Inconclusive / disputed → Escalation (v2: panel or oracle)

4. PAYOUT
   Challenge succeeds: 35% of locked $64 → Challenger's Challenge Account
   Challenge fails: No payout. DRep's locked $64 releases after window.
```

---

## v1: Objective Gates (Fully Automated)

These gates require no human judgment. A smart contract or oracle can verify them deterministically.

### Gate 1: Hash-IPFS Mismatch ⭐ START HERE

**What it checks:** The rationale hash recorded in the vote transaction metadata does not match the actual content hash of the IPFS file.

**How it works:**
```
On-chain metadata claims: rationale_hash = "QmABC123..."
Challenger fetches content from IPFS at claimed CID
Challenger computes hash of fetched content: computed_hash = blake2b-256(content)
If computed_hash != rationale_hash: VIOLATION
```

**Why it matters:** The DRep claimed their rationale lives at a specific IPFS address with a specific hash. If the content doesn't match, they either:
- Linked to wrong content (sloppy)
- Deliberately misrepresented their rationale (fraud)
- Content was altered after submission (integrity failure)

**Verification:** Fully automatable. Oracle fetches IPFS content, hashes it, compares.

**Severity:** High. This is a cryptographic lie.

---

### Gate 2: IPFS URL 404 / Unresolvable

**What it checks:** The rationale URL referenced in the vote transaction cannot be fetched.

**How it works:**
```
On-chain metadata contains: rationale_url = "https://example.com/rationale-42"
Challenger attempts HTTP GET
If response is 404, 410, timeout, or DNS failure: VIOLATION
```

**Edge cases to define:**
- Temporary outage vs. permanent unavailability?
- How many retry attempts? Over what timeframe?
- If IPFS: content unavailable because no nodes pin it?

**Verification:** Automatable with retries. Could use decentralized oracle network.

**Severity:** Medium. Could be negligence rather than malice. But the DRep is responsible for hosting their rationale.

---

### Gate 3: Rationale URL Missing from Vote Transaction

**What it checks:** The vote transaction metadata contains no rationale URL or hash reference at all.

**How it works:**
```
Inspect vote transaction metadata for CIP-100/108 fields
If no rationale_url, rationale_hash, or anchor reference present: VIOLATION
```

**Note:** This is distinct from "DRep didn't write a rationale." This gate catches DReps who claim they provided a rationale but there's no on-chain evidence of it.

**Verification:** On-chain metadata inspection. Fully automatable.

**Severity:** High. If there's no anchor, the rationale is unverifiable.

---

### Gate 4: Wrong Proposal ID Referenced

**What it checks:** The rationale references a different governance action ID than the one being voted on.

**How it works:**
```
Vote is on proposal: gov_action_123
Rationale text references: "Regarding proposal gov_action_456..."
If referenced proposal_id != voted proposal_id: VIOLATION
```

**Verification:** Requires parsing rationale text. Can be automated with simple regex/string matching.

**Severity:** Medium-High. Suggests copy-paste or confusion.

---

## v2: Heuristic Gates (Automated Scoring)

These require computation but still no subjective judgment.

### Gate 5: Minimum Length

**What it checks:** Rationale body is below a minimum character count.

**Threshold:** e.g., < 500 characters

**Rationale:** A thoughtful rationale requires more than a sentence. This is a low bar that catches obviously lazy submissions.

**Caveat:** Some proposals may legitimately deserve short rationales. This should be a "soft flag" rather than automatic violation unless egregious (e.g., < 50 characters).

---

### Gate 6: Copy-Paste Detection

**What it checks:** Rationale is substantially similar to another DRep's rationale for the same proposal.

**Method:** Compute similarity score (e.g., Jaccard, cosine) between this rationale and all other rationales for the same proposal.

**Threshold:** e.g., > 85% similarity

**Caveat:** DReps may independently reach similar conclusions. This should flag for review, not auto-convict.

---

### Gate 7: Template / LLM Spam Detection

**What it checks:** Rationale follows a recognizable template pattern or exhibits LLM-generated text markers.

**Method:** Pattern matching for common templates, or statistical text analysis.

**Caveat:** Hard to distinguish "used a template for structure" from "copy-pasted without thought."

---

## v3: Subjective Gates (Human / Panel Adjudicated)

Save for later. These require judgment and are harder to automate.

### Gate 8: Vote-Rationale Contradiction

**What it checks:** Rationale argues FOR the proposal but vote is NO (or vice versa).

**Example:**
```
Rationale: "This treasury withdrawal is well-justified and will benefit the ecosystem."
Vote: NO
```

**Challenge:** Requires natural language understanding. Could be LLM-assisted but needs human review for edge cases.

---

### Gate 9: Factual Inaccuracy

**What it checks:** Rationale contains verifiably false claims about the proposal content.

**Example:**
```
Proposal requests 10M ADA for infrastructure.
Rationale claims: "This proposal asks for 100M ADA, which is excessive."
```

**Challenge:** Requires domain knowledge and fact-checking. Hard to automate fully.

---

### Gate 10: Gibberish / Nonsensical

**What it checks:** Rationale is incoherent, nonsensical, or obviously generated without reading the proposal.

**Challenge:** Subjective by nature. Requires human judgment.

---

## Challenge Submission Format

```json
{
  "challenger_drep_id": "drep1y...",
  "challenged_drep_id": "drep1y...",
  "proposal_id": "gov_action_xxx",
  "vote_tx_hash": "abc123...",
  "gate_claimed": "hash_ipfs_mismatch",
  "evidence": {
    "claimed_hash": "QmABC123...",
    "fetched_content_hash": "QmXYZ789...",
    "ipfs_cid": "QmABC123...",
    "fetch_timestamp": "2026-07-31T00:00:00Z"
  },
  "submitted_at_epoch": 646
}
```

## Verification Period

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Challenge window | 3 epochs (~15 days) | Enough time for verification without indefinite locking |
| Verification deadline | End of epoch 649 | Hard cutoff for resolution |
| Automatic resolution | If no dispute raised by challenged DRep | Default to challenger's evidence |
| Dispute escalation | Challenged DRep can dispute within 1 epoch | Triggers v2/v3 review if needed |

## Resolution Outcomes

### Challenge Succeeds (Objective Gate)

```
Locked $64 rationale payment:
  ├─ 35% ($22.40) → Challenger's Challenge Account
  ├─ 65% ($41.60) → Treasury recapture
  └─ 0% → Challenged DRep

Challenged DRep:
  └─ Challenge count +1 (rolling 12-month)
```

### Challenge Fails

```
Locked $64 rationale payment:
  └─ 100% ($64) → Released to DRep after challenge window

Challenger:
  └─ No reward. Failed challenge count +1.
```

### Inconclusive / Disputed (v2)

```
Locked $64 rationale payment:
  └─ Remains locked pending panel/oracle resolution

If panel rules for challenger: Same as "succeeds"
If panel rules for DRep: Same as "fails" + challenger warning
```

## Anti-Gaming Measures

### Challenger Side

| Risk | Mitigation |
|------|-----------|
| Frivolous challenges | No reward for failed challenges. Time cost discourages spam. |
| Challenge botnets | Probationary DReps only can challenge. Sybils must serve 2-year probation first. |
| Coordinated harassment | Rolling window limits per-challenger frequency. |

### DRep Side

| Risk | Mitigation |
|------|-----------|
| DRep hides rationales | Gate 3 catches missing rationale references. |
| DRep rotates IPFS CIDs | Hash-IPFS gate catches mismatches regardless of CID changes. |
| DRep posts placeholder then updates | Challenge window locks payment; updates after window don't retroactively help. |

## v1 Implementation Checklist

- [ ] Gate 1: Hash-IPFS mismatch verification
- [ ] Gate 2: URL resolution check
- [ ] Gate 3: Missing rationale reference check
- [ ] Gate 4: Wrong proposal ID check
- [ ] Challenge submission format
- [ ] 3-epoch verification window
- [ ] Automatic resolution logic
- [ ] Dispute escalation path (placeholder)
- [ ] Challenger reward payout
- [ ] Treasury recapture payout
- [ ] DRep challenge count tracking

## Open Questions

1. **Who runs the IPFS fetch?** Oracle network? Decentralized workers? Challengers submit proof + random verification samples?

2. **What if IPFS content is available but slow?** How many retries? What timeout?

3. **Can a DRep "fix" their rationale after being challenged?** If they update the IPFS content to match the hash, does that resolve the challenge? (Suggested: No. Challenge is about the state at vote time.)

4. **What if the hash matches but the rationale is empty/minimal?** Gate 1 passes but Gate 5 (length) might catch it. For v1, rely on community challenges for obviously empty rationales.

5. **Can the same rationale be challenged multiple times?** Suggested: No. One challenge per (DRep, proposal) pair. Challenge outcome is final.
