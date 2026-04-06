import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Area font - используется как sans-serif
const fontArea = localFont({
  src: [
    {
      path: '../public/fonts/Area-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Area-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Area-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-area',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

// Whyte font - используется как serif/display
const fontWhyte = localFont({
  src: [
    {
      path: '../public/fonts/Whyte-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Whyte-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Whyte-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-whyte',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const viewport: Viewport = {
  themeColor: '#D6448F',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'AI Blog | Latest Articles on Artificial Intelligence',
  description:
    'Your source for the latest insights on artificial intelligence, machine learning, and emerging technologies.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontArea.variable} ${fontWhyte.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
