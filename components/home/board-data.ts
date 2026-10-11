/**
 * The Clash of Capitals board as the game plays it: 36 squares, in order from Start.
 * Names, colour groups, prices and site rents are the game's own title-deed values.
 */

export type Group = "blue" | "purple" | "green" | "pink";

export type Square =
  | { kind: "corner"; name: "Start" | "Jail" | "Club" | "Rest House" }
  | { kind: "city"; name: string; group: Group; price: number; rent: number }
  | { kind: "transport"; name: string; icon: "train" | "plane" | "boat" | "bus" }
  | { kind: "utility"; name: string; icon: "power" | "water" }
  | { kind: "chance" }
  | { kind: "chest" }
  | { kind: "tax"; name: "Income Tax" | "Wealth Tax" };

const city = (name: string, group: Group, price: number, rent: number): Square => ({ kind: "city", name, group, price, rent });

export const BOARD: readonly Square[] = [
  { kind: "corner", name: "Start" },
  city("Mumbai", "blue", 8500, 1200),
  { kind: "utility", name: "Water Works", icon: "water" },
  { kind: "transport", name: "Railway", icon: "train" },
  city("Ahmedabad", "blue", 4000, 400),
  { kind: "tax", name: "Income Tax" },
  city("Indore", "green", 1500, 200),
  { kind: "chance" },
  city("Jaipur", "green", 3000, 250),
  { kind: "corner", name: "Jail" },
  city("Delhi", "pink", 6000, 750),
  city("Chandigarh", "pink", 2500, 200),
  { kind: "utility", name: "Electric Company", icon: "power" },
  { kind: "transport", name: "BEST", icon: "bus" },
  city("Shimla", "purple", 2200, 200),
  city("Amritsar", "purple", 3300, 300),
  { kind: "chest" },
  city("Srinagar", "purple", 5000, 550),
  { kind: "corner", name: "Club" },
  city("Agra", "green", 2500, 200),
  { kind: "chance" },
  city("Kanpur", "green", 4000, 400),
  city("Patna", "green", 2000, 150),
  city("Darjeeling", "blue", 2500, 200),
  { kind: "transport", name: "Air India", icon: "plane" },
  city("Calcutta", "blue", 6500, 800),
  city("Hyderabad", "blue", 3500, 300),
  { kind: "corner", name: "Rest House" },
  city("Madras", "purple", 7000, 900),
  { kind: "chest" },
  city("Bangalore", "purple", 4000, 400),
  { kind: "tax", name: "Wealth Tax" },
  city("Ootacamund", "pink", 2500, 200),
  city("Cochin", "pink", 3000, 300),
  { kind: "transport", name: "Motor Boat", icon: "boat" },
  city("Margao", "pink", 4000, 400),
];

export const BOARD_SIZE = BOARD.length;

/** Squares per side, corners included: the board is drawn on a 10 × 10 grid. */
export const SIDE = 10;

export type Edge = "bottom" | "left" | "top" | "right";

/**
 * Where square `index` sits on the 10 × 10 grid (0-based row and column). Start is the
 * bottom-right corner and play runs clockwise: along the bottom, up the left, across the top.
 */
export function cellOf(index: number): { row: number; col: number; edge: Edge } {
  const last = SIDE - 1;
  if (index < last) return { row: last, col: last - index, edge: "bottom" };
  if (index < 2 * last) return { row: last - (index - last), col: 0, edge: "left" };
  if (index < 3 * last) return { row: 0, col: index - 2 * last, edge: "top" };
  return { row: index - 3 * last, col: last, edge: "right" };
}

export const GROUP_COLOR: Record<Group, string> = {
  blue: "var(--group-blue)",
  purple: "var(--group-purple)",
  green: "var(--group-green)",
  pink: "var(--group-pink)",
};

export const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
