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
      <section className="px-4 pt-10 pb-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Label - Neobrutalist */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-primary border-2 border-foreground" />
              <h2 className="neo-subheading text-lg text-foreground">
                Featured
              </h2>
            </div>
            <div className="flex-1 h-1 bg-foreground" />
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
        <section className="px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 bg-[hsl(var(--link))] border-2 border-foreground" />
                <h2 className="neo-subheading text-lg text-foreground">
                  Latest Articles
                </h2>
              </div>
              <div className="flex-1 h-1 bg-foreground" />
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
        <section className="px-4 py-10 neo-stripes">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 bg-primary border-2 border-foreground" />
                <h2 className="neo-subheading text-lg text-foreground">
                  More to Explore
                </h2>
              </div>
              <div className="flex-1 h-1 bg-foreground" />
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
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 bg-muted-foreground border-2 border-foreground" />
                <h2 className="neo-subheading text-lg text-foreground">
                  Archive
                </h2>
              </div>
              <div className="flex-1 h-1 bg-foreground/30" />
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
  
  // Estimate reading time (rough: 200 words per minute)
  const wordCount = (post.excerpt || '').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 40))

  // NEOBRUTALIST VARIANTS
  const variants = {
    hero: {
      wrapper: 'group relative neo-card-primary overflow-hidden bg-card',
      imageWrapper: 'neo-image-frame',
      imageAspect: 'absolute inset-0',
      showOverlay: true,
      overlayClass: 'bg-gradient-to-t from-[hsl(var(--secondary-hsl))] via-[hsl(var(--secondary-hsl)/0.4)] to-transparent',
      contentPosition: 'absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10',
      titleClass: 'neo-heading font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-none mb-4',
      excerptClass: 'text-white/90 text-base md:text-lg line-clamp-2 mb-5 max-w-xl',
      showExcerpt: true,
      showMeta: true,
      showReadMore: true,
      metaClass: 'text-white/70',
      badgeClass: 'neo-badge',
    },
    medium: {
      wrapper: 'group relative neo-card overflow-hidden bg-card',
      imageWrapper: 'neo-image-frame',
      imageAspect: 'absolute inset-0',
      showOverlay: true,
      overlayClass: 'bg-gradient-to-t from-[hsl(var(--secondary-hsl))] via-[hsl(var(--secondary-hsl)/0.3)] to-transparent',
      contentPosition: 'absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10',
      titleClass: 'neo-heading font-serif text-xl md:text-2xl text-white leading-tight mb-2',
      excerptClass: 'text-white/80 text-sm line-clamp-2 mb-3',
      showExcerpt: true,
      showMeta: true,
      showReadMore: false,
      metaClass: 'text-white/60',
      badgeClass: 'neo-badge',
    },
    standard: {
      wrapper: 'group neo-card neo-stack overflow-hidden bg-card flex flex-col',
      imageWrapper: '',
      imageAspect: 'aspect-video',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-5 flex flex-col flex-1',
      titleClass: 'neo-title font-serif text-lg font-bold text-foreground leading-snug line-clamp-2 mb-3',
      excerptClass: 'text-muted-foreground text-sm line-clamp-2 mb-4 flex-1',
      showExcerpt: true,
      showMeta: true,
      showReadMore: true,
      metaClass: 'text-muted-foreground',
      badgeClass: 'neo-badge-outline',
    },
    wide: {
      wrapper: 'group neo-card overflow-hidden bg-card flex flex-col md:flex-row min-h-[220px]',
      imageWrapper: '',
      imageAspect: 'aspect-video md:aspect-auto md:w-1/2 relative',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-5 md:p-6 flex flex-col justify-center md:w-1/2',
      titleClass: 'neo-title font-serif text-xl font-bold text-foreground leading-snug line-clamp-2 mb-3',
      excerptClass: 'text-muted-foreground text-sm line-clamp-2 mb-4',
      showExcerpt: true,
      showMeta: true,
      showReadMore: true,
      metaClass: 'text-muted-foreground',
      badgeClass: 'neo-badge-outline',
    },
    compact: {
      wrapper: 'group neo-card neo-tilt overflow-hidden bg-card flex flex-col',
      imageWrapper: '',
      imageAspect: 'aspect-[4/3]',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-4 flex flex-col flex-1',
      titleClass: 'neo-title font-serif text-sm font-bold text-foreground leading-snug line-clamp-2 mb-2',
      excerptClass: '',
      showExcerpt: false,
      showMeta: true,
      showReadMore: false,
      metaClass: 'text-muted-foreground',
      badgeClass: 'neo-badge-outline',
    },
    minimal: {
      wrapper: 'group neo-card overflow-hidden bg-card flex flex-col',
      imageWrapper: '',
      imageAspect: 'aspect-video',
      showOverlay: false,
      overlayClass: '',
      contentPosition: 'p-4',
      titleClass: 'neo-title font-serif text-sm font-bold text-foreground leading-snug line-clamp-2',
      excerptClass: '',
      showExcerpt: false,
      showMeta: false,
      showReadMore: false,
      metaClass: '',
      badgeClass: 'neo-badge-outline',
    },
  }

  const v = variants[variant]

  return (
    <Link 
      href={`${basePath}/${post.slug}`}
      className={`${v.wrapper} ${className} neo-focus animate-fade-up block`}
      style={{ animationDelay: `${0.05 + index * 0.06}s` }}
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image */}
      <div className={`relative ${v.imageAspect} overflow-hidden ${v.imageWrapper}`}>
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={variant === 'hero' ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 640px) 100vw, 33vw'}
            priority={variant === 'hero'}
          />
        ) : (
          <div className="absolute inset-0 neo-checker" />
        )}
        
        {/* Overlay for hero/medium variants */}
        {v.showOverlay && (
          <div className={`absolute inset-0 ${v.overlayClass}`} />
        )}

        {/* Reading time pill on image */}
        {(variant === 'hero' || variant === 'medium') && (
          <div className="absolute top-4 right-4 z-10">
            <span className="neo-pill">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              {readTime} min
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={v.contentPosition}>
        {/* Category Badge */}
        {category && (
          <div className="mb-3">
            <span className={v.badgeClass}>{category}</span>
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

        {/* Meta + Read More */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {v.showMeta && (
            <div className={`flex items-center gap-2 text-xs ${v.metaClass}`}>
              {post.author && (
                <span className="font-bold">{post.author}</span>
              )}
              {post.author && <span className="font-bold">·</span>}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          )}

          {v.showReadMore && (
            <div className={`flex items-center gap-1 text-sm font-bold ${variant === 'hero' || variant === 'medium' ? 'text-white' : 'text-primary'}`}>
              <span>Read</span>
              <svg className="w-4 h-4 neo-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
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
    <footer className="border-t-4 border-foreground bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href={basePath} className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 bg-primary border-3 border-foreground flex items-center justify-center group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0_hsl(var(--secondary-hsl))] transition-all">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <span className="neo-heading font-serif text-2xl text-foreground">{blogName}</span>
            </Link>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              Bold insights about AI and technology. No fluff, just substance.
            </p>
          </div>

          <div>
            <h4 className="neo-subheading text-sm text-foreground mb-5 pb-2 border-b-2 border-foreground inline-block">Categories</h4>
            <ul className="space-y-3 mt-2">
              {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'].map((item) => (
                <li key={item}>
                  <Link
                    href={basePath}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-2 decoration-primary transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="neo-subheading text-sm text-foreground mb-5 pb-2 border-b-2 border-foreground inline-block">Connect</h4>
            <ul className="space-y-3 mt-2">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-2 decoration-primary transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-4 border-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-foreground">Built with intention</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Powered by</span>
            <span className="neo-badge">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
