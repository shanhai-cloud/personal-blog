import Link from "next/link";

import { slugifyCategory } from "@/lib/utils/slug";

export function CategoryList({
  categories
}: {
  categories: Array<{ name: string; count: number }>;
}) {
  return (
    <div className="card-surface p-8">
      <div className="mb-6 border-b border-gray-100 pb-2 text-[12px] text-gray-400">分类</div>
      <ul className="text-[14px] text-gray-700">
        {categories.map((category) => (
          <li key={category.name} className="border-b border-gray-100 last:border-0">
            <Link
              href={`/categories/${slugifyCategory(category.name)}`}
              className="flex cursor-pointer items-center justify-between px-2 py-3 transition-colors hover:bg-gray-50"
            >
              <span>{category.name}</span>
              <span className="text-[12px] text-gray-400">{category.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
