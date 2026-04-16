'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { MappedPost } from '../types'
import BlogFeaturedSection from './BlogFeaturedSection'
import BlogMarqueeTicker from './BlogMarqueeTicker'
import CategoryFilter from './CategoryFilter'
import { formatDate, stripMdx } from '../utils'

interface BlogListPageProps {
  posts: MappedPost[]
  basePath?: string
  blogName?: string
}

function collectCategories(posts: MappedPost[]): string[] {
  return Array.from(
    new Set(
      posts
        .flatMap((p) => (p.categories ? p.categories.split(',').map((c) => c.trim()) : []))
        .filter(Boolean),
    ),
  ).sort()
}

function filterByCategory(posts: MappedPost[], category: string | null): MappedPost[] {
  if (!category) return posts
  const needle = category.toLowerCase()
  return posts.filter((p) =>
    (p.categories ?? '')
      .split(',')
      .some((c) => c.trim().toLowerCase() === needle),
  )
}

export default function BlogListPage({
  posts,
  basePath = '/blog',
  blogName = 'Blog',
}: BlogListPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allCategories = useMemo(() => collectCategories(posts), [posts])
  const filteredPosts = useMemo(
    () => filterByCategory(posts, activeCategory),
    [posts, activeCategory],
  )

  const primaryFeatured = filteredPosts[0]
  const secondaryFeatured = filteredPosts.slice(1, 3)
  const archivePosts = filteredPosts.slice(3)

  if (posts.length === 0) {
    return (
      <main className="blog-editorial-shell relative min-h-screen overflow-x-hidden text-foreground">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <EmptyState />
        </section>
      </main>
    )
  }

  return (
    <main className="blog-editorial-shell relative min-h-screen overflow-x-hidden text-foreground">
      <BlogMarqueeTicker posts={posts} basePath={basePath} />

      <BlogHeroSection blogName={blogName} />

      {filteredPosts.length === 0 && activeCategory !== null && (
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-md animate-fade-rise text-center">
            <p className="mb-2 font-sans text-xl font-light tracking-tight text-foreground text-balance sm:text-2xl">
              No posts in this topic
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Nothing is tagged &ldquo;{activeCategory}&rdquo; yet. Pick another topic or clear the filter to see all
              posts.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="border border-border bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Show all posts
            </button>
          </div>
        </section>
      )}

      {primaryFeatured && filteredPosts.length > 0 && (
        <BlogFeaturedSection
          primary={primaryFeatured}
          secondaries={secondaryFeatured}
          basePath={basePath}
        />
      )}

      {(allCategories.length > 0 || archivePosts.length > 0) && (
        <section
          className="px-4 py-8 sm:px-6 sm:py-8 lg:py-12"
          aria-labelledby={archivePosts.length > 0 ? 'archive-heading' : undefined}
        >
          <div className="mx-auto max-w-7xl">
            {allCategories.length > 0 && (
              <div className="mb-8">
                <CategoryFilter
                  categories={allCategories}
                  activeCategory={activeCategory}
                  onSelect={setActiveCategory}
                />
              </div>
            )}

            {archivePosts.length > 0 && (
              <div>
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {archivePosts.map((post) => (
                    <li key={post.id} className="flex">
                      <PostCard post={post} basePath={basePath} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

function BlogHeroSection({ blogName }: { blogName: string }) {
  return (
    <section
      className="border-b border-border px-4 pb-6 pt-16 sm:px-6 sm:pb-6 sm:pt-20 mb-6"
      aria-labelledby="blog-title"
    >
      <div className="mx-auto max-w-7xl">
        <header className="min-w-0 max-w-3xl">
          <h1
            id="blog-title"
            className="text-balance font-serif text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em] bg-linear-to-r from-primary via-[#c084fc] to-link bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]"
          >
            {blogName}
          </h1>
        </header>
      </div>
    </section>
  )
}

function PostCard({
  post,
  basePath = '/blog',
}: {
  post: MappedPost
  basePath?: string
}) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')

  return (
    <article className="group flex flex-col h-full">
      <Link
        href={`${basePath}/${post.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
      >
        {/* Image Container */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-lg bg-muted transition-all duration-300">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-secondary/60 flex items-center justify-center">
              <span className="text-white/30 text-6xl font-bold font-serif">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Shadow on hover */}
          <div className="absolute inset-0 shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
        </div>

        {/* Content Container */}
        <div className="mt-6 flex flex-1 flex-col gap-4">
          {/* Meta: date + category */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium">
            <time 
              dateTime={post.date} 
              className="tabular-nums text-muted-foreground group-hover:text-foreground/80 transition-colors"
            >
              {formatDate(post.date)}
            </time>
            {category && (
              <>
                <span className="text-border/50">·</span>
                <span className="text-primary font-semibold uppercase tracking-[0.08em]">
                  {category}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-[1.375rem] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground group-hover:text-foreground/75 line-clamp-2 text-base leading-relaxed transition-colors duration-200 flex-1">
            {plainExcerpt || 'Читать статью'}
          </p>

          {/* CTA - Read More */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm pt-2 group-hover:gap-3 transition-all duration-200">
            <span>Read article</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-8 flex h-12 w-12 items-center justify-center border border-border">
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <h3 className="mb-3 text-2xl font-light tracking-tight text-foreground text-balance sm:text-3xl">
        No articles yet
      </h3>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
        New posts on infrastructure, security, and shipping on-chain will appear here once content is published or your
        CMS is connected.
      </p>
    </div>
  )
}
