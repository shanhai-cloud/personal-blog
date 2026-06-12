"use client";

import Link from "next/link";

import type { SearchEntry } from "@/lib/content/types";
import { formatDisplayDate } from "@/lib/utils/date";

export function SearchResultsList({
  entries,
  query,
  onSelect
}: {
  entries: SearchEntry[];
  query: string;
  onSelect: () => void;
}) {
  if (!query.trim()) {
    return <div className="px-1 py-4 text-[13px] text-gray-400">输入关键词搜索文章标题、摘要、分类或标签</div>;
  }

  if (entries.length === 0) {
    return <div className="px-1 py-4 text-[13px] text-gray-400">没有找到匹配内容</div>;
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={`/posts/${entry.slug}`}
            onClick={onSelect}
            className="block rounded-md border border-transparent px-3 py-3 transition-colors hover:border-blue-100 hover:bg-blue-50/70"
          >
            <div className="mb-1 text-[11px] text-gray-400">
              {formatDisplayDate(entry.date)} · {entry.category}
            </div>
            <div className="text-[15px] font-medium text-gray-800">{entry.title}</div>
            <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-gray-600">{entry.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded bg-gray-50 px-2 py-0.5 text-[11px] text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
