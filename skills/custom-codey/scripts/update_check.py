#!/usr/bin/env python3
"""
update_check.py — Custom Codey's freshness manager

Two jobs:
1. Check bundled_data's last_updated dates and report staleness.
2. Fetch fresh data from the npm registry when triggered.

Why npm? Claude.ai's Code Execution sandbox allowlist includes
registry.npmjs.org but not raw.githubusercontent.com. The Codey content
repo on GitHub (insidethesquare/cc0426) is mirrored to npm as
@insidethesquare/codey-data via a GitHub Action on every push to main.

Usage:
    python3 update_check.py --check              # check staleness only
    python3 update_check.py --fetch              # fetch fresh data to /tmp/custom-codey-fresh/
    python3 update_check.py --check --fetch      # check then fetch if stale
"""

import argparse
import gzip
import io
import json
import re
import shutil
import tarfile
import urllib.parse
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

# =============================================================================
# CONFIG — change PACKAGE_NAME here if the npm package is renamed or rescoped.
# =============================================================================
PACKAGE_NAME = "@insidethesquare/codey-data"
REGISTRY_BASE = "https://registry.npmjs.org"

STALENESS_THRESHOLD_DAYS = 30  # If ANY file is older, attempt fetch
WARN_THRESHOLD_DAYS = 14       # If data is older, show freshness footer to user

# =============================================================================
# Networking
# =============================================================================

def _encoded_pkg_name(name):
    """npm scoped packages are URL-encoded once (so '/' becomes '%2F'). Unscoped names pass through."""
    return urllib.parse.quote(name, safe="")


def registry_metadata_url(name):
    """Full metadata document for a package (all versions)."""
    return f"{REGISTRY_BASE}/{_encoded_pkg_name(name)}"


