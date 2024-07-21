import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'
import { Provider } from '@/components'

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo Shop App',
    default: 'Teslo Shop App'
  },
  description: 'Teslo Shop Ecommerce App with Next.js 14 with app router'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
