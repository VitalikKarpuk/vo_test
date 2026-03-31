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
      title: 'Post Not Found | Sage',
    }
  }

  return {
    title: `${post.title} | Sage`,
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

  return (
    <main className="min-h-screen bg-background page-transition">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="font-serif text-2xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            Sage
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground link-underline"
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

      {/* Hero Cover Image */}
      {post.coverSrc && (
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full animate-fade-in">
          <Image
            src={post.coverSrc}
            alt={`Cover image for ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      )}

      <article className={`mx-auto max-w-2xl px-6 ${post.coverSrc ? '-mt-32 relative z-10' : 'pt-16'}`}>
        {/* Article Header */}
        <header className="mb-12 animate-fade-up">
          {post.categories && (
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider text-accent-foreground bg-accent px-2 py-1">
                {post.categories}
              </span>
            </div>
          )}
          <time
            dateTime={post.date}
            className="text-sm uppercase tracking-wider text-muted-foreground"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight text-balance">
            {post.title}
          </h1>
          {post.author && (
            <p className="mt-6 text-muted-foreground">
              By <span className="text-foreground">{post.author}</span>
            </p>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-neutral max-w-none dark:prose-invert animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <MDXRenderer source={markdown} />
        </div>

        {/* Share & Navigation */}
        <footer className="mt-20 pt-10 border-t border-border/50 pb-20 animate-fade-up" style={{ animationDelay: '0.15s' }}>
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
                {post.socialLinks?.twitter ? (
                  <a 
                    href={post.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="View on Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                ) : (
                  <button 
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Share on Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                )}
                {post.socialLinks?.reddit && (
                  <a 
                    href={post.socialLinks.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="View on Reddit"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                  </a>
                )}
                <button 
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
