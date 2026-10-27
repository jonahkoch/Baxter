'use client'

import { useState } from 'react'
import { useWallet } from '@meshsdk/react'
import { buildMintTx } from '@/lib/deploy'

export function MintSection() {
  const { wallet } = useWallet()
  const [quantity, setQuantity] = useState('1')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleMint = async () => {
    setLoading(true)
    try {
      const tx = await buildMintTx(wallet, parseInt(quantity))
      const signed = await wallet.signTx(tx)
      const hash = await wallet.submitTx(signed)
      setTxHash(hash)
    } catch (e) {
      alert('Mint failed: ' + (e as Error).message)
    }
    setLoading(false)
  }

  return (
    <div className="border border-gray-700 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Mint Soul-Bound Token</h2>
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-24"
        />
        <button
          onClick={handleMint}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded font-medium"
        >
          {loading ? 'Building...' : 'Mint Token'}
        </button>
      </div>
      {txHash && (
        <p className="text-green-400 text-sm">
          Success! Tx: {txHash.slice(0, 20)}...
        </p>
      )}
      <p className="text-gray-500 text-xs mt-2">
        Tokens are minted to your address and cannot be transferred.
        The issuer can claw them back with a signature.
      </p>
    </div>
  )
}
