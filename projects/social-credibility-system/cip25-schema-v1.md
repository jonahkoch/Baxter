# CIP-25 Schema: Credibility Post v1 (Tweet Mode)

**Version:** 1.0  
**Character Limit:** 280 characters (inline text)  
**Status:** Draft

---

## Design Rationale

- **280 characters:** Matches original Twitter constraint
- **100% on-chain:** No IPFS dependency for core content
- **Immutable credibility:** Hash chain links every post
- **Upgrade path:** Schema version allows future expansion

---

## Metadata Structure

```json
{
  "721": {
    "<policy_id>": {
      "<asset_name>": {
        "name": "Post #[sequence]",
        "image": "data:image/svg+xml;base64,PHN2Z...",
        "mediaType": "image/svg+xml",
        "description": "[first 100 chars of body]...",
        "version": "cred-v1",
        "properties": {
          "schema_version": "cred-v1",
          "author_stake_key": "stake1...",
          "body": "[max 280 chars]",
          "body_hash": "sha256:...",
          "prev_post_hash": "sha256:...",
          "prev_post_asset": "asset_name_of_prev",
          "sequence": 42,
          "merkle_root": "sha256:...",
          "height": 6,
          "timestamp_slot": 145678901,
          "timestamp_iso": "2026-04-07T22:18:00Z",
          "client": "cred-client/1.0.0"
        }
      }
    }
  }
}
```

---

## Field Specifications

### Standard CIP-25 Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Display name: "Post #42" |
| `image` | uri | ✅ | SVG placeholder or platform-generated preview |
| `mediaType` | string | ✅ | "image/svg+xml" or platform-specific |
| `description` | string | ⚠️ | Truncated body (first 100 chars) for previews |
| `version` | string | ✅ | "cred-v1" for schema identification |

### Custom Properties (Required)

| Field | Type | Description |
|-------|------|-------------|
| `schema_version` | string | "cred-v1" — enables upgrade detection |
| `author_stake_key` | string | Stake key hash (starts with "stake1") |
| `body` | string | **Max 280 UTF-8 characters** |
| `body_hash` | string | SHA-256 of body content (hex) |
| `prev_post_hash` | string | Content hash of previous post in chain |
| `prev_post_asset` | string | Asset name of previous post (for easy lookup) |
| `sequence` | integer | Incrementing counter (1 = genesis) |
| `merkle_root` | string | Root hash of merkle tree up to this post |
| `height` | integer | Tree height (log2 of approximate tree size) |
| `timestamp_slot` | integer | Cardano slot number of minting tx |
| `timestamp_iso` | string | ISO 8601 timestamp (human-readable) |
| `client` | string | Software that created the post |

---

## Genesis Post (sequence: 1)

First post in a chain uses special values:

```json
{
  "properties": {
    "prev_post_hash": "genesis",
    "prev_post_asset": "genesis",
    "sequence": 1,
    "merkle_root": "[hash of this post only]",
    "height": 0
  }
}
```

---

## Merkle Tree Construction

### Leaf Node
```
leaf_hash = blake2b_256(0x00 || body_hash || sequence || stake_key)
```

### Branch Node
```
branch_hash = blake2b_256(0x01 || left_hash || right_hash)
```

### Per-Post Merkle Root
Each post includes the root of a **complete binary tree** containing all posts up to that point:

- Post 1: Root = leaf_hash(post_1)
- Post 2: Root = branch(leaf_1, leaf_2)
- Post 3: Root = branch(branch(1,2), leaf_3)
- Post 4: Root = branch(branch(1,2), branch(3,4))

**Efficient proofs:** O(log n) path length for any challenge.

---

## Size Constraints

### Maximum Field Sizes

| Field | Max Size | Rationale |
|-------|----------|-----------|
| `body` | 280 chars | Twitter limit, fits in ~840 bytes (UTF-8) |
| `name` | 32 chars | CIP-25 recommendation |
| `description` | 100 chars | Preview truncation point |
| All hashes | 64 chars | SHA-256 hex encoding |
| `author_stake_key` | 59 chars | Bech32 stake address |
| `timestamp_iso` | 25 chars | ISO 8601 with timezone |

### Total Metadata Estimate

```
Base CIP-25 structure:     ~400 bytes
Properties (all fields):   ~800 bytes
Body (max 280 chars):      ~840 bytes
JSON overhead:             ~200 bytes
----------------------------------------
Total per post:           ~2.2 KB
```

**Batch minting:** 10 posts ≈ 22 KB (within 16 KB tx limit — requires compression or batching strategy)

**Correction:** With 16 KB tx limit, realistic batch is 4-5 posts per transaction for V1.

---

## Validation Rules

### Client-Side (Pre-Mint)

1. **Body length:** ≤ 280 UTF-8 code points
2. **Sequence:** Must be prev_post.sequence + 1
3. **Prev_post_hash:** Must match actual hash of referenced post
4. **Merkle_root:** Recomputed and verified against tree structure

### On-Chain (Contract)

1. **Policy ID:** Must match expected minting policy
2. **Asset name:** Must follow naming convention (optional)
3. **No duplicate sequences** for same stake_key (enforced by merkle proof)

---

## Upgrade Path (v2 → v3)

### v2: Extended Mode (1,000 chars)
```json
{
  "properties": {
    "schema_version": "cred-v2",
    "body": "[max 1,000 chars]",
    // ... same fields
  }
}
```

### v3: Hybrid Mode (500 chars + IPFS)
```json
{
  "properties": {
    "schema_version": "cred-v3",
    "body": "[preview, max 500 chars]",
    "is_full_content": false,
    "full_content_hash": "sha256:...",
    "ipfs_uri": "ipfs://Qm..."
  }
}
```

**Backward compatibility:** Older clients see v3 posts with truncated previews. New clients fetch full content from IPFS.

---

## Example: Complete Genesis Post

```json
{
  "721": {
    "a5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e5bb0e": {
      "cred_post_00001": {
        "name": "Post #1",
        "image": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxNDE5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DcmVkIFBvc3QgIzE8L3RleHQ+PC9zdmc+",
        "mediaType": "image/svg+xml",
        "description": "First post in my credibility chain. This is the beginning of verifiable discourse.",
        "version": "cred-v1",
        "properties": {
          "schema_version": "cred-v1",
          "author_stake_key": "stake1u9z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8",
          "body": "First post in my credibility chain. This is the beginning of verifiable discourse on Cardano. Every word here is cryptographically bound to my identity.",
          "body_hash": "a3f2c8d1e4b9...",
          "prev_post_hash": "genesis",
          "prev_post_asset": "genesis",
          "sequence": 1,
          "merkle_root": "b4e5f9a2c8d1...",
          "height": 0,
          "timestamp_slot": 145678901,
          "timestamp_iso": "2026-04-07T22:18:00Z",
          "client": "cred-client/1.0.0"
        }
      }
    }
  }
}
```

---

## Next Steps

1. [ ] Aiken contract: Update to parse cred-v1 metadata
2. [ ] Client SDK: TypeScript types for cred-v1 schema
3. [ ] Merkle tree implementation: JS library for tree construction
4. [ ] Test vectors: Valid/invalid post examples
5. [ ] v2/v3 spec: Extended and hybrid modes
