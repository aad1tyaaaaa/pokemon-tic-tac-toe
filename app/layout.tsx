import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: 'Pokemon Tic-Tac-Toe - Minimax AI Challenge',
  description: 'Play 4x4 Tic-Tac-Toe against an unbeatable Minimax AI powered by Pokemon characters',
  generator: 'v0.app',
  icons: {
    icon: '/mew.png',
    apple: '/mew.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-pink-300">
      <body className={`${pressStart2P.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
