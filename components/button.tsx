import Link from "next/link";
import type { ReactNode } from "react";
import { routes, site } from "@/lib/site";

type Variant = "primary" | "secondary" | "gold" | "outlineOnDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--dur-fast)] ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ivory shadow-soft hover:bg-brand-soft",
  secondary: "border border-line-strong bg-transparent text-ink hover:border-brand hover:bg-sage/60",
  gold: "bg-gold text-forest hover:bg-[#dfbd76]",
  outlineOnDark: "border border-ivory/30 text-ivory hover:border-ivory/70 hover:bg-ivory/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-base sm:px-7",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}

/** A link that looks like a button. External and mailto targets render a plain anchor. */
export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", onClick }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * The download CTA. Links to the official Google Play listing once it is configured
 * (NEXT_PUBLIC_PLAY_STORE_URL); until then it leads to the "Get the game" section, which
 * says the release is on its way. It never links to a listing that does not exist.
 */
export function GetGameLink({
  label = "Get the Game",
  ...props
}: Omit<ButtonLinkProps, "href" | "children"> & { label?: string }) {
  return (
    <ButtonLink href={site.playStoreUrl ?? routes.get} {...props}>
      {label}
    </ButtonLink>
  );
}
