import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import { Navbar } from "@/components/layout/Navbar";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

// ─── Static generation ────────────────────────────────────────
export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
    };
  } catch {
    return { title: "Artigo não encontrado" };
  }
}

// ─── MDX options ─────────────────────────────────────────────
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  },
};

// ─── Post page ───────────────────────────────────────────────
export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 md:pb-28">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {/* ── Back link ── */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 mb-12 group"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              Todos os artigos
            </Link>

            {/* ── Post header ── */}
            <header className="mb-12">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-surface border border-border text-muted/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-5 leading-[1.1]">
                {post.title}
              </h1>

              <p className="font-sans text-muted text-lg leading-relaxed mb-8">
                {post.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted/50 pb-8 border-b border-border">
                <time dateTime={post.date}>{formattedDate}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            {/* ── MDX body ── */}
            <div className="prose-blog">
              <MDXRemote source={post.content} options={mdxOptions} />
            </div>

            {/* ── Footer nav ── */}
            <footer className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 group"
              >
                <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
                  ←
                </span>
                Ver todos os artigos
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent/60 hover:text-accent transition-colors duration-200"
              >
                Entre em contato →
              </Link>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
