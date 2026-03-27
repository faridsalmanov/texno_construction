/**
 * Canonical site origin for metadata, sitemap, and robots.txt.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return new URL(explicit.endsWith("/") ? explicit.slice(0, -1) : explicit);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}
