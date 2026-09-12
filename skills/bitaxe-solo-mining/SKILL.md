# BitAxe Solo Mining Skill

Guides you through setting up a fully self-hosted Bitcoin solo mining stack: Bitcoin Core full node + public-pool stratum server + BitAxe miner configuration.

## When to Use This Skill

- You have a BitAxe miner and want to solo mine on your own infrastructure
- You want full sovereignty over your mining (no third-party pool)
- You're comfortable with Linux command line
- You have (or will acquire) hardware meeting minimum specs

## Prerequisites

### Hardware
- 64-bit computer with 8GB+ RAM and 2TB+ SSD (Pi 5 16GB recommended)
- BitAxe miner (any model)
- Reliable internet connection (50+ Mbps)

### Knowledge
- Basic Linux command line
- How to use a text editor (nano or vi)
- Your home router admin access (for port forwarding if needed)

### Time
- Initial setup: 2-4 hours (excluding blockchain sync)
- Blockchain sync: 1-7 days (runs unattended)

## Quick Start

1. Read the spec: `projects/bitaxe-solo-mining/spec.md`
2. Run through phases below
3. Start with **testnet** — prove it works before mainnet

## Phases

### Phase 1: Prepare Hardware & OS

**Goal:** Working Ubuntu Server with Docker, ready for services.

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essentials
sudo apt install -y curl wget git htop tmux ufw

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 8333/tcp comment 'Bitcoin P2P'
sudo ufw allow 3333/tcp comment 'Stratum mining'
sudo ufw enable
```

**Checkpoint:** `docker run hello-world` works.

---

### Phase 2: Bitcoin Core — Testnet First

**Goal:** Synced testnet node to validate your setup.

```bash
# Create data directory
mkdir -p ~/bitcoin-testnet/data

# Run Bitcoin Core in Docker (testnet)
docker run -d \
  --name bitcoin-testnet \
  -v ~/bitcoin-testnet/data:/bitcoin/.bitcoin \
  -p 18332:18332 \
  -p 18333:18333 \
  -p 28332:28332 \
  bitcoin/bitcoin:latest \
  -testnet=1 \
  -server=1 \
  -rpcuser=testnet_user \
  -rpcpassword=$(openssl rand -hex 32) \
  -rpcallowip=0.0.0.0/0 \
  -rpcbind=0.0.0.0 \
  -zmqpubhashblock=tcp://0.0.0.0:28332 \
  -txindex=1 \
  -printtoconsole
```

**Monitor sync:**
```bash
# Watch progress
docker logs -f bitcoin-testnet --tail 100

# Check status (in another terminal)
docker exec bitcoin-testnet bitcoin-cli -testnet -rpcuser=testnet_user -rpcpassword=YOUR_PASSWORD getblockchaininfo | grep verificationprogress
```

**Checkpoint:** `verificationprogress` > 0.9999 (fully synced). Testnet syncs in hours.

**Save the RPC password** — you'll need it for pool config.

---

### Phase 3: public-pool — Testnet

**Goal:** Running pool connected to your testnet node.

```bash
# Clone repo
mkdir -p ~/mining && cd ~/mining
git clone https://github.com/benjamin-wilson/public-pool.git
cd public-pool

# Create .env
cat > .env << 'EOF'
BITCOIN_RPC_URL=http://bitcoin-testnet:18332
BITCOIN_RPC_USER=testnet_user
BITCOIN_RPC_PASSWORD=YOUR_PASSWORD_FROM_PHASE_2
BITCOIN_RPC_TIMEOUT=30000
BITCOIN_RPC_COOKIES=false

STRATUM_PORT=3333
STRATUM_DIFFICULTY=1000
STRATUM_CUSTOM_DIFF=false
STRATUM_EXTENDED_LOGGING=false
STRATUM_HASHRATE_NOTIFICATION_DURATION=60000

API_PORT=3334
API_SECURED=false

NODE_ENV=production
EOF

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
services:
  public-pool:
    build: .
    container_name: public-pool
    restart: unless-stopped
    ports:
      - "3333:3333"
      - "3334:3334"
    env_file:
      - .env
    networks:
      - mining-net
    depends_on:
      - bitcoin-testnet

  bitcoin-testnet:
    image: bitcoin/bitcoin:latest
    container_name: bitcoin-testnet
    restart: unless-stopped
    volumes:
      - ~/bitcoin-testnet/data:/bitcoin/.bitcoin
    ports:
      - "18332:18332"
      - "18333:18333"
      - "28332:28332"
    command:
      - -testnet=1
      - -server=1
      - -rpcuser=testnet_user
      - -rpcpassword=YOUR_PASSWORD_FROM_PHASE_2
      - -rpcallowip=0.0.0.0/0
      - -rpcbind=0.0.0.0
      - -zmqpubhashblock=tcp://0.0.0.0:28332
      - -txindex=1
      - -printtoconsole
    networks:
      - mining-net

networks:
  mining-net:
    driver: bridge
EOF

# Start it
docker compose up -d

# Check logs
docker logs -f public-pool --tail 50
```

**Checkpoint:** Pool logs show "Connected to Bitcoin RPC" and block template updates.

---

### Phase 4: Point BitAxe at Testnet Pool

**Goal:** BitAxe mining against your own testnet pool.

1. Find your node's IP: `ip addr show | grep inet`
2. Open BitAxe AxeOS (http://bitaxe-ip in browser)
3. Configure:
   - **Stratum URL:** `stratum+tcp://YOUR_NODE_IP:3333`
   - **Worker:** `ojonah`
   - **Password:** `x` (or leave default)
