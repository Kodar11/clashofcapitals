import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { routes } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-center py-28 text-center sm:py-36">
      <p className="eyebrow mb-4 text-gold-deep">Error 404</p>
      <h1 className="text-[clamp(2.25rem,6vw,4rem)] text-ink">You’ve landed off the board.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">This square doesn’t exist. Head back to Start and roll again.</p>
      <ButtonLink href={routes.home} className="mt-9">
        Back to Start
      </ButtonLink>
    </section>
  );
}
