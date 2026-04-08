// Blog Feature - Main exports
// Simply copy the /features/blog folder to your project and install dependencies

// Components
export { default as BlogListPage } from './components/BlogListPage'
export { default as BentoBlogPage } from './components/BentoBlogPage'
export { default as BlogPostPage } from './components/BlogPostPage'
export { default as PostCard } from './components/PostCard'
export { default as FeaturedSlider } from './components/FeaturedSlider'
export { default as CategoryBadge } from './components/CategoryBadge'
export { default as CategoryFilter } from './components/CategoryFilter'
export { default as ScrollProgress } from './components/ScrollProgress'
export { default as ShareButtons } from './components/ShareButtons'
export { default as TableOfContents } from './components/TableOfContents'
export { default as MDXRenderer } from './components/MDXRenderer'

// API & Data fetching
export { getAllArticles, getArticleById } from './api/articles'
export { getApolloClient, createApolloClient, STRAPI_URL } from './api/apollo-client'

// Types
export type { 
  MappedPost, 
  Article, 
  StrapiImage,
  BlogArticlesPageQuery,
  SingleArticleQuery 
} from './types'

// Utilities
export { mapArticleToPost, normalizeCategoriesField, rewriteStrapiMediaUrls } from './utils'
