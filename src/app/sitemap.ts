import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaogabriel.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  // /projects/finassistant é redirect (next.config.mjs), não entra — só o id canônico.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${siteUrl}/projects/${p.id}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
