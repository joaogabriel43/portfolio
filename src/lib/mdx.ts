import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ─── Constants ────────────────────────────────────────────────
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// ─── Types ────────────────────────────────────────────────────
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;        // ISO "YYYY-MM-DD"
  tags: string[];
  readingTime: string; // "6 min read"
  featured: boolean;
}

export interface Post extends PostMeta {
  content: string; // raw MDX source (no frontmatter)
}

// ─── Helpers ──────────────────────────────────────────────────
function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function parsePost(slug: string): PostMeta & { content: string } {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title:       (data.title       as string)   ?? slug,
    description: (data.description as string)   ?? "",
    date:        (data.date        as string)   ?? "",
    tags:        (data.tags        as string[]) ?? [],
    readingTime: readingTime(content).text,
    featured:    (data.featured    as boolean)  ?? false,
    content,
  };
}

// ─── Public API ───────────────────────────────────────────────
/** Returns all post metadata sorted by date (newest first). */
export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = parsePost(slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Returns full post (metadata + raw MDX content). Throws if not found. */
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  return parsePost(slug);
}
