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
        className={`rounded-md p-2 transition-colors duration-200 ${
          isOpen
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile: Full-width fixed bottom sheet / Desktop: Dropdown */}
          <div
            ref={dropdownRef}
            className="
              fixed md:absolute 
              left-0 md:left-0 
              right-0 md:right-auto
              bottom-0 md:bottom-auto
              top-auto md:top-full 
              md:mt-2 
              z-50 
              w-full md:w-[580px] 
              max-h-[85vh] md:max-h-[80vh]
              rounded-t-3xl md:rounded-2xl 
              bg-[#0a0d14] 
              border border-white/10 
              shadow-2xl shadow-black/50 
              overflow-hidden 
              animate-in 
              slide-in-from-bottom md:slide-in-from-top-2 
              fade-in 
              duration-300
            "
          >
            {/* Mobile drag handle */}
            <div className="md:hidden flex justify-center py-3">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(85vh-3rem)] md:max-h-[80vh]">
              {/* Products Section */}
              <div className="p-5 md:p-6">
                <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                  Products
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 md:gap-4 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors group"
                    >
                      {/* Icon container */}
                      <div className="w-10 h-10 shrink-0 rounded-xl border border-[#f48656]/50 bg-[#f48656]/10 flex items-center justify-center text-[#f48656] group-hover:bg-[#f48656]/20 transition-colors">
                        {getIcon(product.icon)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium text-sm truncate">{product.name}</div>
                        <div className="text-white/40 text-xs truncate">{product.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-5 md:mx-6 border-t border-white/10" />

              {/* Links Section */}
              <div className="p-5 md:p-6 grid grid-cols-2 gap-6 md:gap-8">
                {/* Explorer */}
                <div>
                  <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3 md:mb-4">
                    Explorer
                  </h3>
                  <ul className="space-y-2.5 md:space-y-3">
                    {explorerLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-sm transition-colors block py-1 ${
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
                  <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3 md:mb-4">
                    Company
                  </h3>
                  <ul className="space-y-2.5 md:space-y-3">
                    {companyLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-white hover:text-white/70 transition-colors block py-1"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile close button */}
              <div className="md:hidden p-5 pt-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 active:bg-white/15 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
