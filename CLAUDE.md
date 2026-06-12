# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概览

Shanhai的个人博客 — 基于 Next.js 15 App Router 构建，MDX 内容通过 Velite 管理，可选 PostgreSQL（Prisma）支持阅读量统计等功能。博客聚焦 AI 工具、编码实践和中间件/云原生话题。

所有应用代码在 `blog-web/` 下。`blog-admin/` 目录目前为空（预留给未来的管理后台）。`图片/` 和 `原型.html` 为设计素材。

## 常用命令

所有命令在 `blog-web/` 下执行：

```bash
npm run dev              # 启动 Next.js 开发服务器
npm run build            # 构建：velite 内容生成 → next build
npm run start            # 启动生产服务器
npm run lint             # ESLint 检查（next lint）
npm run prisma:generate  # 从 schema 生成 Prisma 客户端
npm run prisma:migrate   # 创建/应用 Prisma 迁移（开发环境）
npm run prisma:push      # 直接推送 schema 变更到数据库（不生成迁移文件）
```

## 架构

### 内容管线

内容是主要数据源，数据库是可选的附加层。

1. **内容编写**：`content/posts/` 和 `content/projects/` 下的 MDX 文件，加上 `content/site/index.yml` 作为站点配置
2. **编译**：Velite（`velite.config.ts`）读取 MDX/YAML，应用 schema 校验，运行 remark/rehype 插件（GFM、标题 slug、锚点链接），输出带类型的 ESM 模块到 `.velite/`
3. **数据服务**：`lib/content/source.ts` 导入 Velite 产物并提供查询函数（`getAllPosts`、`getPostBySlug`、`getCategories`、`getArchives`、`getProjects`、`getSiteConfig`）。**每个函数都有硬编码的兜底数据**，即使不运行 Velite 也能正常展示
4. **MDX 渲染**：页面层面由 `lib/content/mdx.ts` 使用 `next-mdx-remote/rsc` 将原始 MDX 正文编译为 React 元素

### 数据库层（可选）

Prisma + PostgreSQL。当 `DATABASE_ENABLED=false` 或 `DATABASE_URL` 未设置时，**所有功能优雅降级**：

- **文章阅读量**：`Post` 表记录（见 `prisma/schema.prisma`），通过 `POST /api/posts/[slug]/view` 递增。降级时返回 0
- **站点信息**：`SiteProfile` 表，通过 `GET /api/site/profile` 暴露。降级时回退到 `lib/api/site-data.ts` 中的硬编码数据
- **友链**：`FriendLink` 表，通过 `GET /api/site/links` 暴露。降级时回退到硬编码数据

守卫函数 `lib/db/availability.ts` 会在任何 DB 调用前检查 `DATABASE_URL` 和 `DATABASE_ENABLED`。`lib/db/prisma.ts` 在数据库未启用时返回 `null`。

### 路由结构

```
app/
├── layout.tsx                 # 根布局：<html>、全局 metadata
├── globals.css                # Tailwind 引入、设计令牌、滚动条、卡片样式
├── (site)/
│   ├── layout.tsx             # SiteShell（顶栏 + 三栏网格 + 页面切换动画）
│   ├── page.tsx               # 首页：文章列表 + 阅读量
│   ├── posts/[slug]/page.tsx  # 文章详情：MDX 渲染 + 阅读量递增
│   ├── categories/page.tsx    # 分类列表
│   ├── categories/[slug]/page.tsx
│   ├── archives/page.tsx      # 时间线归档
│   ├── about/page.tsx
│   └── projects/page.tsx
└── api/
    ├── posts/[slug]/view/route.ts  # POST：递增阅读量
    ├── projects/route.ts           # GET：所有项目
    └── site/
        ├── profile/route.ts        # GET：站点信息
        └── links/route.ts          # GET：友链列表
```

### 三栏布局（`SiteShell`）

- **左侧栏**（`LeftSidebar`）：头像、姓名、简介、所在地、统计数据（文章/分类/标签）、二维码、关注按钮、社交图标、友链
- **中间**：主内容区（最小高度 800px）
- **右侧栏**（`RightSidebar`）：最新 5 篇文章、分类列表

三栏数据由 `SiteShell` 并行请求 `getSiteConfig()`、`getLatestPosts()`、`getCategories()` 获取。

### 样式

Tailwind CSS v4，使用 `@tailwindcss/postcss` 插件。`styles/tokens.css` 中的设计令牌定义了颜色、阴影、圆角和布局尺寸的 CSS 自定义属性。`styles/prose.css` 处理文章内容排版。组件统一使用 `.card-surface` 工具类实现一致的卡片风格。

### 页面过渡动画

`ContentFadeTransition` 用 framer-motion 的淡入+上滑动效包裹页面内容。过渡配置在 `lib/motion/transitions.ts`。`TopRouteProgress` 在路由切换时渲染顶部进度条。

## 关键约定

- **优雅降级**：每个数据获取函数都有硬编码的兜底数据。站点无需 Velite 产物、无需数据库即可完整运行
- **构建顺序**：内容必须先于 Next.js 构建（`velite && next build`）。`.velite/` 已加入 gitignore，属于生成产物
- **TypeScript 路径别名**：`@/*` 映射到 `blog-web/` 根目录
- **中文优先**：所有 UI 文案和内容均为中文（zh-CN）
- **无认证系统**：站点对访客只读；目前没有认证体系（管理后台是后续计划）

## 本地开发环境搭建

1. `cd blog-web && npm install`
2. （可选）启动 PostgreSQL，见 `docs-local-db.md` 中的 Docker 命令
3. 复制 `.env.local.example` → `.env.local`，按需调整 `DATABASE_ENABLED`
4. `npm run prisma:generate && npm run prisma:push`（仅在启用数据库时需要）
5. `npm run dev` — 站点运行在 `http://localhost:3000`
