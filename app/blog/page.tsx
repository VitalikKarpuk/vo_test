import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, type MappedPost } from '@/lib/graphql/articles'

export const metadata: Metadata = {
  title: 'Ambilas | Ambient Blog & Magazine',
  description: 'Discover stories and thinking across lifestyle, technology, business, and travel.',
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
  
  // Split posts for different sections
  const heroGridPosts = posts.slice(0, 4)
  const editorsChoicePosts = posts.slice(4, 8)
  const remainingPosts = posts.slice(8)

  // Empty state
  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background page-transition">
        <Header />
        <section className="mx-auto max-w-7xl px-4 py-20">
          <EmptyState />
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Featured Posts */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="mx-auto max-w-7xl">
          {/* Section intro */}
          <div className="mb-8 animate-fade-up">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-2">Featured Stories</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground tracking-tight text-balance">
              Discover the Latest
            </h1>
          </div>
          
          {/* Hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
            {heroGridPosts.map((post, index) => (
              <HeroCard key={post.id} post={post} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Choice Section */}
      {editorsChoicePosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <div className="animate-fade-up">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-3">
                  <span className="w-8 h-px bg-accent" />
                  {"Editor's Choice"}
                </h2>
                <p className="font-serif text-2xl text-foreground">Curated for You</p>
              </div>
              <Link 
                href="/blog" 
                className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group animate-fade-up"
              >
                View all
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {editorsChoicePosts.map((post) => (
                <PostCard key={post.id} post={post} simple />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Remaining Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 animate-fade-up">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" />
                Latest Articles
              </h2>
              <p className="font-serif text-2xl text-foreground">More to Explore</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/blog" 
            className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-all hover:text-accent"
          >
            Ambilas
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {['Home', 'Lifestyle', 'Technology', 'Business', 'Travel'].map((item) => (
              <Link 
                key={item}
                href="/blog" 
                className="px-4 py-2 text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/50 rounded-full"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="p-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/50 rounded-full"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-foreground rounded-full transition-all hover:scale-105 hover:shadow-lg"
            >
              Subscribe
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20 animate-fade-up">
      <div className="mx-auto w-16 h-16 rounded-full glass-card flex items-center justify-center mb-6">
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

function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/blog" className="font-serif text-3xl font-semibold text-primary-foreground">
              Ambilas
            </Link>
            <p className="mt-5 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              A clean editorial blog and magazine layout. Discover stories and thinking across lifestyle, technology, business, and travel.
            </p>
            
            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-medium text-primary-foreground mb-3">Stay updated</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <button className="px-5 py-2.5 bg-primary-foreground text-foreground rounded-full text-sm font-medium transition-all hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-5">Categories</h4>
            <ul className="space-y-3">
              {['Lifestyle', 'Technology', 'Business', 'Travel', 'Culture'].map((item) => (
                <li key={item}>
                  <Link href="/blog" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-5">Connect</h4>
            <ul className="space-y-3">
              {['Twitter', 'Instagram', 'LinkedIn', 'RSS Feed'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            2024 Ambilas. Built with care and attention to detail.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function HeroCard({ post, priority = false }: { post: MappedPost; priority?: boolean }) {
  const category = post.categories?.split(',')[0] || 'Article'
  
  return (
    <article className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg shadow-black/5 card-lift">
      <Link href={`/blog/${post.slug}`} className="block absolute inset-0">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
        )}
        
        {/* Floating Glass Info Block */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 lg:p-6">
            <span className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              {category}
            </span>
            
            <h2 className="font-serif text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-snug text-balance">
              {post.title}
            </h2>
            
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              {post.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostCard({
  post,
  priority = false,
  simple = false,
}: {
  post: MappedPost
  priority?: boolean
  simple?: boolean
}) {
  const category = post.categories?.split(',')[0] || 'Article'
  
  if (simple) {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="aspect-[16/9] relative overflow-hidden rounded-xl shadow-md shadow-black/5 card-lift">
            {post.coverSrc ? (
              <Image
                src={post.coverSrc}
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={priority}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
            )}
          </div>

          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {category}
            </span>
            <h3 className="font-serif text-base font-medium text-foreground leading-snug line-clamp-2 text-balance transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">{formatDate(post.date)}</p>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl shadow-lg shadow-black/5 card-lift">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image with floating glass panel */}
        <div className="aspect-[16/9] relative overflow-hidden">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
          )}
          
          {/* Floating Glass Info Block */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <div className="glass-panel rounded-xl p-3 sm:p-4">
              <span className="inline-flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {category}
              </span>
              
              <h3 className="font-serif text-sm sm:text-base font-medium text-foreground leading-snug line-clamp-2 text-balance">
                {post.title}
              </h3>
              
              <p className="mt-2 text-xs text-muted-foreground">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
