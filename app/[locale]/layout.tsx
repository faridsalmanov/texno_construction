import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
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
  const messages = await getMessages();
  const metadata = messages.metadata as {
    title: string;
    description: string;
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [
      "construction",
      "building",
      "renovation",
      "tikinti",
      "строительство",
      locale === "az" ? "inşaat" : locale === "ru" ? "ремонт" : "contractor",
    ],
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      locale: locale,
      type: "website",
    },
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
    <html lang={locale}>
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
      </body>
    </html>
  );
}
