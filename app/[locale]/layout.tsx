import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo/getSiteUrl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: getSiteUrl(),
    icons: {
      icon: [{ url: "/icon.png", sizes: "48x48", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    keywords: [
      "construction",
      "building",
      "renovation",
      "tikinti",
      "строительство",
      locale === "az" ? "inşaat" : locale === "ru" ? "ремонт" : "contractor",
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<ReactNode> {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "az" | "en" | "ru")) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { scrollbar-width: none; -ms-overflow-style: none; }
              html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { width: 0; height: 0; display: none; }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="relative">
            <Header />
            <div className="min-h-screen">{children}</div>
          </div>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
