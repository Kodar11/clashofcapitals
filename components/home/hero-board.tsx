"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bus, Droplets, Gift, IndianRupee, Plane, Ship, TrainFront, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BOARD, BOARD_SIZE, GROUP_COLOR, SIDE, cellOf, rupees, type Edge, type Square } from "./board-data";

type Owner = "you" | "rival";
interface Holding {
  owner: Owner;
  /** 0–3 houses; 4 is a hotel. */
  houses: number;
}

const HOTEL = 4;
const START_REWARD = 1500;
const STEP_MS = 150;

/** How the table looks when the visitor arrives: a game already under way. */
const OPENING: Readonly<Record<number, Holding>> = {
  1: { owner: "you", houses: 1 },
  10: { owner: "rival", houses: 0 },
  14: { owner: "rival", houses: 0 },
  25: { owner: "rival", houses: 0 },
};
const RIVAL_POSITION = 21;

const OWNER_COLOR: Record<Owner, string> = { you: "var(--gold)", rival: "#ef5b63" };

const PIPS: Record<number, readonly number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const ICONS = { train: TrainFront, plane: Plane, boat: Ship, bus: Bus, power: Zap, water: Droplets } as const;

const BAND: Record<Edge, string> = {
  bottom: "inset-x-0 top-0 h-[30%]",
  left: "inset-y-0 right-0 w-[30%] flex-col",
  top: "inset-x-0 bottom-0 h-[30%]",
  right: "inset-y-0 left-0 w-[30%] flex-col",
};

const OWNER_DOT: Record<Edge, string> = {
  bottom: "bottom-[12%] left-1/2 -translate-x-1/2",
  left: "left-[12%] top-1/2 -translate-y-1/2",
  top: "top-[12%] left-1/2 -translate-x-1/2",
  right: "right-[12%] top-1/2 -translate-y-1/2",
};

const tokenSpot = (index: number) => {
  const { row, col } = cellOf(index);
  return { left: `${(col + 0.5) * (100 / SIDE)}%`, top: `${(row + 0.5) * (100 / SIDE)}%` };
};

/** What landing on a square means, in the game's own rules. Returns the new holding when one changes. */
function resolveLanding(square: Square, holding: Holding | undefined): { text: string; holding?: Holding } {
  switch (square.kind) {
    case "city":
      if (!holding) return { text: `You bought ${square.name} for ${rupees(square.price)}.`, holding: { owner: "you", houses: 0 } };
      if (holding.owner === "rival") return { text: `${square.name} belongs to a rival. You pay ${rupees(square.rent)} rent.` };
      if (holding.houses < 3) return { text: `You built a house on ${square.name}. The rent just went up.`, holding: { owner: "you", houses: holding.houses + 1 } };
      if (holding.houses === 3) return { text: `Three houses become a hotel on ${square.name}.`, holding: { owner: "you", houses: HOTEL } };
      return { text: `Home turf: your hotel on ${square.name}.` };
    case "transport":
    case "utility":
      return { text: `${square.name}. Transport and utilities can be owned too.` };
    case "chance":
      return { text: "Chance. Your dice total picks the card." };
    case "chest":
      return { text: "Community Chest. Your dice total picks the card." };
    case "tax":
      return {
        text: square.name === "Income Tax" ? "Income Tax: ₹50 for every property you own, up to ₹500." : "Wealth Tax: ₹100 a house and ₹200 a hotel, up to ₹500.",
      };
    case "corner":
      if (square.name === "Jail") return { text: "Jail. Pay the ₹500 fine, or sit out your turn." };
      if (square.name === "Club") return { text: "Club. You pay ₹100 to every other player." };
      if (square.name === "Rest House") return { text: "Rest House. Collect ₹100 from every player, then miss a turn." };
      return { text: "Right on Start." };
  }
}

