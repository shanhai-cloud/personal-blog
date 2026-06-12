"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function TopRouteProgress() {
  const pathname = usePathname();
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    setShowProgress(true);

    const timer = window.setTimeout(() => {
      setShowProgress(false);
    }, 760);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false}>
        {showProgress ? (
          <motion.div
            key={`progress-${pathname}`}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-blue)] via-[#a78bfa] to-[#8fb7ff]" />
            <motion.div
              className="absolute inset-y-0 left-[-24%] w-[24%] bg-gradient-to-r from-transparent via-white/95 to-transparent"
              animate={{ x: ["0%", "520%"] }}
              transition={{ duration: 0.86, ease: "easeOut" }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
