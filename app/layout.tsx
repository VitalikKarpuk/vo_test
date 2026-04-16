import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Whyte — display / headings
const fontWhyte = localFont({
  src: [
    {
      path: '../public/fonts/Whyte-Light_1.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Whyte-Regular_1.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Whyte-Medium_1.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Whyte-Bold_1.ttf',
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
    <html
      lang="en"
      className={`${fontInter.variable} ${fontWhyte.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
