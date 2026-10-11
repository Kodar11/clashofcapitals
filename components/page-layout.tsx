import type { ReactNode } from "react";

/** The opening band of every inner page: eyebrow, page title and a short introduction. */
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-parchment">
      <div className="wrap py-14 sm:py-20">
        <p className="eyebrow mb-4 text-gold-deep">{eyebrow}</p>
        <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] text-ink">{title}</h1>
        {children ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div> : null}
      </div>
    </header>
  );
}

export interface DocSection {
  id: string;
  title: string;
  content: ReactNode;
}

function Contents({ sections }: { sections: readonly DocSection[] }) {
  return (
    <ol className="flex flex-col">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-9 items-baseline gap-3 py-1.5 text-[0.9375rem] leading-snug text-muted transition-colors duration-[var(--dur-fast)] hover:text-ink"
          >
            <span aria-hidden className="w-5 shrink-0 text-xs text-gold-deep tabular-nums">
              {index + 1}
            </span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * A numbered long-form document with a table of contents: sticky beside the text on wide
 * screens, a collapsible list above it on small ones.
 */
export function DocumentBody({ sections, footer }: { sections: readonly DocSection[]; footer?: ReactNode }) {
  return (
    <div className="wrap grid gap-10 py-12 sm:py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      <aside>
        <details className="rounded-md border border-line bg-card lg:hidden">
          <summary className="flex min-h-12 cursor-pointer items-center px-4 font-semibold text-ink">On this page</summary>
          <nav aria-label="On this page" className="border-t border-line px-4 py-3">
            <Contents sections={sections} />
          </nav>
        </details>
        <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
          <p className="eyebrow mb-3 text-ink">On this page</p>
          <Contents sections={sections} />
        </nav>
      </aside>
      <article className="max-w-prose">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="prose-doc border-b border-line py-9 first:pt-0 last:border-b-0">
            <h2 id={`${section.id}-title`} className="flex items-baseline gap-3 text-[1.625rem] leading-tight text-ink sm:text-3xl">
              <span aria-hidden className="font-sans text-sm font-semibold tracking-normal text-gold-deep tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            {section.content}
          </section>
        ))}
        {footer}
      </article>
    </div>
  );
}
