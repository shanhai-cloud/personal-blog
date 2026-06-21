import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // BUILD_STATIC=true → 静态导出 (out/); 默认 → standalone (Docker/Node.js)
  output: process.env.BUILD_STATIC === "true" ? "export" : "standalone",
  images: process.env.BUILD_STATIC === "true" ? { unoptimized: true } : undefined,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
