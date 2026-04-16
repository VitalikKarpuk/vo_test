'use client'

import { useEffect, useState, useRef } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface Props {
  contentSelector?: string
}

export default function TableOfContents({ contentSelector = '.article-body' }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = document.querySelector(contentSelector)
    if (!container) return

    const elements = Array.from(
      container.querySelectorAll('h2, h3, h4'),
    ) as HTMLHeadingElement[]

    const parsed: Heading[] = elements.map((el, i) => {
      if (!el.id) el.id = `heading-${i}`
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName[1]),
      }
    })

    setHeadings(parsed)
    if (parsed.length > 0) setActiveId(parsed[0].id)

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [contentSelector])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const offset = 56 // header height (h-14 = 3.5rem = 56px) + 8px gap
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 8
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
  }

  if (headings.length === 0) return null

  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = headings.length > 0 ? Math.round(((activeIndex + 1) / headings.length) * 100) : 0

  return (
    <aside className="sticky top-24 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/20">
        <div className="w-1 h-4 rounded-full bg-primary/70 shrink-0" />
        <span className="text-[0.6875rem] font-sans font-bold uppercase tracking-widest text-muted-foreground">
          On this page
        </span>
      </div>

      {/* Nav list with left rail */}
      <nav aria-label="Table of contents">
        <ul className="relative space-y-0">
          {/* Background rail */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/25" />

          {headings.map((h) => {
            const isActive = h.id === activeId
            const indent =
              h.level === 2 ? 'pl-3' : h.level === 3 ? 'pl-6' : 'pl-9'

            return (
              <li key={h.id} className="relative">
                {/* Active highlight on rail */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-px bg-primary transition-none" />
                )}
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={[
                    'block py-1.5 text-[0.8125rem] leading-snug transition-colors duration-150',
                    indent,
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground/55 hover:text-muted-foreground',
                  ].join(' ')}
                >
                  <span className="line-clamp-2">{h.text}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
