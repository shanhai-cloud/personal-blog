import Link from "next/link";

import type { ContentProject } from "@/lib/content/types";
import { formatDisplayDate } from "@/lib/utils/date";

export function ProjectCard({ project }: { project: ContentProject }) {
  return (
    <article className="card-surface mb-6 p-8 last:mb-0">
      <div className="mb-4 text-[12px] text-gray-400">{formatDisplayDate(project.date)}</div>
      <h2 className="text-[22px] font-bold text-gray-800">{project.title}</h2>
      <p className="mt-4 text-[14px] leading-8 text-gray-700">{project.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={project.link}
        target="_blank"
        className="mt-6 inline-flex rounded bg-[var(--theme-blue)] px-4 py-2 text-[13px] text-white transition-colors hover:bg-[var(--theme-blue-hover)]"
      >
        查看项目
      </Link>
    </article>
  );
}
