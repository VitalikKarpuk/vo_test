'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import { stripMdx } from '../utils'

interface CleanBlogPageProps {
  posts: MappedPost[]
  basePath?: string
  blogName?: string
}

// UTC-safe date formatting to avoid hydration mismatch
function formatDateUTC(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// Estimate reading time
function getReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Extract unique categories from posts
function extractCategories(posts: MappedPost[]): string[] {
  const categories = new Set<string>()
  posts.forEach(post => {
    if (post.categories) {
      post.categories.split(',').forEach(cat => {
        const trimmed = cat.trim()
        if (trimmed) categories.add(trimmed)
      })
    }
  })
  return ['All', ...Array.from(categories).slice(0, 5)]
}

export default function CleanBlogPage({
  posts,
  basePath = '/blog',
  blogName = 'Blog',
}: CleanBlogPageProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = extractCategories(posts)
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.categories?.toLowerCase().includes(activeCategory.toLowerCase()))

  // Split posts into sections
  const featuredPost = filteredPosts[0]
  const sidePosts = filteredPosts.slice(1, 3)
  const gridPosts = filteredPosts.slice(3)

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Horizontal Scrolling News Ticker */}
      <NewsTicker posts={posts} basePath={basePath} />

      <main className="relative">
        {/* Page Header */}
        <section className="px-4 pt-10 pb-8 md:pt-14 md:pb-12">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#101828] mb-3 font-serif">
              {blogName}
            </h1>
            <p className="text-[#4a5565] text-base md:text-lg">
              Insights on design, technology, and innovation
            </p>
          </div>
        </section>

        {/* Hero Section - Featured Layout (1 Large + 2 Small) */}
        {featuredPost && (
          <section className="px-4 pb-10">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Featured Card - Large */}
                <div className="lg:col-span-7">
                  <FeaturedCard post={featuredPost} basePath={basePath} variant="large" />
                </div>
                
                {/* Side Cards - Stacked */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {sidePosts.map((post, index) => (
                    <FeaturedCard key={post.id} post={post} basePath={basePath} variant="small" index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeCategory === category
                      ? 'bg-[#d6438f] text-white'
                      : 'bg-transparent text-[#4a5565] hover:bg-[#f3f4f6]'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid - 3 columns */}
        {gridPosts.length > 0 && (
          <section className="px-4 py-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post, index) => (
                  <ArticleCard key={post.id} post={post} basePath={basePath} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl text-center">
              <p className="text-[#6a7282] text-lg">No articles found in this category.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-[#d6438f] font-medium hover:underline"
              >
                View all articles
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer blogName={blogName} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   NEWS TICKER - Horizontal scrolling news bar
   ═══════════════════════════════════════════════════════════════════════════════ */

interface NewsTickerProps {
  posts: MappedPost[]
  basePath: string
}

function NewsTicker({ posts, basePath }: NewsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll animation
  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    let animationId: number
    let scrollPos = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPos += scrollSpeed
      if (scrollPos >= ticker.scrollWidth / 2) {
        scrollPos = 0
      }
      ticker.scrollLeft = scrollPos
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate) }

    ticker.addEventListener('mouseenter', handleMouseEnter)
    ticker.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      ticker.removeEventListener('mouseenter', handleMouseEnter)
      ticker.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Duplicate posts for seamless loop
  const tickerItems = [...posts, ...posts]

  return (
    <div className="bg-[#101828] text-white overflow-hidden">
      <div 
        ref={tickerRef}
        className="flex items-center gap-8 py-3 px-4 overflow-x-hidden whitespace-nowrap"
      >
        {tickerItems.map((post, index) => {
          const category = post.categories?.split(',')[0]?.trim()
          return (
            <Link
              key={`${post.id}-${index}`}
              href={`${basePath}/${post.slug}`}
              className="flex items-center gap-3 shrink-0 group"
            >
              {category && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#d6438f] text-white rounded">
                  {category}
                </span>
              )}
              <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                {post.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FEATURED CARD - Large and Small variants
   ═══════════════════════════════════════════════════════════════════════════════ */

interface FeaturedCardProps {
  post: MappedPost
  basePath: string
  variant: 'large' | 'small'
  index?: number
}

function FeaturedCard({ post, basePath, variant, index = 0 }: FeaturedCardProps) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')
  const readTime = getReadingTime(post.excerpt || post.title)

  const isLarge = variant === 'large'

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block h-full"
      aria-label={`Read article: ${post.title}`}
    >
      <article className="h-full flex flex-col">
        {/* Image - 16:9 aspect ratio */}
        <div className={`relative overflow-hidden rounded-xl bg-[#f3f4f6] ${isLarge ? 'aspect-[16/10]' : 'aspect-video'}`}>
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes={isLarge ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 40vw'}
              priority={isLarge || index < 2}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#d6438f]/20 to-[#364153]/20 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#d6438f]/20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isLarge ? 'pt-5' : 'pt-4'}`}>
          {/* Category Badge */}
          {category && (
            <div className="mb-2">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d6438f] bg-[#d6438f]/10 rounded">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className={`font-serif font-bold text-[#101828] leading-tight group-hover:text-[#d6438f] transition-colors ${isLarge ? 'text-xl md:text-2xl mb-3' : 'text-base mb-2'}`}>
            {post.title}
          </h3>

          {/* Excerpt - only on large */}
          {isLarge && plainExcerpt && (
            <p className="text-[#4a5565] text-sm line-clamp-2 mb-3">
              {plainExcerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#6a7282] mt-auto">
            <time dateTime={post.date}>{formatDateUTC(post.date)}</time>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              {readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE CARD - Grid card with 16:9 image
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ArticleCardProps {
  post: MappedPost
  basePath: string
  index: number
}

function ArticleCard({ post, basePath, index }: ArticleCardProps) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const readTime = getReadingTime(post.excerpt || post.title)

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block"
      style={{ animationDelay: `${0.05 * index}s` }}
      aria-label={`Read article: ${post.title}`}
    >
      <article className="flex flex-col">
        {/* Image - 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#f3f4f6]">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex items-center justify-center">
              <span className="text-4xl font-bold text-[#d6438f]/15">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-4">
          {/* Category Badge */}
          {category && (
            <div className="mb-2">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d6438f] bg-[#d6438f]/10 rounded">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-[#101828] leading-snug line-clamp-2 group-hover:text-[#d6438f] transition-colors mb-2">
            {post.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#6a7282]">
            <time dateTime={post.date}>{formatDateUTC(post.date)}</time>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              {readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════════ */

function Footer({ blogName }: { blogName: string }) {
  return (
    <footer className="border-t border-[#e5e7eb] bg-[#f9fafb]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6a7282]">
            © 2026 {blogName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
