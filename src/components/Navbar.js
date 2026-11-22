
"use client";

import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-[-0.07em] text-neutral-950"
          aria-label="EVERISE DEV homepage"
        >
          everise
          <span className="text-neutral-400">.dev</span>
        </a>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop contact button */}
        <a
          href="#contact"
          className="hidden items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 md:inline-flex"
        >
          Let&apos;s Talk
          <span aria-hidden="true" className="ml-2">↗</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-950 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-neutral-200 bg-white px-6 py-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-4 text-sm font-medium text-white"
            >
              Start a Project ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
