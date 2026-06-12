import type { Metadata } from "next";

import { CategoryList } from "@/components/category/category-list";
import { getCategories } from "@/lib/content/source";

export const metadata: Metadata = {
  title: "分类 | Shanhai",
  description: "博客文章分类浏览。"
};

export default async function CategoriesPage() {
  return <CategoryList categories={await getCategories()} />;
}
