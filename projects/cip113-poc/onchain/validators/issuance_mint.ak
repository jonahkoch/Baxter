//// Issuance Mint Policy
//// One-shot minting policy that creates soul-bound programmable tokens.
//// The policy ID is derived from this script, making it immutable.

use aiken/collection/dict
use aiken/collection/list
use cardano/address.{Address, Script}
use cardano/assets.{PolicyId, flatten, from_asset, quantity_of}
use cardano/transaction.{
  Input, Mint, NoDatum, Output, OutputReference, Transaction, find_input,
  placeholder,
}
use types.{Burn, InitialMint, MintRedeemer, TokenConfig}

/// The minting policy validator
/// Parameters:
/// - utxo_ref: The specific UTxO that must be consumed to mint (one-shot)
/// - config: Token configuration (issuer, token name, etc.)
validator mint(utxo_ref: OutputReference, config: TokenConfig) {
  mint(redeemer: MintRedeemer, policy_id: PolicyId, self: Transaction) {
    when redeemer is {
      InitialMint { quantity } -> {
        // One-shot: must consume the specific UTxO
        let utxo_consumed =
          list.any(self.inputs, fn(input) { input.output_reference == utxo_ref })

        // Mint exactly the specified quantity
        let minted = self.mint |> flatten()
        let correct_token =
          list.any(
            minted,
            fn(asset) {
              let (pid, tname, qty) = asset
              pid == policy_id && tname == config.token_name && qty == quantity
            },
          )

        // Prevent further minting by requiring the consumed UTxO
        // (Since it's consumed, this policy can never mint again with same params)
        utxo_consumed && correct_token && quantity > 0
      }

      Burn -> {
        // Burning: any negative quantity is fine as long as it's this policy
        let burned = self.mint |> flatten()
        list.all(
          burned,
          fn(asset) {
            let (pid, _, qty) = asset
            if pid == policy_id {
              qty < 0
            } else {
              True
            }
          },
        )
      }
    }
  }

  else(_) {
    fail
  }
}

/// Helper to build the token config
pub fn make_config(
  policy_id: PolicyId,
  issuer_vk: ByteArray,
  token_name: ByteArray,
) -> TokenConfig {
  TokenConfig { policy_id, issuer_vk, token_name }
}
