import type { Metadata } from "next";

import { ArchiveTimeline } from "@/components/archive/archive-timeline";
import { getArchives } from "@/lib/content/source";

export const metadata: Metadata = {
  title: "归档 | Shanhai",
  description: "博客文章归档列表，按时间排序。"
};

export default async function ArchivesPage() {
  const archiveGroups = await getArchives();
  const archives = archiveGroups.map((group) => ({
      year: group.year,
      posts: group.posts.map((post) => ({
        slug: post.slug,
      date: post.date,
      title: post.title,
      category: post.category
    }))
  }));

  return <ArchiveTimeline archives={archives} />;
}
