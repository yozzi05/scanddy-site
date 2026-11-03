import type { NextConfig } from "next";

/**
 * Статическая сборка для GitHub Pages: сайт живёт в подпапке
 * /scanddy-site, поэтому basePath задаётся через NEXT_PUBLIC_BASE_PATH.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
