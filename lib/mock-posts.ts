export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  coverSrc?: string
  content: string
  author?: string
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 16',
    excerpt:
      'Learn how to build modern web applications with the latest features in Next.js 16, including the new App Router and Server Components.',
    date: '2026-03-28T10:00:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    author: 'Sarah Chen',
    content: `Next.js 16 brings exciting new features that make building web applications easier than ever. In this guide, we'll explore the fundamentals and get you up and running quickly.

## Why Next.js?

Next.js is a React framework that provides a great developer experience with features like file-based routing, automatic code splitting, and built-in CSS support.

## Getting Started

To create a new Next.js project, run the following command:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new project with all the necessary dependencies and configuration.

## The App Router

The App Router is the recommended way to build applications in Next.js. It uses a file-system based router where folders define routes.

## Conclusion

Next.js provides an excellent foundation for building modern web applications. Start experimenting with these features and see how they can improve your development workflow.`,
  },
  {
    id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS for Rapid UI Development',
    excerpt:
      'Discover how utility-first CSS can dramatically speed up your development workflow while maintaining consistent, beautiful designs.',
    date: '2026-03-25T14:30:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
    author: 'Marcus Johnson',
    content: `Tailwind CSS has revolutionized how developers approach styling. Instead of writing custom CSS, you compose designs using pre-built utility classes.

## The Utility-First Approach

Rather than writing semantic class names like "card" or "button", you apply utilities directly in your HTML:

\`\`\`html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold text-gray-900">Hello World</h2>
</div>
\`\`\`

## Benefits

1. **No naming things** - Stop wasting time inventing class names
2. **Consistent spacing** - Use the built-in spacing scale
3. **Responsive design** - Built-in responsive modifiers
4. **Dark mode** - Easy dark mode support

## Conclusion

Tailwind CSS removes friction from the styling process, letting you focus on building great user experiences.`,
  },
  {
    id: '3',
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices in 2026',
    excerpt:
      'Essential TypeScript patterns and practices that will make your code more maintainable, type-safe, and easier to refactor.',
    date: '2026-03-20T09:15:00Z',
    author: 'Emily Rodriguez',
    content: `TypeScript continues to evolve, and staying up-to-date with best practices is essential for writing maintainable code.

## Use Strict Mode

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const name = "John"

// Unnecessary
const name: string = "John"
\`\`\`

## Use Discriminated Unions

For complex state management, discriminated unions are powerful:

\`\`\`typescript
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }
\`\`\`

## Conclusion

These practices will help you write better TypeScript code that's easier to maintain and refactor.`,
  },
  {
    id: '4',
    slug: 'building-accessible-websites',
    title: 'Building Accessible Websites: A Practical Guide',
    excerpt:
      'Learn the fundamental principles of web accessibility and how to implement them in your projects to create inclusive experiences.',
    date: '2026-03-15T16:45:00Z',
    coverSrc: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop',
    author: 'Alex Kim',
    content: `Web accessibility ensures that websites are usable by everyone, including people with disabilities. It's not just a nice-to-have—it's essential.

## Why Accessibility Matters

- 15% of the world's population has some form of disability
- Accessible sites often have better SEO
- It's the right thing to do

## Key Principles

### Perceivable

Content must be presentable in ways users can perceive:
- Provide alt text for images
- Ensure sufficient color contrast
- Use proper heading hierarchy

### Operable

Users must be able to operate the interface:
- Keyboard navigation support
- Skip links for main content
- Clear focus indicators

### Understandable

Content must be understandable:
- Clear, simple language
- Consistent navigation
- Error messages that help users

## Conclusion

Accessibility benefits everyone. Start incorporating these practices into your workflow today.`,
  },
  {
    id: '5',
    slug: 'state-management-patterns',
    title: 'Modern State Management Patterns in React',
    excerpt:
      'Explore different approaches to state management in React applications, from useState to Zustand and beyond.',
    date: '2026-03-10T11:00:00Z',
    content: `State management remains one of the most discussed topics in React development. Let's explore the options available in 2026.

## Local State with useState

For simple, component-level state:

\`\`\`tsx
const [count, setCount] = useState(0)
\`\`\`

## Server State with SWR

For data fetching and caching:

\`\`\`tsx
const { data, error } = useSWR('/api/user', fetcher)
\`\`\`

## Global State Options

### Context API
Good for low-frequency updates across the app.

### Zustand
Lightweight and flexible, great for most applications.

### Jotai
Atomic state management, excellent for fine-grained reactivity.

## Conclusion

Choose the right tool for your specific needs. Often, a combination of approaches works best.`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return MOCK_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
