import { BrowserWallet, Transaction, Asset, ForgeScript } from '@meshsdk/core'

// These would be populated after running `aiken build` and deploying
// For POC, we use placeholder values that get replaced

const PROGRAMMABLE_TOKEN_POLICY =
  process.env.NEXT_PUBLIC_TOKEN_POLICY || ''

const CUSTODY_SCRIPT_HASH =
  process.env.NEXT_PUBLIC_CUSTODY_SCRIPT || ''

const ISSUER_VK =
  process.env.NEXT_PUBLIC_ISSUER_VK || ''

/**
 * Build a mint transaction for soul-bound programmable tokens.
 *
 * In the full implementation:
 * 1. Read plutus.json for compiled validators
 * 2. Apply parameters (policy_id, issuer_vk, etc.)
 * 3. Build tx with Mesh SDK
 */
export async function buildMintTx(
  wallet: BrowserWallet,
  quantity: number
): Promise<string> {
  if (!PROGRAMMABLE_TOKEN_POLICY) {
    throw new Error('Token policy not configured. Deploy validators first.')
  }

  const address = await wallet.getChangeAddress()
  const utxos = await wallet.getUtxos()

  if (utxos.length === 0) {
    throw new Error('No UTxOs available for collateral/reference')
  }

  // Use first UTxO as the one-shot reference for minting
  const referenceUtxo = utxos[0]

  // Build the asset
  const asset: Asset = {
    unit: PROGRAMMABLE_TOKEN_POLICY,
    quantity: quantity.toString(),
  }

  // Create forge script from the reference UTxO
  const forgeScript = ForgeScript.withOneSignature(referenceUtxo.input.txHash)

  const tx = new Transaction({ initiator: wallet })
    .setMetadata(674, {
      msg: ['CIP-113 POC: Mint soul-bound token'],
    })
    .mintAsset(forgeScript, asset)
    .sendAssets(
      {
        address: address,
        // In full impl, this would be the custody script address
        // with the user's stake key for ownership tracking
      },
      [asset]
    )

  const unsignedTx = await tx.build()
  return unsignedTx
}

/**
 * Build a clawback transaction (issuer only).
 */
export async function buildClawbackTx(
  wallet: BrowserWallet,
  holderAddress: string,
  policyId: string,
  quantity: number
): Promise<string> {
  // This would:
  // 1. Find UTxO holding the tokens
  // 2. Build tx spending from custody script with "3" redeemer
  // 3. Include withdraw-0 for third_party validator
  // 4. Add issuer signature

  throw new Error('Clawback not yet implemented in POC')
}

/**
 * Attempt to build a transfer transaction (will fail).
 * Demonstrates that soul-bound tokens cannot be transferred.
 */
export async function buildTransferTx(
  wallet: BrowserWallet,
  toAddress: string,
  policyId: string,
  quantity: number
): Promise<string> {
  // This would:
  // 1. Find UTxO holding the tokens
  // 2. Build tx spending from custody script with "T" redeemer
  // 3. Include withdraw-0 for transfer validator
  // 4. transfer.ak validator will FAIL — soul-bound!

  throw new Error(
    'Transfers are disabled for soul-bound tokens. ' +
    'Use clawback if you need to recover tokens.'
  )
}
