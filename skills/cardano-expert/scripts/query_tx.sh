#!/bin/bash
# Query transaction details
# Usage: ./query_tx.sh <tx_hash>

TX_HASH="$1"
NETWORK="${2:-mainnet}"

if [ -z "$TX_HASH" ]; then
    echo "Usage: $0 <tx_hash> [network]"
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

echo "Querying transaction on $NETWORK: $TX_HASH"
echo "=========================================="

# Get transaction info
echo ""
echo "TRANSACTION INFO:"
curl -s -X POST "$KOIOS_URL/tx_info" \
    -H "Content-Type: application/json" \
    -d "{\"_tx_hashes\":[\"$TX_HASH\"]}" | jq .

# Get UTXOs (inputs/outputs)
echo ""
echo "INPUTS/OUTPUTS:"
curl -s -X POST "$KOIOS_URL/tx_utxos" \
    -H "Content-Type: application/json" \
    -d "{\"_tx_hashes\":[\"$TX_HASH\"]}" | jq .

# Get metadata if any
echo ""
echo "METADATA:"
curl -s -X POST "$KOIOS_URL/tx_metadata" \
    -H "Content-Type: application/json" \
    -d "{\"_tx_hashes\":[\"$TX_HASH\"]}" | jq .
