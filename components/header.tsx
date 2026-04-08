'use client'

import Link from 'next/link'
import HeaderDropdown from './header-dropdown'

interface HeaderProps {
  basePath?: string
  blogName?: string
  showNav?: boolean
  showSearch?: boolean
  showSubscribe?: boolean
  navItems?: string[]
}

export default function Header({
  basePath = '/blog',
  blogName = 'AI Blog',
  showNav = true,
  showSearch = true,
  showSubscribe = true,
  navItems = ['Articles', 'Tutorials', 'News', 'Research'],
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={basePath} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              {blogName}
            </span>
          </Link>
          
          {/* Dropdown menu icon */}
          <HeaderDropdown />
        </div>

        {showNav && (
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`${basePath}/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {showSearch && (
            <button
              className="p-2 text-muted-foreground transition-colors hover:text-primary"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          )}
          {showSubscribe && (
            <button className="btn-primary text-sm py-2 px-4 rounded-xl hidden sm:block">
              Subscribe
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
