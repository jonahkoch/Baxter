# BitAxe Solo Mining — Self-Hosted Node & Pool Specification

## 1. Executive Summary

**Goal:** Run a fully self-hosted Bitcoin solo mining stack — own node, own pool, full sovereignty.

**Stack Choice:** Public-Pool Stack (Bitcoin Core + public-pool + public-pool-ui)
- Simpler than CKPool stack
- BitAxe community standard
- Good documentation
- Docker support

**Approach:** Testnet first → validate → migrate to mainnet

---

## 2. Hardware Requirements

### Minimum Viable
| Component | Spec | Est. Cost |
|-----------|------|-----------|
| CPU | 64-bit (Intel/ARM) | — |
| RAM | 8 GB | — |
| Storage | 2 TB SSD (SATA acceptable) | ~$120 |
| Network | 50+ Mbps down, low latency | — |
| OS | Ubuntu Server 22.04/24.04 LTS | Free |

### Recommended
| Component | Spec | Est. Cost |
|-----------|------|-----------|
| Board | Raspberry Pi 5 (16 GB) or Odroid M2 | ~$120-180 |
| RAM | 16 GB | — |
| Storage | 2 TB NVMe SSD (critical for sync speed) | ~$150 |
| Cooling | Heatsink + fan (Pi 5 runs warm under load) | ~$20 |
| Case | Passive/active cooled case | ~$30 |
| PSU | Quality 5V 5A USB-C supply | ~$15 |
| UPS | Small UPS for graceful shutdown | ~$60 |
| **Total** | | **~$400-450** |

### Already-Have Alternative
If you have an old mini-PC, NUC, or server with 8GB+ RAM and 2TB storage, use that. No need to buy new hardware.

---

## 3. Software Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      BITCOIN NETWORK                        │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  Bitcoin Core v28+                                         │
│  - Full node (IBD = Initial Block Download)                │
│  - RPC server (port 8332 mainnet / 18332 testnet)          │
│  - ZMQ notifications (port 28332)                          │
│  - ~700 GB blockchain (pruned not recommended for mining)  │
└────────────────────────────┬────────────────────────────────┘
                             │ RPC + ZMQ
┌────────────────────────────▼────────────────────────────────┐
│  public-pool (NestJS/TypeScript)                           │
│  - Stratum server (port 3333)                              │
│  - Job manager (constructs block templates)                │
│  - Share validation                                        │
│  - Docker or native Node.js                                │
└────────────────────────────┬────────────────────────────────┘
                             │ Stratum protocol
┌────────────────────────────▼────────────────────────────────┐
│  BitAxe Miner                                              │
│  - Connects via Wi-Fi to your pool IP:3333                 │
│  - Submits shares, receives jobs                           │
└─────────────────────────────────────────────────────────────┘
```

### Port Map
| Port | Service | Direction |
|------|---------|-----------|
| 8333 | Bitcoin Core P2P | Inbound/Outbound |
| 8332 | Bitcoin Core RPC | Localhost only (or VPN) |
| 28332 | Bitcoin Core ZMQ | Localhost only |
| 3333 | public-pool Stratum | Inbound (miner connects here) |
| 3334 | public-pool UI | Localhost (or reverse proxy) |
| 18332/18333 | Testnet RPC/P2P | (testnet only) |

---

## 4. Implementation Plan

### Phase 0: Prep & Decisions
- [ ] Choose hardware (Pi 5 / existing machine / mini-PC)
- [ ] Order parts if needed
- [ ] Determine network placement (DMZ? Port forwarding?)
- [ ] Decide: testnet-first or mainnet-direct?

### Phase 1: OS & Environment
- [ ] Install Ubuntu Server (headless)
- [ ] Configure static IP or DHCP reservation
- [ ] Enable SSH, disable password auth (key only)
- [ ] Install Docker + Docker Compose
- [ ] Configure firewall (ufw: allow 8333, 3333)

### Phase 2: Bitcoin Core
- [ ] Install Bitcoin Core (binary or compile)
- [ ] Configure bitcoin.conf:
  ```
  server=1
  rpcuser=your_rpc_user
  rpcpassword=your_strong_password
  rpcallowip=127.0.0.1
  rpcallowip=172.16.0.0/12    # for Docker
  rpcbind=0.0.0.0
  zmqpubhashblock=tcp://0.0.0.0:28332
  txindex=1
  ```
- [ ] Start node, begin Initial Block Download (IBD)
- [ ] Monitor sync progress (`bitcoin-cli getblockchaininfo`)
- [ ] **IBD takes 1-7 days depending on hardware/connection**

### Phase 3: Testnet Validation (CRITICAL — DO NOT SKIP)
- [ ] Install testnet Bitcoin Core
- [ ] Sync testnet (hours, not days)
- [ ] Install public-pool pointing at testnet
- [ ] Configure BitAxe to mine testnet
- [ ] Verify: miner connects, shares accepted, jobs flowing
- [ ] Mine until you see activity (won't find block, but proves stack)
- [ ] Document any issues

### Phase 4: public-pool (Mainnet)
- [ ] Clone public-pool repo
- [ ] Configure .env:
  ```
  BITCOIN_RPC_URL=http://bitcoin-core:8332
  BITCOIN_RPC_USER=your_rpc_user
  BITCOIN_RPC_PASSWORD=your_strong_password
  STRATUM_PORT=3333
  API_PORT=3334
  ```
- [ ] Start with Docker Compose
- [ ] Verify pool connects to Bitcoin Core
- [ ] Check logs for block template updates

### Phase 5: BitAxe Configuration
- [ ] Access BitAxe AxeOS (local IP via browser)
- [ ] Set Stratum URL: `stratum+tcp://YOUR_NODE_IP:3333`
- [ ] Set worker name: `ojonah`
- [ ] Set wallet address: `bc1qhpg94ysfk9jgf7kywpapmk694a7sl38rrmyuvd`
- [ ] Save, reboot BitAxe
- [ ] Verify connection in pool logs / UI

