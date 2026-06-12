"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

import type { SearchEntry } from "@/lib/content/types";
import { SearchResultsList } from "@/components/search/search-results-list";

function scoreEntry(entry: SearchEntry, query: string) {
  const keyword = query.toLowerCase();
  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const category = entry.category.toLowerCase();
  const tags = entry.tags.map((tag) => tag.toLowerCase());

  if (title.includes(keyword)) return 4;
  if (category.includes(keyword)) return 3;
  if (tags.some((tag) => tag.includes(keyword))) return 2;
  if (excerpt.includes(keyword)) return 1;
  return 0;
}

export function SearchDialog({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return [];
    }

    return entries
      .map((entry) => ({ entry, score: scoreEntry(entry, keyword) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || +new Date(b.entry.date) - +new Date(a.entry.date))
      .map((item) => item.entry)
      .slice(0, 8);
  }, [entries, query]);

  return (
    <>
      <button
        type="button"
        aria-label="搜索"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-gray-500 transition-colors hover:text-[var(--theme-blue)]"
      >
        <Search className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[70] bg-slate-900/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed left-1/2 top-24 z-[80] w-[min(680px,calc(100vw-32px))] -translate-x-1/2 rounded-lg bg-white p-4 shadow-[0_16px_48px_rgba(15,23,42,0.18)]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索文章标题、摘要、分类或标签"
                  className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  aria-label="关闭搜索"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 transition-colors hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <SearchResultsList entries={filteredEntries} query={query} onSelect={() => setOpen(false)} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
