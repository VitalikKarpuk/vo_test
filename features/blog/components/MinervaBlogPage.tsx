'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import Header from '@/components/header'
import { formatDate, stripMdx } from '../utils'

interface MinervaBlogPageProps {
  posts: MappedPost[]
  basePath?: string
  blogName?: string
  showHeader?: boolean
  showFooter?: boolean
}

export default function MinervaBlogPage({ 
  posts, 
  basePath = '/blog',
  blogName = 'AI Blog',
  showHeader = true,
  showFooter = true,
}: MinervaBlogPageProps) {
  if (posts.length === 0) {
    return (
      <main className="min-h-screen minerva-bg text-white">
        {showHeader && <Header basePath={basePath} blogName={blogName} />}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <EmptyState />
        </section>
        {showFooter && <MinervaFooter basePath={basePath} blogName={blogName} />}
      </main>
    )
  }

  // Split posts for layout
  const heroPost = posts[0]
  const featuredPosts = posts.slice(1, 3)
  const latestPosts = posts.slice(3, 7)
  const morePosts = posts.slice(7, 13)
  const archivePosts = posts.slice(13)

  return (
    <main className="min-h-screen minerva-bg text-white">
      {showHeader && <Header basePath={basePath} blogName={blogName} />}

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-12 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="minerva-section-header mb-10">
            <span className="minerva-dot" />
            <h2>Featured Stories</h2>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Hero Card */}
            {heroPost && (
              <div className="lg:col-span-7 lg:row-span-2">
                <HeroCard post={heroPost} basePath={basePath} />
              </div>
            )}

            {/* Side Featured Cards */}
            {featuredPosts.map((post, idx) => (
              <div key={post.id} className="lg:col-span-5">
                <FeaturedCard post={post} basePath={basePath} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="minerva-card p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem number="150+" label="Articles" delay={0} />
              <StatItem number="50K+" label="Readers" delay={0.1} />
              <StatItem number="25+" label="Categories" delay={0.2} />
              <StatItem number="4.9" label="Avg Rating" delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="relative z-10 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="minerva-section-header">
              <span className="minerva-dot" />
              <h2>Latest Articles</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPosts.map((post, idx) => (
                <StandardCard key={post.id} post={post} basePath={basePath} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More to Explore - Bento Grid */}
      {morePosts.length > 0 && (
        <section className="relative z-10 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="minerva-section-header">
              <span className="minerva-dot" />
              <h2>More to Explore</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {morePosts[0] && (
                <div className="md:col-span-2">
                  <WideCard post={morePosts[0]} basePath={basePath} />
                </div>
              )}
              {morePosts[1] && (
                <CompactCard post={morePosts[1]} basePath={basePath} index={1} />
              )}
              {morePosts.slice(2, 5).map((post, idx) => (
                <CompactCard key={post.id} post={post} basePath={basePath} index={idx + 2} />
              ))}
              {morePosts[5] && (
                <div className="md:col-span-2">
                  <WideCard post={morePosts[5]} basePath={basePath} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Archive */}
      {archivePosts.length > 0 && (
        <section className="relative z-10 px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="minerva-section-header">
              <span className="minerva-dot" style={{ opacity: 0.5 }} />
              <h2>Archive</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {archivePosts.map((post, idx) => (
                <MinimalCard key={post.id} post={post} basePath={basePath} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 minerva-gradient-text">
            Stay Ahead of the Curve
          </h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Get the latest insights on AI and technology delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 w-full sm:w-80"
            />
            <button className="minerva-btn whitespace-nowrap">
              Subscribe
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {showFooter && <MinervaFooter basePath={basePath} blogName={blogName} />}
    </main>
  )
}

// ─── Card Components ───────────────────────────────────────────────────────────

interface CardProps {
  post: MappedPost
  basePath: string
  index?: number
}

function HeroCard({ post, basePath }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripMdx(post.excerpt || '')
  const wordCount = (post.excerpt || '').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 40))

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block h-full min-h-[480px] lg:min-h-[560px] minerva-hero-card minerva-lift minerva-glow relative overflow-hidden"
      aria-label={`Read: ${post.title}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 minerva-image-overlay">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[hsl(var(--link))]/20" />
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
        {/* Reading time */}
        <div className="absolute top-6 right-6 flex items-center gap-2 text-white/60 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          {readTime} min read
        </div>

        {/* Category */}
        {category && (
          <span className="minerva-badge mb-4 self-start">{category}</span>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          <span className="minerva-title-underline">{post.title}</span>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-white/70 text-lg line-clamp-2 mb-6 max-w-2xl">
            {excerpt}
          </p>
        )}

        {/* Meta + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/50 text-sm">
            {post.author && <span className="font-medium text-white/70">{post.author}</span>}
            {post.author && <span>·</span>}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          <div className="flex items-center gap-2 text-white font-semibold">
            Read Article
            <svg className="w-5 h-5 minerva-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeaturedCard({ post, basePath, index = 0 }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripMdx(post.excerpt || '')

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block h-full min-h-[260px] minerva-card minerva-glow relative overflow-hidden animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 minerva-image-overlay">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-[hsl(var(--link))]/10" />
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {category && (
          <span className="minerva-badge-outline mb-3 self-start">{category}</span>
        )}

        <h3 className="text-xl font-bold text-white leading-snug mb-2 line-clamp-2">
          <span className="minerva-title-underline">{post.title}</span>
        </h3>

        {excerpt && (
          <p className="text-white/60 text-sm line-clamp-2 mb-3">{excerpt}</p>
        )}

        <div className="flex items-center gap-2 text-white/40 text-xs">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </Link>
  )
}

function StandardCard({ post, basePath, index = 0 }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripMdx(post.excerpt || '')

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block minerva-card minerva-glow overflow-hidden animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Image - 16:9 */}
      <div className="relative aspect-video overflow-hidden">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {category && (
          <span className="minerva-badge-outline text-xs mb-3 inline-block">{category}</span>
        )}

        <h3 className="text-base font-semibold text-white leading-snug line-clamp-2 mb-2">
          <span className="minerva-title-underline">{post.title}</span>
        </h3>

        {excerpt && (
          <p className="text-white/50 text-sm line-clamp-2 mb-4">{excerpt}</p>
        )}

        <div className="flex items-center justify-between text-xs text-white/40">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <div className="flex items-center gap-1 text-white/60 group-hover:text-white transition-colors">
            Read
            <svg className="w-3.5 h-3.5 minerva-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

function WideCard({ post, basePath }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim()
  const excerpt = stripMdx(post.excerpt || '')

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block minerva-card minerva-glow overflow-hidden h-full"
      aria-label={`Read: ${post.title}`}
    >
      <div className="flex flex-col md:flex-row h-full min-h-[220px]">
        {/* Image */}
        <div className="relative aspect-video md:aspect-auto md:w-1/2 overflow-hidden">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-center md:w-1/2">
          {category && (
            <span className="minerva-badge-outline text-xs mb-3 self-start">{category}</span>
          )}

          <h3 className="text-xl font-semibold text-white leading-snug line-clamp-2 mb-3">
            <span className="minerva-title-underline">{post.title}</span>
          </h3>

          {excerpt && (
            <p className="text-white/50 text-sm line-clamp-2 mb-4">{excerpt}</p>
          )}

          <div className="flex items-center justify-between text-xs text-white/40 mt-auto">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <div className="flex items-center gap-1 text-white/60 group-hover:text-white transition-colors">
              Read More
              <svg className="w-3.5 h-3.5 minerva-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompactCard({ post, basePath, index = 0 }: CardProps) {
  const category = post.categories?.split(',')[0]?.trim()

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block minerva-card minerva-glow overflow-hidden animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.06}s` }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Image - 4:3 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
        )}
      </div>

      <div className="p-4">
        {category && (
          <span className="text-xs text-white/40 uppercase tracking-wider mb-2 block">{category}</span>
        )}
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          <span className="minerva-title-underline">{post.title}</span>
        </h3>
      </div>
    </Link>
  )
}

function MinimalCard({ post, basePath, index = 0 }: CardProps) {
  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group block p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all animate-fade-up"
      style={{ animationDelay: `${0.05 + index * 0.04}s` }}
      aria-label={`Read: ${post.title}`}
    >
      <h3 className="text-sm font-medium text-white/80 group-hover:text-white leading-snug line-clamp-2 mb-2 transition-colors">
        {post.title}
      </h3>
      <time dateTime={post.date} className="text-xs text-white/40">
        {formatDate(post.date)}
      </time>
    </Link>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatItem({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <div className="minerva-stat-item minerva-stat" style={{ animationDelay: `${delay}s` }}>
      <div className="number">{number}</div>
      <div className="label">{label}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20 animate-fade-up">
      <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--link))] flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">No articles yet</h3>
      <p className="text-white/50 max-w-md mx-auto">
        Check back soon for new content about AI and technology.
      </p>
    </div>
  )
}

function MinervaFooter({ basePath, blogName }: { basePath: string; blogName: string }) {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={basePath} className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--link))] flex items-center justify-center transition-transform group-hover:scale-105">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">{blogName}</span>
            </Link>
            <p className="text-white/50 max-w-sm leading-relaxed">
              Discover the latest insights about AI and emerging technologies. Bold ideas, clear explanations.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'].map((item) => (
                <li key={item}>
                  <Link href={basePath} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">Built with precision and purpose</p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            Powered by
            <span className="minerva-gradient-text font-semibold">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
