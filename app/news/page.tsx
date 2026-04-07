import { getAllArticles } from '@/features/blog'
import PostCard from '@/features/blog/components/PostCard'

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsPage() {
  const articles = await getAllArticles()
  
  // Get featured article (first one)
  const featuredArticle = articles[0]
  const restArticles = articles.slice(1)

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

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <PostCard
              article={featuredArticle}
              variant="featured"
              showExcerpt
              showDate
              showAuthor
              basePath="/news"
            />
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restArticles.map((article, index) => (
            <PostCard
              key={article.id}
              article={article}
              index={index}
              variant="default"
              showExcerpt
              showDate
              basePath="/news"
            />
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
