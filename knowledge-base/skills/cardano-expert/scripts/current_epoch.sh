#!/bin/bash
# Get current epoch and network info
# Usage: ./current_epoch.sh [network]

NETWORK="${1:-mainnet}"

# Determine API base URL
case "$NETWORK" in
    mainnet) KOIOS_URL="https://api.koios.rest/api/v1" ;;
    preprod) KOIOS_URL="https://preprod.koios.rest/api/v1" ;;
    preview) KOIOS_URL="https://preview.koios.rest/api/v1" ;;
    *) echo "Unknown network: $NETWORK"; exit 1 ;;
esac

echo "Current Network State ($NETWORK)"
echo "================================="

# Get tip (current block/epoch/slot)
echo ""
echo "CURRENT TIP:"
curl -s "$KOIOS_URL/tip" | jq .

# Get current epoch info
echo ""
echo "CURRENT EPOCH INFO:"
curl -s "$KOIOS_URL/epoch_info?limit=1" | jq .

# Get current protocol params
echo ""
echo "PROTOCOL PARAMETERS:"
curl -s "$KOIOS_URL/epoch_params?limit=1" | jq .
