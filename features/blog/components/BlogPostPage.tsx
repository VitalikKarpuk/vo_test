import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import MDXRenderer from './MDXRenderer'
import CategoryBadge from './CategoryBadge'
import TableOfContents from './TableOfContents'
import ScrollProgress from './ScrollProgress'
import ShareButtons from './ShareButtons'
import { formatDate, getReadingTime } from '../utils'

interface BlogPostPageProps {
  post: MappedPost
  relatedPosts?: MappedPost[]
  basePath?: string
  blogName?: string
}

export default function BlogPostPage({ 
  post, 
  relatedPosts = [],
  basePath = '/blog',
  blogName = 'AI Blog',
}: BlogPostPageProps) {
  const content = (post.excerpt ?? '').replace(/<br>/g, '<br />')
  const category = post.categories?.split(',')[0]?.trim() || null
  const readingTime = getReadingTime(content)

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between">
          <Link href={basePath} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight">{blogName}</span>
          </Link>

          <Link
            href={basePath}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Back to blog
          </Link>
        </div>
      </header>

      {/* ── Hero: cover image — clean, no text overlay ── */}
      {post.coverSrc && (
        <div className="w-full animate-fade-in">
          <div className="mx-auto max-w-5xl px-4 pt-10">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-md">
              <Image
                src={post.coverSrc}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Article header: title + meta, below image ── */}
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <header className="pt-10 pb-8 border-b border-border/30 animate-fade-up">
          {/* Category + reading time row */}
          <div className="flex items-center gap-3 mb-5">
            {category && <CategoryBadge category={category} variant="default" />}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-semibold tracking-tight leading-tight text-balance text-foreground mb-7">
            {post.title}
          </h1>

          {/* Author + date + share */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {post.author ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full ai-gradient flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white">{post.author[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author}</p>
                  <time className="text-xs text-muted-foreground" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>
            ) : (
              <time className="text-sm text-muted-foreground" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            )}

            {/* Share buttons */}
            <ShareButtons title={post.title} slug={post.slug} basePath={basePath} />
          </div>
        </header>

        {/* ── Two-column: article body + ToC sidebar ── */}
        <div className="flex gap-12 py-10 items-start">

          {/* Article body */}
          <div className="min-w-0 flex-1">
            <div
              className="article-body prose prose-neutral prose-lg max-w-none animate-fade-up
                prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-code:text-primary prose-code:bg-primary/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                prose-pre:bg-secondary prose-pre:border prose-pre:border-border/30 prose-pre:rounded-xl
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-img:rounded-xl prose-img:shadow-sm"
              style={{ animationDelay: '0.1s' }}
            >
              <MDXRenderer source={content} />
            </div>

            {/* Tags */}
            {category && (
              <div className="pt-8 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
                {post.categories?.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Footer nav */}
            <footer className="py-8 border-t border-border/30 mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href={basePath}
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                Back to all posts
              </Link>
            </footer>
          </div>

          {/* ToC sidebar — hidden on mobile, shows from lg */}
          <div className="hidden lg:block w-60 shrink-0 sticky top-24">
            <TableOfContents contentSelector=".article-body" />
          </div>

        </div>
      </div>

      {/* ── Related posts ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 border-t border-border/20 py-14 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Related Articles</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((p, i) => (
                <RelatedPostCard key={p.id} post={p} index={i} basePath={basePath} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Site footer ── */}
      <footer className="border-t border-border/30 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href={basePath} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md ai-gradient flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="font-serif text-base font-semibold text-foreground">{blogName}</span>
          </Link>
          <p className="text-xs text-muted-foreground">Built with AI and attention to detail</p>
        </div>
      </footer>
    </main>
  )
}

function RelatedPostCard({ post, index, basePath }: { post: MappedPost; index: number; basePath: string }) {
  const category = post.categories?.split(',')[0]?.trim() || null

  return (
    <article
      className="group ai-card rounded-2xl overflow-hidden bg-card border border-border/50 animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <Link href={`${basePath}/${post.slug}`} className="flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
          )}
        </div>

        <div className="p-4">
          {category && (
            <div className="mb-2">
              <CategoryBadge category={category} variant="default" />
            </div>
          )}
          <h3 className="font-serif text-sm font-medium text-foreground leading-snug line-clamp-2 text-balance group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            {post.author && (
              <>
                <span className="font-medium text-foreground">{post.author}</span>
                <span>·</span>
              </>
            )}
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
