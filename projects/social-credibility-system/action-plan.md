# Social Credibility System — Action Plan

**Purpose:** Incremental development roadmap. Work on any phase independently. Resume where you left off.

**Current Phase:** _See status below_

---

## Phase Overview

| Phase | Focus | Est. Time | Status |
|-------|-------|-----------|--------|
| 1 | Aiken Recovery Contract Core | 2-3 sessions | 🔲 Not Started |
| 2 | CIP-25 Metadata Schema Design | 1-2 sessions | 🔲 Not Started |
| 3 | Aiken Contract Test Suite | 2-3 sessions | 🔲 Not Started |
| 4 | Batch Minting Prototype | 2-3 sessions | 🔲 Not Started |
| 5 | Watchtower Challenge Client | 3-4 sessions | 🔲 Not Started |
| 6 | Economic Simulation & Parameter Tuning | 1-2 sessions | 🔲 Not Started |
| 7 | Integration & End-to-End Flow | 2-3 sessions | 🔲 Not Started |

---

## Phase 1: Aiken Recovery Contract Core

**Goal:** Functional recovery contract with claim, challenge, and complete redeemers.

**Entry Criteria:** None (starting point)

**Deliverables:**
- [ ] `recovery.ak` with datum/redeemer types
- [ ] `claim` path: Accept recovery claim, lock bond, start timer
- [ ] `challenge` path: Verify proof of later post, slash bond
- [ ] `complete` path: Release bond after timeout if unchallenged
- [ ] Basic validation logic for hash chain proofs

**Exit Criteria:**
- Contract compiles without errors
- Can trace through claim→complete and claim→challenge flows on paper

**Notes:**
_Record decisions, blockers, or insights here as you work._

---

## Phase 2: CIP-25 Metadata Schema Design

**Goal:** Formalized metadata schema for posts and replies.

**Entry Criteria:** Phase 1 started (understand recovery context)

**Deliverables:**
- [ ] JSON schema for standard posts
- [ ] JSON schema for threaded replies
- [ ] Schema for recovery claim metadata
- [ ] Documentation of all fields with rationale
- [ ] Example valid/invalid metadata objects

**Exit Criteria:**
- Schema is complete enough to generate mock posts
- Mesh/Lucid can construct compliant transactions

**Notes:**

---

## Phase 3: Aiken Contract Test Suite

**Goal:** Comprehensive test coverage for the recovery contract.

**Entry Criteria:** Phase 1 complete (contract structure stable)

**Deliverables:**
- [ ] Unit tests for datum validation
- [ ] Happy path: claim → complete
- [ ] Challenge path: claim → challenge (valid)
- [ ] Failed challenge: claim → challenge (invalid) → complete
- [ ] Edge cases: Double claim, late challenge, bond calculation
- [ ] Property-based tests for sequence/hash integrity

**Exit Criteria:**
- >80% test coverage
- All critical paths tested
- CI-ready test command

**Notes:**

---

## Phase 4: Batch Minting Prototype

**Goal:** Working prototype for minting multiple posts in one transaction.

**Entry Criteria:** Phase 2 complete (metadata schema stable)

**Deliverables:**
- [ ] Single-post mint script (reference implementation)
- [ ] Batch mint script (5-10 posts)
- [ ] Cost analysis: per-post cost at different batch sizes
- [ ] UX mock for session signing flow
- [ ] Draft specification for gasless submission (CIP-8 intent)

**Exit Criteria:**
- Can mint 5+ posts in one transaction on testnet
- Documented cost savings vs single mints

**Notes:**

---

## Phase 5: Watchtower Challenge Client

**Goal:** Off-chain service that monitors and challenges invalid recoveries.

**Entry Criteria:** Phase 1 complete (understand challenge requirements)

**Deliverables:**
- [ ] Blockfrost/indexer integration for recovery claims
- [ ] Local chain cache for user's post history
- [ ] Challenge detection logic (find later valid post)
- [ ] Challenge transaction builder
- [ ] Economic analysis: profitable watchtower operation
- [ ] Config for different bond/window parameters

**Exit Criteria:**
- Watchtower can detect and challenge a fraudulent recovery on testnet
- Documented incentive structure for operators

**Notes:**

---

## Phase 6: Economic Simulation & Parameter Tuning

**Goal:** Validate bond amounts, windows, and rewards through simulation.

**Entry Criteria:** Phase 1 complete (know the parameters)

**Deliverables:**
- [ ] Model: Recovery attempt frequency by malicious actors
- [ ] Model: Watchtower operator costs (infra + monitoring)
- [ ] Simulation: Break-even analysis for different bond amounts
- [ ] Simulation: Optimal challenge window given Cardano finality
- [ ] Recommended parameters table with sensitivity analysis

**Exit Criteria:**
- Parameters chosen with quantitative justification
- Documented trade-offs (security vs UX vs cost)

**Notes:**

---

## Phase 7: Integration & End-to-End Flow

**Goal:** Complete user journey from post to recovery to challenge.

**Entry Criteria:** Phases 1-5 complete

**Deliverables:**
- [ ] E2E test: Post → Lose head → Recover → Challenge → Resolve
- [ ] Integration tests: Contract + Minting + Watchtower
- [ ] Documentation: Operator guide for watchtowers
- [ ] Documentation: User guide for recovery
- [ ] Security review checklist

**Exit Criteria:**
- Full flow works on testnet
- Documentation complete for external operators/users

**Notes:**

---

## Current Session Log

**Last Worked:** _YYYY-MM-DD_

**Phase Worked On:** _N/A_

**What Was Done:**
_

**Blockers/Issues:**
_

**Next Session Plan:**
_

---

## Quick Reference

**Key Files:**
- `architecture.md` — Full system design
- `recovery.ak` — Recovery contract (WIP)
- `action-plan.md` — This file

**Key Decisions (Immutable):**
1. CIP-25 for posts (immutable), CIP-68 optional for head registry
2. Hash-chain linking via `prev_post_hash`
3. Optimistic recovery with 7-day challenge window
4. Recovery bond: 50-100 ADA (final TBD in Phase 6)

**Open Questions (To Resolve):**
1. Merkle tree construction at mint time — needed?
2. Who runs watchtowers? Incentives sufficient?
3. Content size limits — inline vs IPFS threshold?

**Skill to Invoke:**
> "Use the social-credibility-work skill" — Loads context and helps resume work.
