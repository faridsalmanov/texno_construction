"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";

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
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`py-3 px-4 font-medium transition-colors hover:bg-card rounded-lg ${
                    isActive ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
