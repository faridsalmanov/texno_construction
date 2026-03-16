"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

import absheronOlive from "@/lib/assets/partners/absheron olive.jpg";
import azerisiq from "@/lib/assets/partners/azerisiq.jpeg";
import bakuMediaCenter from "@/lib/assets/partners/baku media center.jpg";
import fuga from "@/lib/assets/partners/fuga.png";
import azerelektrik from "@/lib/assets/partners/azerelektrik.png";

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 80;
const BOX_WIDTH = 140;
const BOX_HEIGHT = 110;
const GAP = 24;

const partners = [
  { id: 1, logo: absheronOlive, name: "Absheron Olive" },
  { id: 2, logo: azerisiq, name: "Azerisiq", objectPosition: "48% 50%" },
  { id: 3, logo: bakuMediaCenter, name: "Baku Media Center" },
  { id: 4, logo: fuga, name: "Fuga" },
  { id: 5, logo: azerelektrik, name: "Azerelektrik" },
];

function PartnerLogo({
  partner,
}: {
  partner: (typeof partners)[number];
}): ReactNode {
  return (
    <div
      style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
      className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-xl border border-border shadow-sm overflow-hidden"
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="object-contain"
        style={
          "objectPosition" in partner
            ? { objectPosition: partner.objectPosition }
            : undefined
        }
      />
    </div>
  );
}

export function Partners(): ReactNode {
  const t = useTranslations("partners");

  return (
    <section className="py-20 bg-card overflow-hidden" id="partners">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
            {t("title")}
          </h2>
        </div>

        {/* Infinite scrolling marquee */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex animate-partners-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0"
                style={{ marginRight: GAP }}
              >
                <PartnerLogo partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
