# CIP-25 Metadata Schema Reference

## Standard Post Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| name | String | "Post #<sequence>" |
| image | URI | IPFS URI to content or placeholder |
| mediaType | String | MIME type of content |

### Properties Object (Required)

| Field | Type | Description |
|-------|------|-------------|
| author_stake_key | String | Bech32 stake key (stake1...) |
| content_hash | String | SHA256 of full content |
| ipfs_uri | URI | IPFS location of full content |
| prev_post_hash | String | SHA256 of previous post metadata |
| sequence | Int | Monotonic sequence number (1-indexed) |
| timestamp_slot | Int | Cardano slot number |
| timestamp_utc | String | ISO8601 timestamp |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| reply_to | String | Hash of post being replied to |
| thread_root | String | Hash of original thread post |
| mentions | Array<String> | Stake keys of mentioned users |

## Reply/Thread Schema

Same as standard post, with additional properties:

| Field | Type | Description |
|-------|------|-------------|
| parent_post_hash | String | Post being directly replied to |
| thread_root_hash | String | Original post in thread |

## Recovery Claim Schema

Metadata for recovery claim NFT (CIP-25):

| Field | Type | Description |
|-------|------|-------------|
| name | String | "Recovery Claim #<claim_id>" |
| image | URI | Static recovery icon |
| properties.claim_type | String | "recovery_claim" |
| properties.stake_key | String | Claimant's stake key |
| properties.claimed_head_hash | String | Hash being claimed |
| properties.claimed_sequence | Int | Sequence number claimed |
| properties.claim_time | Int | Slot of claim |
| properties.challenge_deadline | Int | Slot when challenge window closes |

## JSON Schema Example (Standard Post)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "image", "mediaType", "properties"],
  "properties": {
    "name": {
      "type": "string",
      "pattern": "^Post #\\d+$"
    },
    "image": {
      "type": "string",
      "pattern": "^ipfs://"
    },
    "mediaType": {
      "type": "string"
    },
    "properties": {
      "type": "object",
      "required": [
        "author_stake_key",
        "content_hash",
        "ipfs_uri",
        "prev_post_hash",
        "sequence",
        "timestamp_slot",
        "timestamp_utc"
      ],
      "properties": {
        "author_stake_key": {
          "type": "string",
          "pattern": "^stake1"
        },
        "content_hash": {
          "type": "string",
          "pattern": "^[a-f0-9]{64}$"
        },
        "ipfs_uri": {
          "type": "string",
          "pattern": "^ipfs://"
        },
        "prev_post_hash": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "minimum": 1
        },
        "timestamp_slot": {
          "type": "integer"
        },
        "timestamp_utc": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
  }
}
```

## Hash Calculation

### Content Hash
```python
import hashlib

def content_hash(content: str) -> str:
    return hashlib.sha256(content.encode('utf-8')).hexdigest()
```

### Post Metadata Hash
```python
import hashlib
import json

def post_metadata_hash(metadata: dict) -> str:
    # Canonical JSON representation
    canonical = json.dumps(metadata, sort_keys=True, separators=(',',':'))
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()
```

## Content Storage Guidelines

| Content Size | Storage |
|--------------|---------|
| < 1KB | Consider inline in metadata |
| 1KB - 100KB | IPFS with local pinning |
| > 100KB | IPFS with dedicated pinning service |

## MIME Types

| Content Type | mediaType |
|--------------|-----------|
| Plain text | text/plain |
| Markdown | text/markdown |
| HTML | text/html |
| Image | image/png, image/jpeg, etc. |
| Video | video/mp4, etc. |
