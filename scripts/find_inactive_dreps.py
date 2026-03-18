#!/usr/bin/env python3
"""
Find inactive DReps with delegation between 100k-1M ADA
An inactive DRep has active=false in the drep_info response
Outputs CSV with DRep name and delegation amount
"""

import sys
import csv
import json
import requests
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

KOIOS_URL = "https://api.koios.rest/api/v1"
MIN_ADA = 100_000
MAX_ADA = 1_000_000

def get_current_epoch():
    """Get current epoch number"""
    resp = requests.get(f"{KOIOS_URL}/tip")
    resp.raise_for_status()
    return resp.json()[0]["epoch_no"]

def fetch_registered_dreps():
    """Fetch all registered DRep IDs from Koios."""
    drep_ids = []
    offset = 0
    limit = 1000
    
    while True:
        resp = requests.get(f"{KOIOS_URL}/drep_list?limit={limit}&offset={offset}")
        data = resp.json()
        if not data:
            break
        for d in data:
            if d.get('registered', False):
                drep_ids.append(d['drep_id'])
        if len(data) < limit:
            break
        offset += limit
    
    return drep_ids

def fetch_drep_info_batch(batch):
    """Fetch info for a batch of DReps."""
    try:
        resp = requests.post(
            f"{KOIOS_URL}/drep_info",
            json={"_drep_ids": batch},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print(f"Error fetching batch: {e}", file=sys.stderr)
    return []

def fetch_all_drep_info(drep_ids):
    """Fetch info for all DReps in batches."""
    all_info = []
    batch_size = 25
    
    for i in range(0, len(drep_ids), batch_size):
        batch = drep_ids[i:i+batch_size]
        info = fetch_drep_info_batch(batch)
        all_info.extend(info)
        if (i + batch_size) % 100 == 0 or i == 0:
            print(f"  Fetched {min(i+batch_size, len(drep_ids))}/{len(drep_ids)}", file=sys.stderr)
    
    return all_info

def get_drep_name(meta_url):
    """Fetch DRep name from metadata URL."""
    if not meta_url:
        return "Unnamed"
    
    try:
        resp = requests.get(meta_url, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            body = data.get('body', {})
            name = body.get('givenName') or body.get('name') or "Unnamed"
            if isinstance(name, dict):
                name = name.get('@value') or name.get('value') or str(name)
            return name
    except:
        pass
    
    return "Unnamed"

def fetch_names_concurrent(dreps, max_workers=15):
    """Fetch DRep names concurrently."""
    names = {}
    meta_urls = {d['drep_id']: d.get('meta_url') for d in dreps}
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(get_drep_name, meta_urls[did]): did for did in meta_urls}
        for i, future in enumerate(futures):
            did = futures[future]
            try:
                names[did] = future.result()
            except:
                names[did] = "Unnamed"
            if (i + 1) % 50 == 0:
                print(f"  Fetched {i+1}/{len(futures)} names...", file=sys.stderr)
    
    return names

def get_delegator_count(drep_id):
    """Get count of delegators for a DRep."""
    try:
        resp = requests.get(
            f"{KOIOS_URL}/drep_delegators",
            params={"_drep_id": drep_id, "limit": 1},
            timeout=10
        )
        if resp.status_code == 200:
            data = resp.json()
            # Get total count from response headers or by fetching all
            # Koios doesn't return total count directly, so we need to count
            # We'll do a count query by fetching with large limit
            if data:
                # Fetch all delegators to get count
                count_resp = requests.get(
                    f"{KOIOS_URL}/drep_delegators",
                    params={"_drep_id": drep_id, "limit": 100000},
                    timeout=30
                )
                if count_resp.status_code == 200:
                    return len(count_resp.json())
    except Exception as e:
        print(f"Error fetching delegator count for {drep_id}: {e}", file=sys.stderr)
    return 0

def fetch_delegator_counts_concurrent(dreps, max_workers=10):
    """Fetch delegator counts concurrently."""
    counts = {}
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(get_delegator_count, d['drep_id']): d['drep_id'] for d in dreps}
        for i, future in enumerate(futures):
            did = futures[future]
            try:
                counts[did] = future.result()
            except:
                counts[did] = 0
            if (i + 1) % 20 == 0:
                print(f"  Fetched {i+1}/{len(futures)} delegator counts...", file=sys.stderr)
    
    return counts

