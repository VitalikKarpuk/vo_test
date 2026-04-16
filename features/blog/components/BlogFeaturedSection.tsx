'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { MappedPost } from '../types'
import { cn } from '@/lib/utils'
import { formatDate, stripMdx } from '../utils'

export interface BlogFeaturedSectionProps {
  primary: MappedPost
  secondaries: MappedPost[]
  basePath?: string
}

export default function BlogFeaturedSection({
  primary,
  secondaries,
  basePath = '/blog',
}: BlogFeaturedSectionProps) {
  // Limit to max 3 secondary posts
  const limitedSecondaries = secondaries.slice(0, 3)
  const hasSecondaries = limitedSecondaries.length > 0

  return (
    <section className="px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-12" aria-labelledby="featured-label">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-y-2 lg:gap-y-3">
          {/* Label */}


          {/* Main Grid: Primary left (70%) + Secondaries right (30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
            {/* PRIMARY - Large Featured Post (70% on lg) */}
            <div className="lg:col-span-8 min-w-0">
              <FeaturedPrimaryTile
                post={primary}
                basePath={basePath}
                priority
              />
            </div>

          {/* SECONDARIES - Compact Featured Posts (30% on lg) */}
            {hasSecondaries && (
              <div className="lg:col-span-4 md:col-span-12 min-w-0 lg:-mt-3">
                <div className="flex flex-col gap-2 md:flex-row lg:flex-col">
                  {/* Secondaries list */}
                  {limitedSecondaries.map((post, idx) => (
                    <div key={post.id} className="min-w-0 md:flex-1">
                      <FeaturedSecondaryTile 
                        post={post} 
                        basePath={basePath}
                        index={idx}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </p>
  )
}

function FeaturedPrimaryTile({
  post,
  basePath,
  priority,
}: {
  post: MappedPost
  basePath: string
  priority?: boolean
}) {
  const category = post.categories?.split(',')[0]?.trim() || null
  const plainExcerpt = stripMdx(post.excerpt || '')

  return (
    <article className="min-w-0 animate-fade-rise [animation-delay:40ms] motion-reduce:animate-none motion-reduce:opacity-100">
      <Link
        href={`${basePath}/${post.slug}`}
        className="group/blog-featured-primary rounded-t-2xl featured-primary-card blog-featured-primary-link blog-featured-hover-lift  flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden transition-all duration-250"
      >
        {/* Large image - always prominent */}
        <div className="blog-featured-primary-cover blog-featured-cover-shine blog-cover-hover relative aspect-video w-full shrink-0 overflow-hidden rounded-t-lg bg-muted shadow-[inset_0_1px_0_hsl(0_0%_100%/_0.08)]">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              priority={priority}
              className="relative z-0 object-cover  object-center transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none group-hover/blog-featured-primary:scale-[1.02] motion-reduce:group-hover/blog-featured-primary:scale-100"
              sizes="(max-width: 1024px) 100vw, min(75vw, 950px)"
              aria-hidden
            />
          ) : (
            <div className="absolute inset-0 z-0 bg-muted" role="presentation" />
          )}
          
          {/* Featured badge - top right */}
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-primary/95 px-2 py-0.5 text-xs font-bold text-background backdrop-blur-sm shadow-lg">
            <span className="text-sm">⭐</span>
            Featured
          </div>
        </div>

        {/* Content - always large and prominent */}
        <div className="flex flex-col gap-3 mt-4 sm:mt-5">
          {category && <FeaturedEyebrow>{category}</FeaturedEyebrow>}
          <h2 className="font-sans font-bold tracking-[-0.025em] text-foreground text-pretty transition-colors duration-200 group-hover/blog-featured-primary:text-primary line-clamp-3 text-lg leading-[1.2] sm:text-xl md:text-2xl">
            {post.title}
          </h2>
          {plainExcerpt ? (
            <p className="max-w-prose text-[14px] leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-3">
              {plainExcerpt}
            </p>
          ) : null}
          <div className="flex items-center justify-between gap-3 pt-2 text-[12px] text-muted-foreground">
            <time dateTime={post.date} className="font-sans tabular-nums">
              {formatDate(post.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}

function FeaturedSecondaryTile({ 
  post, 
  basePath,
  index = 0,
}: { 
  post: MappedPost
  basePath: string
  index?: number
}) {
  const category = post.categories?.split(',')[0]?.trim() || null

  return (
    <article className="group/secondary min-w-0">
      <Link
        href={`${basePath}/${post.slug}`}
        className={cn(
          'featured-secondary-card blog-featured-hover-lift relative flex min-h-0 w-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden',
          'rounded-md transition-all duration-200',
          'p-3',
        )}
      >

        {/* Mobile: hidden image, tablet/desktop: optional image */}
        <div className="relative hidden aspect-video w-full shrink-0 overflow-hidden bg-muted rounded-t-sm shadow-[inset_0_1px_0_hsl(0_0%_100%/_0.05)] mb-1 md:block blog-cover-hover">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover object-center transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none group-hover/secondary:scale-102 motion-reduce:group-hover/secondary:scale-100"
              sizes="260px"
              aria-hidden
            />
          ) : (
            <div className="absolute inset-0 bg-muted" role="presentation" />
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-col gap-0.5">
          {category && (
            <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              {category}
            </span>
          )}
          <h3 className="font-sans text-sm font-semibold leading-tight tracking-[-0.015em] text-foreground text-pretty line-clamp-2 transition-colors duration-200 group-hover/secondary:text-primary">
            {post.title}
          </h3>
          <div className="flex items-center justify-between pt-0">
            <time dateTime={post.date} className="font-sans text-[10px] text-muted-foreground tabular-nums">
              {formatDate(post.date)}
            </time>
            <span className="text-[11px] font-semibold text-secondary/50 group-hover/secondary:text-secondary transition-colors">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
