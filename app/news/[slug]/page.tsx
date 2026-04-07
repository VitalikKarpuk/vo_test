import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles, getArticleById } from '@/features/blog'
import { MDXRenderer } from '@/features/blog/components/MDXRenderer'
import { ShareButtons } from '@/features/blog/components/ShareButtons'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleById(slug)

  if (!article) {
    return { title: 'News Not Found' }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleById(slug)

  if (!article) {
    notFound()
  }

  const category = article.categories?.split(',')[0]?.trim() || 'News'

  return (
    <main className="min-h-screen bg-[#231343]">
      {/* Hero Section */}
      <div className="relative">
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
          {article.coverSrc ? (
            <Image
              src={article.coverSrc}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#564578] to-[#231343]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#231343] via-[#231343]/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-[#564578] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-serif mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {article.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{article.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-[#564578]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          {/* Share buttons */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <ShareButtons title={article.title} slug={slug} />
          </div>

          {/* MDX Content */}
          <article className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-white prose-headings:font-serif
            prose-p:text-white/90 prose-p:leading-relaxed
            prose-a:text-white prose-a:underline prose-a:underline-offset-2 prose-a:decoration-white/60 hover:prose-a:decoration-white
            prose-strong:text-white
            prose-ul:text-white/90 prose-ol:text-white/90
            prose-li:marker:text-white/50
            prose-blockquote:border-white/30 prose-blockquote:text-white/80
            prose-code:text-white/90 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#231343] prose-pre:border prose-pre:border-white/10
          ">
            <MDXRenderer content={article.content} />
          </article>

          {/* Related Links */}
          {article.socialLinks && Object.values(article.socialLinks).some(Boolean) && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-semibold mb-4 font-serif">Related Links</h3>
              <div className="flex flex-wrap gap-3">
                {article.socialLinks.twitter && (
                  <a
                    href={article.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                )}
                {article.socialLinks.reddit && (
                  <a
                    href={article.socialLinks.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Reddit
                  </a>
                )}
                {article.socialLinks.mirror && (
                  <a
                    href={article.socialLinks.mirror}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Mirror
                  </a>
                )}
                {article.socialLinks.custom && (
                  <a
                    href={article.socialLinks.custom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to News */}
      <div className="bg-[#231343] py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all news
          </Link>
        </div>
      </div>
    </main>
  )
}
