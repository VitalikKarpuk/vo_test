'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '@/lib/graphql/articles'

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
      }, 420)
    },
    [isAnimating],
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % total, 'next')
  }, [current, total, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total, 'prev')
  }, [current, total, goTo])

  // Auto-advance every 5 seconds
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

  const handlePrev = () => {
    goPrev()
    resetTimer()
  }

  const handleNext = () => {
    goNext()
    resetTimer()
  }

  const handleDot = (i: number) => {
    if (i === current) return
    goTo(i, i > current ? 'next' : 'prev')
    resetTimer()
  }

  const post = posts[current]
  const category = post.categories?.split(',')[0] || 'Article'

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm group">
      {/* 16:9 image */}
      <div className="relative w-full aspect-video overflow-hidden">
        {post.coverSrc ? (
          <Image
            key={post.id}
            src={post.coverSrc}
            alt={post.title}
            fill
            className={[
              'object-cover transition-all duration-500',
              isAnimating
                ? direction === 'next'
                  ? 'opacity-0 scale-105 translate-x-4'
                  : 'opacity-0 scale-105 -translate-x-4'
                : 'opacity-100 scale-100 translate-x-0',
            ].join(' ')}
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        ) : (
          <div className="absolute inset-0 ai-gradient" />
        )}

        {/* Nav arrows — visible on hover */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-border/40 shadow-md flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 focus-visible:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-border/40 shadow-md flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 focus-visible:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide counter badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium tabular-nums">
          {current + 1} / {total}
        </div>
      </div>

      {/* Info panel below the image — no overlay on the image */}
      <div
        className={[
          'p-5 md:p-6 transition-all duration-420',
          isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
        ].join(' ')}
      >
        <Link href={`/blog/${post.slug}`} className="group/link block">
          <div className="flex items-center gap-3 mb-3">
            <span className="featured-badge">Featured</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {category}
            </span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground leading-snug text-balance mb-2 group-hover/link:text-primary transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full ai-gradient flex items-center justify-center text-white text-xs font-bold">
                    {post.author[0]}
                  </span>
                  <span className="font-medium text-foreground">{post.author}</span>
                </span>
              )}
              <span>·</span>
              <time>{formatDate(post.date)}</time>
            </div>

            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover/link:gap-2 transition-all">
              Read more
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Dot navigation */}
        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-border/40">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground',
              ].join(' ')}
            />
          ))}

          {/* Progress bar */}
          <div className="flex-1 h-1 ml-2 rounded-full bg-border overflow-hidden">
            <div
              key={current}
              className="h-full bg-primary rounded-full"
              style={{ animation: 'slider-progress 5s linear forwards' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slider-progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