### Phase 6: Monitoring & UI
- [ ] Install public-pool-ui (or access via port 3334)
- [ ] Set up basic monitoring:
  - Bitcoin Core sync status
  - Pool connection count
  - Miner hashrate
  - System resources (CPU, RAM, disk)
- [ ] Optional: mempool.space local instance
- [ ] Optional: Electrum Server for wallet

### Phase 7: Hardening
- [ ] Reverse proxy (nginx/caddy) for UI with HTTPS
- [ ] Fail2ban for SSH and Stratum ports
- [ ] Automated backups (bitcoin wallet, config files)
- [ ] UPS integration for graceful shutdown
- [ ] Consider VPN for remote management instead of exposing ports

---

## 5. Network Architecture

### Home Network Placement
```
Internet → Router → [DMZ / Port Forward]
                           │
                    ┌──────▼──────┐
                    │  Ubuntu Box │  ← Bitcoin Node + Pool
                    │  (Static IP)│
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   BitAxe    │  ← Wi-Fi
                    └─────────────┘
```

### Port Forwarding Required
- **8333/TCP** → Bitcoin Core (helps network, not strictly required)
- **3333/TCP** → public-pool Stratum (REQUIRED for external miners)

If BitAxe is on same LAN, no port forwarding needed for Stratum — just use local IP.

---

## 6. Testnet Strategy

**Why testnet first:**
- Prove the entire stack works before committing mainnet
- Testnet blocks are easier to find (lower difficulty)
- Zero financial risk
- Can practice pool config, wallet setup, troubleshooting

**Testnet coins:** Get from faucet, mine them, or ask in community

**Migration path:**
1. Run parallel: testnet stack + mainnet stack
2. Validate testnet for 1-2 weeks
3. Point BitAxe at mainnet pool
4. Keep testnet running for future testing

---

## 7. Security Checklist

- [ ] Bitcoin Core RPC **never** exposed to internet
- [ ] Strong RPC password (32+ chars random)
- [ ] RPC bound to localhost or Docker network only
- [ ] SSH key auth only, disable root login
- [ ] Firewall: deny all, allow only necessary ports
- [ ] Automatic security updates enabled
- [ ] Wallet backup (if using Core wallet — recommended: use external signing)
- [ ] Consider hardware wallet for block reward custody

---

## 8. Monitoring & Alerting

### Key Metrics
| Metric | Tool | Alert If |
|--------|------|----------|
| Bitcoin sync progress | `bitcoin-cli` | Behind >6 blocks |
| Disk usage | `df -h` | >85% full |
| Pool connections | public-pool logs | Miner disconnected |
| BitAxe hashrate | AxeOS / pool UI | Drops below threshold |
| System load | `htop` / `uptime` | Sustained >80% |
| Network connectivity | `ping` | Unreachable |

### Recommended Tools
- **tmux/screen** — persistent sessions
- **logrotate** — manage log growth
- **netdata** or **prometheus+grafana** — if you want fancy dashboards
- **simple cron scripts** — if you want lightweight

---

## 9. Troubleshooting Guide

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Bitcoin Core won't start | Config error, port conflict | Check `debug.log` |
| IBD is extremely slow | Slow disk (HDD), slow network | NVMe SSD required |
| Pool can't connect to Core | RPC auth wrong, network issue | Verify .env matches bitcoin.conf |
| BitAxe won't connect | Wrong IP/port, firewall | Check `telnet NODE_IP 3333` |
| BitAxe connects but no jobs | Pool not getting block templates | Check Core is synced, ZMQ enabled |
| Shares rejected | BitAxe config wrong | Verify wallet address, worker name |
| High CPU usage | IBD still running, or insufficient RAM | Monitor with `htop`, consider more RAM |

---

## 10. Open Questions

1. **Which BitAxe model do you have?** (affects hashrate / power / expectations)
2. **Existing hardware available?** (old PC, NAS, etc.)
3. **Electricity cost per kWh?** (affects cost analysis)
4. **Network setup:** Can you reserve static IP / port forward?
5. **Goal emphasis:** Learning project vs. serious mining operation?
6. **Budget:** Buy new Pi 5 kit ~$400, or repurpose existing?

---

## 11. Deliverables Checklist

- [x] Research summary (`research-summary.md`)
- [x] Technical specification (`spec.md`)
- [ ] Cost/EV analysis (`cost-analysis.md`)
- [ ] OpenClaw skill (`skills/bitaxe-solo-mining/`)
- [ ] Hardware ordered
- [ ] Testnet stack running
- [ ] Mainnet stack running
- [ ] BitAxe mining on self-hosted pool

---

*Spec version: 1.0*
*Date: 2026-08-24*
*Stack: Public-Pool + Bitcoin Core*
*Target: Ubuntu Server on ARM64 (Pi 5) or x64*
