import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

export function Footer(): ReactNode {
  const t = useTranslations();

  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Instagram, label: "Instagram" },
    { icon: Youtube, label: "YouTube" },
    { icon: Facebook, label: "Facebook" },
  ];

  return (
    <footer className="bg-primary text-white w-full">
      <Container>
        {/* Top section: Logo, Nav, Social */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-6">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-white.png"
              alt="TEXNO CONSTRUCTION AZ"
              width={96}
              height={96}
              className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
          </Link>

          <nav className="flex flex-1 flex-wrap items-center justify-center gap-6 lg:gap-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base lg:text-lg text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {socialLinks.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="w-9 h-9 rounded border border-white/40 flex items-center justify-center text-white/80 cursor-default"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Bottom section: Copyright, Contact */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-6">
          <div className="text-left order-2 lg:order-1">
            <p className="text-sm text-white/90">2026</p>
            <p className="text-sm text-white/90">© TEXNO CONSTRUCTION AZ MMC.</p>
            <p className="text-sm text-white/90">{t("footer.all_rights")}</p>
          </div>

          <div className="flex flex-col gap-2 text-center order-1 lg:order-2">
            <div className="flex items-center justify-center gap-2 text-sm text-white/90 break-all">
              <Phone className="h-4 w-4 text-white shrink-0" />
              <a href="tel:+9940513910000" className="hover:text-white transition-colors">
                +994 051 391 00 00
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-white/90">
              <Mail className="h-4 w-4 text-white shrink-0" />
              <a
                href="mailto:Texno-construction_az@mail.ru"
                className="hover:text-white transition-colors"
              >
                Texno-construction_az@mail.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-white/90">
              <MapPin className="h-4 w-4 text-white shrink-0" />
              <span>Bakı, Azərbaycan</span>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}
