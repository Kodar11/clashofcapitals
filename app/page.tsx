import { ArrowRight, Check, GraduationCap, MapPin, MessageCircle, QrCode, UserRound, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink, GetGameLink } from "@/components/button";
import { GROUP_COLOR, type Group } from "@/components/home/board-data";
import { AuctionDemo, TradeDemo, VoiceDemo } from "@/components/home/demos";
import { HeroBoard } from "@/components/home/hero-board";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { routes, site } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="wrap grid items-center gap-10 pt-6 pb-20 sm:pt-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pt-16 lg:pb-28">
      <div>
        <p className="eyebrow mb-4 text-gold-deep sm:mb-5">The multiplayer property-trading board game</p>
        <h1 id="hero-title" className="text-[clamp(2.5rem,7vw,5rem)] text-ink">
          Own the Board. <span className="text-brand italic">Rule the Capitals.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:mt-6 sm:text-xl">
          Buy properties, build your empire, make unexpected deals, and turn every roll into a story. Your next great game night starts here.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
          <GetGameLink size="lg" />
          <ButtonLink href={routes.howToPlay} variant="secondary" size="lg">
            See How It Works
          </ButtonLink>
        </div>
        <ul className="mt-9 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-muted sm:flex">
          {["2 to 8 players", "Classic and Capital modes", "Play as a guest, no sign-up"].map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <Check aria-hidden className="size-4 text-brand" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
      <HeroBoard />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Nostalgia                                                                   */
/* -------------------------------------------------------------------------- */

const GAME_NIGHT: readonly { text: string; amount?: string; tone?: "gain" | "loss" }[] = [
  { text: "Kabir rolls an 8 and buys Jaipur", amount: "₹3,000" },
  { text: "Meera lands on your Mumbai. Rent is due", amount: "+₹1,200", tone: "gain" },
  { text: "Nobody blinks first. Delhi goes to auction", amount: "₹5,400" },
  { text: "You swap Agra for Meera’s Chandigarh" },
  { text: "Down to his last ₹500, Kabir passes Start", amount: "+₹1,500", tone: "gain" },
];

function GameNightLedger() {
  return (
    <figure className="relative mx-auto w-full max-w-md rounded-lg border border-line bg-card p-6 shadow-lift sm:p-8">
      <span aria-hidden className="absolute inset-x-6 top-0 h-1 rounded-b-sm bg-gold sm:inset-x-8" />
      <figcaption className="eyebrow text-gold-deep">A game night, as it tends to go</figcaption>
      <ol className="mt-5 divide-y divide-dashed divide-line-strong">
        {GAME_NIGHT.map((entry, index) => (
          <li key={entry.text} className="flex items-baseline gap-4 py-3.5">
            <span className="font-display text-sm text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-[0.9375rem] leading-snug text-ink">{entry.text}</span>
            {entry.amount ? (
              <span className={`font-display text-base tabular-nums ${entry.tone === "gain" ? "text-brand" : "text-ink"}`}>{entry.amount}</span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-line-strong pt-5 font-display text-2xl text-ink italic">“One more round?”</p>
    </figure>
  );
}

function Nostalgia() {
  return (
    <section aria-labelledby="nostalgia-title" className="border-y border-line bg-parchment">
      <div className="wrap section-y grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Why it’s fun" id="nostalgia-title" title="The rivalries you remember. The game nights you create.">
            <p>
              You know the feeling. The dice leave your hand and the whole table leans in. Someone lands one square short of your hotel. Someone else swears
              they will never trade with you again, then offers you a deal ten minutes later.
            </p>
            <p className="mt-4">
              Clash of Capitals brings that table to your phone: the friendly feuds, the unlikely comebacks, and the one more round that somehow becomes
              three.
            </p>
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.1}>
          <GameNightLedger />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* How to play                                                                 */
/* -------------------------------------------------------------------------- */

function StepArt({ children }: { children: ReactNode }) {
  return <div className="flex h-36 items-center justify-center rounded-md border border-line bg-card px-5">{children}</div>;
}

function JoinArt() {
  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="eyebrow text-muted">Game code</p>
        <p className="mt-2 flex gap-1" aria-label="Example game code">
          {"482916".split("").map((digit, index) => (
            <span key={index} className="flex h-10 w-7 items-center justify-center rounded-sm border border-line-strong bg-ivory font-display text-xl text-ink">
              {digit}
            </span>
          ))}
        </p>
      </div>
      <span className="flex size-16 items-center justify-center rounded-md bg-brand text-ivory">
        <QrCode aria-hidden className="size-9" />
      </span>
    </div>
  );
}

const STRIP: readonly (Group | null)[] = ["green", null, "green", "pink", "pink"];

function RollArt() {
  return (
    <div className="flex w-full max-w-[17rem] gap-1" aria-hidden>
      {STRIP.map((group, index) => (
        <div key={index} className="relative flex h-20 flex-1 items-end justify-center rounded-sm border border-line-strong bg-ivory pb-2">
          {group ? (
            <span className="absolute inset-x-0 top-0 flex h-5 items-center justify-center gap-0.5 rounded-t-[3px]" style={{ background: GROUP_COLOR[group] }}>
              {index === 2 ? (
                <>
                  <span className="size-2 rounded-[1.5px] bg-ivory" />
                  <span className="size-2 rounded-[1.5px] bg-ivory" />
                </>
              ) : null}
            </span>
          ) : (
            <span className="absolute top-3 font-display text-lg font-bold text-brick">?</span>
          )}
          {index === 2 ? <span className="size-5 rounded-full border-2 border-ivory bg-gold shadow-soft" /> : null}
        </div>
      ))}
    </div>
  );
}

function TradeArt() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      {[
        { label: "₹600", muted: true },
        { label: "₹700", muted: true },
        { label: "₹800", muted: false },
      ].map((bid) => (
        <span
          key={bid.label}
          className={`rounded-full px-4 py-2 font-display text-lg tabular-nums ${bid.muted ? "border border-line-strong text-muted" : "bg-brand text-ivory"}`}
        >
          {bid.label}
        </span>
      ))}
    </div>
  );
}

const STEPS = [
  {
    title: "Join the game",
    body: "Start a private game and share its six-digit code or QR code with friends, or queue for a public table when you’re playing solo.",
    art: <JoinArt />,
  },
  {
    title: "Roll and build",
    body: "Move around the board, buy the cities you land on, and add houses and hotels so every visit costs your rivals a little more.",
    art: <RollArt />,
  },
  {
    title: "Trade and compete",
    body: "Swap properties, outbid the table at auction, and keep an eye on your cash. The last player standing, or the richest at the end, wins.",
    art: <TradeArt />,
  },
] as const;

function HowToPlay() {
  return (
    <section id="how-to-play" aria-labelledby="how-title" className="wrap section-y">
      <Reveal>
        <SectionHeading eyebrow="How to play" id="how-title" title="Three steps from “who’s in?” to “who’s winning?”">
          <p>Never played a property-trading game? You’ll have it by your second turn. The app handles the money, the rent and the rules.</p>
        </SectionHeading>
      </Reveal>
      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 0.1} className="relative">
            <StepArt>{step.art}</StepArt>
            <div className="mt-6 flex items-baseline gap-4">
              <span aria-hidden className="font-display text-4xl text-gold-deep">
                {index + 1}
              </span>
              <h3 className="text-2xl text-ink">{step.title}</h3>
            </div>
            <p className="mt-3 text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Game modes                                                                  */
/* -------------------------------------------------------------------------- */

const CLASSIC_RULES = [
  "Start with ₹25,000 and collect ₹1,500 each time you pass Start.",
  "Own three cities of one colour and the rent on that colour doubles.",
  "Build up to three houses, then a hotel, on any city you own.",
  "Pass on a property and the whole table bids for it at auction.",
  "Trade with other players, mortgage when cash is tight, or borrow from the bank.",
] as const;

const CAPITAL_RULES = [
  "Property values rise and fall with the market every financial year.",
  "Five kinds of bank loan, and a credit score that sets your interest rate.",
  "Insure a property before a crisis strikes it, or pay the bill yourself.",
  "Auction a property you own to the other players, at a reserve price you set.",
  "An optional secret objective for every player, with a bonus at the end.",
] as const;

function RuleList({ rules, dark }: { rules: readonly string[]; dark?: boolean }) {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {rules.map((rule) => (
        <li key={rule} className="flex gap-3">
          <Check aria-hidden className={`mt-1 size-4 shrink-0 ${dark ? "text-gold" : "text-brand"}`} />
          <span className={dark ? "text-ivory/85" : "text-ink/85"}>{rule}</span>
        </li>
      ))}
    </ul>
  );
}

function Modes() {
  return (
    <section id="modes" aria-labelledby="modes-title" className="border-y border-line bg-sage/50">
      <div className="wrap section-y">
        <Reveal>
          <SectionHeading eyebrow="Game modes" id="modes-title" title="Two ways to play the same board.">
            <p>The host picks the mode when the game is created. Same cities, same dice, a very different evening.</p>
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-line-strong bg-card p-8 sm:p-10">
            <p className="eyebrow text-gold-deep">The familiar one</p>
            <h3 className="mt-3 text-4xl text-ink">Classic Mode</h3>
            <p className="mt-4 text-muted">The property-trading game you grew up with. Buy, build, collect rent and bankrupt your friends, politely.</p>
            <RuleList rules={CLASSIC_RULES} />
          </Reveal>
          <Reveal delay={0.1} className="on-dark relative overflow-hidden rounded-lg bg-brand p-8 text-ivory sm:p-10">
            <span aria-hidden className="pointer-events-none absolute inset-3 rounded-md border border-gold/25" />
            <div className="relative">
              <p className="eyebrow text-gold">Classic, plus an economy</p>
              <h3 className="mt-3 text-4xl">Capital Mode</h3>
              <p className="mt-4 text-ivory/75">Everything in Classic, with a financial layer on top. For the table that wants more to think about.</p>
              <RuleList rules={CAPITAL_RULES} dark />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Features                                                                    */
/* -------------------------------------------------------------------------- */

const DETAILS = [
  {
    icon: MapPin,
    title: "Indian cities on every square",
    body: "Mumbai, Delhi, Jaipur, Shimla, Darjeeling and more, each with its own title deed.",
  },
  {
    icon: Users,
    title: "Friends and private games",
    body: "Add friends by Player ID and invite them straight into your lobby.",
  },
  {
    icon: ArrowRight,
    title: "Play Online",
    body: "No group tonight? Queue alone or as a party and take a seat at a public table.",
  },
  {
    icon: MessageCircle,
    title: "Reactions for every moment",
    body: "Quick reactions and preset messages, for when a move deserves a “Nice try!”",
  },
  {
    icon: UserRound,
    title: "Play first, sign in later",
    body: "Start as a guest. Link Google only if you want your account on another phone.",
  },
  {
    icon: GraduationCap,
    title: "Financial Learning",
    body: "Fifteen short stories about cash, debt and deals, told with the game’s own rules.",
  },
] as const;

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="wrap section-y">
      <Reveal>
        <SectionHeading eyebrow="The details" id="features-title" title="The details that make it fun.">
          <p>Try them. These are small illustrations of how the game behaves, not screenshots.</p>
        </SectionHeading>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <Reveal className="rounded-lg border border-line bg-parchment p-7 sm:p-9 lg:col-span-7">
          <h3 className="text-3xl text-ink">Deals between players</h3>
          <p className="mt-3 mb-8 max-w-md text-muted">Offer properties and cash for theirs. Nothing moves until the other player accepts.</p>
          <TradeDemo />
        </Reveal>

        <Reveal delay={0.1} className="on-dark rounded-lg bg-forest p-7 sm:p-9 lg:col-span-5">
          <h3 className="text-3xl text-ivory">Auctions with a pulse</h3>
          <p className="mt-3 mb-8 text-ivory/70">A short countdown, and every bid resets it. Hesitate and it’s gone.</p>
          <AuctionDemo />
        </Reveal>

        <Reveal className="rounded-lg border border-line bg-card p-7 sm:p-9 lg:col-span-5">
          <h3 className="text-3xl text-ink">Talk it out</h3>
          <p className="mt-3 mb-8 text-muted">
            Push-to-talk voice chat for private games, when the host switches it on. It’s experimental, and public matches don’t have it.
          </p>
          <VoiceDemo />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:pl-6">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {DETAILS.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon aria-hidden className="size-5 text-gold-deep" />
                <h3 className="mt-3 font-sans text-base font-semibold tracking-normal text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Together                                                                    */
/* -------------------------------------------------------------------------- */

const IDEAS = [
  {
    title: "Every decision changes the game.",
    body: "Buy now or wait for the auction? Build, or keep cash for rent day? The board remembers every choice.",
  },
  {
    title: "Every opponent brings a different strategy.",
    body: "The collector, the builder, the one who trades for everything. You’ll know who’s who by the second lap.",
  },
  {
    title: "Every round creates another story.",
    body: "The comeback from your last ₹500. The deal that backfired. The auction nobody meant to win.",
  },
] as const;

function Together() {
  return (
    <section aria-labelledby="together-title" className="border-t border-line bg-parchment">
      <div className="wrap section-y grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Why play together" id="together-title" title="Better together. More interesting every round.">
            <p>A board game is only as good as the people around it. This one is built for the negotiations, alliances and rivalries that only friends produce.</p>
          </SectionHeading>
        </Reveal>
        <ol className="border-t border-line-strong">
          {IDEAS.map((idea, index) => (
            <Reveal as="li" key={idea.title} delay={index * 0.08} className="flex gap-6 border-b border-line-strong py-7">
              <span aria-hidden className="font-display text-3xl text-gold-deep tabular-nums">
                {index + 1}
              </span>
              <div>
                <h3 className="text-2xl text-ink">{idea.title}</h3>
                <p className="mt-2 text-muted">{idea.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                   */
/* -------------------------------------------------------------------------- */

const EDGE_TILES: readonly Group[] = ["blue", "green", "pink", "purple", "green", "blue", "pink", "purple", "blue", "green", "purple", "pink"];

function FinalCta() {
  return (
    <section id="get" aria-labelledby="get-title" className="on-dark relative overflow-hidden bg-brand text-ivory">
      <div aria-hidden className="flex gap-px bg-forest">
        {EDGE_TILES.map((group, index) => (
          <span key={index} className="h-2.5 flex-1" style={{ background: GROUP_COLOR[group] }} />
        ))}
      </div>
      <div className="wrap section-y text-center">
        <Reveal>
          <h2 id="get-title" className="mx-auto max-w-3xl text-[clamp(2.25rem,6vw,4.25rem)]">
            Ready to make your <span className="text-gold italic">next move?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/75">Gather your friends, choose your strategy, and see who can build the strongest empire.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {site.playStoreUrl ? (
              <ButtonLink href={site.playStoreUrl} variant="gold" size="lg">
                Get {site.name}
              </ButtonLink>
            ) : (
              <span className="inline-flex min-h-13 items-center rounded-full border border-gold/60 px-7 font-semibold text-gold">Coming soon to Google Play</span>
            )}
            <ButtonLink href={routes.howToPlay} variant="outlineOnDark" size="lg">
              Explore the Game
            </ButtonLink>
          </div>
          {site.playStoreUrl ? null : (
            <p className="mt-6 text-sm text-ivory/60">
              The Android release is on its way. Questions in the meantime?{" "}
              <Link href={routes.contact} className="text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
                Get in touch
              </Link>
              .
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Nostalgia />
      <HowToPlay />
      <Modes />
      <Features />
      <Together />
      <FinalCta />
    </>
  );
}
