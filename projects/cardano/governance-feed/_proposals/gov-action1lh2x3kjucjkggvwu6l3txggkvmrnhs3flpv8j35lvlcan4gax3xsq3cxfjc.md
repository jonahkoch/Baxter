---
layout: proposal
title: "Hard Fork to Protocol Version 11 ('van Rossem' Hard Fork)"
proposal_id: gov_action1lh2x3kjucjkggvwu6l3txggkvmrnhs3flpv8j35lvlcan4gax3xsq3cxfjc
proposal_type: HardForkInitiation
status: active
tags: ["hard-fork", "protocol-upgrade", "plutus"]
amount_ada: 0
proposed_epoch: 637
expiration: 644
meta_url: "ipfs://bafkreib3ds3bj7izvspcmodz543m5y66slpcmoifzmvpl6xvq6mozaak64"
meta_hash: "7f683eaf65629963cdc726e0cb7d3be295eb586fc5ba93985878f98e29cee897"
drep_yes_pct: 77.85
drep_no_pct: 22.15
drep_abstain_pct: ?
drep_yes_votes: 183
drep_no_votes: 1
drep_yes_power: 4,158,552,296
drep_no_power: 1,183,461,492
committee_yes: 7
committee_no: 0
---

We propose to upgrade Cardano Mainnet to Protocol Version 11. This upgrade will be achieved via an intra-era Hard Fork (called "van Rossem"). Following the upgrade:

1. The Cardano mainnet protocol will be upgraded to Major Version 11 and Minor Version 0;  
2. The ledger remains in the Conway era, there is no era transition;  
3. Several new Plutus primitives will be available, as defined in CIP-0109, CIP-0132, CIP-0133, CIP-0138 and CIP-0153;  
4. All Plutus built-in functions will be available consistently across Plutus V1, V2 and V3, expanding the capabilities of Plutus V1 and V2 scripts;  
5. “case”-expressions for built-in types (Bool, Integer and Data) will be supported in Untyped Plutus Core, providing significant performance improvements and cleaner script logic;

In line with the 
