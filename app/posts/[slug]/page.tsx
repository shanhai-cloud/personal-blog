import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetailCard } from "@/components/cards/post-detail-card";
import { ContentFadeTransition } from "@/components/layout/content-fade-transition";
import { SiteShell } from "@/components/layout/site-shell";
import { renderMdx } from "@/lib/content/mdx";
import { getPostBySlug } from "@/lib/content/source";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Shanhai`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

export default async function PostDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await renderMdx(post.body);

  return (
    <SiteShell sidebar={{ mode: "toc", toc: post.toc }}>
      <ContentFadeTransition>
        <PostDetailCard post={post} content={content} />
      </ContentFadeTransition>
    </SiteShell>
  );
}
