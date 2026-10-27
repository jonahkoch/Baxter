'use client'

import { CardanoWallet, useWallet } from '@meshsdk/react'
import { MintSection } from '@/components/MintSection'
import { TokenInfo } from '@/components/TokenInfo'
import { TransferAttempt } from '@/components/TransferAttempt'
import { ClawbackSection } from '@/components/ClawbackSection'

export default function Home() {
  const { connected } = useWallet()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">CIP-113 POC</h1>
      <p className="text-gray-400 mb-6">
        Programmable soul-bound tokens with issuer clawback for PactVote
      </p>

      <div className="mb-8">
        <CardanoWallet />
      </div>

      {connected ? (
        <div className="space-y-6">
          <MintSection />
          <TokenInfo />
          <TransferAttempt />
          <ClawbackSection />
        </div>
      ) : (
        <p className="text-gray-500">Connect your wallet to interact with programmable tokens.</p>
      )}

      <footer className="mt-12 pt-6 border-t border-gray-800 text-gray-600 text-sm">
        <p>
          Built for PactVote token-gating exploration. Not production code.
        </p>
      </footer>
    </main>
  )
}
