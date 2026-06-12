import type { ReactNode } from "react";

import { BackToTop } from "@/components/ui/back-to-top";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { TopRouteProgress } from "@/components/layout/top-route-progress";
import { getCategories, getLatestPosts, getSearchIndex, getSiteConfig } from "@/lib/content/source";
import type { TocItem } from "@/lib/content/types";

export async function SiteShell({
  children,
  sidebar
}: {
  children: ReactNode;
  sidebar?: { mode: "toc"; toc: TocItem[] };
}) {
  const [site, searchEntries] = await Promise.all([getSiteConfig(), getSearchIndex()]);

  const defaultSidebarData =
    sidebar?.mode === "toc"
      ? null
      : await Promise.all([getLatestPosts(), getCategories()]);

  return (
    <>
      <SiteHeader navigation={site.navigation} searchEntries={searchEntries} />
      <TopRouteProgress />
      <main className="container-shell py-6">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-6">
          <LeftSidebar profile={site.profile} links={site.links} />
          <section className="col-span-1 min-h-[800px] lg:col-span-4">{children}</section>
          {sidebar?.mode === "toc" ? (
            <RightSidebar mode="toc" toc={sidebar.toc} />
          ) : (
            <RightSidebar
              mode="default"
              latestPosts={defaultSidebarData![0]}
              categories={defaultSidebarData![1]}
            />
          )}
        </div>
      </main>
      <BackToTop />
    </>
  );
}
