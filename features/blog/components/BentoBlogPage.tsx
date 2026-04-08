'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import CategoryBadge from './CategoryBadge'
import Header from '@/components/header'
import { formatDate, stripMdx } from '../utils'

interface BentoBlogPageProps {
  posts: MappedPost[]
  basePath?: string
  blogName?: string
  showHeader?: boolean
  showFooter?: boolean
}

export default function BentoBlogPage({ 
  posts, 
  basePath = '/blog',
  blogName = 'AI Blog',
  showHeader = true,
  showFooter = true,
}: BentoBlogPageProps) {
  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        {showHeader && <Header basePath={basePath} blogName={blogName} />}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <EmptyState />
        </section>
        {showFooter && <Footer basePath={basePath} blogName={blogName} />}
      </main>
    )
  }

  // Split posts for bento layout
  const heroPost = posts[0]
  const featuredPosts = posts.slice(1, 3)
  const midPosts = posts.slice(3, 7)
  const bottomPosts = posts.slice(7, 13)
  const morePosts = posts.slice(13)

  return (
    <main className="min-h-screen bg-background">
      {showHeader && <Header basePath={basePath} blogName={blogName} />}

      {/* Hero Bento Section */}
      <section className="px-4 pt-8 pb-6">
        <div className="mx-auto max-w-7xl">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Featured
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          {/* Hero Bento Grid - 2 rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* Main Hero - Large card spanning left side */}
            {heroPost && (
              <div className="lg:col-span-7 lg:row-span-2">
                <BentoCard 
                  post={heroPost} 
                  basePath={basePath}
                  variant="hero"
                  className="h-full min-h-[400px] lg:min-h-[520px]"
                />
              </div>
            )}

            {/* Right side - 2 medium cards stacked */}
            {featuredPosts.map((post, index) => (
              <div key={post.id} className="lg:col-span-5">
                <BentoCard 
                  post={post} 
                  basePath={basePath}
                  variant="medium"
                  className="h-full min-h-[200px] lg:min-h-[250px]"
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid Section - 4 cards in a row */}
      {midPosts.length > 0 && (
        <section className="px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--link))] animate-pulse-glow" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--link))]">
                  Latest Articles
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[hsl(var(--link))]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {midPosts.map((post, index) => (
                <BentoCard 
                  key={post.id}
                  post={post} 
                  basePath={basePath}
                  variant="standard"
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Bento Grid - Mixed sizes */}
      {bottomPosts.length > 0 && (
        <section className="px-4 py-6 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  More to Explore
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* First row - 3 cards: wide, standard, standard */}
              {bottomPosts[0] && (
                <div className="lg:col-span-6">
                  <BentoCard 
                    post={bottomPosts[0]} 
                    basePath={basePath}
                    variant="wide"
                    className="h-full"
                  />
                </div>
              )}
              {bottomPosts[1] && (
                <div className="lg:col-span-3">
                  <BentoCard 
                    post={bottomPosts[1]} 
                    basePath={basePath}
                    variant="compact"
                    className="h-full"
                    index={1}
                  />
                </div>
              )}
              {bottomPosts[2] && (
                <div className="lg:col-span-3">
                  <BentoCard 
                    post={bottomPosts[2]} 
                    basePath={basePath}
                    variant="compact"
                    className="h-full"
                    index={2}
                  />
                </div>
              )}

              {/* Second row - 3 cards: standard, standard, wide */}
              {bottomPosts[3] && (
                <div className="lg:col-span-3">
                  <BentoCard 
                    post={bottomPosts[3]} 
                    basePath={basePath}
                    variant="compact"
                    className="h-full"
                    index={3}
                  />
                </div>
              )}
              {bottomPosts[4] && (
                <div className="lg:col-span-3">
                  <BentoCard 
                    post={bottomPosts[4]} 
                    basePath={basePath}
                    variant="compact"
                    className="h-full"
                    index={4}
                  />
                </div>
              )}
              {bottomPosts[5] && (
                <div className="lg:col-span-6">
                  <BentoCard 
                    post={bottomPosts[5]} 
                    basePath={basePath}
                    variant="wide"
                    className="h-full"
                    index={5}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Remaining posts - Simple grid */}
      {morePosts.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Archive
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {morePosts.map((post, index) => (
                <BentoCard 
                  key={post.id}
                  post={post} 
                  basePath={basePath}
                  variant="minimal"
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {showFooter && <Footer basePath={basePath} blogName={blogName} />}
    </main>
  )
}

// ─── Bento Card Component ──────────────────────────────────────────────────────

type BentoVariant = 'hero' | 'medium' | 'standard' | 'wide' | 'compact' | 'minimal'

interface BentoCardProps {
  post: MappedPost
  basePath: string
  variant: BentoVariant
  className?: string
  index?: number
}

function BentoCard({ post, basePath, variant, className = '', index = 0 }: BentoCardProps) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')

  const variants = {
    hero: {
      wrapper: 'group relative rounded-3xl overflow-hidden bg-card',
      imageAspect: 'absolute inset-0',
      showOverlay: true,
      overlayClass: 'hero-card-overlay',
      contentPosition: 'absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10',
      titleClass: 'font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3',
      excerptClass: 'text-white/80 text-sm md:text-base line-clamp-2 mb-4',
      showExcerpt: true,
      showMeta: true,
      metaClass: 'text-white/60',
      badgeVariant: 'light' as const,
    },
    medium: {
      wrapper: 'group relative rounded-2xl overflow-hidden bg-card',
      imageAspect: 'absolute inset-0',
      showOverlay: true,
      overlayClass: 'card-overlay',
      contentPosition: 'absolute bottom-0 left-0 right-0 p-5 z-10',
      titleClass: 'font-serif text-lg md:text-xl font-semibold text-white leading-snug mb-2',
      excerptClass: 'text-white/70 text-sm line-clamp-2',
      showExcerpt: true,
      showMeta: true,
      metaClass: 'text-white/50',
      badgeVariant: 'light' as const,
    },
    standard: {
      wrapper: 'group ai-card rounded-2xl overflow-hidden bg-card border border-border/50 flex flex-col',
      imageAspect: 'aspect-video',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-4',
      titleClass: 'font-serif text-base font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2',
      excerptClass: 'text-muted-foreground text-sm line-clamp-2 mb-3',
      showExcerpt: true,
      showMeta: true,
      metaClass: 'text-muted-foreground',
      badgeVariant: 'default' as const,
    },
    wide: {
      wrapper: 'group relative rounded-2xl overflow-hidden bg-card flex flex-col md:flex-row min-h-[200px]',
      imageAspect: 'aspect-video md:aspect-auto md:w-1/2 md:absolute md:inset-y-0 md:left-0',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-5 flex flex-col justify-center md:w-1/2 md:ml-auto',
      titleClass: 'font-serif text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2',
      excerptClass: 'text-muted-foreground text-sm line-clamp-2 mb-3',
      showExcerpt: true,
      showMeta: true,
      metaClass: 'text-muted-foreground',
      badgeVariant: 'default' as const,
    },
    compact: {
      wrapper: 'group ai-card rounded-xl overflow-hidden bg-card border border-border/50 flex flex-col',
      imageAspect: 'aspect-[4/3]',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-4',
      titleClass: 'font-serif text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors',
      excerptClass: '',
      showExcerpt: false,
      showMeta: true,
      metaClass: 'text-muted-foreground',
      badgeVariant: 'default' as const,
    },
    minimal: {
      wrapper: 'group ai-card rounded-xl overflow-hidden bg-card border border-border/40 flex flex-col',
      imageAspect: 'aspect-video',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-3',
      titleClass: 'font-serif text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors',
      excerptClass: '',
      showExcerpt: false,
      showMeta: false,
      metaClass: '',
      badgeVariant: 'default' as const,
    },
  }

  const v = variants[variant]

  return (
    <Link 
      href={`${basePath}/${post.slug}`}
      className={`${v.wrapper} ${className} animate-fade-up`}
      style={{ animationDelay: `${0.05 + index * 0.04}s` }}
    >
      {/* Image */}
      <div className={`relative ${v.imageAspect} overflow-hidden`}>
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={variant === 'hero' ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 640px) 100vw, 33vw'}
            priority={variant === 'hero'}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[hsl(var(--link))]/20" />
        )}
        
        {/* Overlay for hero/medium variants */}
        {v.showOverlay && (
          <div className={`absolute inset-0 ${v.overlayClass}`} />
        )}
      </div>

      {/* Content */}
      <div className={v.contentPosition}>
        {/* Category Badge */}
        {category && (
          <div className="mb-2">
            <CategoryBadge category={category} variant={v.badgeVariant} />
          </div>
        )}

        {/* Title */}
        <h3 className={v.titleClass}>
          {post.title}
        </h3>

        {/* Excerpt */}
        {v.showExcerpt && plainExcerpt && (
          <p className={v.excerptClass}>
            {plainExcerpt}
          </p>
        )}

        {/* Meta */}
        {v.showMeta && (
          <div className={`flex items-center gap-2 text-xs ${v.metaClass} mt-auto pt-2`}>
            {post.author && (
              <>
                <span className="font-medium">{post.author}</span>
                <span>·</span>
              </>
            )}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        )}
      </div>
    </Link>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-20 animate-fade-up">
      <div className="mx-auto w-20 h-20 rounded-2xl ai-gradient flex items-center justify-center mb-6 animate-float">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <h3 className="font-serif text-2xl font-medium text-foreground mb-3">No articles yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Check back soon for new content about AI and technology.
      </p>
    </div>
  )
}

function Footer({ basePath, blogName }: { basePath: string; blogName: string }) {
  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href={basePath} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
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
              <span className="font-serif text-xl font-semibold text-foreground">{blogName}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Discover the latest insights about AI and technology.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'].map((item) => (
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
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((item) => (
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

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Built with AI and attention to detail</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Powered by</span>
            <span className="ai-gradient-text font-semibold">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
