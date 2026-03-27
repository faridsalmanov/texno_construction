import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Cap disk cache for `next/image` optimizer (mitigates unbounded cache growth)
    maximumDiskCacheSize: 524_288_000, // ~500 MiB
  },
};

export default withNextIntl(nextConfig);
