import Link from "next/link";

import type { ContentPost, TocItem } from "@/lib/content/types";
import { formatDisplayDate } from "@/lib/utils/date";
import { slugifyCategory } from "@/lib/utils/slug";

type RightSidebarProps =
  | {
      mode: "default";
      latestPosts: ContentPost[];
      categories: Array<{ name: string; count: number }>;
    }
  | {
      mode: "toc";
      toc: TocItem[];
    };

export function RightSidebar(props: RightSidebarProps) {
  if (props.mode === "toc") {
    return (
      <aside className="col-span-1 space-y-4">
        <div className="card-surface p-5">
          <h3 className="mb-4 text-[12px] text-gray-400">目录</h3>
          <ol className="space-y-3 text-[13px] text-gray-700">
            {props.toc.map((item, index) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  className={`flex items-start gap-3 rounded px-2 py-2 transition-colors ${
                    index === 0 ? "bg-blue-50 text-[var(--theme-blue)]" : "hover:text-[var(--theme-blue)]"
                  }`}
                >
                  <span className="w-4 shrink-0 text-right text-gray-500">{index + 1}</span>
                  <span className="leading-6">{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    );
  }

  return (
    <aside className="col-span-1 space-y-4">
      <div className="card-surface p-5">
        <h3 className="mb-4 text-[12px] text-gray-400">最新文章</h3>
        <ul className="space-y-4">
          {props.latestPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block cursor-pointer">
                <div className="mb-0.5 text-[11px] text-gray-400">{formatDisplayDate(post.date)}</div>
                <div className="leading-snug text-[13px] text-gray-700 group-hover:text-[var(--theme-blue)]">
                  {post.title}
                </div>
                <div className="mt-1 text-[11px] uppercase text-gray-400">{post.category}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-surface p-5">
        <h3 className="mb-4 text-[12px] text-gray-400">分类</h3>
        <ul className="space-y-3">
          {props.categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/categories/${slugifyCategory(category.name)}`}
                className="group flex cursor-pointer items-center justify-between text-[13px]"
              >
                <span className="text-gray-600 group-hover:text-[var(--theme-blue)]">{category.name}</span>
                <span className="rounded bg-gray-50 px-2 py-0.5 text-[11px] text-gray-400">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
