import Link from "next/link";
import { CalendarDays, FolderOpen, LibraryBig } from "lucide-react";

import type { ContentPost } from "@/lib/content/types";
import { formatDisplayDate } from "@/lib/utils/date";
import { formatReadingMinutes } from "@/lib/utils/reading";

export function PostListCard({ post }: { post: ContentPost }) {
  return (
    <article className="card-surface mb-6 p-7">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="leading-tight text-[32px] font-bold text-gray-800 transition-colors hover:text-[var(--theme-blue)]">
          » {post.title}
        </h2>
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] text-gray-400">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDisplayDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDisplayDate(post.updatedAt ?? post.date)}
        </span>
        <span>{post.category}</span>
        <span>{formatReadingMinutes(post.metadata.readingTime)}</span>
      </div>

      <div className="mt-5">
        <h3 className="border-l-[3px] border-purple-500 pl-3 text-[16px] font-bold text-gray-800">
          {post.toc[0]?.title ?? "概述"}
        </h3>
      </div>

      <p className="mt-4 text-[14px] leading-8 text-gray-700">{post.excerpt}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[12px] text-gray-500">
            <FolderOpen className="h-3.5 w-3.5" />
            {post.category}
          </span>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-1 rounded bg-gray-50 px-4 py-2 text-[12px] text-gray-500 transition-colors hover:text-[var(--theme-blue)]"
          >
            <LibraryBig className="h-3.5 w-3.5" />
            阅读更多
          </Link>
        </div>
      </div>
    </article>
  );
}
