'use client'

import { useState } from 'react'
import { useWallet } from '@meshsdk/react'

export function ClawbackSection() {
  const { wallet } = useWallet()
  const [holderAddr, setHolderAddr] = useState('')
  const [policyId, setPolicyId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClawback = async () => {
    setLoading(true)
    // This would call buildClawbackTx from deploy.ts
    // Requires issuer wallet to be connected
    alert('Clawback requires the issuer wallet. Implement in deploy.ts.')
    setLoading(false)
  }

  return (
    <div className="border border-red-900/50 bg-red-950/20 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3 text-red-400">
        🔑 Issuer Clawback
      </h2>
      <div className="space-y-3">
        <input
          placeholder="Holder address"
          value={holderAddr}
          onChange={(e) => setHolderAddr(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
        />
        <input
          placeholder="Token policy ID"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
        />
        <button
          onClick={handleClawback}
          disabled={loading}
          className="bg-red-700 hover:bg-red-600 disabled:opacity-50 px-4 py-2 rounded font-medium w-full"
        >
          {loading ? 'Processing...' : 'Clawback Tokens'}
        </button>
      </div>
      <p className="text-gray-500 text-xs mt-2">
        Only the original issuer can execute this. It transfers tokens
        from any holder back to the issuer address.
      </p>
    </div>
  )
}
