import type { Metadata } from "next";

import { PostListCard } from "@/components/cards/post-list-card";
import { getAllPosts } from "@/lib/content/source";

export const metadata: Metadata = {
  title: "Shanhai | 个人博客",
  description:
    "大二全栈开发工程师的个人博客，分享 Python 爬虫、微服务架构、Java 后端技术实践。"
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div>
      {posts.map((post) => (
        <PostListCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