def fetch_url(url, timeout=20):
    """Fetch a URL. Returns (status_code, body_bytes) on success, (status_or_None, error_str) otherwise."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "CustomCodeySkill/2.0",
                "Accept": "application/json, application/octet-stream, */*",
            },
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, f"HTTP {e.code}: {e.reason}"
    except urllib.error.URLError as e:
        return None, f"Network error: {e.reason}"
    except Exception as e:  # noqa: BLE001 — we want to surface anything weird as a clean error
        return None, f"Unexpected error: {e}"


# =============================================================================
# npm fetch
# =============================================================================

def get_latest_tarball_info():
    """
    Query the npm registry for PACKAGE_NAME and return
        {"version": "X.Y.Z", "tarball": "https://...tgz", "integrity": "sha..."}
    or raises RuntimeError with a helpful message.
    """
    status, body = fetch_url(registry_metadata_url(PACKAGE_NAME))

    if status == 404:
        raise RuntimeError(
            f"Package '{PACKAGE_NAME}' not found on npm. "
            f"It may not be published yet, or the name changed. "
            f"Publish it with: npm publish --access public"
        )
    if status != 200 or not isinstance(body, bytes):
        raise RuntimeError(f"Registry lookup failed: {body}")

    try:
        meta = json.loads(body)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Bad JSON from registry: {e}")

    latest = meta.get("dist-tags", {}).get("latest")
    if not latest:
        raise RuntimeError("No 'latest' dist-tag found in registry metadata.")

    version_info = meta.get("versions", {}).get(latest)
    if not version_info:
        raise RuntimeError(f"Version '{latest}' missing from versions map.")

    dist = version_info.get("dist", {})
    tarball = dist.get("tarball")
    if not tarball:
        raise RuntimeError(f"No tarball URL for version {latest}.")

    return {
        "version": latest,
        "tarball": tarball,
        "integrity": dist.get("integrity"),
        "published_at": meta.get("time", {}).get(latest),
    }


def extract_tarball(tarball_bytes, target_dir):
    """
    Extract an npm tarball (.tgz) into target_dir.

    npm tarballs always have a top-level 'package/' directory — we strip that
    so files land at target_dir/blocks/... instead of target_dir/package/blocks/...

    Returns list of relative paths written.
    """
    target_dir = Path(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    written = []

    # Decompress gzip → tar
    try:
        raw_tar = gzip.decompress(tarball_bytes)
    except gzip.BadGzipFile as e:
        raise RuntimeError(f"Tarball is not valid gzip: {e}")

    with tarfile.open(fileobj=io.BytesIO(raw_tar), mode="r:") as tf:
        for member in tf.getmembers():
            # Only regular files
            if not member.isfile():
                continue

            # Skip anything outside the expected 'package/' root as a safety check
            name = member.name
            if not name.startswith("package/"):
                continue

            # Strip the 'package/' prefix
            rel_path = name[len("package/"):]
            if not rel_path:
                continue

            # Security: reject absolute paths and parent-directory traversal
            if rel_path.startswith("/") or ".." in Path(rel_path).parts:
                continue

            dest = target_dir / rel_path
            dest.parent.mkdir(parents=True, exist_ok=True)

            extracted = tf.extractfile(member)
            if extracted is None:
                continue
            dest.write_bytes(extracted.read())
            written.append(rel_path)

    return written


def fetch_all_files(target_dir):
    """
    Fetch the latest package tarball from npm and extract it into target_dir.
    Returns a summary dict matching the shape of the old GitHub-based function.
    """
    target_dir = Path(target_dir)

    # Clean target so stale files from previous fetches don't linger
    if target_dir.exists():
        try:
            shutil.rmtree(target_dir)
        except Exception as e:  # noqa: BLE001
            return {
                "fetched_count": 0,
                "failed_count": 1,
                "target_dir": str(target_dir),
                "fetched": [],
                "failed": [{"path": str(target_dir), "error": f"Could not clear target: {e}"}],
                "success": False,
            }

    try:
        info = get_latest_tarball_info()
    except RuntimeError as e:
        return {
            "fetched_count": 0,
            "failed_count": 1,
            "target_dir": str(target_dir),
            "fetched": [],
            "failed": [{"path": PACKAGE_NAME, "error": str(e)}],
            "success": False,
        }

    status, body = fetch_url(info["tarball"])
    if status != 200 or not isinstance(body, bytes):
        return {
            "fetched_count": 0,
            "failed_count": 1,
            "target_dir": str(target_dir),
            "fetched": [],
            "failed": [{"path": info["tarball"], "error": f"Download failed: {body}"}],
            "success": False,
            "version": info["version"],
        }

    try:
        written = extract_tarball(body, target_dir)
    except RuntimeError as e:
        return {
            "fetched_count": 0,
            "failed_count": 1,
            "target_dir": str(target_dir),
            "fetched": [],
            "failed": [{"path": info["tarball"], "error": str(e)}],
            "success": False,
            "version": info["version"],
        }

    # Keep only .md paths in the 'fetched' list to match old behavior, but
    # report total file count separately.
    md_paths = [p for p in written if p.endswith(".md")]

    return {
        "fetched_count": len(md_paths),
        "failed_count": 0,
        "target_dir": str(target_dir),
        "fetched": md_paths[:20],
        "failed": [],
        "success": len(md_paths) > 0,
        "version": info["version"],
        "published_at": info["published_at"],
        "total_files_written": len(written),
    }


# =============================================================================
# Staleness checking (unchanged from v1)
# =============================================================================

def parse_last_updated(content):
    """Extract 'Last Updated: DATE' from file content. Returns datetime or None."""
    match = re.search(r"Last Updated:\s*(.+?)(?:\n|$)", content)
    if not match:
        return None
    date_str = match.group(1).strip()

    formats = [
        "%B %d, %Y",     # September 22, 2025
        "%b %d, %Y",     # Sep 22, 2025
        "%Y-%m-%d",      # 2025-09-22
        "%m/%d/%Y",      # 09/22/2025
    ]
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    return None


def check_staleness(bundled_dir):
    """Scan all markdown files in bundled_data/ and report the oldest last_updated date."""
    if not bundled_dir.exists():
        return {
            "status": "empty",
            "message": "bundled_data/ is empty — skill has no fallback data.",
            "should_fetch": True,
        }

    md_files = list(bundled_dir.rglob("*.md"))
    if not md_files:
        return {
            "status": "empty",
            "message": "No markdown files in bundled_data/.",
            "should_fetch": True,
        }

    oldest_date = None
    oldest_file = None
    dated_files = 0

    for f in md_files:
        try:
            content = f.read_text(encoding="utf-8")
        except Exception:  # noqa: BLE001
            continue
        dt = parse_last_updated(content)
        if dt:
            dated_files += 1
            if oldest_date is None or dt < oldest_date:
                oldest_date = dt
                oldest_file = f.name

    if oldest_date is None:
        return {
            "status": "unknown",
            "message": "Files present but no 'Last Updated' dates found.",
            "should_fetch": False,
        }

    days_old = (datetime.now() - oldest_date).days

    result = {
        "status": "ok",
        "oldest_file": oldest_file,
        "oldest_date": oldest_date.strftime("%Y-%m-%d"),
        "days_old": days_old,
        "files_with_dates": dated_files,
        "total_files": len(md_files),
        "should_fetch": days_old > STALENESS_THRESHOLD_DAYS,
        "show_freshness_footer": days_old > WARN_THRESHOLD_DAYS,
    }

    if days_old > STALENESS_THRESHOLD_DAYS:
        result["message"] = f"Data is {days_old} days old. Recommended to fetch fresh copy."
    elif days_old > WARN_THRESHOLD_DAYS:
        result["message"] = f"Data is {days_old} days old. Still usable but show freshness footer."
    else:
        result["message"] = f"Data is fresh ({days_old} days old)."

    return result


def compare_with_bundled(fresh_dir, bundled_dir):
    """Compare fresh-fetched files against bundled copies to report what changed."""
    if not bundled_dir.exists():
        return {"all_new": True, "note": "No bundled data to compare against."}

    changes = {"new": [], "updated": [], "unchanged": []}

    for fresh_file in Path(fresh_dir).rglob("*.md"):
        rel = fresh_file.relative_to(fresh_dir)
        bundled_file = Path(bundled_dir) / rel

        if not bundled_file.exists():
            changes["new"].append(str(rel))
        else:
            fresh_content = fresh_file.read_bytes()
            bundled_content = bundled_file.read_bytes()
            if fresh_content != bundled_content:
                changes["updated"].append(str(rel))
            else:
                changes["unchanged"].append(str(rel))

    return changes


# =============================================================================
# CLI
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description="Custom Codey update manager")
    parser.add_argument("--check", action="store_true", help="Check bundled data staleness")
    parser.add_argument("--fetch", action="store_true", help="Fetch fresh data from npm")
    parser.add_argument(
        "--target", default="/tmp/custom-codey-fresh",
        help="Where to write fresh data (default: /tmp/custom-codey-fresh)",
    )
    parser.add_argument(
        "--bundled", default=None,
        help="Path to bundled_data/ (default: auto-detect relative to script)",
    )
    args = parser.parse_args()

    if not args.check and not args.fetch:
        args.check = True

    if args.bundled:
        bundled_dir = Path(args.bundled)
    else:
        bundled_dir = Path(__file__).parent.parent / "bundled_data"

    output = {}

    if args.check:
        output["staleness"] = check_staleness(bundled_dir)

    if args.fetch:
        fetch_result = fetch_all_files(args.target)
        output["fetch"] = fetch_result

        if fetch_result["success"] and bundled_dir.exists():
            output["diff"] = compare_with_bundled(args.target, bundled_dir)

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
