#!/bin/bash
# Query address balance and UTXOs
# Usage: ./query_address.sh <address>

ADDRESS="$1"
NETWORK="${2:-mainnet}"

if [ -z "$ADDRESS" ]; then
    echo "Usage: $0 <address> [network]"
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

echo "Querying address on $NETWORK: $ADDRESS"
echo "========================================="

# Get address info
echo ""
echo "ADDRESS INFO:"
curl -s -X POST "$KOIOS_URL/address_info" \
    -H "Content-Type: application/json" \
    -d "{\"_addresses\":[\"$ADDRESS\"]}" | jq .

# Get UTXOs
echo ""
echo "UTXOs:"
curl -s -X POST "$KOIOS_URL/address_utxos" \
    -H "Content-Type: application/json" \
    -d "{\"_addresses\":[\"$ADDRESS\"]}" | jq .
