import type { ContentPost, ContentProject, SearchEntry, SiteConfig } from "@/lib/content/types";
import {
  posts as generatedPosts,
  projects as generatedProjects,
  site as generatedSite
} from "../../.velite";

function normalizeToc(
  items: Array<{ title: string; url: string; items?: unknown[] }>
): ContentPost["toc"] {
  return items.map((item) => ({
    title: item.title,
    url: item.url,
    depth: 2,
    items: Array.isArray(item.items)
      ? normalizeToc(item.items as Array<{ title: string; url: string; items?: unknown[] }>)
      : undefined
  }));
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const publishedPosts = generatedPosts.filter((post) => post.published);
  const categories = new Set(publishedPosts.map((p) => p.category).filter(Boolean));
  const tags = new Set(publishedPosts.flatMap((p) => p.tags ?? []).filter(Boolean));

  return {
    ...generatedSite,
    profile: {
      ...generatedSite.profile,
      articleCount: publishedPosts.length,
      categoryCount: categories.size,
      tagCount: tags.size
    }
  };
}

export async function getAllPosts(): Promise<ContentPost[]> {
  return generatedPosts
    .filter((post) => post.published)
    .map((post) => ({
      ...post,
      toc: normalizeToc(post.toc)
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string): Promise<ContentPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getLatestPosts(limit = 5): Promise<ContentPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getCategories(): Promise<Array<{ name: string; count: number }>> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getArchives(): Promise<
  Array<{
    year: string;
    posts: ContentPost[];
  }>
> {
  const posts = await getAllPosts();
  const grouped = new Map<string, ContentPost[]>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    const list = grouped.get(year) ?? [];
    list.push(post);
    grouped.set(year, list);
  }

  return [...grouped.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, yearPosts]) => ({
      year,
      posts: yearPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
    }));
}

export async function getProjects(): Promise<ContentProject[]> {
  return generatedProjects
    .filter((project) => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || +new Date(b.date) - +new Date(a.date));
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.date
  }));
}