function Die({ value, rollId, direction }: { value: number; rollId: number; direction: 1 | -1 }) {
  return (
    <motion.span
      key={rollId}
      aria-hidden
      className="grid size-9 grid-cols-3 grid-rows-3 gap-[2px] rounded-[9px] bg-ivory p-[6px] shadow-[0_3px_0_rgb(0_0_0/0.25)] sm:size-12 sm:rounded-xl sm:p-2"
      initial={rollId ? { rotate: direction * -200, scale: 0.75 } : false}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {Array.from({ length: 9 }, (_, pip) => (
        <span key={pip} className={`rounded-full ${PIPS[value]?.includes(pip) ? "bg-ink" : ""}`} />
      ))}
    </motion.span>
  );
}

function SquareFace({ square, edge, holding }: { square: Square; edge: Edge; holding?: Holding }) {
  if (square.kind === "corner") {
    return <span className="hidden text-center text-[0.5rem] leading-[1.1] font-bold tracking-wide text-ink/75 uppercase sm:block">{square.name}</span>;
  }
  if (square.kind === "city") {
    return (
      <>
        <span className={`absolute flex items-center justify-center gap-[2px] ${BAND[edge]}`} style={{ background: GROUP_COLOR[square.group] }}>
          {holding && holding.houses === HOTEL ? <span className="size-[42%] max-h-2.5 max-w-2.5 rounded-[2px] bg-brick ring-1 ring-ivory" /> : null}
          {holding && holding.houses < HOTEL
            ? Array.from({ length: holding.houses }, (_, house) => <span key={house} className="size-[26%] max-h-2 max-w-2 rounded-[1.5px] bg-ivory" />)
            : null}
        </span>
        {holding ? (
          <span className={`absolute size-[22%] rounded-full ring-1 ring-ink/30 ${OWNER_DOT[edge]}`} style={{ background: OWNER_COLOR[holding.owner] }} />
        ) : null}
      </>
    );
  }
  if (square.kind === "chance") return <span className="font-display text-sm font-bold text-brick sm:text-lg">?</span>;
  if (square.kind === "chest") return <Gift aria-hidden className="size-3 text-gold-deep sm:size-4" />;
  if (square.kind === "tax") return <IndianRupee aria-hidden className="size-3 text-ink/60 sm:size-4" />;
  const Icon = ICONS[square.icon];
  return <Icon aria-hidden className="size-3 text-ink/60 sm:size-4" />;
}

/**
 * An interactive illustration of a turn on the real board layout: roll, move, land, and see
 * what the square does. It is a demonstration of the rules, not a screenshot of the app.
 */
