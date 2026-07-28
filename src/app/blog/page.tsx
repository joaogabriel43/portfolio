import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    <article
      data-reveal
      className="group relative grid grid-cols-1 gap-y-4 border-t border-border py-9 md:grid-cols-[minmax(140px,200px)_1fr] md:gap-x-[clamp(24px,4vw,56px)]"
    >
      <div className="flex flex-col gap-1.5">
        <p className="eyebrow-sm">{String(index + 1).padStart(2, "0")}</p>
        <time dateTime={post.date} className="font-mono text-[11px] text-muted">
          {formattedDate}
        </time>
        <p className="font-mono text-[11px] text-dim">{post.readingTime}</p>
      </div>

      <div>
        <h2 className="text-[clamp(1.3rem,2.6vw,1.8rem)] font-light leading-[1.25] tracking-[-0.03em]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-base ease-out after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-muted [text-wrap:pretty]">
          {post.description}
        </p>

        <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          {post.tags.join(" · ")}
        </p>
      </div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main-content" className="container-page pb-32 pt-24">
        <div className="mx-auto max-w-[1000px]">
          {/* ── Header ── */}
          <header className="flex flex-col gap-6">
            <p className="eyebrow">Blog</p>
            <h1 className="display-lg text-[clamp(2.4rem,7vw,5rem)]">
              Artigos técnicos.
            </h1>
            <p className="max-w-[560px] text-[17px] leading-[1.55] text-muted [text-wrap:pretty]">
              Reflexões sobre engenharia de software, padrões de arquitetura e
              boas práticas de desenvolvimento.
            </p>
          </header>

          {/* ── Post list ── */}
          <div className="mt-16">
            {posts.length === 0 ? (
              <p className="border-t border-border pt-9 text-[15px] text-muted">
                Nenhum artigo publicado ainda. Em breve.
              </p>
            ) : (
              <>
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
                <div className="border-t border-border" />
              </>
            )}
          </div>

          {/* ── Voltar ── */}
          <div className="mt-14">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-base ease-out hover:text-accent"
            >
              <span className="inline-block transition-transform duration-base ease-out group-hover:-translate-x-1">
                ←
              </span>
              Voltar ao portfolio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
