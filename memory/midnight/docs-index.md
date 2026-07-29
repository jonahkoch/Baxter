# Midnight Network Documentation Index

Complete documentation snapshot from https://docs.midnight.network/llms.txt

> Fetched: 2026-03-22

## Overview & Getting Started
- [What is Midnight?](https://docs.midnight.network/what-is-midnight)
- [Overview](https://docs.midnight.network/overview) — Build privacy-preserving applications with selective disclosure and zero-knowledge proofs
- [Getting Started](https://docs.midnight.network/getting-started)
- [Installation](https://docs.midnight.network/getting-started/installation) — Set up dev environment, wallets, deploy first ZK app
- [Quickstart - Create a Midnight DApp](https://docs.midnight.network/getting-started/quickstart) — Using create-mn-app CLI
- [Hello World Contract](https://docs.midnight.network/getting-started/hello-world) — First contract on Preprod

## Core Concepts

### Architecture
- [Account Model](https://docs.midnight.network/concepts/account) — For EVM developers
- [UTXO Model](https://docs.midnight.network/concepts/utxo) — Midnight's fundamental value model
- [Ledgers](https://docs.midnight.network/concepts/ledgers) — Key architectural difference from EVM
- [Midnight's Hybrid Architecture](https://docs.midnight.network/concepts/how-midnight-works/midnight-combined-model) — Combines both models

### Privacy & ZK
- [Zero-Knowledge Proofs](https://docs.midnight.network/concepts/zero-knowledge-proofs) — Prove knowledge without revealing secrets
- [Kachina](https://docs.midnight.network/concepts/kachina) — Data-protecting smart contract solution
- [Private Data Strategies](https://docs.midnight.network/concepts/how-midnight-works/keeping-data-private)
- [Explicit Disclosure](https://docs.midnight.network/compact/reference/explicit-disclosure) — Selective disclosure mechanism

### Token & DeFi
- [Zswap](https://docs.midnight.network/concepts/zswap) — Multi-asset atomic swaps for DeFi

### Network Architecture
- [Consensus](https://docs.midnight.network/concepts/network-architecture/consensus)
- [Cryptography](https://docs.midnight.network/concepts/network-architecture/cryptography)
- [P2P Networking](https://docs.midnight.network/concepts/network-architecture/p2p-networking)
- [RPC Interface](https://docs.midnight.network/concepts/network-architecture/rpc-networking)
- [Storage](https://docs.midnight.network/concepts/network-architecture/storage)
- [Transactions](https://docs.midnight.network/concepts/network-architecture/transactions)

## Compact Language

### Overview
- [The Compact Language](https://docs.midnight.network/compact) — Purpose-built for Midnight
- [Writing a Contract](https://docs.midnight.network/compact/writing)
- [Security Best Practices](https://docs.midnight.network/compact/security)
- [Testing and Debugging](https://docs.midnight.network/compact/testing)

### Data Types
- [Ledger Data Types](https://docs.midnight.network/compact/data-types/ledger-adt)
- [Opaque Data Types](https://docs.midnight.network/compact/data-types/opaque_data)

### Reference
- [Language Reference](https://docs.midnight.network/compact/reference/lang-ref)
- [Keywords and Reserved Words](https://docs.midnight.network/compact/reference/all-keywords)
- [Formal Grammar](https://docs.midnight.network/compact/reference/compact-grammar)
- [Standard Library](https://docs.midnight.network/compact/standard-library/README)
- [Detailed API Reference](https://docs.midnight.network/compact/standard-library/exports)

### Tooling
- [Compiler Usage](https://docs.midnight.network/compact/compilation-and-tooling/compiler-usage)
- [VS Code Extension](https://docs.midnight.network/compact/compilation-and-tooling/vscode-plugin)

## Development Guides

### Setup
- [Set up Bun for Midnight](https://docs.midnight.network/guides/install-bun-runtime-midnight)
- [Windows Compact Setup (WSL)](https://docs.midnight.network/guides/windows-compact-setup)
- [Midnight Local Network](https://docs.midnight.network/guides/midnight-local-network)

### Deployment & Interaction
- [Deploy Hello World Contract](https://docs.midnight.network/guides/deploy-mn-app)
- [Interact with Hello World](https://docs.midnight.network/guides/interact-with-mn-app)
- [Get Faucet Tokens](https://docs.midnight.network/guides/acquire-tokens)

### Wallet Integration
- [Create Next.js Wallet Connector](https://docs.midnight.network/guides/nextjs-wallet-connect)
- [Create React Wallet Connector](https://docs.midnight.network/guides/react-wallet-connect)

### Advanced
- [Proof Server](https://docs.midnight.network/guides/run-proof-server)
- [DApp Updatability](https://docs.midnight.network/guides/updatability)
- [Compact JavaScript Implementation](https://docs.midnight.network/guides/compact-javascript-runtime)

### Migration
- [Migrate from Testnet-02 to Preview](https://docs.midnight.network/guides/migrate-from-testnet-02-to-preview)

## Tutorials

### Beginner
- [Bulletin Board CLI](https://docs.midnight.network/tutorials/bboard/bboard-cli)
- [Bulletin Board Contract](https://docs.midnight.network/tutorials/bboard/smart-contract)
- [Bulletin Board API Implementation](https://docs.midnight.network/tutorials/bboard/bboard-api-implementation)
- [Bulletin Board CLI Implementation](https://docs.midnight.network/tutorials/bboard/bboard-cli-implementation)
- [Counter CLI](https://docs.midnight.network/tutorials/counter/counter-cli)
- [Counter Contract](https://docs.midnight.network/tutorials/counter/smart-contract)

### Advanced
- [Zero Knowledge Loan DApp](https://docs.midnight.network/tutorials/_advanced/zk-loan-dapp)

## Examples

### DApps
- [Bulletin Board DApp](https://docs.midnight.network/examples/dapps/bboard) — Privacy-preserving message posting
- [Counter DApp](https://docs.midnight.network/examples/dapps/counter)

### Contracts
- [Battleship Simple](https://docs.midnight.network/examples/contracts/battleship-simple)
- [Calculator](https://docs.midnight.network/examples/contracts/calculator)
- [Private Guest List](https://docs.midnight.network/examples/contracts/private-guest-list)
- [Private Reserve Auction](https://docs.midnight.network/examples/contracts/private-reserve-auction)
- [Token Transfers](https://docs.midnight.network/examples/contracts/token-transfers)

### Bulletin Board Series
- [Bulletin Board DApp Guide](https://docs.midnight.network/examples/_bboard/bboard-dapp)
- [Local Testing Environment](https://docs.midnight.network/examples/_bboard/local-testing)
- [Scenario Implementation](https://docs.midnight.network/examples/_bboard/scenario)

### Counter Series
- [Contract Details](https://docs.midnight.network/examples/_counter/contract-details)
- [Build Counter DApp](https://docs.midnight.network/examples/_counter/counter-build)
- [Run Counter DApp](https://docs.midnight.network/examples/_counter/counter-run)
- [Examples Repository](https://docs.midnight.network/examples/_counter/examples-repo)

## Running Nodes

### Node Types
- [Nodes Overview](https://docs.midnight.network/nodes)
- [Full and Archive Nodes](https://docs.midnight.network/nodes/full-node)
- [Boot Nodes](https://docs.midnight.network/nodes/boot-node)
- [RPC Nodes](https://docs.midnight.network/nodes/rpc-node)
- [Node Endpoints](https://docs.midnight.network/nodes/node-endpoints)
- [Cardano-db-sync Setup](https://docs.midnight.network/nodes/cardano-db-sync)

### Block Production / Validation
- [Become a Block Producer](https://docs.midnight.network/nodes/_run-a-validator)
- [Step 1: Cardano Stake Pool](https://docs.midnight.network/nodes/_run-a-validator/step-1)
- [Step 2: Configure Partner-Chain Dependencies](https://docs.midnight.network/nodes/_run-a-validator/step-2)
- [Step 3: Register SPO in Committee](https://docs.midnight.network/nodes/_run-a-validator/step-3)
- [Step 4: Run Midnight Validator Node](https://docs.midnight.network/nodes/_run-a-validator/step-4)
- [Testnet SPO Tutorial](https://docs.midnight.network/nodes/_tutorials)

## Release Notes
- [Release Overview](https://docs.midnight.network/relnotes/overview)
- [Compact Compiler](https://docs.midnight.network/relnotes/compact)
- [Compact Developer Tools](https://docs.midnight.network/relnotes/compact-tools)
- [Compact.js](https://docs.midnight.network/relnotes/compact-js)
- [Midnight.js](https://docs.midnight.network/relnotes/midnight-js)
- [DApp Connector API](https://docs.midnight.network/relnotes/dapp-connector-api)
- [Wallet SDK](https://docs.midnight.network/relnotes/wallet)
- [Ledger](https://docs.midnight.network/relnotes/ledger)
- [Node](https://docs.midnight.network/relnotes/node)
- [Midnight Indexer](https://docs.midnight.network/relnotes/midnight-indexer)
- [Compatibility Matrix](https://docs.midnight.network/relnotes/support-matrix)

## Security
- [Guarantees and Limitations](https://docs.midnight.network/concepts/security/guarantees-and-limitations)
- [Smart Contract Security](https://docs.midnight.network/concepts/security/smart-contract-security)

## Troubleshooting
- [FAQ](https://docs.midnight.network/troubleshoot/faq)
- [Getting Help](https://docs.midnight.network/troubleshoot/getting-help)
- [Fix Package Repository Access (403 errors)](https://docs.midnight.network/troubleshoot/fix-package-repository-access-failures)
- [Fix Version Mismatch](https://docs.midnight.network/troubleshoot/fix-version-mismatch-errors)
- [NixOS Installation Issues](https://docs.midnight.network/troubleshoot/install-midnight-compact-tools-on-nixos)

## Reference
- [Glossary](https://docs.midnight.network/glossary)
