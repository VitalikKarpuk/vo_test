'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '../types'

interface PostCardProps {
  article: Article
  index?: number
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  showExcerpt?: boolean
  showDate?: boolean
  showAuthor?: boolean
  basePath?: string
}

export default function PostCard({
  article,
  index = 0,
  variant = 'default',
  showExcerpt = true,
  showDate = true,
  showAuthor = false,
  basePath = '/blog',
}: PostCardProps) {
  const category = article.categories?.split(',')[0]?.trim() || 'Article'
  
  // Use UTC to avoid hydration mismatch between server and client timezones
  const dateObj = new Date(article.date)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  // Horizontal variant for featured sections
  if (variant === 'horizontal') {
    return (
      <Link
        href={`${basePath}/${article.slug}`}
        className="group block animate-fade-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <article className="ai-card flex flex-col md:flex-row gap-6 bg-card rounded-xl overflow-hidden border border-border/50 p-4 md:p-5">
          {/* Image */}
          <div className="relative w-full md:w-72 aspect-video rounded-lg overflow-hidden flex-shrink-0 image-hover-zoom">
            {article.coverSrc ? (
              <Image
                src={article.coverSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            ) : (
              <div className="absolute inset-0 ai-gradient flex items-center justify-center">
                <span className="text-white/30 text-5xl font-bold font-serif">
                  {article.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="category-badge">{category}</span>
              {showDate && (
                <time className="text-xs text-muted-foreground" dateTime={article.date}>
                  {formattedDate}
                </time>
              )}
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold text-foreground font-serif leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            {showExcerpt && article.excerpt && (
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <span className="link-underline">Read article</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Compact variant for sidebars or lists
  if (variant === 'compact') {
    return (
      <Link
        href={`${basePath}/${article.slug}`}
        className="group block animate-fade-up"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <article className="flex gap-4 py-4 border-b border-border/50 last:border-0 transition-colors hover:bg-muted/30 -mx-3 px-3 rounded-lg">
          {/* Small thumbnail */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 image-hover-zoom">
            {article.coverSrc ? (
              <Image
                src={article.coverSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white/40 text-2xl font-bold font-serif">
                  {article.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
              {category}
            </span>
            <h4 className="text-sm font-semibold text-foreground font-serif leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h4>
            {showDate && (
              <time className="text-xs text-muted-foreground mt-1" dateTime={article.date}>
                {formattedDate}
              </time>
            )}
          </div>
        </article>
      </Link>
    )
  }

  // Featured variant - larger with overlay
  if (variant === 'featured') {
    return (
      <Link
        href={`${basePath}/${article.slug}`}
        className="group block animate-scale-in relative"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <article className="ai-card ai-border relative aspect-video rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 image-hover-zoom">
            {article.coverSrc ? (
              <Image
                src={article.coverSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 ai-gradient" />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 hero-card-overlay" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="featured-badge">Featured</span>
              <span className="text-white/80 text-xs font-medium px-2.5 py-1 rounded bg-white/10 backdrop-blur-sm">
                {category}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-3 group-hover:text-primary-foreground transition-colors">
              {article.title}
            </h2>
            
            {showExcerpt && article.excerpt && (
              <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-2 mb-4 max-w-2xl">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4">
              {showDate && (
                <time className="text-white/60 text-sm" dateTime={article.date}>
                  {formattedDate}
                </time>
              )}
              {showAuthor && article.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-white/60 text-sm">{article.author}</span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`${basePath}/${article.slug}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article className="ai-card ai-border h-full flex flex-col bg-card rounded-xl overflow-hidden border border-border/30">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden image-hover-zoom">
          {article.coverSrc ? (
            <Image
              src={article.coverSrc}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 ai-gradient flex items-center justify-center">
              <span className="text-white/30 text-6xl font-bold font-serif">
                {article.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Category Badge on Image */}
          <div className="absolute top-4 left-4">
            <span className="glass-card text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md text-foreground">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-5 md:p-6">
          {/* Meta info */}
          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
            {showDate && (
              <time dateTime={article.date}>{formattedDate}</time>
            )}
            {showAuthor && article.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>{article.author}</span>
              </>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-foreground font-serif leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          {showExcerpt && article.excerpt && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
              {article.excerpt}
            </p>
          )}

          {/* Read more link */}
          <div className="flex items-center gap-2 text-primary text-sm font-medium mt-auto pt-2">
            <span className="link-underline">Read more</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
