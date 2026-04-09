---
title: Proving Nothing - A Layered Guide to ZK
created: 2026-04-09
last_updated: 2026-04-09
source_count: 1
status: draft
---

# Proving Nothing: A Layered Guide to Zero-Knowledge Proof Systems

**Author:** Charles Hoskinson  
**Published:** March 2026 (First Edition)  
**Format:** PDF, ~350 pages  
**Source:** [GitHub Release](https://github.com/CharlesHoskinson/sevenlayer/releases/download/v1.10/proving-nothing.pdf)  

## One-Paragraph Summary

The definitive technical guide to zero-knowledge proof systems from the founder of Midnight Network and Cardano. Hoskinson introduces a **seven-layer model** for understanding ZK systems as a stack rather than monolith: (1) Trusted Setup, (2) Circuit/VM, (3) Witness Generation, (4) Arithmetization, (5) Proof Sealing, (6) Commitment Schemes, and (7) Social Verification. The book balances deep technical detail with accessibility, using Midnight as a recurring case study while covering the entire ZK landscape including zkVMs, folding schemes, post-quantum approaches, and market applications. Core thesis: ZK enables "trust-minimized" (not trustless) systems where proving facts doesn't require surrendering privacy.

## The Seven Layers

| Layer | Name | Core Question | Key Concepts |
|-------|------|---------------|--------------|
| 1 | **The Stage** | How do we establish shared parameters? | [[trusted-setup]], [[structured-reference-string]], [[ceremonies]] |
| 2 | **Choreography** | How do we express computation? | [[circuit-design]], [[zkvm]], [[compact-language]], [[RISC-V]] |
| 3 | **The Performance** | How do we execute privately? | [[witness-generation]], [[side-channels]], [[memory-constraints]] |
| 4 | **Encoding** | How do we turn computation into math? | [[arithmetization]], [[R1CS]], [[AIR]], [[PLONKish]], [[CCS]] |
| 5 | **The Sealed Certificate** | How do we compress the proof? | [[SNARKs]], [[STARKs]], [[folding]], [[Nova]], [[HyperNova]] |
| 6 | **The Deep Craft** | What hard problems secure it? | [[commitment-schemes]], [[KZG]], [[FRI]], [[lattice-crypto]] |
| 7 | **The Verdict** | Who verifies, and how? | [[on-chain-verification]], [[governance]], [[Fiat-Shamir]] |

## Key Themes

### 1. The Seven-Layer Stack
The book's central contribution is framing ZK systems as **stacks, not monoliths**. Understanding requires knowing each layer's role AND the interactions between layers. The "proof core" (Layers 4-6) are inseparable and where most innovation happens.

### 2. Three Converging Forces
ZK emerged from theory because of:
- **Privacy crisis** — Data breaches, surveillance, regulatory mandates
- **Scaling problem** — Ethereum's 15 TPS vs Visa's 65,000
- **Cost collapse** — $80/proof to $0.04/proof in 24 months (2024-2026)

### 3. Three Frontiers (2026-2030)

| Frontier | Timeline | Key Challenge | Status |
|----------|----------|---------------|--------|
| **Performance** | 2025-2026 | GPU witness generation | Nearly solved |
| **Security** | 2026-2027 | Post-quantum, formal verification | Active research |
| **Privacy** | 2027+ | Constant-time proving, metadata protection | Earliest stage |

### 4. Midnight as Case Study
The book uses [[midnight-network]] as a recurring example across all seven layers, demonstrating:
- BLS12-381 curve selection (Layer 1)
- Compact language with disclosure analysis (Layer 2)
- ZKIR intermediate representation (Layer 4)
- Full seven-layer privacy-preserving smart contracts

## Critical Open Questions (2026)

1. **GPU Witness Generation** — Can we parallelize witness generation across GPUs? Current bottleneck in proving speed.

2. **Post-Quantum Proof Size** — Can lattice-based schemes achieve constant-size proofs? Current trade-off: fast proofs (SNARKs) vs quantum-safe (STARKs/lattices).

3. **Stage 2 Governance Binding** — Can we cryptographically bind governance upgrades without trusted ceremonies?

4. **Fiat-Shamir Formal Verification** — Can we formally verify that transcript implementations match security proofs?

5. **IDE Integration** — Can we bring ZK circuit debugging into standard developer tools?

6. **Constant-Time Proving** — Can we eliminate timing side-channels that leak information the proof conceals? *Critical for privacy frontier.*

7. **Recursive Aggregation** — Can we aggregate proofs from different systems efficiently?

## Key Terminology

See the book's extensive glossary in the source. Key terms include:
- [[AIR]] — Algebraic Intermediate Representation
- [[CCS]] — Customizable Constraint Systems (unifies R1CS, AIR, PLONKish)
- [[Folding]] — Technique combining two claims into one (Nova, HyperNova)
- [[FRI]] — Fast Reed-Solomon IOP (STARK commitment scheme)
- [[KZG]] — Kate-Zaverucha-Goldberg (polynomial commitments with trusted setup)
- [[zkVM]] — Zero-knowledge virtual machine (RISC-V convergence)

## Notable Technical Insights

> **The Overhead Tax:** All ZK proving carries 10,000x to 50,000x overhead vs native computation. This is the fundamental constraint shaping all design decisions.

> **The Proof Core:** Layers 4 (arithmetization), 5 (sealing), and 6 (commitment) are inseparable. You cannot choose them independently — they're coupled by mathematics.

> **Trust-Minimized, Not Trustless:** Every ZK system requires some trust (setup ceremonies, governance, implementations). The goal is decomposing and minimizing it, not eliminating it.

> **Under-Constrained Circuits:** The dominant failure mode in production ZK systems. When constraints don't fully specify the computation, attackers can forge proofs.

## Market Context (March 2026)

- **ZK Rollups:** Production (Polygon, StarkNet, zkSync)
- **ZK Coprocessors:** Growth (off-chain compute, on-chain verify)
- **ZKML:** Research (provable ML inference)
- **Proving-as-a-Service:** Production ($97M → $7.59B projected by 2033)
- **Enterprise Pilots:** Active (financial institutions experimenting)

## Connections to Other Topics

- [[midnight-network]] — Primary case study throughout
- [[cardano-ecosystem]] — Hoskinson's other major project, Midnight as Cardano sidechain
- [[privacy-enhancing-technologies]] — Chapter 9 covers PETs beyond ZK
- [[compact-language]] — Midnight's domain-specific language
- [[lattice-cryptography]] — Post-quantum frontier focus

## Source

[Source: proving-nothing-charles-hoskinson.pdf]

---

*Ingest status: Summary created, detailed chapter notes pending. Ask specific questions about any layer or topic for deeper extraction.*
