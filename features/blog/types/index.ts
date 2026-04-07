// Strapi GraphQL Types for Blog Articles

export interface StrapiImage {
  url: string
}

/** Raw Strapi categories: string, comma list, JSON array, or relation objects */
export type StrapiCategoriesField = unknown

export interface Article {
  documentId: string
  Title: string
  Description?: string
  Date: string
  Img?: StrapiImage
  Categories?: StrapiCategoriesField
  Category?: StrapiCategoriesField
  Article?: string
  Twitter_Url?: string
  Reddit_Url?: string
  Mirror_Url?: string
  Custom_Url?: string
}

// Blog Articles List Query
export interface BlogArticlesPageQuery {
  articles: Article[]
}

export interface PaginationArg {
  page?: number
  pageSize?: number
}

export interface BlogArticlesPageQueryVariables {
  sort?: string[]
  pagination?: PaginationArg
}

// Single Article Query
export interface SingleArticleQuery {
  article: Article | null
}

export interface SingleArticleQueryVariables {
  documentId: string
}

// Mapped type for UI components (to match existing UI structure)
export interface MappedPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  coverSrc?: string
  content: string
  author?: string
  categories?: string
  socialLinks?: {
    twitter?: string
    reddit?: string
    mirror?: string
    custom?: string
  }
}
