import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink, GetGameLink } from "@/components/button";
import { Reveal } from "@/components/motion";
import { PageIntro } from "@/components/page-layout";
import { mailto, routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a multiplayer property-trading board game for your phone, made for strategy, negotiation and playing together.`,
  alternates: { canonical: routes.about },
};

const PRINCIPLES = [
  {
    title: "Strategy over luck",
    body: "The dice decide where you land. You decide what to buy, when to build, and how much cash to keep for a bad roll.",
  },
  {
    title: "Negotiation is the game",
    body: "Trades and auctions are where games are won. Every deal is a conversation, and every conversation is a gamble.",
  },
  {
    title: "Friendly, even when it isn’t",
    body: "Rivalries should end when the game does. The app keeps the money and the rules straight, so nobody argues with the banker.",
  },
  {
    title: "Made to be shared",
    body: "A private table for your group, a code or QR to join, and no sign-up standing between your friends and the first roll.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About the game" title="A familiar game, made for playing together.">
        <p>
          {site.name} is a multiplayer property-trading board game for your phone. Roll the dice, travel a board of Indian cities, buy what you land on,
          build houses and hotels, and collect rent from everyone who visits.
        </p>
      </PageIntro>

      <section aria-labelledby="why-title" className="wrap grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div className="prose-doc max-w-prose text-lg text-muted">
          <h2 id="why-title" className="text-[clamp(1.875rem,4vw,2.75rem)] text-ink">
            Why a board game, on a phone?
          </h2>
          <p>
            Property-trading games have been part of family holidays and long evenings with friends for generations. The board was never really the point. The
            point was the people around it: the bargaining, the bluffing, the alliances that lasted exactly one lap.
          </p>
          <p>
            We wanted to keep all of that and remove the parts nobody misses. Nobody has to be the banker. Nobody miscounts the change. Rent, taxes, auctions
            and loans are worked out for you, the same way for every player, so the table can get on with the important business of outmanoeuvring each
            other.
          </p>
          <p>
            And because the board lives on your phone, the table can be anywhere. Play with the people in the room, or with friends in another city.
          </p>
        </div>
        <Reveal className="mx-auto w-full max-w-sm">
          <Image
            src="/icon.png"
            alt={`${site.name} app icon: the game’s gold wordmark on an emerald board, with two dice and coloured houses`}
            width={1024}
            height={1024}
            sizes="(min-width: 640px) 24rem, 90vw"
            className="h-auto w-full rounded-[22%] shadow-lift"
          />
        </Reveal>
      </section>

      <section aria-labelledby="principles-title" className="border-y border-line bg-parchment">
        <div className="wrap section-y">
          <h2 id="principles-title" className="max-w-2xl text-[clamp(1.875rem,4vw,2.75rem)] text-ink">
            What we care about
          </h2>
          <ul className="mt-12 grid gap-x-16 border-t border-line-strong md:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={(index % 2) * 0.08} className="border-b border-line-strong py-7">
                <h3 className="text-2xl text-ink">{principle.title}</h3>
                <p className="mt-2 text-muted">{principle.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="modes-title" className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="modes-title" className="text-[clamp(1.875rem,4vw,2.75rem)] text-ink">
            One board, two ways to play
          </h2>
        </div>
        <div className="prose-doc text-muted">
          <p className="!mt-0">
            <strong className="text-ink">Classic Mode</strong> is the game as you remember it: buy, build, charge rent, trade, and be the last one solvent.
          </p>
          <p>
            <strong className="text-ink">Capital Mode</strong> adds an economy on top. Property values move with the market, loans come with a credit score,
            crises reward the players who insured, and you can auction your own properties to the table.
          </p>
          <p>
            <Link href={routes.modes}>Compare the two modes</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="on-dark bg-brand text-ivory">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <h2 id="about-cta-title" className="text-[clamp(1.875rem,4vw,2.75rem)]">
              Pull up a chair.
            </h2>
            <p className="mt-3 max-w-lg text-ivory/75">
              Questions, ideas or a rule you’d argue with? Write to{" "}
              <a href={mailto()} className="break-all text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
                {site.supportEmail}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <GetGameLink variant="gold" size="lg" />
            <ButtonLink href={routes.howToPlay} variant="outlineOnDark" size="lg">
              How to Play
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
