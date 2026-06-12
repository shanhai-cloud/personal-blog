import { getAllPosts } from "@/lib/content/source";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shanhai | 个人博客</title>
    <link>https://shanhai-blog.vercel.app</link>
    <description>大二全栈开发工程师的个人博客，分享 Python 爬虫、微服务架构、Java 后端技术实践。</description>
    <language>zh-CN</language>
    <atom:link href="https://shanhai-blog.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://shanhai-blog.vercel.app/posts/${post.slug}</link>
      <guid>https://shanhai-blog.vercel.app/posts/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags ? post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("") : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`.trim();

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
