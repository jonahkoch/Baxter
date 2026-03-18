#!/usr/bin/env python3
"""
Fetch top 210 Cardano DReps by Live Staked delegation from Koios API.
"""

import requests
import csv
import time
import json
from pathlib import Path

# API endpoints
DREP_LIST_URL = "https://api.koios.rest/api/v1/drep_list"
DREP_INFO_URL = "https://api.koios.rest/api/v1/drep_info"

# Create data directory
data_dir = Path("/root/.openclaw/workspace/data")
data_dir.mkdir(parents=True, exist_ok=True)

def fetch_all_drep_ids():
    """Fetch all DRep IDs using pagination."""
    all_dreps = []
    offset = 0
    limit = 1000
    
    print("Fetching DRep list from Koios API...")
    
    while True:
        params = {"limit": limit, "offset": offset}
        try:
            response = requests.get(DREP_LIST_URL, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            if not data:
                break
            
            all_dreps.extend(data)
            print(f"  Fetched {len(data)} DReps (offset: {offset}, total so far: {len(all_dreps)})")
            
            if len(data) < limit:
                break
            
            offset += limit
            time.sleep(0.5)  # Rate limiting
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching DRep list: {e}")
            break
    
    print(f"Total DReps fetched: {len(all_dreps)}")
    return all_dreps

def fetch_drep_info_batch(drep_ids):
    """Fetch info for a batch of DReps (max 100 at a time)."""
    payload = {"_drep_ids": drep_ids}
    
    try:
        response = requests.post(DREP_INFO_URL, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching DRep info batch: {e}")
        return []

def fetch_all_drep_info(drep_ids):
    """Fetch info for all DReps in batches of 100."""
    all_info = []
    batch_size = 50
    total = len(drep_ids)
    
    print(f"\nFetching DRep info for {total} DReps in batches of {batch_size}...")
    
    for i in range(0, total, batch_size):
        batch = drep_ids[i:i+batch_size]
        print(f"  Processing batch {i//batch_size + 1}/{(total + batch_size - 1)//batch_size} ({len(batch)} DReps)...")
        
        info = fetch_drep_info_batch(batch)
        all_info.extend(info)
        
        time.sleep(0.5)  # Rate limiting
    
    print(f"Total DRep info records: {len(all_info)}")
    return all_info

def parse_lovelace(amount):
    """Convert lovelace amount to ADA."""
    if amount is None:
        return 0.0
    try:
        return float(amount) / 1_000_000
    except (ValueError, TypeError):
        return 0.0

def main():
    # Step 1: Fetch all DRep IDs
    dreps = fetch_all_drep_ids()
    
    if not dreps:
        print("No DReps found!")
        return
    
    # Extract DRep IDs
    drep_ids = [d.get("drep_id") for d in dreps if d.get("drep_id")]
    print(f"\nFound {len(drep_ids)} DRep IDs")
    
    # Step 2: Fetch DRep info for all DReps
    drep_info_list = fetch_all_drep_info(drep_ids)
    
    if not drep_info_list:
        print("No DRep info retrieved!")
        return
    
    # Step 3: Parse and sort by live stake (amount field)
    print("\nParsing and sorting DRep data...")
    
    parsed_dreps = []
    for info in drep_info_list:
        drep_id = info.get("drep_id", "")
        amount_lovelace = info.get("amount", 0)
        registered = info.get("registered", False)
        active = info.get("active", False)
        expires_epoch_no = info.get("expires_epoch_no")
        
        live_stake_ada = parse_lovelace(amount_lovelace)
        
        parsed_dreps.append({
            "drep_id": drep_id,
            "live_stake_ada": live_stake_ada,
            "registered": bool(registered) if registered is not None else False,
            "active": bool(active) if active is not None else False,
            "expires_epoch_no": expires_epoch_no if expires_epoch_no is not None else ""
        })
    
    # Step 4: Sort by live stake descending
    parsed_dreps.sort(key=lambda x: x["live_stake_ada"], reverse=True)
    
    # Step 5: Take top 210
    top_210 = parsed_dreps[:210]
    
    # Step 6: Create CSV
    output_file = data_dir / "dreps_top_210.csv"
    
    print(f"\nCreating CSV with top 210 DReps...")
    
    with open(output_file, "w", newline="") as f:
        writer = csv.writer(f)
        # Write header
        writer.writerow(["rank", "drep_id", "live_stake_ada", "registered", "active", "expires_epoch_no"])
        
        # Write data
        for rank, drep in enumerate(top_210, 1):
            writer.writerow([
                rank,
                drep["drep_id"],
                drep["live_stake_ada"],
                "true" if drep["registered"] else "false",
                "true" if drep["active"] else "false",
                drep["expires_epoch_no"]
            ])
    
    print(f"\n✅ CSV saved to: {output_file}")
    
    # Step 8: Report statistics
    total_processed = len(parsed_dreps)
    if top_210:
        highest = top_210[0]["live_stake_ada"]
        lowest = top_210[-1]["live_stake_ada"]
        
        print("\n" + "="*60)
        print("STATISTICS REPORT")
        print("="*60)
        print(f"Total DReps processed: {total_processed}")
        print(f"Top 210 highest delegation: {highest:,.6f} ADA")
        print(f"Top 210 lowest delegation:  {lowest:,.6f} ADA")
        print(f"\nTop 10 DReps:")
        for i, drep in enumerate(top_210[:10], 1):
            print(f"  {i}. {drep['drep_id'][:20]}... - {drep['live_stake_ada']:,.2f} ADA")
        print("="*60)

if __name__ == "__main__":
    main()
