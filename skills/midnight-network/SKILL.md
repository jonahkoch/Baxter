---
name: midnight-network
description: Expert on Midnight Network - Cardano's data-protection partner chain for privacy-preserving blockchain applications with selective disclosure and zero-knowledge proofs. Use when the user asks about Midnight Network, Compact language, ZK proofs on Midnight, privacy-preserving DApps, data-protection smart contracts, selective disclosure, or any Midnight-specific development topics including DApp creation, node operation, wallet integration, or the Kachina protocol.
---

# Midnight Network Expert

Midnight is Cardano's data-protection partner chain, enabling privacy-preserving decentralized applications through selective disclosure and zero-knowledge proofs.

## Core Concepts

**What Makes Midnight Different:**
- **Privacy by default**: Data remains private unless explicitly disclosed
- **Selective disclosure**: Prove facts without revealing underlying data
- **Compliance-friendly**: Balances privacy with regulatory requirements
- **Partner chain to Cardano**: Operates alongside Cardano as a separate but connected network
- **UTXO-based**: Uses extended UTXO model similar to Cardano

**Key Technologies:**
- **Kachina**: Data-protecting smart contract protocol enabling confidential computation
- **Compact**: Midnight's dedicated smart contract programming language
- **Zswap**: Protocol for shielded token transfers and atomic swaps
- **Zero-knowledge proofs**: Cryptographic proofs that verify without revealing

## Documentation Reference

- **Official Website**: https://midnight.network/
- **Documentation**: https://docs.midnight.network/
- **Docs Index**: [references/docs-index.md](references/docs-index.md) — Full llms.txt index for quick lookups
- **MIDSKILLS**: Open knowledge marketplace for Midnight — Compact contracts, wallet integration, SDK guides, runnable dApp templates (`npx skills add Kali-Decoder/Midnight-skills`)

## Common Topics

### Development Setup
- Install toolchain: `create-mn-app` CLI for quick starts
- Requires Bun runtime and Compact compiler
- Windows development via WSL

### Smart Contract Development (Compact)
- Compact is a strongly statically typed, bounded smart contract language
- Contracts compile to run on the Impact VM
- Supports explicit disclosure for selective privacy

### DApp Development
- Wallet integration via DApp Connector API
- React/Next.js wallet connectors available
- Midnight.js client library for blockchain interaction
- Proof server for generating ZK proofs

### Node Operation
- Full nodes, archive nodes, RPC nodes, boot nodes
- Cardano-db-sync integration required
- Block producers must operate Cardano stake pools

### Network Info
- **Current networks**: Preview (testnet), Preprod
- Token faucet available for testnet tokens
- Local network setup available for development

### Token Ticker Conventions
When discussing NIGHT across chains, community conventions use:
- **cNIGHT** — NIGHT tokens natively on **C**ardano (as a Cardano Native Asset)
- **mNIGHT** — NIGHT tokens on **M**idnight L1

This distinguishes the same native asset across both chains without implying wrapping or bridging.

## Quick Links from Index

When answering questions, fetch the relevant documentation pages from:
- `https://docs.midnight.network/` + path from docs-index.md

Examples:
- Compact language guide: `/compact`
- Hello world contract: `/getting-started/hello-world`
- Wallet integration: `/guides/react-wallet-connect`
- Node setup: `/nodes/full-node`
