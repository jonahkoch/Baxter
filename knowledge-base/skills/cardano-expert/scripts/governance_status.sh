#!/bin/bash
# Get governance status (active proposals, DReps)
# Usage: ./governance_status.sh [network]

NETWORK="${1:-mainnet}"

# Determine API base URL
case "$NETWORK" in
    mainnet) KOIOS_URL="https://api.koios.rest/api/v1" ;;
    preprod) KOIOS_URL="https://preprod.koios.rest/api/v1" ;;
    preview) KOIOS_URL="https://preview.koios.rest/api/v1" ;;
    *) echo "Unknown network: $NETWORK"; exit 1 ;;
esac

echo "Governance Status ($NETWORK)"
echo "============================"

# Get active proposals
echo ""
echo "ACTIVE PROPOSALS:"
curl -s "$KOIOS_URL/proposal_list?state=active&limit=20" | jq .

# Get DRep list (top 20 by voting power)
echo ""
echo "TOP DREPS:"
curl -s "$KOIOS_URL/drep_list?limit=20" | jq .

# Get constitutional committee
echo ""
echo "CONSTITUTIONAL COMMITTEE:"
curl -s -X POST "$KOIOS_URL/committee_info" \
    -H "Content-Type: application/json" \
    -d '{}' | jq .
