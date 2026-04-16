'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import type { MappedPost } from '../types'

export interface BlogMarqueeTickerProps {
  posts: MappedPost[]
  basePath?: string
  /** Short label on the rail (crypto / product “signal” vibe) */
  feedLabel?: string
  /** Take newest N posts for the strip */
  limit?: number
  /** Full horizontal loop duration in seconds (higher = slower) */
  durationSec?: number
  className?: string
}

function firstCategory(categories?: string) {
  return categories?.split(',')[0]?.trim() ?? null
}

const marqueeLinkFocus =
  'outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

export default function BlogMarqueeTicker({
  posts,
  basePath = '/blog',
  feedLabel = 'Latest Updates',
  limit = 14,
  durationSec = 20,
  className,
}: BlogMarqueeTickerProps) {
  const [paused, setPaused] = useState(false)

  if (posts.length === 0) return null

  const slice = posts.slice(0, Math.min(limit, posts.length))
  const loopItems = [...slice, ...slice]

  return (
    <div
      role="region"
      aria-label="Latest blockchain headlines, scrolling"
      className={['blog-marquee-ticker relative w-full overflow-hidden bg-slate-900! border-y border-slate-700', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="group/blog-marquee flex w-full min-w-0 items-stretch">
        <div className="relative flex min-h-10 shrink-0 items-center gap-2 border-r border-slate-700 bg-slate-800 px-3 py-2 sm:px-4 sm:py-3">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="font-sans text-xs font-medium uppercase tracking-wide text-slate-200">
            {feedLabel}
          </span>
        </div>

        <div className="relative min-h-10 min-w-0 flex-1 overflow-hidden">
          <div
            className="blog-marquee-ticker__fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-12 bg-gradient-to-r from-slate-900 to-transparent"
            aria-hidden
          />
          <div
            className="blog-marquee-ticker__fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-12 bg-gradient-to-l from-slate-900 to-transparent"
            aria-hidden
          />

          <div className="flex h-full min-h-10 items-center py-2 sm:py-3">
            <div className="hidden flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2 motion-reduce:flex sm:gap-x-4 sm:gap-y-2 sm:px-6 sm:py-4">
              {slice.map((post) => (
                <Link
                  key={post.id}
                  href={`${basePath}/${post.slug}`}
                  className={`flex max-w-[min(100%,22rem)] items-center truncate rounded-md bg-slate-800 px-3 py-1.5 font-sans text-sm text-slate-200 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline ${marqueeLinkFocus}`}
                >
                  {post.title}
                </Link>
              ))}
            </div>

            <div
              className="blog-marquee-track flex w-max items-center py-2 will-change-transform motion-reduce:hidden sm:py-3"
              style={{
                '--blog-marquee-duration': `${durationSec}s`,
                animationPlayState: paused ? 'paused' : 'running'
              } as CSSProperties}
            >
              {loopItems.map((post, index) => {
                const category = firstCategory(post.categories)
                return (
                  <span key={`${post.id}-${index}`} className="flex shrink-0 items-center">
                    <Link
                      href={`${basePath}/${post.slug}`}
                      className={`group/marquee-item flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 transition-colors duration-300 hover:text-primary ${marqueeLinkFocus} sm:gap-3 sm:px-4 sm:py-2`}
                      onMouseEnter={() => setPaused(true)}
                      onMouseLeave={() => setPaused(false)}
                    >
                      {category && (
                        <span className="mb-1 inline-flex h-5 shrink-0 items-center rounded-full border border-slate-600 bg-slate-700 px-1.5 font-sans text-[9px] font-medium uppercase leading-none tracking-wide text-slate-400 sm:px-2">
                          {category}
                        </span>
                      )}
                      <span className="max-w-[75vw] min-w-0 shrink truncate font-sans text-sm font-normal leading-snug tracking-tight text-slate-200 transition-colors duration-300 group-hover/marquee-item:text-primary sm:max-w-lg">
                        {post.title}
                      </span>
                    </Link>
                    <span
                      className="mx-2 inline-block h-3 w-px shrink-0 bg-slate-600 sm:mx-3 sm:h-4"
                      aria-hidden
                    />
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
