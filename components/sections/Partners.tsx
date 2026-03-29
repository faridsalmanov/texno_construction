"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

import absheronOlive from "@/lib/assets/partners/absheron olive.jpg";
import azerisiq from "@/lib/assets/partners/azerisiq2.png";
import bakuMediaCenter from "@/lib/assets/partners/baku media center.jpg";
import fuga from "@/lib/assets/partners/fuga.png";
import azerelektrik from "@/lib/assets/partners/azerelektrik.png";

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 80;
const BOX_WIDTH = 140;
const BOX_HEIGHT = 110;
const GAP = 24;

const partners = [
  {
    id: 1,
    logo: absheronOlive,
    name: "Absheron Olive",
    /** Image fills the tile edge-to-edge (no white card padding) */
    fillBox: true,
  },
  { id: 2, logo: azerisiq, name: "Azerisiq", objectPosition: "48% 50%" },
  { id: 3, logo: bakuMediaCenter, name: "Baku Media Center" },
  { id: 4, logo: fuga, name: "Fuga" },
  {
    id: 5,
    logo: azerelektrik,
    name: "Azerelektrik",
    tilePaddingClass: "p-2",
    logoWidth: 132,
    logoHeight: 88,
  },
];

/** One marquee segment: repeat base list so the strip stays wide on large viewports */
const SEGMENT_REPEAT = 4;
const partnerSegment: (typeof partners)[number][] = Array.from(
  { length: SEGMENT_REPEAT },
  () => partners
).flat();

function PartnerLogo({
  partner,
}: {
  partner: (typeof partners)[number];
}): ReactNode {
  const fillBox = "fillBox" in partner && partner.fillBox;

  if (fillBox) {
    return (
      <div
        style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
        className="relative flex-shrink-0 overflow-hidden rounded-xl border border-border shadow-sm"
      >
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes={`${BOX_WIDTH}px`}
          className="object-cover"
          style={
            "objectPosition" in partner
              ? { objectPosition: partner.objectPosition }
              : { objectPosition: "50% 50%" }
          }
        />
      </div>
    );
  }

  const tilePaddingClass =
    "tilePaddingClass" in partner && partner.tilePaddingClass
      ? partner.tilePaddingClass
      : "p-4";
  const logoW =
    "logoWidth" in partner && partner.logoWidth !== undefined
      ? partner.logoWidth
      : LOGO_WIDTH;
  const logoH =
    "logoHeight" in partner && partner.logoHeight !== undefined
      ? partner.logoHeight
      : LOGO_HEIGHT;

  return (
    <div
      style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
      className={`flex shrink-0 items-center justify-center bg-white rounded-xl border border-border shadow-sm overflow-hidden ${tilePaddingClass}`}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={logoW}
        height={logoH}
        className="max-h-full max-w-full object-contain"
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
    <section className="w-full overflow-x-hidden bg-card py-20" id="partners">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
            {t("title")}
          </h2>
        </div>
      </Container>

      {/* Full-bleed marquee: outside Container so animation runs edge-to-edge */}
      <div className="w-full min-w-0 overflow-hidden">
        <div className="flex w-max max-w-none flex-nowrap animate-partners-scroll">
          <div className="flex shrink-0 flex-nowrap" style={{ gap: GAP }}>
            {partnerSegment.map((partner, index) => (
              <PartnerLogo
                key={`t1-${partner.id}-${index}`}
                partner={partner}
              />
            ))}
          </div>
          <div
            className="flex shrink-0 flex-nowrap"
            style={{ gap: GAP }}
            aria-hidden
          >
            {partnerSegment.map((partner, index) => (
              <PartnerLogo
                key={`t2-${partner.id}-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
