import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleById, getAllArticles, type MappedPost } from '@/lib/graphql/articles'
import MDXRenderer from '@/components/blog/mdxRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleById(slug)

  if (!post) {
    return {
      title: 'Post Not Found | AI Blog',
    }
  }

  return {
    title: `${post.title} | AI Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllArticles()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getArticleById(slug)

  if (!post) {
    notFound()
  }

  const markdown = (post.excerpt ?? '').replace(/<br>/g, '<br />')
  const category = post.categories?.split(',')[0] || 'Article'
  const readingTime = getReadingTime(markdown)

  // Get related posts
  const allPosts = await getAllArticles()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background page-transition">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              AI Blog
            </span>
          </Link>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary group"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back to blog
          </Link>
        </div>
      </header>

      {/* Hero Cover Image */}
      {post.coverSrc && (
        <div className="relative w-full animate-fade-in px-4 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl ai-border">
              <Image
                src={post.coverSrc}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 hero-card-overlay" />
              
              {/* Floating Glass Info Panel */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-auto sm:max-w-2xl animate-slide-in-right">
                <div className="glass-panel rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="category-badge">
                      {category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {readingTime} min read
                    </span>
                  </div>
                  
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-snug text-balance">
                    {post.title}
                  </h1>
                  
                  <div className="mt-5 flex items-center gap-4">
                    {post.author && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full ai-gradient flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{post.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                          <time className="text-xs text-muted-foreground" dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <article className={`mx-auto max-w-3xl px-6 ${post.coverSrc ? 'pt-8' : 'pt-16'}`}>
        {/* Article Header - only shown if no cover image */}
        {!post.coverSrc && (
          <header className="mb-12 animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="category-badge">
                {category}
              </span>
              <span className="text-xs text-muted-foreground">
                {readingTime} min read
              </span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight text-balance">
              {post.title}
            </h1>
            
            <div className="mt-8 flex items-center gap-4">
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ai-gradient flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">{post.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <time className="text-sm text-muted-foreground" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                </div>
              )}
            </div>
          </header>
        )}

        {/* Article Content */}
        <div
          className="prose prose-neutral prose-lg max-w-none animate-fade-up prose-headings:font-serif prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-secondary prose-pre:text-secondary-foreground"
          style={{ animationDelay: '0.1s' }}
        >
          <MDXRenderer source={markdown} />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border/30 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex flex-wrap gap-2">
            {['AI', 'Technology', 'Tutorial', 'Development'].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share & Navigation */}
        <footer className="mt-12 pt-8 border-t border-border/30 pb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span className="link-underline">Back to all posts</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share</span>
              <div className="flex gap-2">
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-white"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-[hsl(var(--link))] hover:text-white"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-foreground hover:text-background"
                  aria-label="Copy link"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 py-16 bg-muted/30 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Related Articles
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/30 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/blog" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md ai-gradient flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">AI Blog</span>
            </Link>
            <p className="text-xs text-muted-foreground">
              Built with AI and attention to detail
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function RelatedPostCard({ post, index }: { post: MappedPost; index: number }) {
  const category = post.categories?.split(',')[0] || 'Article'
  
  return (
    <article 
      className="group ai-card rounded-2xl overflow-hidden bg-card border border-border/50 animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-[16/10] relative overflow-hidden">
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
          
          <div className="absolute top-3 left-3">
            <span className="category-badge">
              {category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-base font-medium text-foreground leading-snug line-clamp-2 text-balance group-hover:text-primary transition-colors">
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
