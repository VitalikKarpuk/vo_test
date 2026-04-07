import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles } from '@/features/blog'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage() {
  const articles = await getAllArticles()

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
            News
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Latest updates, insights and announcements
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No news articles available</p>
          </div>
        )}
      </div>
    </main>
  )
}

interface NewsCardProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverSrc?: string
    categories?: string
  }
  index: number
}

function NewsCard({ article, index }: NewsCardProps) {
  // Extract first category for display
  const category = article.categories?.split(',')[0]?.trim() || 'News'

  return (
    <Link 
      href={`/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <article className="h-full flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm">
        {/* Image Section - 16:9 aspect ratio */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {article.coverSrc ? (
            <Image
              src={article.coverSrc}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(329,64%,55%)] to-[hsl(240,5%,12%)] flex items-center justify-center">
              <span className="text-white/30 text-6xl font-bold">
                {article.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-[hsl(240,5%,12%)] p-6 flex flex-col justify-end min-h-[120px]">
          <h2 className="text-white text-lg md:text-xl font-semibold leading-snug font-serif mb-2">
            {article.title}
          </h2>
          <p className="text-white/70 text-sm">
            {'Read more in '}
            <span className="underline underline-offset-2 decoration-[hsl(226,100%,67%)] text-[hsl(226,100%,67%)] hover:text-white transition-colors">
              {category}
            </span>
          </p>
        </div>
      </article>
    </Link>
  )
}
