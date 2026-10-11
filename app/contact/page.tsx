import { ArrowRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { PageIntro } from "@/components/page-layout";
import { mailto, routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: `Get help with ${site.name}: gameplay questions, bug reports, account help and privacy requests.`,
  alternates: { canonical: routes.contact },
};

const TOPICS = [
  { title: "Something isn’t working", body: "A bug, a stuck game, or voice chat that won’t connect. Tell us what happened and which phone you use." },
  { title: "Account help", body: "Trouble linking Google, restoring your player on a new phone, or deleting your account." },
  { title: "Rules and gameplay", body: "A question about how a rule works in Classic or Capital Mode." },
  { title: "Reporting a player", body: "Let us know about an offensive name or behaviour. Include the Player ID if you have it." },
  { title: "Privacy and data", body: "Questions about what the game stores, or a request about your information." },
  { title: "Feedback and ideas", body: "What you enjoyed, what annoyed you, and what you’d like to see next." },
] as const;

const LINKS = [
  { label: "Privacy Policy", href: routes.privacy, body: "What the game stores and why." },
  { label: "Terms & Conditions", href: routes.terms, body: "The ground rules for playing." },
  { label: "Delete Account", href: routes.deleteAccount, body: "Remove your account and its data." },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Support" title="Contact & support">
        <p>Support is by email. Write to us and a real person will read it and reply as soon as they can.</p>
      </PageIntro>

      <div className="wrap grid gap-14 py-12 sm:py-16 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
        <section aria-labelledby="email-title" className="on-dark h-fit rounded-lg bg-brand p-8 text-ivory">
          <Mail aria-hidden className="size-6 text-gold" />
          <h2 id="email-title" className="mt-5 text-3xl">
            Email us
          </h2>
          <p className="mt-3 text-ivory/75">For anything about the game, your account or your data.</p>
          <ButtonLink href={mailto(`${site.name} support`)} variant="gold" className="mt-7 w-full">
            Write an email
          </ButtonLink>
          <p className="mt-4 text-center text-[0.9375rem]">
            <a href={mailto(`${site.name} support`)} className="break-all underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
              {site.supportEmail}
            </a>
          </p>
          <p className="mt-7 border-t border-ivory/15 pt-5 text-sm text-ivory/70">
            Including your Player ID (it starts with RR- and is shown in the app’s Settings) helps us find your account. Please never send passwords or
            verification codes.
          </p>
        </section>

        <div>
          <section aria-labelledby="topics-title">
            <h2 id="topics-title" className="text-3xl text-ink">
              What we can help with
            </h2>
            <ul className="mt-7 grid gap-x-10 border-t border-line sm:grid-cols-2">
              {TOPICS.map((topic) => (
                <li key={topic.title} className="border-b border-line py-5">
                  <h3 className="font-sans text-base font-semibold tracking-normal text-ink">{topic.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{topic.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="links-title" className="mt-14">
            <h2 id="links-title" className="text-3xl text-ink">
              Useful pages
            </h2>
            <ul className="mt-7 border-t border-line">
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link href={link.href} className="group flex min-h-16 items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block font-semibold text-ink">{link.label}</span>
                      <span className="block text-[0.9375rem] text-muted">{link.body}</span>
                    </span>
                    <ArrowRight aria-hidden className="size-5 shrink-0 text-gold-deep transition-transform duration-[var(--dur-fast)] group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
