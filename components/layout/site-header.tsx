"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SearchEntry, SiteNavItem } from "@/lib/content/types";
import { cn } from "@/components/ui/cn";
import { SearchDialog } from "@/components/search/search-dialog";

export function SiteHeader({
  navigation,
  searchEntries
}: {
  navigation: SiteNavItem[];
  searchEntries: SearchEntry[];
}) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
        <div className="container-shell flex h-[56px] items-center justify-between">
          <nav className="flex items-center gap-6 text-[14px]">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    active ? "font-medium text-[var(--theme-blue)]" : "text-gray-600 hover:text-[var(--theme-blue)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchDialog entries={searchEntries} />
        </div>
      </header>
      <div className="h-[2px] w-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-80" />
    </>
  );
}
