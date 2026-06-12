import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

const postSchema = s.object({
  title: s.string().min(1),
  slug: s.slug("title"),
  date: s.isodate(),
  updatedAt: s.isodate().optional(),
  tags: s.array(s.string()).default([]),
  category: s.string().min(1),
  excerpt: s.string().min(1),
  cover: s.string().optional(),
  published: s.boolean().default(true),
  featured: s.boolean().default(false),
  metadata: s.metadata(),
  toc: s.toc(),
  body: s.raw()
});

const projectSchema = s.object({
  title: s.string().min(1),
  slug: s.slug("title"),
  date: s.isodate(),
  excerpt: s.string().min(1),
  cover: s.string().optional(),
  link: s.string().url(),
  published: s.boolean().default(true),
  featured: s.boolean().default(false),
  tags: s.array(s.string()).default([]),
  body: s.raw()
});

const siteSchema = s.object({
  profile: s.object({
    name: s.string().min(1),
    headline: s.string().min(1),
    location: s.string().min(1),
    avatar: s.string().optional(),
    qrCode: s.string().optional(),
    articleCount: s.number().default(0),
    categoryCount: s.number().default(0),
    tagCount: s.number().default(0),
    followLabel: s.string().min(1),
    followUrl: s.string().optional(),
    githubUrl: s.string().optional(),
    messageUrl: s.string().optional(),
    rssUrl: s.string().optional()
  }),
  navigation: s.array(
    s.object({
      href: s.string().min(1),
      label: s.string().min(1)
    })
  ),
  links: s.array(
    s.object({
      title: s.string().min(1),
      domain: s.string().min(1),
      url: s.string().url()
    })
  ),
  about: s.object({
    title: s.string().min(1),
    description: s.string().min(1)
  })
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: ".velite/assets",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
    format: "esm"
  },
  collections: {
    posts: defineCollection({
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: postSchema
    }),
    projects: defineCollection({
      name: "Project",
      pattern: "projects/**/*.mdx",
      schema: projectSchema
    }),
    site: defineCollection({
      name: "SiteConfig",
      pattern: "site/index.yml",
      single: true,
      schema: siteSchema
    })
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  },
  complete(data) {
    const generatedPath = path.join(process.cwd(), ".velite");
    console.info(
      `Velite generated ${data.posts.length} posts, ${data.projects.length} projects, and site config in ${generatedPath}`
    );
  }
});