export function HeroBoard() {
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState(0);
  const [dice, setDice] = useState<[number, number]>([4, 3]);
  const [rollId, setRollId] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const [holdings, setHoldings] = useState(OPENING);
  const [message, setMessage] = useState("Your turn. Roll the dice to make a move.");

  const live = useRef({ position: 0, holdings: OPENING, busy: false, timers: [] as number[] });

  const roll = useCallback(
    (first: number, second: number) => {
      const state = live.current;
      if (state.busy) return;
      state.busy = true;
      setRolling(true);
      setLanded(null);
      setDice([first, second]);
      setRollId((id) => id + 1);

      const steps = first + second;
      const from = state.position;
      const target = (from + steps) % BOARD_SIZE;
      const later = (run: () => void, ms: number) => state.timers.push(window.setTimeout(run, ms));

      const land = () => {
        const outcome = resolveLanding(BOARD[target]!, state.holdings[target]);
        if (outcome.holding) {
          state.holdings = { ...state.holdings, [target]: outcome.holding };
          setHoldings(state.holdings);
        }
        const passedStart = from + steps >= BOARD_SIZE && target !== 0;
        setMessage(`Rolled ${steps}. ${passedStart ? `Passed Start: +${rupees(START_REWARD)}. ` : ""}${outcome.text}`);
        setLanded(target);
        setRolling(false);
        state.busy = false;
      };

      const moveTo = (index: number) => {
        state.position = index;
        setPosition(index);
      };

      if (reduceMotion) {
        moveTo(target);
        land();
        return;
      }
      // Let the dice settle, then walk the token one square at a time.
      for (let step = 1; step <= steps; step += 1) {
        later(() => moveTo((from + step) % BOARD_SIZE), 420 + step * STEP_MS);
      }
      later(land, 420 + steps * STEP_MS + 220);
    },
    [reduceMotion],
  );

  // One opening move so the board is alive on arrival; after that it waits for the visitor.
  useEffect(() => {
    const state = live.current;
    const opening = window.setTimeout(() => roll(4, 4), 900);
    return () => {
      window.clearTimeout(opening);
      state.timers.forEach((timer) => window.clearTimeout(timer));
      state.timers = [];
      state.busy = false;
    };
  }, [roll]);

  const rollRandom = () => roll(1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6));

  return (
    <figure className="mx-auto w-full max-w-[34rem]">
      <div className="relative aspect-square rounded-lg bg-board-edge p-[1.4%] shadow-lift">
        <div className="relative grid size-full grid-cols-10 grid-rows-10 gap-px overflow-hidden rounded-[0.6rem] bg-line-strong">
          {BOARD.map((square, index) => {
            const { row, col, edge } = cellOf(index);
            return (
              <div
                key={index}
                className={`relative flex items-center justify-center ${square.kind === "corner" ? "bg-parchment" : "bg-card"}`}
                style={{ gridRow: row + 1, gridColumn: col + 1 }}
              >
                <SquareFace square={square} edge={edge} holding={holdings[index]} />
                {landed === index ? (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 z-10 ring-2 ring-gold-deep ring-inset"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.55] }}
                    transition={{ duration: 0.8 }}
                  />
                ) : null}
              </div>
            );
          })}

          <div className="on-dark relative col-[2/10] row-[2/10] flex flex-col items-center justify-center gap-3 bg-brand px-4 text-center sm:gap-5">
            <span aria-hidden className="pointer-events-none absolute inset-[5%] rounded-md border border-gold/35" />
            <p className="font-display text-[clamp(1.05rem,4.6vw,1.9rem)] leading-none font-semibold text-gold">
              Clash <span className="text-[0.6em] italic">of</span> Capitals
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              <Die value={dice[0]} rollId={rollId} direction={1} />
              <Die value={dice[1]} rollId={rollId} direction={-1} />
            </div>
            <button
              type="button"
              onClick={rollRandom}
              disabled={rolling}
              className="relative inline-flex min-h-11 items-center rounded-full bg-gold px-5 text-sm font-semibold text-forest transition-[background-color,opacity] duration-[var(--dur-fast)] hover:bg-[#dfbd76] disabled:opacity-60"
            >
              {rolling ? "Rolling…" : "Roll the dice"}
            </button>
          </div>

          <span
            aria-hidden
            className="absolute z-20 size-[4.6%] -translate-x-[85%] -translate-y-[15%] rounded-full border-2 border-ivory bg-[#ef5b63] shadow-[0_2px_3px_rgb(0_0_0/0.35)]"
            style={tokenSpot(RIVAL_POSITION)}
          />
          <motion.span
            aria-hidden
            className="absolute z-30 size-[5.6%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ivory bg-gold shadow-[0_2px_4px_rgb(0_0_0/0.4)]"
            initial={false}
            animate={tokenSpot(position)}
            transition={{ duration: reduceMotion ? 0 : STEP_MS / 1000, ease: "easeOut" }}
          />
        </div>
      </div>
      <figcaption className="mt-5 flex min-h-[3.25rem] flex-col items-center gap-1 text-center">
        <span aria-live="polite" className="text-[0.9375rem] font-medium text-ink">
          {message}
        </span>
        <span className="text-xs text-muted">Interactive illustration of the board. You play gold.</span>
      </figcaption>
    </figure>
  );
}
