import Link from "next/link";

import { formatDisplayDate } from "@/lib/utils/date";

export function ArchiveTimeline({
  archives
}: {
  archives: Array<{
    year: string;
    posts: Array<{
      slug: string;
      date: string;
      title: string;
      category: string;
    }>;
  }>;
}) {
  return (
    <div className="card-surface p-8">
      {archives.map((group) => (
        <div key={group.year} className="mb-10 last:mb-0">
          <span className="mb-4 inline-block rounded bg-[var(--theme-blue)] px-3 py-1 text-[13px] font-bold text-white shadow-sm">
            {group.year}
          </span>
          <div className="relative pl-6">
            <div className="absolute bottom-[-24px] left-[5px] top-6 w-px bg-[#e2e8f0]" />
            <div className="space-y-6">
              {group.posts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group relative block cursor-pointer">
                  <div className="absolute left-0 top-[6px] h-[11px] w-[11px] rounded-full border-2 border-white bg-[#cbd5e1] transition-colors group-hover:bg-[var(--theme-blue)]" />
                  <div className="pl-4">
                    <div className="mb-1 text-[12px] text-gray-400">{formatDisplayDate(post.date)}</div>
                    <div className="leading-relaxed text-[14px] text-gray-700 transition-colors group-hover:text-[var(--theme-blue)]">
                      {post.title}
                    </div>
                    <div className="mt-1 text-[11px] uppercase text-gray-400">{post.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
