import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
      <main id="main-content" className="container-page pb-24 pt-24">
        <article className="mx-auto max-w-[720px]">
          {/* ── Back link ── */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
          >
            <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
              ←
            </span>
            Todos os artigos
          </Link>

          {/* ── Post header ── */}
          <header className="mt-10 flex flex-col gap-6 border-b border-border pb-10">
            {post.tags.length > 0 && (
              <p className="eyebrow">{post.tags.join(" · ")}</p>
            )}

            <h1 className="display-md text-[clamp(2rem,5vw,3.4rem)] tracking-[-0.04em]">
              {post.title}
            </h1>

            <p className="text-[18px] leading-[1.55] text-muted [text-wrap:pretty]">
              {post.description}
            </p>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
              <time dateTime={post.date}>{formattedDate}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </p>
          </header>

          {/* ── MDX body ── */}
          <div className="prose-blog mt-12">
            <MDXRemote source={post.content} options={mdxOptions} />
          </div>

          {/* ── Footer nav ── */}
          <nav
            aria-label="Navegação do artigo"
            className="mt-16 flex flex-col gap-4 border-t border-border pt-9 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
            >
              <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
                ←
              </span>
              Ver todos os artigos
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity duration-base ease-out hover:opacity-70"
            >
              Entre em contato
              <span className="inline-block transition-transform duration-base ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
