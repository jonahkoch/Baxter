#!/bin/bash
# Query stake pool information
# Usage: ./query_pool.sh <pool_id>

POOL_ID="$1"
NETWORK="${2:-mainnet}"

if [ -z "$POOL_ID" ]; then
    echo "Usage: $0 <pool_id> [network]"
    echo "Networks: mainnet, preprod, preview"
    exit 1
fi

# Determine API base URL
case "$NETWORK" in
    mainnet) KOIOS_URL="https://api.koios.rest/api/v1" ;;
    preprod) KOIOS_URL="https://preprod.koios.rest/api/v1" ;;
    preview) KOIOS_URL="https://preview.koios.rest/api/v1" ;;
    *) echo "Unknown network: $NETWORK"; exit 1 ;;
esac

echo "Querying pool on $NETWORK: $POOL_ID"
echo "===================================="

# Get pool info
echo ""
echo "POOL INFO:"
curl -s -X POST "$KOIOS_URL/pool_info" \
    -H "Content-Type: application/json" \
    -d "{\"_pool_bech32_ids\":[\"$POOL_ID\"]}" | jq .

# Get pool metadata
echo ""
echo "METADATA:"
curl -s -X POST "$KOIOS_URL/pool_metadata" \
    -H "Content-Type: application/json" \
    -d "{\"_pool_bech32_ids\":[\"$POOL_ID\"]}" | jq .

# Get current delegators
echo ""
echo "CURRENT DELEGATORS:"
curl -s -X POST "$KOIOS_URL/pool_delegators" \
    -H "Content-Type: application/json" \
    -d "{\"_pool_bech32_ids\":[\"$POOL_ID\"],\"_epoch_no\":null}" | jq .
