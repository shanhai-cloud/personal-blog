import type { Metadata } from "next";

import { ProjectCard } from "@/components/cards/project-card";
import { getProjects } from "@/lib/content/source";

export const metadata: Metadata = {
  title: "项目 | Shanhai",
  description: "个人开源项目和作品展示。"
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
