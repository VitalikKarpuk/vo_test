# Blog Feature Module

Self-contained blog feature that can be easily integrated into any Next.js project.

## Installation

### 1. Copy the folder

Copy the entire `features/blog` folder to your project:

```
your-project/
  features/
    blog/           <-- copy this entire folder
```

### 2. Install dependencies

```bash
npm install @apollo/client graphql next-mdx-remote rehype-pretty-code rehype-raw remark-gfm
# or
pnpm add @apollo/client graphql next-mdx-remote rehype-pretty-code rehype-raw remark-gfm
```

### 3. Add Tailwind Typography plugin

```bash
npm install @tailwindcss/typography
# or
pnpm add @tailwindcss/typography
```

Add to your `globals.css`:

```css
@plugin '@tailwindcss/typography';
```

### 4. Add CSS styles

Import the blog styles in your `globals.css`:

```css
@import '../features/blog/styles/blog.css';
```

Or copy the CSS variables and animations from `features/blog/styles/blog.css` into your existing styles.

### 5. Add CSS variables to your `:root`

```css
:root {
  --primary: 329 64% 55%;  /* Brand pink */
  --link: 226 100% 67%;    /* Blue link */
  /* ... other variables */
}
```

## Usage

### Blog List Page

```tsx
// app/blog/page.tsx
import { BlogListPage, getAllArticles } from '@/features/blog'

export default async function Page() {
  const posts = await getAllArticles()
  
  return (
    <BlogListPage 
      posts={posts}
      basePath="/blog"
      blogName="My Blog"
    />
  )
}
```

### Blog Post Page

```tsx
// app/blog/[slug]/page.tsx
import { BlogPostPage, getArticleById, getAllArticles } from '@/features/blog'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
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
      blogName="My Blog"
    />
  )
}
```

### Using Individual Components

```tsx
import { 
  FeaturedSlider,
  CategoryBadge,
  CategoryFilter,
  ShareButtons,
  TableOfContents,
  ScrollProgress,
  MDXRenderer 
} from '@/features/blog'
```

## Configuration

### Strapi URL

Set the `NEXT_PUBLIC_STRAPI_URL` environment variable:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-cms.com
```

Or modify directly in `features/blog/api/apollo-client.ts`:

```ts
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://your-cms.com'
```

## Structure

```
features/blog/
  index.ts              # Main exports
  api/
    apollo-client.ts    # Apollo Client setup
    articles.ts         # Data fetching functions
    queries.ts          # GraphQL queries
    index.ts
  components/
    BlogListPage.tsx    # Full blog listing page
    BlogPostPage.tsx    # Full blog post page
    FeaturedSlider.tsx  # Featured posts carousel
    CategoryBadge.tsx   # Category badge component
    CategoryFilter.tsx  # Category filter pills
    ScrollProgress.tsx  # Reading progress bar
    ShareButtons.tsx    # Social share buttons
    TableOfContents.tsx # Auto-generated ToC
    MDXRenderer.tsx     # MDX content renderer
    index.ts
  types/
    index.ts            # TypeScript types
  utils/
    index.ts            # Utility functions
  styles/
    blog.css            # CSS animations & styles
```

## Props

### BlogListPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| posts | MappedPost[] | required | Array of blog posts |
| basePath | string | '/blog' | Base URL path for blog |
| blogName | string | 'AI Blog' | Blog name in header/footer |
| showHeader | boolean | true | Show header |
| showFooter | boolean | true | Show footer |

### BlogPostPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| post | MappedPost | required | Blog post data |
| relatedPosts | MappedPost[] | [] | Related posts to show |
| basePath | string | '/blog' | Base URL path for blog |
| blogName | string | 'AI Blog' | Blog name in header |

### ShareButtons

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Post title for sharing |
| slug | string | required | Post slug for URL |
| basePath | string | '/blog' | Base URL path |

### FeaturedSlider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| posts | MappedPost[] | required | Posts to display (max 5) |
| basePath | string | '/blog' | Base URL path for links |
