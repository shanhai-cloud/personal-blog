import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostListCard } from "@/components/cards/post-list-card";
import { getAllPosts, getCategories } from "@/lib/content/source";
import { slugifyCategory } from "@/lib/utils/slug";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const categories = await getCategories();
  const category = categories.find((c) => slugifyCategory(c.name) === slug);
  if (!category) return {};
  return {
    title: `${category.name} - 分类 | Shanhai`,
    description: `浏览 ${category.name} 分类下的所有文章（共 ${category.count} 篇）`
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  // Next.js 15.5 不会自动解码 URL 编码的中文字符，手动解码
  const slug = decodeURIComponent(rawSlug);
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);

  const targetCategory = categories.find((category) => slugifyCategory(category.name) === slug);
  if (!targetCategory) {
    notFound();
  }

  const filteredPosts = posts.filter((post) => post.category === targetCategory.name);

  return (
    <div>
      <div className="card-surface mb-6 p-6 text-[14px] text-gray-600">
        <span className="text-[var(--theme-blue)]">分类</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-gray-700">{targetCategory.name}</span>
      </div>

      {filteredPosts.map((post) => (
        <PostListCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
