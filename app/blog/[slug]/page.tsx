import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleById, getAllArticles } from '@/lib/graphql/articles'
import MDXRenderer from '@/components/blog/mdxRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleById(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Ambilas',
    }
  }

  return {
    title: `${post.title} | Ambilas`,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getArticleById(slug)

  if (!post) {
    notFound()
  }

  const markdown = (post.excerpt ?? '').replace(/<br>/g, '<br />')
  const category = post.categories?.split(',')[0] || 'Article'

  return (
    <main className="min-h-screen bg-background page-transition">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="font-serif text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            Ambilas
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
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

      {/* Hero Cover Image with Floating Glass Panel */}
      {post.coverSrc && (
        <div className="relative w-full animate-fade-in px-4 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image
                src={post.coverSrc}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              {/* Floating Glass Info Panel */}
              <div className="absolute w-[calc(100%-16px)] bottom-4 left-4  right-4 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-2 lg:left-2 lg:right-auto">
                <div className="glass-panel rounded-2xl p-5 sm:p-6 lg:p-8">
                  <span className="inline-block mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {category}
                  </span>
                  
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-snug text-balance">
                    {post.title}
                  </h1>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    {post.author && (
                      <span>By <span className="text-foreground">{post.author}</span></span>
                    )}
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <article className={`mx-auto max-w-2xl px-6 ${post.coverSrc ? 'pt-8' : 'pt-16'}`}>
        {/* Article Header - only shown if no cover image */}
        {!post.coverSrc && (
          <header className="mb-12 animate-fade-up">
            <span className="inline-block mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {category}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight text-balance">
              {post.title}
            </h1>
            
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              {post.author && (
                <span>By <span className="text-foreground">{post.author}</span></span>
              )}
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          </header>
        )}

        {/* Article Content */}
        <div
          className="prose prose-neutral prose-lg max-w-none animate-fade-up prose-headings:font-serif prose-headings:font-medium prose-p:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground"
          style={{ animationDelay: '0.1s' }}
        >
          <MDXRenderer source={markdown} />
        </div>

        {/* Share & Navigation */}
        <footer className="mt-20 pt-10 border-t border-border/30 pb-20 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
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
              <div className="flex gap-3">
                <button 
                  className="p-2 glass-card rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button 
                  className="p-2 glass-card rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button 
                  className="p-2 glass-card rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
    </main>
  )
}
