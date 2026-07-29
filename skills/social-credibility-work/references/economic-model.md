# Economic Model Reference

## Actors

| Actor | Incentives | Risks |
|-------|-----------|-------|
| User | Post without losing history | Bond loss on fraudulent recovery |
| Watchtower | Challenge rewards | Infrastructure costs, false challenges |
| Platform | User retention, fees | Support burden |

## Parameters

### Recovery Bond
- **Purpose:** Deter fraudulent recovery attempts
- **Range:** 50-100 ADA
- **Trade-off:** Higher = more security, worse UX

### Challenge Window
- **Purpose:** Time for watchtowers to verify and challenge
- **Range:** 3-14 days
- **Trade-off:** Longer = more security, worse UX

### Challenge Bond
- **Purpose:** Deter spam challenges
- **Range:** 5-20 ADA
- **Trade-off:** Higher = less spam, fewer challengers

### Reward Split
- **Challenger:** 80%
- **Burn:** 20%
- **Rationale:** Burn prevents challenger-owner collusion

## Attack Scenarios

### Attack 1: Recovery Fraud
**Attacker:** Claims lost head, wants to fork history
**Cost:** Recovery bond (50-100 ADA)
**Defense:** Watchtower challenges with proof of later post
**Expected outcome:** Attacker loses bond

### Attack 2: Challenge Spam
**Attacker:** Challenges valid recoveries to grief
**Cost:** Challenge bond per attempt
**Defense:** Slashing on failed challenges
**Expected outcome:** Attacker loses money

### Attack 3: Watchtower Collusion
**Attacker:** Owns watchtower, ignores own fraudulent claims
**Risk:** Other honest watchtowers can still challenge
**Defense:** Multiple independent watchtowers

### Attack 4: Platform Censorship
**Attacker:** Platform refuses to submit valid posts
**Mitigation:** User can submit directly (worse UX, higher cost)

## Equilibrium Analysis

### Honest User
- Pays: Minting fees (~0.05 ADA/post)
- Risk: Bond loss if fraudulent recovery attempted (self-inflicted)
- Utility: Immutable, verifiable post history

### Honest Watchtower
- Revenue: 80% of challenged bonds
- Cost: Infrastructure + transaction fees
- Break-even: ~1 successful challenge per 2-6 months

### Rational Attacker
- Attack cost: Recovery bond
- Attack success probability: (1 - W)^N
  - W = probability any watchtower challenges
  - N = number of independent watchtowers
- Attack EV: Negative if W > 0 and N >= 1

## Sensitivity Analysis

### Recovery Bond vs Security

| Bond | Attack Cost | Honest User Pain |
|------|-------------|------------------|
| 10 ADA | Low | Low |
| 50 ADA | Medium | Medium |
| 100 ADA | High | High |
| 500 ADA | Very High | Very High |

**Recommendation:** 50-100 ADA for general use

### Challenge Window vs Security

| Window | Time to Challenge | User Wait Time |
|--------|-------------------|----------------|
| 1 day | Short | Short |
| 3 days | Medium | Medium |
| 7 days | Long | Long |
| 14 days | Very Long | Very Long |

**Recommendation:** 7 days (balance of security and UX)

## Dynamic Parameters

Consider making parameters user-selectable:

```javascript
interface RecoveryOptions {
  bondAmount: 50 | 100 | 500;  // Higher = more credibility
  challengeWindow: 3 | 7 | 14;  // Days
}
```

Higher bond = stronger signal of account legitimacy

## Simulation Model

### Inputs
- Number of active users
- Posts per user per month
- Recovery attempt rate
- Watchtower participation rate

### Outputs
- Expected challenges per month
- Watchtower profitability
- System security margin

### Sample Run

```
Inputs:
  Users: 10,000
  Posts/user/month: 10
  Recovery rate: 0.1% of users/month
  Watchtowers: 5 independent

Outputs:
  Recoveries/month: 10
  Expected challenges: 0.01 (if 99.9% honest)
  Watchtower revenue: 0.4 ADA/month average
  Break-even watchtowers: 1-2
```

This suggests watchtower incentives may need subsidization initially.

## Subsidy Phase

Consider protocol-level rewards during bootstrap:
- Fixed reward for first N watchtowers
- Gradual reduction as organic activity grows
- Funded by protocol treasury or token inflation
