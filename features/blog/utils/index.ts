import type { Article, MappedPost } from '../types'

/** Normalize Strapi category field to a comma-separated string for the UI */
export function normalizeCategoriesField(value: unknown): string | undefined {
  if (value == null || value === '') return undefined
  if (typeof value === 'string') return value.trim() || undefined
  if (Array.isArray(value)) {
    if (value.length === 0) return undefined
    const parts = value.map((item) => {
      if (typeof item === 'string') return item.trim()
      if (item && typeof item === 'object') {
        const o = item as Record<string, unknown>
        if (typeof o.name === 'string') return o.name.trim()
        if (typeof o.Title === 'string') return o.Title.trim()
      }
      return String(item).trim()
    }).filter(Boolean)
    return parts.length ? parts.join(', ') : undefined
  }
  if (typeof value === 'object') {
    const o = value as Record<string, unknown>
    if (typeof o.name === 'string') return o.name.trim()
    if (typeof o.Title === 'string') return o.Title.trim()
  }
  return String(value).trim() || undefined
}

/** Make relative Strapi media paths absolute so <img> and markdown images load in the app */
export function rewriteStrapiMediaUrls(html: string, base: string): string {
  if (!html) return ''
  const b = base.replace(/\/$/, '')
  let out = html
  out = out.replace(/\]\(([^)]+)\)/g, (m, path) => {
    const p = path.trim()
    if (/^https?:\/\//i.test(p) || p.startsWith('//')) return m
    if (p.startsWith('/')) return `](${b}${p})`
    if (/^uploads\//i.test(p)) return `](${b}/${p})`
    return m
  })
  out = out.replace(/\bsrc=(["'])(\/[^"']*)/gi, (m, q, path) => {
    if (path.startsWith('//')) return m
    return `src=${q}${b}${path}`
  })
  out = out.replace(/\bhref=(["'])(\/[^"']*)/gi, (m, q, path) => {
    if (path.startsWith('//')) return m
    return `href=${q}${b}${path}`
  })
  return out
}

// Helper function to map Strapi article to UI post format
export function mapArticleToPost(article: Article, strapiBaseUrl: string): MappedPost {
  const imageUrl = article.Img?.url
    ? article.Img.url.startsWith('http')
      ? article.Img.url
      : `${strapiBaseUrl}${article.Img.url}`
    : undefined

  return {
    id: article.documentId,
    slug: article.documentId,
    title: article.Title,
    excerpt: article.Description || '',
    date: article.Date,
    coverSrc: imageUrl,
    content: rewriteStrapiMediaUrls(article.Article || '', strapiBaseUrl),
    categories: normalizeCategoriesField(article.Categories ?? article.Category),
    socialLinks: {
      twitter: article.Twitter_Url,
      reddit: article.Reddit_Url,
      mirror: article.Mirror_Url,
      custom: article.Custom_Url,
    },
  }
}

/** Format date to localized string */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Strip MDX/markdown syntax for plain text excerpt */
export function stripMdx(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

/** Calculate reading time in minutes */
export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}
