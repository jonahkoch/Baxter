//// Transfer Validator (Withdraw-0 Pattern)
//// This validator is invoked via a 0-ADA withdrawal on every transfer.
//// For soul-bound tokens: REJECTS ALL TRANSFERS.
//// Only the original minter can hold the token.

use aiken/collection/list
use cardano/address.{Address, Script, VerificationKey}
use cardano/assets.{quantity_of}
use cardano/transaction.{Output, Transaction}
use types.{TokenDatum, Transfer, TransferRedeemer}

/// Transfer validator
/// Parameter: policy_id — the token this validator governs
validator transfer(policy_id: ByteArray) {
  withdraw(redeemer: TransferRedeemer, credential: ByteArray, self: Transaction) {
    // For soul-bound tokens: simply reject all transfers
    // The token can only move via mint (to original owner) or clawback
    fail
  }

  else(_) {
    fail
  }
}

/// Helper: verify an output belongs to the original owner
pub fn output_belongs_to_owner(
  output: Output,
  policy_id: ByteArray,
  owner_hash: ByteArray,
) -> Bool {
  // Check the output address contains the owner as stake credential
  when output.address.stake_credential is {
    Some(VerificationKey(vk)) -> vk == owner_hash
    Some(Script(_)) -> False
    None -> False
  }
}
