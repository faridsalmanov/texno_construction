import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function buildContentSecurityPolicy(isProd: boolean): string {
  const vercelAnalyticsScriptDev = "https://va.vercel-scripts.com";
  const vercelAnalyticsConnect = "https://vitals.vercel-insights.com";
  const scriptSrc = isProd
    ? "script-src 'self' 'unsafe-inline'"
    : `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${vercelAnalyticsScriptDev}`;
  const connectSrc = isProd
    ? `connect-src 'self' ${vercelAnalyticsConnect}`
    : `connect-src 'self' ${vercelAnalyticsConnect} ${vercelAnalyticsScriptDev}`;

  const directives: string[] = [
    "default-src 'self'",
    // Dev: Turbopack/HMR may rely on eval. Prod: omit unsafe-eval.
    // Dev: Vercel Web Analytics + Speed Insights load from va.vercel-scripts.com.
    scriptSrc,
    // Inline style={{}} (Hero/CTA backgrounds) + Tailwind output
    "style-src 'self' 'unsafe-inline'",
    // Plain <img> + CSS url() backgrounds from Unsplash; next/image rewrites stay same-origin
    "img-src 'self' data: blob: https://images.unsplash.com",
    "font-src 'self' data:",
    // Contact form + Vercel Analytics / Speed Insights (prod scripts same-origin; ingest is vitals.*)
    connectSrc,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    // HTML forms only submit to this site
    "form-action 'self'",
  ];
  if (isProd) {
    directives.push("upgrade-insecure-requests");
  }
  return directives.join("; ");
}

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Cap disk cache for `next/image` optimizer (mitigates unbounded cache growth)
    maximumDiskCacheSize: 524_288_000, // ~500 MiB
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    const securityHeaders: { key: string; value: string }[] = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      ...(isProd
        ? [
            {
              key: "Strict-Transport-Security",
              value: "max-age=63072000; includeSubDomains; preload",
            },
          ]
        : []),
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
      },
      {
        key: "Content-Security-Policy",
        value: buildContentSecurityPolicy(isProd),
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
