import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}

/** Eyebrow, headline and optional intro: the opening of every homepage section. */
export function SectionHeading({ eyebrow, title, children, align = "left", tone = "light", id }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className={`eyebrow mb-4 ${dark ? "text-gold" : "text-gold-deep"}`}>{eyebrow}</p> : null}
      <h2 id={id} className={`text-[clamp(2rem,4.6vw,3.25rem)] ${dark ? "text-ivory" : "text-ink"}`}>
        {title}
      </h2>
      {children ? <div className={`mt-5 text-lg leading-relaxed ${dark ? "text-ivory/75" : "text-muted"}`}>{children}</div> : null}
    </div>
  );
}
