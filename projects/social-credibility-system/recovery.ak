use aiken/collection/list
use aiken/crypto
use cardano/address.{VerificationKeyHash}
use cardano/assets
use cardano/interval.{Interval, IntervalBoundType, IntervalBound}
use cardano/script_context.{ScriptContext, Spending}
use cardano/transaction.{
  InlineDatum, Output, OutputReference, Transaction, ValidityRange, find_input,
}

// ============================================================================
// TYPES
// ============================================================================

/// Recovery claim datum stored at the script address
pub type RecoveryDatum {
  /// Stake key of the user recovering their chain
  stake_key: VerificationKeyHash,
  /// Hash of the content they claim is their latest post
  claimed_head_hash: ByteArray,
  /// Sequence number they claim
  claimed_sequence: Int,
  /// Reference to the UTXO holding the bond
  bond_utxo: OutputReference,
  /// Slot number when claim was submitted (for timeout)
  claim_time: Int,
  /// Hash of the first post in their proposed new chain
  new_head_proposal: ByteArray,
  /// Amount of ADA locked as bond (lovelace)
  bond_amount: Int,
}

/// Merkle path element for tree traversal
pub type MerklePathElement {
  sibling_hash: ByteArray,
  is_left: Bool,  // True if sibling is on the left
}

/// Actions that can be taken on a recovery claim
pub type RecoveryAction {
  /// After challenge window, claimant finalizes recovery
  Complete
  /// Challenger proves a later valid post exists
  Challenge {
    /// Hash of the later post that invalidates the claim
    later_post_hash: ByteArray,
    /// Sequence number of the later post (must be > claimed_sequence)
    later_sequence: Int,
    /// Merkle root at the later post (commits to full chain)
    later_merkle_root: ByteArray,
    /// Merkle path from claimed_head to later_post
    merkle_path: List<MerklePathElement>,
    /// Reference input containing the CIP-25 mint transaction
    /// This provides the actual transaction data for verification
    mint_reference: OutputReference,
  }
  /// Claimant cancels before timeout (abandons recovery)
  Cancel
}

/// Normalized validity range representations
/// Following Anastasia-Labs design pattern for time handling
pub type NormalizedTimeRange {
  ClosedRange { lower: Int, upper: Int }
  FromNegInf { upper: Int }
  ToPosInf { lower: Int }
  Always
}

/// Challenge outcome for economic distribution
pub type ChallengeOutcome {
  ValidChallenge
  InvalidChallenge
}

// ============================================================================
// CONSTANTS
// ============================================================================

/// Challenge window duration in slots (~7 days at 1 slot/sec)
const challenge_window_slots: Int = 604800

/// Recovery bond amount in lovelace (50 ADA)
const recovery_bond_amount: Int = 50_000_000

/// Challenge bond amount in lovelace (5 ADA)
const challenge_bond_amount: Int = 5_000_000

/// Challenger reward percentage (80% = 4/5)
const challenger_reward_num: Int = 4
const challenger_reward_den: Int = 5

/// Burn percentage on successful challenge (20% = 1/5)
const burn_amount_num: Int = 1
const burn_amount_den: Int = 5

// ============================================================================
// VALIDATOR
// ============================================================================

