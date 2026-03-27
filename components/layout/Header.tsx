"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Navbar } from "./Navbar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

export function Header(): ReactNode {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-2 sm:py-3">
      <Container>
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="TEXNO CONSTRUCTION AZ"
              width={96}
              height={96}
              priority
              className="object-contain drop-shadow-md w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
            />
          </Link>

          {/* Navigation */}
          <Navbar isTransparent />

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher isLight />
          </div>
        </div>
      </Container>
    </header>
  );
}
