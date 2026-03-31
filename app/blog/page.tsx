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
    <main className="min-h-screen bg-background page-transition">
      <Header />
      
      {/* Hero Grid - 4 Featured Posts */}
      <section className="px-4 pb-8 pt-4 animate-fade-up">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heroGridPosts.map((post, index) => (
              <HeroCard key={post.id} post={post} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Choice Section */}
      {editorsChoicePosts.length > 0 && (
        <section className="px-4 py-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="mx-auto max-w-7xl">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-muted-foreground/50" />
              {"Editor's Choice"}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorsChoicePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Remaining Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="px-4 py-12 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
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
    <header className="sticky top-0 z-50 glass-card border-b border-border/30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link 
          href="/blog" 
          className="font-serif text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Ambilas
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Lifestyle
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Technology
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Business
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Travel
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button
            className="hidden sm:block px-4 py-2 text-sm font-medium text-foreground glass-card rounded-lg transition-all hover:bg-white/10"
          >
            Subscribe
          </button>
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
    <footer className="border-t border-border/30 mt-12">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/blog" className="font-serif text-xl font-semibold text-foreground">
              Ambilas
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              A dark ambient blog and magazine theme. Discover stories and thinking across lifestyle, technology, business, and travel.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Lifestyle</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Technology</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Business</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Travel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            Built with care and attention to detail
          </p>
        </div>
      </div>
    </footer>
  )
}

function HeroCard({ post, priority = false }: { post: MappedPost; priority?: boolean }) {
  const category = post.categories?.split(',')[0] || 'Article'
  
  return (
    <article className="group relative aspect-[16/9] overflow-hidden rounded-xl">
      <Link href={`/blog/${post.slug}`} className="block absolute inset-0">
        {post.coverSrc ? (
          <Image
            src={post.coverSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
        )}
        
        {/* Floating Glass Info Block */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="glass-panel rounded-2xl p-4 sm:p-5">
            <span className="inline-block mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {category}
            </span>
            
            <h2 className="font-serif text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-snug text-balance group-hover:text-accent transition-colors">
              {post.title}
            </h2>
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostCard({ post, priority = false }: { post: MappedPost; priority?: boolean }) {
  const category = post.categories?.split(',')[0] || 'Article'
  
  return (
    <article className="group relative overflow-hidden rounded-xl">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image with floating glass panel */}
        <div className="aspect-[16/9] relative overflow-hidden rounded-xl">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
          )}
          
          {/* Floating Glass Info Block */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="glass-panel rounded-xl p-3">
              <span className="inline-block mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
              
              <h3 className="font-serif text-sm font-medium text-foreground leading-snug line-clamp-2 text-balance group-hover:text-accent transition-colors">
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
