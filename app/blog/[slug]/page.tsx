import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostPage, getArticleById, getAllArticles } from '@/features/blog'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleById(slug)
  if (!post) return { title: 'Post Not Found | AI Blog' }
  return {
    title: `${post.title} | AI Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllArticles()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPageRoute({ params }: PageProps) {
  const { slug } = await params
  const post = await getArticleById(slug)
  if (!post) notFound()

  const allPosts = await getAllArticles()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <BlogPostPage 
      post={post}
      relatedPosts={relatedPosts}
      basePath="/blog"
      blogName="AI Blog"
    />
  )
}
