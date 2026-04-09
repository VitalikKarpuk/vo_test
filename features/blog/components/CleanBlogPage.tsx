'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import Header from '@/components/header'
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

export default function CleanBlogPage({
  posts,
  basePath = '/blog',
  blogName = 'Blog',
}: CleanBlogPageProps) {
  // Split posts into sections
  const featuredPosts = posts.slice(0, 3)
  const latestPosts = posts.slice(3, 9)
  const morePosts = posts.slice(9)

  return (
    <div className="min-h-screen bg-background">
      <Header basePath={basePath} blogName={blogName} />

      <main className="relative">
        {/* Hero Section - Featured Posts */}
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Featured
                </h2>
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
            </div>

            {/* Featured Grid - 3 cards with visible images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <FeaturedCard 
                  key={post.id} 
                  post={post} 
                  basePath={basePath} 
                  index={index}
                  isLarge={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        {latestPosts.length > 0 && (
          <section className="px-4 py-12 bg-card">
            <div className="mx-auto max-w-7xl">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[hsl(var(--link))] animate-pulse" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Latest Articles
                  </h2>
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[hsl(var(--link))]/40 to-transparent" />
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post, index) => (
                  <ArticleCard 
                    key={post.id} 
                    post={post} 
                    basePath={basePath} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More Articles */}
        {morePosts.length > 0 && (
          <section className="px-4 py-12">
            <div className="mx-auto max-w-7xl">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Archive
                  </h2>
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-muted-foreground/30 to-transparent" />
              </div>

              {/* Compact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {morePosts.map((post, index) => (
                  <CompactCard 
                    key={post.id} 
                    post={post} 
                    basePath={basePath} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="px-4 py-16 bg-gradient-to-br from-primary/5 via-[hsl(var(--link))]/5 to-transparent">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest articles delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer basePath={basePath} blogName={blogName} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FEATURED CARD - Large card with prominent 16:9 image
   ═══════════════════════════════════════════════════════════════════════════════ */

interface CardProps {
  post: MappedPost
  basePath: string
  index: number
  isLarge?: boolean
}

function FeaturedCard({ post, basePath, index, isLarge }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className={`
        group block rounded-2xl overflow-hidden bg-card border-2 border-border
        transition-all duration-300 ease-out
        hover:border-primary hover:shadow-xl hover:shadow-primary/10
        hover:translate-y-[-4px]
        ${isLarge ? 'lg:row-span-1' : ''}
      `}
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image Container - Fixed 16:9 aspect ratio */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[hsl(var(--link))]/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-primary text-white rounded-md shadow-lg shadow-primary/30">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-serif text-lg md:text-xl font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {plainExcerpt && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {plainExcerpt}
          </p>
        )}

        {/* Meta + Read More */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {post.author && (
              <span className="font-semibold">{post.author}</span>
            )}
            {post.author && <span>·</span>}
            <time dateTime={post.date}>{formatDateUTC(post.date)}</time>
          </div>

          <div className="flex items-center gap-1 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE CARD - Standard card with 16:9 image
   ═══════════════════════════════════════════════════════════════════════════════ */

function ArticleCard({ post, basePath, index }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="
        group block rounded-xl overflow-hidden bg-background border border-border
        transition-all duration-300 ease-out
        hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
        hover:translate-y-[-2px]
      "
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image Container - 16:9 */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-muted-foreground/30">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/90 backdrop-blur-sm text-foreground rounded border border-border">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {plainExcerpt && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {plainExcerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDateUTC(post.date)}</time>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   COMPACT CARD - Minimal card for archive
   ═══════════════════════════════════════════════════════════════════════════════ */

function CompactCard({ post, basePath, index }: CardProps) {
  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="
        group block rounded-lg overflow-hidden bg-card border border-border
        transition-all duration-200 ease-out
        hover:border-primary/30 hover:bg-primary/5
      "
      style={{ animationDelay: `${0.05 + index * 0.03}s` }}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image - 16:9 */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground/20">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-serif text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <time dateTime={post.date} className="text-xs text-muted-foreground mt-1 block">
          {formatDateUTC(post.date)}
        </time>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════════ */

function Footer({ basePath, blogName }: { basePath: string; blogName: string }) {
  return (
    <footer className="border-t-2 border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={basePath} className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
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
              <span className="font-serif text-xl font-bold text-foreground">{blogName}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Insights and articles about technology, design, and innovation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {['Technology', 'Design', 'Development', 'Research'].map((item) => (
                <li key={item}>
                  <Link
                    href={basePath}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {['Twitter', 'GitHub', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Built with care and attention to detail
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-semibold text-primary">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
