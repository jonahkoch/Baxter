//// Custody Validator
//// The shared script address where all programmable tokens are held.
//// In full CIP-113 this is programmable_logic_base + programmable_logic_global.
//// Here we simplify: the custody script delegates to transfer or third_party.

use aiken/collection/list
use cardano/address.{Address, Script, VerificationKey}
use cardano/assets.{flatten, quantity_of}
use cardano/certificate.{Certificate}
use cardano/transaction.{
  InlineDatum, Input, Output, OutputReference, Redeemer, ScriptPurpose, Spend,
  Transaction, Withdraw,
}
use types.{TokenConfig, TokenDatum}

/// Custody validator
/// Parameters:
/// - policy_id: The token policy being held
/// - transfer_cred: Credential hash of the transfer validator
/// - third_party_cred: Credential hash of the third_party validator
validator custody(
  policy_id: ByteArray,
  transfer_cred: ByteArray,
  third_party_cred: ByteArray,
) {
  spend(
    datum: Option<TokenDatum>,
    redeemer: ByteArray,
    own_reference: OutputReference,
    self: Transaction,
  ) {
    // The redeemer indicates which delegate to invoke
    // "T" = transfer, "3" = third_party
    when redeemer is {
      "T" -> {
        // Transfer attempt: require transfer validator's withdraw-0
        let transfer_withdrawn =
          list.any(
            self.withdrawals,
            fn(w) {
              let (cred, _) = w
              when cred is {
                Script(hash) -> hash == transfer_cred
                _ -> False
              }
            },
          )
        // Transfer validator will reject (soul-bound)
        transfer_withdrawn
      }

      "3" -> {
        // Third-party action: require third_party validator's withdraw-0
        let third_party_withdrawn =
          list.any(
            self.withdrawals,
            fn(w) {
              let (cred, _) = w
              when cred is {
                Script(hash) -> hash == third_party_cred
                _ -> False
              }
            },
          )
        third_party_withdrawn
      }

      _ -> fail
    }
  }

  else(_) {
    fail
  }
}
