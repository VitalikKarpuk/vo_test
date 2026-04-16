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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-3.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={basePath} className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center border border-border bg-background transition-colors group-hover:bg-muted/60">
              <svg
                className="h-4 w-4 text-foreground/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <span className="font-serif text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {blogName}
            </span>
          </Link>

          <HeaderDropdown />
        </div>

        {showNav && (
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`${basePath}/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {showSearch && (
            <button
              type="button"
              className="p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
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
            <button
              type="button"
              className="hidden border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