def main():
    print("=" * 60, file=sys.stderr)
    print("Finding Inactive DReps (100k-1M ADA delegation)", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    
    # Get current epoch
    print("\n1. Getting current epoch...", file=sys.stderr)
    current_epoch = get_current_epoch()
    print(f"   Current epoch: {current_epoch}", file=sys.stderr)
    
    # Get registered DReps
    print("\n2. Fetching registered DReps...", file=sys.stderr)
    drep_ids = fetch_registered_dreps()
    print(f"   Found {len(drep_ids)} registered DReps", file=sys.stderr)
    
    # Get delegation info
    print("\n3. Fetching DRep info (includes activity status)...", file=sys.stderr)
    all_dreps = fetch_all_drep_info(drep_ids)
    print(f"   Got info for {len(all_dreps)} DReps", file=sys.stderr)
    
    # Filter: inactive AND delegation in range
    print(f"\n4. Filtering for inactive DReps with {MIN_ADA:,}-{MAX_ADA:,} ADA...", file=sys.stderr)
    min_lovelace = MIN_ADA * 1_000_000
    max_lovelace = MAX_ADA * 1_000_000
    
    inactive_in_range = []
    for d in all_dreps:
        # Check if inactive (active=false)
        if d.get('active', True):
            continue  # Still active
        
        # Check delegation range
        amount = int(d.get('amount', '0') or '0')
        if min_lovelace <= amount <= max_lovelace:
            inactive_in_range.append(d)
    
    print(f"   Found {len(inactive_in_range)} inactive DReps in range", file=sys.stderr)
    
    if not inactive_in_range:
        print("\nNo inactive DReps found in this delegation range!", file=sys.stderr)
        # Still create empty CSV
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"inactive_dreps_{MIN_ADA}k-{MAX_ADA}k_{timestamp}.csv"
        with open(output_file, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['name', 'delegation_ada'])
        print(f"Empty CSV saved to: {output_file}", file=sys.stderr)
        print(f"File: {output_file}")
        return
    
    # Fetch names
    print(f"\n5. Fetching DRep names...", file=sys.stderr)
    names = fetch_names_concurrent(inactive_in_range)
    
    # Fetch delegator counts
    print(f"\n6. Fetching delegator counts...", file=sys.stderr)
    delegator_counts = fetch_delegator_counts_concurrent(inactive_in_range)
    
    # Prepare CSV data
    print(f"\n7. Preparing CSV...", file=sys.stderr)
    csv_data = []
    for d in inactive_in_range:
        did = d['drep_id']
        amount_ada = int(d.get('amount', '0') or '0') / 1_000_000
        name = names.get(did, "Unnamed")
        expires = d.get('expires_epoch_no', 'N/A')
        delegator_count = delegator_counts.get(did, 0)
        csv_data.append({
            'name': name,
            'delegation_ada': amount_ada,
            'expired_epoch': expires,
            'delegator_count': delegator_count
        })
    
    # Sort by delegation amount
    csv_data.sort(key=lambda x: x['delegation_ada'], reverse=True)
    
    # Write CSV
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"inactive_dreps_{MIN_ADA}k-{MAX_ADA}k_{timestamp}.csv"
    
    with open(output_file, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'delegation_ada', 'expired_epoch', 'delegator_count'])
        writer.writeheader()
        writer.writerows(csv_data)
    
    # Summary
    print("\n" + "=" * 60, file=sys.stderr)
    print("SUMMARY", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    print(f"Total DReps checked: {len(all_dreps)}", file=sys.stderr)
    print(f"Inactive DReps in range: {len(inactive_in_range)}", file=sys.stderr)
    print(f"\nCSV saved to: {output_file}", file=sys.stderr)
    print("\nTop 10 inactive DReps:", file=sys.stderr)
    for i, row in enumerate(csv_data[:10], 1):
        print(f"  {i}. {row['name']} - {row['delegation_ada']:,.0f} ADA ({row['delegator_count']} delegators, expired epoch {row['expired_epoch']})", file=sys.stderr)
    
    # Output filename for piping
    print(f"\nFile: {output_file}")

if __name__ == "__main__":
    main()
