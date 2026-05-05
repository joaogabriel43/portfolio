import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getAllPosts, type PostMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre engenharia de software, arquitetura e boas práticas de desenvolvimento.",
};

// ─── Blog card ────────────────────────────────────────────────
function BlogCard({ post, index }: { post: PostMeta; index: number }) {
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="block py-8 border-b border-border hover:border-accent/30 transition-colors duration-300"
        aria-label={`Ler artigo: ${post.title}`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          {/* Index + date block */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:w-40 lg:w-48">
            <span className="font-mono text-[11px] text-accent/30 select-none block mb-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <time
              dateTime={post.date}
              className="font-mono text-[11px] text-muted/60 block"
            >
              {formattedDate}
            </time>
            <span className="font-mono text-[11px] text-muted/40 block mt-0.5">
              {post.readingTime}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h2>
            <p className="font-sans text-sm text-muted leading-relaxed mb-4">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-background border border-border text-muted/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read more indicator */}
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent/60 group-hover:text-accent transition-colors duration-200">
              Ler artigo
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main-content" className="section-padding pt-32">
        <div className="container-main">
          {/* ── Header ── */}
          <div className="mb-16">
            <div className="mb-5">
              <SectionLabel animate={false}>blog</SectionLabel>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-[1.1]">
              Artigos técnicos
            </h1>
            <p className="font-sans text-muted text-lg max-w-xl">
              Reflexões sobre engenharia de software, padrões de arquitetura e boas
              práticas de desenvolvimento.
            </p>
          </div>

          {/* ── Post list ── */}
          {posts.length === 0 ? (
            <p className="font-sans text-muted text-sm">
              Nenhum artigo publicado ainda. Em breve!
            </p>
          ) : (
            <div>
              {/* Top border */}
              <div className="border-t border-border" />
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}

          {/* ── Back to portfolio ── */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 group"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              Voltar ao portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