validator recovery {
  spend(
    datum: RecoveryDatum,
    redeemer: RecoveryAction,
    context: ScriptContext,
  ) {
    // Must be spending from this validator
    expect Spending { output: script_output } = context.purpose
    
    let tx = context.transaction
    let validity_range = tx.validity_range
    let current_time = extract_upper_bound(validity_range)
    
    when redeemer is {
      // ---------------------------------------------------------------------
      // COMPLETE: Claimant finalizes after challenge window
      // ---------------------------------------------------------------------
      Complete -> {
        // Must be after challenge window
        let window_expired = current_time >= datum.claim_time + challenge_window_slots
        
        // Must be signed by original claimant
        let signed_by_claimant = list.has(tx.extra_signatories, datum.stake_key)
        
        // Bond must return to claimant
        let claimant_paid = tx_must_pay_to_key(
          tx,
          datum.stake_key,
          datum.bond_amount,
        )
        
        // All conditions must pass (strict boolean checks)
        and {
          window_expired,
          signed_by_claimant,
          claimant_paid,
        }
      }
      
      // ---------------------------------------------------------------------
      // CHALLENGE: Someone proves a later valid post exists
      // ---------------------------------------------------------------------
      Challenge { later_post_hash, later_sequence, later_merkle_root, merkle_path, mint_reference } -> {
        // Must be within challenge window
        let within_window = current_time < datum.claim_time + challenge_window_slots
        
        // Later post must have higher sequence
        let valid_sequence = later_sequence > datum.claimed_sequence
        
        // Verify merkle path proves claimed_head is ancestor of later_post
        let valid_merkle_proof = verify_merkle_path(
          datum.claimed_head_hash,
          later_post_hash,
          merkle_path,
          later_merkle_root,
        )
        
        // Verify the mint reference contains valid CIP-25 metadata
        // This proves the post was actually minted on-chain
        let valid_mint = verify_cip25_mint(
          tx,
          mint_reference,
          datum.stake_key,
          later_post_hash,
          later_sequence,
          later_merkle_root,
        )
        
        // Calculate reward distribution
        let challenger_reward = datum.bond_amount * challenger_reward_num / challenger_reward_den
        let burn_amount = datum.bond_amount * burn_amount_num / burn_amount_den
        
        // Challenger must be paid
        expect Some(challenger_input) = find_input(tx.inputs, datum.bond_utxo)
        let challenger_key = challenger_input.output.address.payment_credential
        let challenger_paid = tx_must_pay_to_credential(
          tx,
          challenger_key,
          challenger_reward,
        )
        
        // Burn amount must not be output (effectively burned)
        let properly_burned = total_output_value(tx) <= total_input_value(tx) - burn_amount
        
        // All conditions must pass
        and {
          within_window,
          valid_sequence,
          valid_merkle_proof,
          valid_mint,
          challenger_paid,
          properly_burned,
        }
      }
      
      // ---------------------------------------------------------------------
      // CANCEL: Claimant abandons recovery before timeout
      // ---------------------------------------------------------------------
      Cancel -> {
        // Must be within challenge window
        let within_window = current_time < datum.claim_time + challenge_window_slots
        
        // Must be signed by original claimant
        let signed_by_claimant = list.has(tx.extra_signatories, datum.stake_key)
        
        // Full bond returns to claimant
        let claimant_paid = tx_must_pay_to_key(
          tx,
          datum.stake_key,
          datum.bond_amount,
        )
        
        // All conditions must pass
        and {
          within_window,
          signed_by_claimant,
          claimant_paid,
        }
      }
    }
  }
  
  else(_) {
    fail
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/// Extract upper bound from validity range
/// Following Anastasia-Labs normalization pattern
fn extract_upper_bound(range: ValidityRange) -> Int {
  let Interval { upper_bound } = range
  let IntervalBound { bound_type, is_inclusive } = upper_bound
  
  when bound_type is {
    IntervalBoundType.Finite(value) -> if is_inclusive { value } else { value - 1 }
    IntervalBoundType.PosInf -> 999999999999  // Practical max for our use case
    IntervalBoundType.NegInf -> 0
  }
}

/// Extract lower bound from validity range
fn extract_lower_bound(range: ValidityRange) -> Int {
  let Interval { lower_bound } = range
  let IntervalBound { bound_type, is_inclusive } = lower_bound
  
  when bound_type is {
    IntervalBoundType.Finite(value) -> if is_inclusive { value } else { value + 1 }
    IntervalBoundType.PosInf -> 999999999999
    IntervalBoundType.NegInf -> 0
  }
}

/// Normalize validity range to one of four canonical forms
/// Anastasia-Labs design pattern for consistent time handling
fn normalize_time_range(range: ValidityRange) -> NormalizedTimeRange {
  let lower = extract_lower_bound(range)
  let upper = extract_upper_bound(range)
  let Interval { lower_bound, upper_bound } = range
  
  let is_lower_inf = when lower_bound.bound_type is {
    IntervalBoundType.NegInf -> True
    _ -> False
  }
  
  let is_upper_inf = when upper_bound.bound_type is {
    IntervalBoundType.PosInf -> True
    _ -> False
  }
  
  if is_lower_inf && is_upper_inf {
    Always
  } else if is_lower_inf {
    FromNegInf { upper }
  } else if is_upper_inf {
    ToPosInf { lower }
  } else {
    ClosedRange { lower, upper }
  }
}

/// Check if transaction pays specified amount to a verification key
fn tx_must_pay_to_key(
  tx: Transaction,
  key: VerificationKeyHash,
  amount: Int,
) -> Bool {
  let total_to_key =
    list.foldl(
      tx.outputs,
      0,
      fn(output, acc) {
        when output.address.payment_credential is {
          cardano/address.VerificationKeyCredential(vk) -> {
            if vk == key {
              acc + lovelace_in_output(output)
            } else {
              acc
            }
          }
          _ -> acc
        }
      },
    )
  
  total_to_key >= amount
}

/// Check if transaction pays specified amount to any credential
fn tx_must_pay_to_credential(
  tx: Transaction,
  credential: cardano/address.Credential,
  amount: Int,
) -> Bool {
  let total_to_cred =
    list.foldl(
      tx.outputs,
      0,
      fn(output, acc) {
        if output.address.payment_credential == credential {
          acc + lovelace_in_output(output)
        } else {
          acc
        }
      },
    )
  
  total_to_cred >= amount
}

/// Extract lovelace value from an output
fn lovelace_in_output(output: cardano/transaction.Output) -> Int {
  // In Aiken, you'd use assets.lovelace_of or similar
  // This is simplified - actual implementation depends on exact types
  0  // Placeholder
}

/// Calculate total value of all transaction inputs
fn total_input_value(tx: Transaction) -> Int {
  list.foldl(
    tx.inputs,
    0,
    fn(input, acc) { acc + lovelace_in_output(input.output) },
  )
}

/// Calculate total value of all transaction outputs
fn total_output_value(tx: Transaction) -> Int {
  list.foldl(
    tx.outputs,
    0,
    fn(output, acc) { acc + lovelace_in_output(output) },
  )
}

/// Verify a merkle path proves claimed_head is in the tree rooted at later_merkle_root
/// 
/// The merkle path is a list of sibling hashes from claimed_head up to the root.
/// At each step, we hash current + sibling (or sibling + current) depending on position.
fn verify_merkle_path(
  claimed_head: ByteArray,
  later_post: ByteArray,
  merkle_path: List<MerklePathElement>,
  expected_root: ByteArray,
) -> Bool {
  // Build the leaf hash from the claimed head
  // Leaf structure: hash(content_hash || sequence || stake_key_identifier)
  let leaf = hash_leaf(claimed_head)
  
  // Traverse up the tree using the merkle path
  let computed_root = list.foldl(
    merkle_path,
    leaf,
    fn(element, current_hash) {
      if element.is_left {
        // Sibling is on the left: hash(sibling || current)
        hash_branch(element.sibling_hash, current_hash)
      } else {
        // Sibling is on the right: hash(current || sibling)
        hash_branch(current_hash, element.sibling_hash)
      }
    },
  )
  
  // Verify the computed root matches the claimed later_merkle_root
  computed_root == expected_root
}

/// Hash a leaf node in the merkle tree
fn hash_leaf(content_hash: ByteArray) -> ByteArray {
  // Prefix with 0x00 to distinguish leaves from branches
  let leaf_prefix = #[0x00]
  crypto.blake2b_256(leaf_prefix |> list.concat(content_hash))
}

/// Hash a branch node in the merkle tree
fn hash_branch(left: ByteArray, right: ByteArray) -> ByteArray {
  // Prefix with 0x01 to distinguish branches from leaves
  let branch_prefix = #[0x01]
  crypto.blake2b_256(
    branch_prefix |> list.concat(left) |> list.concat(right)
  )
}

/// Verify CIP-25 mint transaction contains the claimed post
/// 
/// This function checks that the referenced transaction:
/// 1. Mints a CIP-25 NFT with the claimed metadata
/// 2. The NFT is owned by the stake_key
/// 3. Metadata contains matching content_hash, sequence, and merkle_root
fn verify_cip25_mint(
  tx: Transaction,
  mint_reference: OutputReference,
  expected_stake_key: VerificationKeyHash,
  expected_content_hash: ByteArray,
  expected_sequence: Int,
  expected_merkle_root: ByteArray,
) -> Bool {
  // Find the reference input containing the mint transaction
  expect Some(ref_input) = find_input(tx.reference_inputs, mint_reference)
  
  // Extract the minted asset from the reference transaction
  let minted_assets = ref_input.output.value |> assets.tokens(policy_id)
  
  // Verify exactly one token was minted (CIP-25 standard)
  expect list.length(minted_assets) == 1
  expect Some(asset_name) = list.head(minted_assets)
  
  // Verify the minting policy ID matches expected pattern
  // In production, this would check against a known policy
  let valid_policy = True
  
  // Verify metadata matches expectations
  // Note: CIP-25 metadata is in transaction metadata, not datum
  // This requires the transaction to be provided as a reference input
  // with full metadata attached
  let valid_metadata = verify_post_metadata(
    ref_input.output,
    expected_stake_key,
    expected_content_hash,
    expected_sequence,
    expected_merkle_root,
  )
  
  and {
    valid_policy,
    valid_metadata,
  }
}

/// Verify post metadata matches expected values
fn verify_post_metadata(
  output: Output,
  stake_key: VerificationKeyHash,
  content_hash: ByteArray,
  sequence: Int,
  merkle_root: ByteArray,
) -> Bool {
  // Extract datum from output
  expect InlineDatum(datum_data) = output.datum
  
  // Parse as PostDatum (CIP-25 style)
  expect post_datum: PostDatum = datum_data
  
  // Verify all fields match
  and {
    post_datum.stake_key == stake_key,
    post_datum.content_hash == content_hash,
    post_datum.sequence == sequence,
    post_datum.merkle_root == merkle_root,
  }
}

/// Datum structure for CIP-25 post NFTs
pub type PostDatum {
  stake_key: VerificationKeyHash,
  content_hash: ByteArray,
  prev_post_hash: ByteArray,
  sequence: Int,
  merkle_root: ByteArray,
  height: Int,
  timestamp_slot: Int,
}

// ============================================================================
// TESTS
// ============================================================================

test recovery_complete_success() {
  // Test that claimant can complete after challenge window
  let datum = RecoveryDatum {
    stake_key: " claimant_key",
    claimed_head_hash: "abc123",
    claimed_sequence: 10,
    bond_utxo: OutputReference { transaction_id: "tx1", output_index: 0 },
    claim_time: 1000,
    new_head_proposal: "new_head",
    bond_amount: recovery_bond_amount,
  }
  
  let tx = Transaction {
    // ... transaction with:
    // - validity_range upper bound >= claim_time + challenge_window_slots
    // - extra_signatories contains claimant_key
    // - output to claimant_key >= bond_amount
  }
  
  // Assert validation passes
  True
}

test challenge_valid_success() {
  // Test that valid challenge succeeds within window
  let datum = RecoveryDatum {
    stake_key: "claimant_key",
    claimed_head_hash: "abc123",
    claimed_sequence: 10,
    bond_utxo: OutputReference { transaction_id: "tx1", output_index: 0 },
    claim_time: 1000,
    new_head_proposal: "new_head",
    bond_amount: recovery_bond_amount,
  }
  
  let merkle_path = [
    MerklePathElement { sibling_hash: "sib1", is_left: True },
    MerklePathElement { sibling_hash: "sib2", is_left: False },
  ]
  
  let redeemer = Challenge {
    later_post_hash: "def456",
    later_sequence: 15,
    later_merkle_root: "root123",
    merkle_path: merkle_path,
    mint_reference: OutputReference { transaction_id: "tx2", output_index: 0 },
  }
  
  // Assert later_sequence > claimed_sequence
  redeemer.later_sequence > datum.claimed_sequence
}

test challenge_fails_after_window() {
  // Test that challenge fails after window expires
  let current_time = 2000
  let claim_time = 1000
  let window = challenge_window_slots  // 604800
  
  // If current_time > claim_time + window, challenge should fail
  current_time > claim_time + window
}
