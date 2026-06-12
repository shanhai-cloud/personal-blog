import type { ReactNode } from "react";

import { ContentFadeTransition } from "@/components/layout/content-fade-transition";
import { SiteShell } from "@/components/layout/site-shell";

export default async function SiteLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <ContentFadeTransition>{children}</ContentFadeTransition>
    </SiteShell>
  );
}