4. Save and reboot BitAxe

**Verify:**
```bash
# Check pool for connections
docker logs public-pool | grep -i "client\|share\|hashrate"

# Or check the UI
curl http://localhost:3334/api/clientCount
curl http://localhost:3334/api/clients
```

**Checkpoint:** Pool shows your BitAxe connected, hashrate reporting.

---

### Phase 5: Migrate to Mainnet

**Goal:** Same stack, but on mainnet (real Bitcoin).

```bash
# Stop testnet stack
cd ~/mining/public-pool
docker compose down

# Create mainnet Bitcoin data dir
mkdir -p ~/bitcoin-mainnet/data

# Update docker-compose.yml for mainnet
# Change all testnet ports to mainnet:
#   18332 → 8332, 18333 → 8333
# Remove -testnet=1 flag
# Update .env: BITCOIN_RPC_URL=http://bitcoin-mainnet:8332

# Start mainnet stack
docker compose up -d

# Monitor IBD (this takes DAYS)
docker logs -f bitcoin-mainnet --tail 100
docker exec bitcoin-mainnet bitcoin-cli -rpcuser=mainnet_user -rpcpassword=YOUR_PASSWORD getblockchaininfo | grep blocks
```

**IBD takes 1-7 days.** Let it run. Use `tmux` or `screen` for persistent sessions.

**Once synced:** Point BitAxe at mainnet pool (same IP, port 3333).

**Checkpoint:** Mainnet fully synced, BitAxe submitting shares.

---

### Phase 6: Monitoring & UI

**Install public-pool-ui (optional but recommended):**

```bash
cd ~/mining
git clone https://github.com/benjamin-wilson/public-pool-ui.git
cd public-pool-ui

# Build and serve (or use nginx)
# See repo README for Angular build instructions
# Simple approach: python3 -m http.server 8080 in dist/ folder
```

**Basic health checks (add to crontab):**

```bash
# Edit crontab
crontab -e

# Add every-5-min checks:
*/5 * * * * ~/mining/health-check.sh >> ~/mining/health.log 2>&1
```

Create `~/mining/health-check.sh`:
```bash
#!/bin/bash
set -e

# Check Bitcoin Core sync
SYNC=$(docker exec bitcoin-mainnet bitcoin-cli getblockchaininfo 2>/dev/null | jq -r '.verificationprogress // 0')
if (( $(echo "$SYNC < 0.999" | bc -l) )); then
  echo "$(date): WARNING - Bitcoin not fully synced ($SYNC)"
fi

# Check pool running
if ! docker ps | grep -q public-pool; then
  echo "$(date): CRITICAL - public-pool not running!"
fi

# Check disk space
DISK=$(df / | tail -1 | awk '{print $5}' | tr -d '%')
if [ "$DISK" -gt 85 ]; then
  echo "$(date): WARNING - Disk ${DISK}% full"
fi

echo "$(date): Health check OK"
```

---

## Troubleshooting Commands

```bash
# Bitcoin Core status
docker exec bitcoin-mainnet bitcoin-cli getblockchaininfo
docker exec bitcoin-mainnet bitcoin-cli getnetworkinfo
docker exec bitcoin-mainnet bitcoin-cli getmempoolinfo

# Pool status
docker logs public-pool --tail 100
curl http://localhost:3334/api/stats

# Network connectivity
netstat -tlnp | grep -E '8332|8333|3333'
telnet localhost 3333  # test stratum port

# System resources
htop
df -h
free -h

# Restart services
docker compose restart
```

---

## Common Issues

### "Connection refused" from BitAxe
- Firewall blocking port 3333: `sudo ufw allow 3333`
- Wrong IP: Use node's LAN IP, not localhost
- Docker not binding to host: Check `ports:` in compose file

### Pool shows no block templates
- Bitcoin Core not synced: Wait for IBD
- ZMQ not enabled: Check `-zmqpubhashblock` in config
- RPC auth wrong: Verify .env matches bitcoin.conf credentials

### IBD extremely slow
- Check disk type: `lsblk -d -o NAME,ROTA,TYPE,SIZE` (ROTA=1 means HDD — too slow)
- Check network: `speedtest-cli` or `curl -s https://ipinfo.io`
- Check CPU/RAM: `htop` during sync

### BitAxe shares all rejected
- Wrong difficulty: Check `STRATUM_DIFFICULTY` in .env
- Wrong wallet address: Must be valid Bitcoin address
- Pool not connected to Core: Check pool logs

---

## Production Hardening

After everything works:

1. **Move RPC off 0.0.0.0** — bind to Docker network only
2. **Use docker secrets** for RPC passwords
3. **Enable automatic updates:** `sudo apt install unattended-upgrades`
4. **Set up reverse proxy** (Caddy) for UI with HTTPS
5. **Back up wallet** (if using Core wallet): `docker exec bitcoin-mainnet bitcoin-cli backupwallet /backup/wallet.dat`
6. **Monitor with alerts** — email/Telegram on issues

---

## Reference

- **public-pool repo:** https://github.com/benjamin-wilson/public-pool
- **public-pool-ui repo:** https://github.com/benjamin-wilson/public-pool-ui
- **Bitcoin Core docs:** https://bitcoincore.org/en/doc/
- **BitAxe docs:** https://bitaxe.org/
- **Spec doc:** `projects/bitaxe-solo-mining/spec.md`
- **Cost analysis:** `projects/bitaxe-solo-mining/cost-analysis.md`

---

*Skill version: 1.0*
*Date: 2026-08-24*
