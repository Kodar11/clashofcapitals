"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { GROUP_COLOR, rupees, type Group } from "./board-data";

const demoButton =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-[background-color,border-color,opacity] duration-[var(--dur-fast)] disabled:opacity-50";

function Deed({ name, group, price, layoutId }: { name: string; group: Group; price: number; layoutId: string }) {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="w-full overflow-hidden rounded-md border border-line-strong bg-card shadow-soft"
    >
      <div className="h-7" style={{ background: GROUP_COLOR[group] }} />
      <div className="px-3 py-3">
        <p className="font-display text-lg leading-tight text-ink">{name}</p>
        <p className="mt-1 text-xs text-muted">Price {rupees(price)}</p>
      </div>
    </motion.div>
  );
}

/** A property swap between two players: nothing moves until the other side accepts. */
export function TradeDemo() {
  const [accepted, setAccepted] = useState(false);
  const agra = <Deed name="Agra" group="green" price={2500} layoutId="deed-agra" />;
  const chandigarh = <Deed name="Chandigarh" group="pink" price={2500} layoutId="deed-chandigarh" />;

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <div>
          <p className="eyebrow mb-2 text-muted">You</p>
          {accepted ? chandigarh : agra}
        </div>
        <ArrowLeftRight aria-hidden className="mt-6 size-5 text-gold-deep" />
        <div>
          <p className="eyebrow mb-2 text-muted">Meera</p>
          {accepted ? agra : chandigarh}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => setAccepted((value) => !value)}
          className={`${demoButton} ${accepted ? "border border-line-strong text-ink hover:border-brand" : "bg-brand text-ivory hover:bg-brand-soft"}`}
        >
          {accepted ? "Offer it again" : "Accept the trade"}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {accepted ? "Done. Both properties changed hands at once." : "Meera offers Chandigarh for your Agra."}
        </p>
      </div>
    </div>
  );
}

const OPENING_BID = 100;
const INCREMENT = 100;
const COUNTDOWN_MS = 5000;

/** The game's auction: a five-second countdown that every new bid restarts. */
export function AuctionDemo() {
  const [bid, setBid] = useState(0);
  const [sold, setSold] = useState(false);
  const running = bid > 0 && !sold;

  // The clock itself: restarted by every bid. The bar below only draws it.
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setSold(true), COUNTDOWN_MS);
    return () => window.clearTimeout(timer);
  }, [bid, running]);

  const placeBid = () => {
    if (sold) {
      setSold(false);
      setBid(0);
      return;
    }
    setBid((current) => (current === 0 ? OPENING_BID : current + INCREMENT));
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold">On the block</p>
          <p className="mt-1 font-display text-3xl text-ivory">Delhi</p>
        </div>
        <div className="text-right">
          <p className="eyebrow text-ivory/60">{sold ? "Sold for" : "Top bid"}</p>
          <p className="mt-1 font-display text-3xl text-ivory tabular-nums">{bid ? rupees(bid) : "—"}</p>
        </div>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ivory/15" role="presentation">
        {running ? <div key={bid} className="animate-countdown h-full rounded-full bg-gold" /> : null}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="button" onClick={placeBid} className={`${demoButton} bg-gold text-forest hover:bg-[#dfbd76]`}>
          {sold ? "Run it again" : bid ? `Bid ${rupees(bid + INCREMENT)}` : `Open at ${rupees(OPENING_BID)}`}
        </button>
        <p aria-live="polite" className="text-sm text-ivory/70">
          {sold ? "Time ran out. The property is yours." : running ? "Five seconds. Every bid restarts the clock." : "Bid to start the clock."}
        </p>
      </div>
    </div>
  );
}

const TABLE = [
  { name: "You", color: "var(--gold)" },
  { name: "Meera", color: "#ef5b63" },
  { name: "Kabir", color: "#18a6b8" },
] as const;

/** Push-to-talk: the microphone is live only while the button is held. */
export function VoiceDemo() {
  const [talking, setTalking] = useState(false);
  const start = () => setTalking(true);
  const stop = () => setTalking(false);

  return (
    <div className="flex items-center justify-between gap-5">
      <ul className="flex gap-3" aria-label="Players in voice">
        {TABLE.map((player, index) => {
          const speaking = index === 0 && talking;
          return (
            <li key={player.name} className="flex flex-col items-center gap-1.5">
              <span
                className={`flex size-11 items-center justify-center rounded-full font-display text-lg text-forest transition-shadow duration-[var(--dur-fast)] ${
                  speaking ? "shadow-[0_0_0_3px_var(--card),0_0_0_6px_var(--emerald)]" : ""
                }`}
                style={{ background: player.color }}
              >
                {player.name[0]}
              </span>
              <span className="text-xs text-muted">{player.name}</span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          aria-pressed={talking}
          aria-label="Hold to talk"
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onKeyDown={(event) => (event.key === " " || event.key === "Enter") && start()}
          onKeyUp={stop}
          onBlur={stop}
          onContextMenu={(event) => event.preventDefault()}
          className={`flex size-16 touch-none items-center justify-center rounded-full transition-[background-color,transform] duration-[var(--dur-fast)] select-none ${
            talking ? "scale-95 bg-brand text-ivory" : "border border-line-strong bg-card text-ink hover:border-brand"
          }`}
        >
          <Mic aria-hidden className="size-6" />
        </button>
        <span aria-live="polite" className="text-xs font-medium text-muted">
          {talking ? "You’re live" : "Hold to talk"}
        </span>
      </div>
    </div>
  );
}
