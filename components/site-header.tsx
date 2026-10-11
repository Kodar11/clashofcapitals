"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetGameLink } from "@/components/button";
import { headerNav, routes, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-[var(--dur-base)] ${
        scrolled || open ? "border-line bg-ivory/95 backdrop-blur-sm" : "border-transparent bg-ivory"
      }`}
    >
      <div className={`wrap flex items-center justify-between transition-[height] duration-[var(--dur-base)] ${scrolled ? "h-14" : "h-[var(--header-h)]"}`}>
        <Link href={routes.home} onClick={close} className="flex items-center gap-2.5 rounded-sm" aria-label={`${site.name} — home`}>
          <Image src="/favicon.png" alt="" width={36} height={36} priority className="size-9 rounded-[10px] shadow-soft" />
          <span className="font-display text-[1.1875rem] font-semibold tracking-tight text-ink">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {headerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.9375rem] font-medium text-muted transition-colors duration-[var(--dur-fast)] hover:text-ink">
              {item.label}
            </Link>
          ))}
          <GetGameLink size="sm" />
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="overflow-hidden border-t border-line md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="wrap flex flex-col py-3">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={close} className="flex min-h-12 items-center font-display text-xl text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={routes.contact} onClick={close} className="flex min-h-12 items-center font-display text-xl text-ink">
                  Contact
                </Link>
              </li>
              <li className="pt-3 pb-2">
                <GetGameLink className="w-full" onClick={close} />
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
