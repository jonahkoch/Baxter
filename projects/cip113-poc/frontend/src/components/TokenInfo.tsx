'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@meshsdk/react'

export function TokenInfo() {
  const { wallet } = useWallet()
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => {
    wallet.getBalance().then(setAssets)
  }, [wallet])

  // Filter for our programmable token (would check policy ID in real impl)
  const programmableTokens = assets.filter(
    (a) => a.unit.length === 56 + 0 // policy ID + empty token name
  )

  return (
    <div className="border border-gray-700 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Your Tokens</h2>
      {programmableTokens.length === 0 ? (
        <p className="text-gray-500">No programmable tokens yet.</p>
      ) : (
        <ul className="space-y-2">
          {programmableTokens.map((t) => (
            <li key={t.unit} className="bg-gray-800 rounded p-3">
              <div className="font-mono text-sm text-gray-300">
                Policy: {t.unit.slice(0, 56)}
              </div>
              <div className="text-gray-400">Quantity: {t.quantity}</div>
              <div className="text-yellow-500 text-xs mt-1">🔒 Soul-bound</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
