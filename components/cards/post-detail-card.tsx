import { CalendarDays } from "lucide-react";

import type { ReactNode } from "react";

import type { ContentPost } from "@/lib/content/types";
import { formatDisplayDate } from "@/lib/utils/date";
import { formatReadingMinutes, formatWordCount } from "@/lib/utils/reading";

export function PostDetailCard({
  post,
  content
}: {
  post: ContentPost;
  content: ReactNode;
}) {
  return (
    <article className="card-surface p-8">
      <h1 className="leading-snug text-[22px] font-bold text-gray-800">
        <span className="mr-1 text-gray-400">»</span>
        {post.title}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-gray-400">
        <span className="flex items-center">
          <CalendarDays className="mr-1 h-3.5 w-3.5" />
          {formatDisplayDate(post.date)}
        </span>
        <span className="flex items-center">
          <CalendarDays className="mr-1 h-3.5 w-3.5" />
          {formatDisplayDate(post.updatedAt ?? post.date)}
        </span>
        <span>{post.category}</span>
        <span>
          {formatReadingMinutes(post.metadata.readingTime)}（约 {formatWordCount(post.metadata.wordCount)} 字）
        </span>
      </div>

      <div className="article-prose mt-8">{content}</div>
    </article>
  );
}
