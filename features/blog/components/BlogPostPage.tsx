import Link from "next/link";
import Image from "next/image";
import type { MappedPost } from "../types";
import MDXRenderer from "./MDXRenderer";
import CategoryBadge from "./CategoryBadge";
import TableOfContents from "./TableOfContents";
import ScrollProgress from "./ScrollProgress";
import ShareButtons from "./ShareButtons";
import CryptoBackground from "./CryptoBackground";
import { formatDate, getReadingTime } from "../utils";

interface BlogPostPageProps {
  post: MappedPost;
  relatedPosts?: MappedPost[];
  basePath?: string;
  blogName?: string;
  slug: string;
}

export default function BlogPostPage({
  post,
  relatedPosts = [],
  basePath = "/blog",
  blogName = "Crypto Blog",
  slug,
}: BlogPostPageProps) {
  const content = (post.excerpt ?? "").replace(/<br>/g, "<br />");
  const category = post.categories?.split(",")[0]?.trim() || null;
  const readingTime = getReadingTime(content);

  return (
    <main className="min-h-screen bg-background relative">
      <ScrollProgress />

      {/* ── Back nav ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Link
          href={basePath}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {blogName}
        </Link>
      </div>

      {/* ── Hero ── */}
      {post.coverSrc && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
            <Image
              src={post.coverSrc}
              alt={`Cover image for ${post.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            {/* Blockchain grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--primary)/0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.12) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Article header ── */}
        <header className="pt-10 pb-8 border-b border-border/20">
          {/* Meta row */}
          <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Meta items */}
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              {category && (
                <CategoryBadge category={category} variant="default" />
              )}
              <div className="flex items-center gap-1.5 text-foreground/60">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs">{readingTime} min read</span>
              </div>
              <span className="text-muted-foreground/40">·</span>
              <time
                className="text-foreground/60 text-xs"
                dateTime={post.date}
              >
                {formatDate(post.date)}
              </time>
              {post.author && (
                <>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-foreground/60 text-xs">
                    {post.author}
                  </span>
                </>
              )}
            </div>
            {/* Share buttons */}
            <div className="shrink-0">
              <ShareButtons
                title={post.title}
                slug={slug}
                basePath={basePath}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-foreground mb-6 max-w-3xl">
            {post.title}
          </h1>
        </header>

        {/* ── Two-column: article body + ToC sidebar ── */}
        <div className="flex gap-14 items-start py-10">
          {/* Article body — overflow-x-hidden prevents layout blowout; pre/table handle their own scroll */}
          <div className="min-w-0 flex-1 overflow-x-hidden">
            <div
              className="article-body prose max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-h2:text-[1.5rem] prose-h2:leading-tight
                prose-h3:text-[1.25rem] prose-h3:leading-tight
                prose-p:text-foreground/80 prose-p:leading-[1.8] prose-p:text-[0.9375rem]
                prose-li:text-foreground/80
                prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-colors
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.875em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-card prose-pre:border prose-pre:border-border/30 prose-pre:rounded-xl prose-pre:overflow-x-auto
                prose-blockquote:border-l-2 prose-blockquote:border-primary/40 prose-blockquote:text-foreground/65 prose-blockquote:pl-5 prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:border prose-img:border-border/20 prose-img:my-8
                prose-hr:border-border/20
                prose-th:text-foreground prose-td:text-foreground/80"
            >
              <MDXRenderer source={content} />
            </div>

            {/* Tags */}
            {category && (
              <div className="pt-8 flex flex-wrap gap-2">
                {post.categories?.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="inline-flex items-center px-3 py-1 rounded-full text-[0.6875rem] font-sans border border-border/30 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200 cursor-default"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Footer nav */}
            <footer className="py-8 mt-6 border-t border-border/20">
              <Link
                href={basePath}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                {blogName}
              </Link>
            </footer>
          </div>

          {/* ToC sidebar — sticky is handled inside TableOfContents */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
            <TableOfContents contentSelector=".article-body" />
          </aside>
        </div>
      </div>

      {/* ── Related posts ── */}
      {/* {relatedPosts.length > 0 && (
        <section className="border-t border-border/20 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] font-sans font-bold uppercase tracking-widest text-muted-foreground">
                Related
              </span>
              <div className="flex-1 h-px bg-border/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((p, i) => (
                <RelatedPostCard
                  key={p.id}
                  post={p}
                  index={i}
                  basePath={basePath}
                />
              ))}
            </div>
          </div>
        </section>
      )} */}
    </main>
  );
}

function RelatedPostCard({
  post,
  index,
  basePath,
}: {
  post: MappedPost;
  index: number;
  basePath: string;
}) {
  const category = post.categories?.split(",")[0]?.trim() || null;
  console.log("post", post);

  return (
    <article
      className="group border border-border/20 rounded-xl overflow-hidden hover:border-border/50 transition-all duration-300 bg-card/20 hover:bg-card/50"
      style={{ transitionDelay: `${index * 0.03}s` }}
    >
      <Link href={`${basePath}/${post.slug}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-video overflow-hidden bg-card">
          {post.coverSrc ? (
            <Image
              src={post.coverSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl text-primary/20">⟠</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-60" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          {category && (
            <div className="mb-3">
              <CategoryBadge category={category} variant="default" />
            </div>
          )}
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-auto group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          <div className="mt-4 pt-3 border-t border-border/20 flex items-center gap-2 text-[0.6875rem] font-sans text-muted-foreground/50">
            {post.author && (
              <>
                <span>{post.author}</span>
                <span>·</span>
              </>
            )}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
