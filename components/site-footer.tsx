import Image from "next/image";
import Link from "next/link";
import { footerNav, mailto, routes, site } from "@/lib/site";

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow font-sans text-gold">{title}</h2>
      <ul className="mt-4 flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-9 items-center text-[0.9375rem] text-ivory/80 transition-colors duration-[var(--dur-fast)] hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-forest text-ivory">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
        <div className="max-w-sm">
          <Link href={routes.home} className="inline-flex items-center gap-3 rounded-sm">
            <Image src="/favicon.png" alt="" width={44} height={44} className="size-11 rounded-xl" />
            <span className="font-display text-2xl font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/70">{site.shortDescription}</p>
          <p className="mt-5 text-[0.9375rem] text-ivory/70">
            Support:{" "}
            <a href={mailto()} className="break-all text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
              {site.supportEmail}
            </a>
          </p>
        </div>
        <FooterColumn title="The game" links={footerNav.game} />
        <FooterColumn title="Support & legal" links={footerNav.support} />
      </div>
      <div className="border-t border-ivory/10">
        <p className="wrap py-6 text-sm text-ivory/60">
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
