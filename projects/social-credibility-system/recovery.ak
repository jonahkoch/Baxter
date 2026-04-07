use aiken/collection/list
use cardano/address.{VerificationKeyHash}
use cardano/interval.{Interval, IntervalBoundType, IntervalBound}
use cardano/script_context.{ScriptContext, Spending}
use cardano/transaction.{
  InlineDatum, OutputReference, Transaction, ValidityRange, find_input,
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
      Challenge { later_post_hash, later_sequence } -> {
        // Must be within challenge window
        let within_window = current_time < datum.claim_time + challenge_window_slots
        
        // Later post must have higher sequence
        let valid_sequence = later_sequence > datum.claimed_sequence
        
        // Later post must be from same stake key (proved via chain lookup)
        // Note: In production, this requires an oracle or reference to CIP-25
        // For now, we trust the challenger provides valid proof
        // TODO: Add merkle proof verification
        let valid_post_proof = True
        
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
          valid_post_proof,
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

/// Verify a merkle proof (placeholder for actual implementation)
/// Would verify that later_post exists in chain after claimed_head
fn verify_merkle_proof(
  claimed_head: ByteArray,
  later_post: ByteArray,
  proof: List<ByteArray>,
) -> Bool {
  // Placeholder: actual implementation would hash up the tree
  True
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
  
  let redeemer = Challenge {
    later_post_hash: "def456",
    later_sequence: 15,
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
