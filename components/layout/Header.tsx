"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Navbar } from "./Navbar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

export function Header(): ReactNode {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-1">
      <Container>
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="TEXNO CONSTRUCTION AZ"
              width={128}
              height={128}
              className="object-contain drop-shadow-md"
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
