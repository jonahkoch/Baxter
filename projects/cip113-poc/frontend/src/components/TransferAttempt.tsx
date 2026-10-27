'use client'

import { useState } from 'react'
import { useWallet } from '@meshsdk/react'

export function TransferAttempt() {
  const { wallet } = useWallet()
  const [toAddr, setToAddr] = useState('')
  const [result, setResult] = useState('')

  const handleAttempt = async () => {
    // This demonstrates that transfers will fail
    // The transfer validator has `fail` for all redeemers
    setResult('❌ Transfer rejected: This token is soul-bound and cannot be transferred.')
  }

  return (
    <div className="border border-gray-700 rounded-lg p-4 opacity-60">
      <h2 className="text-xl font-semibold mb-3">Transfer Token (Disabled)</h2>
      <div className="space-y-3">
        <input
          placeholder="Recipient address"
          value={toAddr}
          onChange={(e) => setToAddr(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
          disabled
        />
        <button
          onClick={handleAttempt}
          className="bg-gray-700 px-4 py-2 rounded font-medium w-full"
        >
          Attempt Transfer
        </button>
      </div>
      {result && (
        <p className="text-red-400 text-sm mt-3 p-2 bg-red-950/30 rounded">
          {result}
        </p>
      )}
      <p className="text-gray-500 text-xs mt-2">
        Demonstration: Soul-bound tokens cannot change hands.
        The on-chain validator rejects all transfer attempts.
      </p>
    </div>
  )
}
