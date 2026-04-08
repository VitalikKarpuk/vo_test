'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// Product items with icons
const products = [
  {
    name: 'Modo Public Explorer',
    description: 'Lorem ipsum',
    href: '/explorer/public',
    icon: 'globe',
  },
  {
    name: 'Modo Private Explorer',
    description: 'Lorem ipsum',
    href: '/explorer/private',
    icon: 'location',
  },
  {
    name: 'Modo Super-App',
    description: 'Lorem ipsum',
    href: '/super-app',
    icon: 'lightning',
  },
  {
    name: 'Modo API',
    description: 'Lorem ipsum',
    href: '/api',
    icon: 'target',
  },
]

const explorerLinks = [
  { name: 'Advertising', href: '/advertising' },
  { name: 'Get Listed', href: '/get-listed' },
  { name: 'Metahub', href: '/metahub' },
  { name: 'We are hiring!', href: '/careers', highlight: true },
]

const companyLinks = [
  { name: 'About Modo', href: '/about' },
  { name: 'Docs', href: '/docs' },
  { name: 'Blog', href: '/blog' },
]

// Icon components
function GlobeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function LightningIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function getIcon(iconName: string) {
  switch (iconName) {
    case 'globe':
      return <GlobeIcon />
    case 'location':
      return <LocationIcon />
    case 'lightning':
      return <LightningIcon />
    case 'target':
      return <TargetIcon />
    default:
      return <GlobeIcon />
  }
}

export default function HeaderDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isOpen
            ? 'bg-[#f48656]/10 text-[#f48656]'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu"
      >
        <GridIcon />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full mt-2 z-50 w-[calc(100vw-2rem)] md:w-[580px] rounded-2xl bg-[#0a0d14] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* Products Section */}
            <div className="p-6">
              <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    {/* Icon container with hexagonal-ish shape */}
                    <div className="w-10 h-10 rounded-xl border border-[#f48656]/50 bg-[#f48656]/10 flex items-center justify-center text-[#f48656] group-hover:bg-[#f48656]/20 transition-colors">
                      {getIcon(product.icon)}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{product.name}</div>
                      <div className="text-white/40 text-xs">{product.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-white/10" />

            {/* Links Section */}
            <div className="p-6 grid grid-cols-2 gap-8">
              {/* Explorer */}
              <div>
                <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                  Explorer
                </h3>
                <ul className="space-y-3">
                  {explorerLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm transition-colors ${
                          link.highlight
                            ? 'text-[#f48656] hover:text-[#f48656]/80'
                            : 'text-white hover:text-white/70'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white hover:text-white/70 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
