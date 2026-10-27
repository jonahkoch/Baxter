//// Core types for the CIP-113 POC

/// Token configuration embedded at mint time
/// This becomes part of the token's permanent identity
pub type TokenConfig {
  /// The policy ID of this token (self-reference for validation)
  policy_id: ByteArray,
  /// Public key hash of the clawback authority
  issuer_vk: ByteArray,
  /// Token name
  token_name: ByteArray,
}

/// Redeemer for the minting policy
pub type MintRedeemer {
  /// Initial mint to a specific address
  InitialMint { quantity: Int }
  /// Burning tokens (always allowed by holder)
  Burn
}

/// Redeemer for transfer validator (withdraw-0)
pub type TransferRedeemer {
  /// Standard transfer — always fails for soul-bound tokens
  Transfer
}

/// Redeemer for third-party actions (withdraw-0)
pub type ThirdPartyRedeemer {
  /// Clawback tokens to issuer
  Clawback { input_idx: Int }
}

/// Datum for UTxOs holding programmable tokens
/// In full CIP-113 this is more complex; here we keep it minimal
pub type TokenDatum {
  /// The original owner (minter) — for soul-bound check
  original_owner: ByteArray,
  /// Current holder's stake key hash
  current_holder: ByteArray,
}
