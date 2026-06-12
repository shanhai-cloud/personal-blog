import type { Metadata } from "next";

import { getSiteConfig } from "@/lib/content/source";

export const metadata: Metadata = {
  title: "关于 | Shanhai",
  description: "大二全栈开发工程师，学习 Python 爬虫和微服务架构。"
};

export default async function AboutPage() {
  const site = await getSiteConfig();

  return (
    <div className="card-surface p-8">
      <h2 className="mb-4 text-[18px] font-bold text-gray-800">{site.about.title}</h2>
      <p className="text-[14px] text-gray-600">{site.about.description}</p>
    </div>
  );
}
