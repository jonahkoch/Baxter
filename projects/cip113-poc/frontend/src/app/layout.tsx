import { Providers } from './providers'

export const metadata = {
  title: 'CIP-113 POC — Programmable Tokens',
  description: 'Soul-bound tokens with clawback authority',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
