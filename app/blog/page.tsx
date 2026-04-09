import type { Metadata } from 'next'
import { MinervaBlogPage, getAllArticles } from '@/features/blog'

export const metadata: Metadata = {
  title: 'AI Blog | Latest Articles on Artificial Intelligence',
  description: 'Discover the latest insights, tutorials, and news about AI, machine learning, and technology.',
}

export default async function BlogPage() {
  const posts = await getAllArticles()

  return (
    <MinervaBlogPage 
      posts={posts}
      basePath="/blog"
      blogName="AI Blog"
    />
  )
}
