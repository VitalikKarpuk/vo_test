import type { Metadata } from 'next'
import { BlogListPage, getAllArticles } from '@/features/blog'

export const metadata: Metadata = {
  title: 'Blog | Crypto & blockchain product updates',
  description:
    'News, deep dives, and field notes on our crypto and blockchain product—protocol changes, security, and what ships next.',
}

export default async function BlogPage() {
  const posts = await getAllArticles()

  return (
    <BlogListPage
      posts={posts}
      basePath="/blog"
      blogName="Blog"
    />
  )
}
