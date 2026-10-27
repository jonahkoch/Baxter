//// Third-Party Validator (Withdraw-0 Pattern)
//// Allows a designated issuer to "claw back" tokens from any holder.
//// This demonstrates the "programmable" aspect of CIP-113 —
//// the issuer has limited, predefined powers over circulating tokens.

use aiken/collection/list
use cardano/address.{Address, VerificationKey}
use cardano/assets.{flatten, quantity_of, policies}
use cardano/transaction.{InlineDatum, Input, Output, Transaction, find_input}
use types.{Clawback, ThirdPartyRedeemer, TokenConfig, TokenDatum}

/// Third-party action validator
/// Parameters:
/// - policy_id: The governed token policy
/// - issuer_vk: Public key hash of the clawback authority
validator third_party(policy_id: ByteArray, issuer_vk: ByteArray) {
  withdraw(redeemer: ThirdPartyRedeemer, credential: ByteArray, self: Transaction) {
    when redeemer is {
      Clawback { input_idx } -> {
        // 1. Verify the issuer authorized this by signing the tx
        let issuer_signed = list.has(self.extra_signatories, issuer_vk)

        // 2. Get the input being seized
        expect Some(input) = list.at(self.inputs, input_idx)
        let Input { output_reference, output } = input

        // 3. Verify this input contains the target token
        let token_in_input = quantity_of(output.value, policy_id, "") > 0

        // 4. Find the corresponding output going to the issuer
        // The issuer must receive the tokens
        let issuer_received =
          list.any(
            self.outputs,
            fn(out) {
              let has_tokens = quantity_of(out.value, policy_id, "") > 0
              let to_issuer =
                when out.address.payment_credential is {
                  VerificationKey(vk) -> vk == issuer_vk
                  _ -> False
                }
              has_tokens && to_issuer
            },
          )

        issuer_signed && token_in_input && issuer_received
      }
    }
  }

  else(_) {
    fail
  }
}

/// Helper: get the token quantity in an output
pub fn token_quantity(output: Output, policy_id: ByteArray, token_name: ByteArray) -> Int {
  quantity_of(output.value, policy_id, token_name)
}
