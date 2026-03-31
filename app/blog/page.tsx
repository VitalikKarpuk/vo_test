import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, type MappedPost } from '@/lib/graphql/articles'

export const metadata: Metadata = {
  title: 'Sage | A Minimal Blog',
  description: 'Discover stories, thinking, and expertise from writers on any topic.',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getAllArticles()
  const [featuredPost, ...restPosts] = posts

  // Empty state
  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background page-transition">
        <Header />
        <HeroSection />
        <section className="mx-auto max-w-6xl px-6 py-20">
          <EmptyState />
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background page-transition">
      <Header />
      <HeroSection />

      {/* Featured Post */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-6 pb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <FeaturedPostCard post={featuredPost} />
        </section>
      )}

      {/* Latest Posts Section */}
      {restPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="font-serif text-2xl font-medium text-foreground mb-10 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            Check out the latest
          </h2>
          
          <nav aria-label="Blog posts">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {restPosts.map((post, index) => (
                <li key={post.id}>
                  <PostCard post={post} priority={index < 2} />
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}

      {/* Tags Section */}
      <TagsSection posts={posts} />

      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Link 
          href="/blog" 
          className="font-serif text-2xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Sage
        </Link>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center animate-fade-up">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
        Meet Sage, a minimal and creative blog
      </h1>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20 animate-fade-up">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-muted-foreground"
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
      <h3 className="font-serif text-xl font-medium text-foreground mb-2">No articles yet</h3>
      <p className="text-muted-foreground">
        Check back soon for new content, or make sure your Strapi backend is connected.
      </p>
    </div>
  )
}

function TagsSection({ posts }: { posts: MappedPost[] }) {
  // Extract unique categories from posts
  const allCategories = posts
    .map((post) => post.categories)
    .filter((cat): cat is string => Boolean(cat))
    .flatMap((cat) => cat.split(',').map((c) => c.trim()))
    .filter((cat, index, arr) => arr.indexOf(cat) === index)
    .slice(0, 6)

  const defaultTags = ['Lifestyle', 'Technology', 'Design', 'Development', 'Productivity']
  const tags = allCategories.length > 0 ? allCategories : defaultTags

  return (
    <aside className="border-t border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-serif text-xl font-medium text-foreground mb-6">Popular tags</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground hover:text-foreground cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Built with care and attention to detail
        </p>
      </div>
    </footer>
  )
}

function FeaturedPostCard({ post }: { post: MappedPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {post.coverSrc && (
            <div className="image-hover-zoom aspect-video relative overflow-hidden">
              <Image
                src={post.coverSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          )}
          <div className={post.coverSrc ? '' : 'lg:col-span-2'}>
            {post.categories && (
              <span className="text-xs uppercase tracking-wider text-accent-foreground bg-accent px-2 py-1 mr-2">
                {post.categories.split(',')[0]}
              </span>
            )}
            <time
              dateTime={post.date}
              className="text-sm uppercase tracking-wider text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-foreground transition-colors group-hover:text-muted-foreground sm:text-4xl text-balance">
              {post.title}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground link-underline">
              Read article
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostCard({ post, priority = false }: { post: MappedPost; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.coverSrc && (
          <div className="image-hover-zoom aspect-video relative overflow-hidden mb-5">
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        )}
        <div>
          {post.categories && (
            <span className="text-xs uppercase tracking-wider text-accent-foreground bg-accent px-2 py-1 mr-2">
              {post.categories.split(',')[0]}
            </span>
          )}
          <time
            dateTime={post.date}
            className="text-xs uppercase tracking-wider text-muted-foreground"
          >
            {formatDate(post.date)}
          </time>
          <h3 className="mt-3 font-serif text-xl font-medium leading-snug text-foreground transition-colors group-hover:text-muted-foreground text-balance">
            {post.title}
          </h3>
          {/* <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p> */}
        </div>
      </Link>
    </article>
  )
}
