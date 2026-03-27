"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = {
  href: string;
  labelKey: "home" | "about" | "services" | "projects" | "contact";
};

const navItems: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contact" },
];

type NavbarProps = {
  isTransparent?: boolean;
};

export function Navbar({ isTransparent = false }: NavbarProps): ReactNode {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const textClass = isTransparent
    ? "text-white hover:text-secondary"
    : "text-foreground hover:text-secondary";
  const activeClass = "text-secondary";

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium transition-colors ${
                isActive ? activeClass : textClass
              }`}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-foreground"}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Navigation - full-screen overlay with transparent backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-black/50 backdrop-blur-md"
          onClick={closeMenu}
          aria-hidden="true"
        >
          <button
            type="button"
            onClick={closeMenu}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          <nav
            className="fixed inset-0 flex flex-col items-center justify-center gap-8 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-xl md:text-2xl font-medium transition-colors hover:text-secondary ${
                    isActive ? "text-secondary" : "text-white"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}

            <div className="mt-8 pt-8 border-t border-white/30 w-full max-w-[180px]">
              <LanguageSwitcher isLight variant="compact" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
