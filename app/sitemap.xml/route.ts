import { getAllPosts, getCategories, getProjects } from "@/lib/content/source";
import { slugifyCategory } from "@/lib/utils/slug";

const BASE_URL = "https://shanhai-blog.vercel.app";

export async function GET() {
  const [posts, categories, projects] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getProjects()
  ]);

  const urlEntries: string[] = [];

  // Static routes
  const staticRoutes = ["/", "/categories", "/archives", "/about", "/projects"];
  for (const route of staticRoutes) {
    urlEntries.push(`
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`);
  }

  // Post routes
  for (const post of posts) {
    urlEntries.push(`
  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt ?? post.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  // Category routes
  for (const category of categories) {
    urlEntries.push(`
  <url>
    <loc>${BASE_URL}/categories/${slugifyCategory(category.name)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  }

  // Project routes
  for (const project of projects) {
    urlEntries.push(`
  <url>
    <loc>${BASE_URL}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("")}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
