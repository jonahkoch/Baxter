#!/usr/bin/env python3
"""
Fetch top N Cardano DReps by live stake delegation.
Outputs CSV with rank, delegation amount, and DRep names.

Usage:
  python3 drep_rankings.py [count] [output_file]
  
Defaults:
  count: 210
  output_file: dreps_top_{count}.csv
"""

import sys
import csv
import json
import requests
from concurrent.futures import ThreadPoolExecutor

def fetch_all_drep_ids():
    """Fetch all DRep IDs from Koios."""
    drep_ids = []
    offset = 0
    limit = 1000
    
    while True:
        resp = requests.get(f"https://api.koios.rest/api/v1/drep_list?limit={limit}&offset={offset}")
        data = resp.json()
        if not data:
            break
        drep_ids.extend([d['drep_id'] for d in data])
        if len(data) < limit:
            break
        offset += limit
    
    return drep_ids

def fetch_drep_info_batch(batch):
    """Fetch info for a batch of DReps."""
    try:
        resp = requests.post(
            "https://api.koios.rest/api/v1/drep_info",
            json={"_drep_ids": batch},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print(f"Error fetching batch: {e}")
    return []

def fetch_all_drep_info(drep_ids):
    """Fetch info for all DReps in batches."""
    all_info = []
    batch_size = 25
    
    for i in range(0, len(drep_ids), batch_size):
        batch = drep_ids[i:i+batch_size]
        info = fetch_drep_info_batch(batch)
        all_info.extend(info)
        if (i + batch_size) % 100 == 0:
            print(f"  Fetched {min(i+batch_size, len(drep_ids))}/{len(drep_ids)}")
    
    return all_info

def get_drep_name(drep):
    """Fetch DRep name from metadata URL."""
    meta_url = drep.get('meta_url')
    if not meta_url:
        return "Unnamed"
    
    try:
        resp = requests.get(meta_url, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            body = data.get('body', {})
            name = body.get('givenName') or body.get('name') or "Unnamed"
            # Handle JSON-LD @value objects
            if isinstance(name, dict):
                name = name.get('@value') or name.get('value') or str(name)
            return name
    except:
        pass
    
    return "Unnamed"

def fetch_names_concurrent(dreps, max_workers=15):
    """Fetch DRep names concurrently."""
    names = {}
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(get_drep_name, d): d['drep_id'] for d in dreps}
        for future in futures:
            did = futures[future]
            try:
                names[did] = future.result()
            except:
                names[did] = "Unnamed"
    return names

def main():
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 210
    output_file = sys.argv[2] if len(sys.argv) > 2 else f"dreps_top_{count}.csv"
    
    print(f"Fetching top {count} DReps by live stake...")
    
    # Step 1: Get all DRep IDs
    print("\n1. Fetching DRep list...")
    drep_ids = fetch_all_drep_ids()
    print(f"   Found {len(drep_ids)} total DReps")
    
    # Step 2: Get delegation amounts
    print("\n2. Fetching delegation amounts...")
    all_dreps = fetch_all_drep_info(drep_ids)
    print(f"   Got info for {len(all_dreps)} DReps")
    
    # Step 3: Sort and get top N
    print(f"\n3. Selecting top {count} by stake...")
    dreps_sorted = sorted(
        all_dreps, 
        key=lambda x: int(x.get('amount', '0') or '0'), 
        reverse=True
    )
    top_n = dreps_sorted[:count]
    
    # Step 4: Fetch names
    print("\n4. Fetching DRep names from metadata...")
    names = fetch_names_concurrent(top_n)
    
    # Step 5: Write CSV
    print(f"\n5. Writing CSV to {output_file}...")
    with open(output_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['rank', 'live_stake_ada', 'name'])
        
        for rank, drep in enumerate(top_n, 1):
            amount_lovelace = int(drep.get('amount', '0') or '0')
            amount_ada = amount_lovelace / 1_000_000
            name = names.get(drep['drep_id'], 'Unnamed')
            writer.writerow([rank, amount_ada, name])
    
    print(f"\n✅ Done! CSV saved to {output_file}")
    print(f"\nTop 5 DReps:")
    for i, d in enumerate(top_n[:5], 1):
        amt = int(d.get('amount', '0') or '0') / 1_000_000
        name = names.get(d['drep_id'], 'Unnamed')
        print(f"  {i}. {name} - {amt:,.0f} ADA")
    
    print(f"\nLowest stake in top {count}: {int(top_n[-1].get('amount', '0') or '0') / 1_000_000:,.0f} ADA")

if __name__ == "__main__":
    main()
