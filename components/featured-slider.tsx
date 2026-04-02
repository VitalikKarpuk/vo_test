'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '@/lib/graphql/articles'
import CategoryBadge from '@/components/category-badge'

interface Props {
  posts: MappedPost[]
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function FeaturedSlider({ posts }: Props) {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = posts.length

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (isAnimating) return
      setDirection(dir)
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setIsAnimating(false)
      }, 380)
    },
    [isAnimating],
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % total, 'next')
  }, [current, total, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total, 'prev')
  }, [current, total, goTo])

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [goNext])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(goNext, 5000)
  }, [goNext])

  const handlePrev = () => { goPrev(); resetTimer() }
  const handleNext = () => { goNext(); resetTimer() }
  const handleDot = (i: number) => {
    if (i === current) return
    goTo(i, i > current ? 'next' : 'prev')
    resetTimer()
  }

  const post = posts[current]
  // First category from comma-separated string
  const category = post.categories?.split(',')[0]?.trim() || null
  // Strip MDX/markdown for excerpt: remove headers, bold, links, code
  const plainExcerpt = (post.excerpt || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  return (
    <div className="w-full rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden group">
      <div className="flex flex-col md:flex-row">

        {/* Left: 16:9 image */}
        <div className="w-full md:w-[55%] shrink-0">
          {/* aspect-video = 16:9, position:relative so Image fill works */}
          <div className="relative w-full aspect-video overflow-hidden">
            {post.coverSrc ? (
              <Image
                key={`img-${post.id}`}
                src={post.coverSrc}
                alt={post.title}
                fill
                loading="eager"
                className={[
                  'object-cover transition-all duration-500 ease-out',
                  isAnimating
                    ? direction === 'next'
                      ? 'opacity-0 scale-[1.04] translate-x-3'
                      : 'opacity-0 scale-[1.04] -translate-x-3'
                    : 'opacity-100 scale-100 translate-x-0',
                ].join(' ')}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            ) : (
              <div className="absolute inset-0 ai-gradient" />
            )}

            {/* Prev / Next arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-border/40 shadow flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 focus-visible:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-border/40 shadow flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 focus-visible:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: text content */}
        <div
          className={[
            'flex flex-col justify-between p-5 md:p-7 flex-1 min-w-0 transition-all duration-380',
            isAnimating
              ? direction === 'next'
                ? 'opacity-0 translate-x-3'
                : 'opacity-0 -translate-x-3'
              : 'opacity-100 translate-x-0',
          ].join(' ')}
        >
          <div className="flex-1 flex flex-col">
            {/* Category */}
            {category && (
              <div className="mb-3">
                <CategoryBadge category={category} variant="default" />
              </div>
            )}

            {/* Title */}
            <Link href={`/blog/${post.slug}`} className="group/link block mb-3">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground leading-snug text-balance group-hover/link:text-primary transition-colors duration-200">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt — plain text (MDX stripped) */}
            {plainExcerpt && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {plainExcerpt}
              </p>
            )}

            {/* Author + date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
              {post.author && (
                <>
                  <span className="w-6 h-6 rounded-full ai-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {post.author[0]}
                  </span>
                  <span className="font-medium text-foreground truncate">{post.author}</span>
                  <span className="shrink-0">·</span>
                </>
              )}
              <time className="shrink-0">{formatDate(post.date)}</time>
            </div>
          </div>

          {/* Bottom: dots + progress + read link */}
          <div className="mt-5 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between gap-4">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={[
                      'rounded-full transition-all duration-300',
                      i === current
                        ? 'w-5 h-1.5 bg-primary'
                        : 'w-1.5 h-1.5 bg-border hover:bg-muted-foreground',
                    ].join(' ')}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-0.5 rounded-full bg-border overflow-hidden">
                <div
                  key={`progress-${current}`}
                  className="h-full bg-primary rounded-full"
                  style={{ animation: 'slider-progress 5s linear forwards' }}
                />
              </div>

              {/* Read more */}
              <Link
                href={`/blog/${post.slug}`}
                className="shrink-0 text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Read more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slider-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  )
}
