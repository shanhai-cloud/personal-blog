"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function ContentFadeTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.34, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
