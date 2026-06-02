"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

/* ------------------------------------------------------------------ */
/*  Content — the six working principles (kept in sync with the        */
/*  shared `Why Choose 3Ts` copy used across the other variants).      */
/* ------------------------------------------------------------------ */

type Principle = {
  title: string;
  short: string;
  text: string;
};

const principles: Principle[] = [
  {
    title: "Tailored Solutions",
    short: "Designed around the real context.",
    text: "There is no one size fits all. I appreciatively enquire to tailor my engagement to meet your specific needs, challenges and goals.",
  },
  {
    title: "Walking the Talk",
    short: "The work models the outcome.",
    text: "Together, we model effective teamwork by setting shared goals, clarifying roles, and communicating openly.",
  },
  {
    title: "One Team Mindset",
    short: "Shared ownership of what follows.",
    text: "We share responsibility for outcomes, successes and setbacks alike, because we will rise or fall together.",
  },
  {
    title: "Inclusive and Accountable",
    short: "Every voice has a role and a standard.",
    text: "We honor diverse perspectives, foster mutual accountability, and create space for every voice to be heard.",
  },
  {
    title: "Creativity with Purpose",
    short: "Inventive where it helps the work.",
    text: "We embrace fun and creativity as important tools for innovation, connection, and sustainable progress.",
  },
  {
    title: "Serious About Work, Light on Ego",
    short: "High standards without the posturing.",
    text: "Together we will take our mission, our stakeholders, and each other - but not ourselves - VERY seriously.",
  },
];

const impacts = [
  {
    value: "16%",
    text: "Improvement in leadership scores across 18 training cohorts of World Bank leaders",
  },
  {
    value: "60%",
    text: "Reduction in gun violence since 2022 in a major US city, following community-centered intervention",
  },
  {
    value: "$247m",
    text: "Government funding managed for target communities, and reconciled for audit-ready closeout.",
  },
  {
    value: "20+",
    text: "Countries of professional experience across the Middle East, Africa, Asia, and beyond",
  },
];

/* ------------------------------------------------------------------ */
/*  Board model                                                        */
/*                                                                     */
/*  A 5 x 4 board (landscape Klotski). Six principle tiles of mixed    */
/*  sizes — two 2x2 feature blocks, two wide 2x1, two tall 1x2 — leave */
/*  a connected 2x2 empty pocket that pieces slide through.            */
/* ------------------------------------------------------------------ */

const COLS = 5;
const ROWS = 4;

type Block = {
  id: number;
  w: number;
  h: number;
  col: number;
  row: number;
};

/**
 * Hand-authored layouts. Each is a complete, valid tiling of the 5x4 board:
 * 16 occupied cells + a connected 2x2 empty pocket. Different layouts make
 * different principles "feature-sized" (2x2) — so a shuffle randomizes both
 * positions and sizes, and every principle gets its turn to show its full
 * body text inline. Hand-authored, so every shuffle is guaranteed solvable.
 */
const layouts: Block[][] = [
  [
    { id: 0, w: 2, h: 2, col: 0, row: 0 },
    { id: 1, w: 1, h: 2, col: 2, row: 0 },
    { id: 2, w: 2, h: 2, col: 3, row: 0 },
    { id: 3, w: 2, h: 1, col: 0, row: 2 },
    { id: 4, w: 2, h: 1, col: 0, row: 3 },
    { id: 5, w: 1, h: 2, col: 2, row: 2 },
  ],
  [
    { id: 0, w: 2, h: 1, col: 0, row: 2 },
    { id: 1, w: 1, h: 2, col: 4, row: 0 },
    { id: 2, w: 2, h: 1, col: 0, row: 3 },
    { id: 3, w: 2, h: 2, col: 0, row: 0 },
    { id: 4, w: 1, h: 2, col: 2, row: 2 },
    { id: 5, w: 2, h: 2, col: 2, row: 0 },
  ],
  [
    { id: 0, w: 1, h: 2, col: 2, row: 0 },
    { id: 1, w: 2, h: 2, col: 0, row: 0 },
    { id: 2, w: 2, h: 1, col: 0, row: 2 },
    { id: 3, w: 1, h: 2, col: 2, row: 2 },
    { id: 4, w: 2, h: 2, col: 3, row: 0 },
    { id: 5, w: 2, h: 1, col: 0, row: 3 },
  ],
  [
    { id: 0, w: 2, h: 2, col: 3, row: 0 },
    { id: 1, w: 2, h: 1, col: 0, row: 0 },
    { id: 2, w: 1, h: 2, col: 2, row: 0 },
    { id: 3, w: 2, h: 1, col: 0, row: 1 },
    { id: 4, w: 1, h: 2, col: 2, row: 2 },
    { id: 5, w: 2, h: 2, col: 3, row: 2 },
  ],
];

function cloneLayout(index: number): Block[] {
  return layouts[index].map((b) => ({ ...b }));
}

const initialBlocks: Block[] = cloneLayout(0);

type Tone = {
  surface: string;
  wash: string;
  eyebrow: string;
  short: string;
  body: string;
  grip: string;
  ring: string;
};

const tones: Tone[] = [
  {
    // 0 — dark feature
    surface: "border-[#23291f] bg-[#151a16] text-cream",
    wash: "bg-[linear-gradient(135deg,rgba(255,255,255,0.055),transparent_40%),radial-gradient(circle_at_82%_16%,rgba(169,131,90,0.22),transparent_34%)]",
    eyebrow: "text-gold",
    short: "text-cream/55",
    body: "text-cream/72",
    grip: "text-cream/30",
    ring: "focus-visible:ring-gold/70",
  },
  {
    // 1 — sage tall
    surface: "border-[#cad2bd] bg-[#e9eee2] text-charcoal",
    wash: "bg-[linear-gradient(160deg,rgba(127,159,80,0.15),transparent_46%),linear-gradient(0deg,rgba(255,255,255,0.34),transparent_40%)]",
    eyebrow: "text-gold",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    grip: "text-charcoal/25",
    ring: "focus-visible:ring-gold/65",
  },
  {
    // 2 — cream / gold feature
    surface: "border-[#d8cfbf] bg-[#fcfbf9] text-charcoal",
    wash: "bg-[linear-gradient(150deg,rgba(169,131,90,0.11),transparent_44%),linear-gradient(90deg,rgba(21,26,22,0.035)_1px,transparent_1px)] [background-size:auto,22px_22px]",
    eyebrow: "text-gold",
    short: "text-charcoal/46",
    body: "text-charcoal/68",
    grip: "text-charcoal/25",
    ring: "focus-visible:ring-gold/65",
  },
  {
    // 3 — warm wide
    surface: "border-[#d4c3a9] bg-[#efe9df] text-charcoal",
    wash: "bg-[linear-gradient(145deg,rgba(169,131,90,0.10),transparent_44%),repeating-linear-gradient(135deg,rgba(169,131,90,0.06)_0,rgba(169,131,90,0.06)_1px,transparent_1px,transparent_12px)]",
    eyebrow: "text-gold",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    grip: "text-charcoal/25",
    ring: "focus-visible:ring-gold/65",
  },
  {
    // 4 — dark wide
    surface: "border-[#23291f] bg-[#151a16] text-cream",
    wash: "bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_18%_80%,rgba(127,159,80,0.18),transparent_36%)]",
    eyebrow: "text-gold",
    short: "text-cream/55",
    body: "text-cream/72",
    grip: "text-cream/30",
    ring: "focus-visible:ring-gold/70",
  },
  {
    // 5 — plain light tall
    surface: "border-[#d9d3c8] bg-[#fcfbf9] text-charcoal",
    wash: "bg-[linear-gradient(145deg,rgba(21,26,22,0.045),transparent_40%),radial-gradient(circle_at_84%_84%,rgba(169,131,90,0.10),transparent_36%)]",
    eyebrow: "text-gold",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    grip: "text-charcoal/25",
    ring: "focus-visible:ring-gold/65",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/*  Pure board helpers                                                 */
/* ------------------------------------------------------------------ */

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Occupancy grid marking every cell taken by a block other than `exceptId`. */
function buildOccupancy(blocks: Block[], exceptId: number) {
  const grid: boolean[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false),
  );
  for (const b of blocks) {
    if (b.id === exceptId) continue;
    for (let r = b.row; r < b.row + b.h; r += 1) {
      for (let c = b.col; c < b.col + b.w; c += 1) {
        grid[r][c] = true;
      }
    }
  }
  return grid;
}

/** Can a w×h block sit at (col,row) without leaving the board or overlapping? */
function canPlace(
  occ: boolean[][],
  col: number,
  row: number,
  w: number,
  h: number,
) {
  if (col < 0 || row < 0 || col + w > COLS || row + h > ROWS) return false;
  for (let r = row; r < row + h; r += 1) {
    for (let c = col; c < col + w; c += 1) {
      if (occ[r][c]) return false;
    }
  }
  return true;
}

/**
 * Slide a block one cell at a time toward (targetCol, targetRow), routing
 * through the empty space — never lifting over or overlapping another block.
 * Returns the furthest legal position reachable in that gesture.
 */
function slideToward(
  occ: boolean[][],
  block: { w: number; h: number; col: number; row: number },
  targetCol: number,
  targetRow: number,
) {
  let col = block.col;
  let row = block.row;
  let guard = COLS * ROWS + 1;

  while ((col !== targetCol || row !== targetRow) && guard > 0) {
    guard -= 1;
    const dc = Math.sign(targetCol - col);
    const dr = Math.sign(targetRow - row);
    const horizontalFirst = Math.abs(targetCol - col) >= Math.abs(targetRow - row);
    const order: Array<[number, number]> = horizontalFirst
      ? [
          [dc, 0],
          [0, dr],
        ]
      : [
          [0, dr],
          [dc, 0],
        ];

    let moved = false;
    for (const [sc, sr] of order) {
      if ((sc !== 0 || sr !== 0) && canPlace(occ, col + sc, row + sr, block.w, block.h)) {
        col += sc;
        row += sr;
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }

  return { col, row };
}

/* ------------------------------------------------------------------ */
/*  Section header (mirrors the shared eyebrow treatment)              */
/* ------------------------------------------------------------------ */

function Eyebrow() {
  return (
    <div className="mb-8 flex flex-col items-start space-y-4">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Why Choose 3Ts
      </span>
      <div className="h-[2px] w-12 bg-gold/60" />
    </div>
  );
}

function Grip({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid grid-cols-2 gap-[3px] ${className}`}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="h-[3px] w-[3px] rounded-full bg-current" />
      ))}
    </span>
  );
}

function ExpandGlyph({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 ${className}`}
    >
      <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tile                                                               */
/* ------------------------------------------------------------------ */

function Tile({
  block,
  active,
  dimmed,
  reduceMotion,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onKeyDown,
}: {
  block: Block;
  active: boolean;
  dimmed: boolean;
  reduceMotion: boolean;
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>, id: number) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLButtonElement>, id: number) => void;
}) {
  const principle = principles[block.id];
  const tone = tones[block.id];
  const area = block.w * block.h;
  const isFeature = area >= 4;

  return (
    <button
      type="button"
      draggable={false}
      onPointerDown={(e) => onPointerDown(e, block.id)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => onKeyDown(e, block.id)}
      aria-label={
        isFeature
          ? `Principle ${block.id + 1}: ${principle.title}. Drag to slide, or use the arrow keys.`
          : `Principle ${block.id + 1}: ${principle.title}. Click to read the full description. Drag to slide, or use the arrow keys.`
      }
      className={`absolute touch-none select-none outline-none ${active ? "z-20" : "z-10"}`}
      style={{
        left: `${(block.col / COLS) * 100}%`,
        top: `${(block.row / ROWS) * 100}%`,
        width: `${(block.w / COLS) * 100}%`,
        height: `${(block.h / ROWS) * 100}%`,
        transition: reduceMotion
          ? "none"
          : "left 0.16s cubic-bezier(0.22,1,0.36,1), top 0.16s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        className={`group absolute inset-[5px] flex flex-col justify-between overflow-hidden border p-4 text-left transition-[box-shadow,opacity] duration-300 md:inset-[7px] md:p-5 ${tone.surface} ${tone.ring} focus-visible:ring-2 ${
          active
            ? "cursor-grabbing shadow-[0_34px_90px_-46px_rgba(30,37,32,0.7)]"
            : "cursor-grab shadow-[0_22px_60px_-46px_rgba(30,37,32,0.42)]"
        } ${dimmed ? "opacity-55" : "opacity-100"}`}
      >
        <span className={`pointer-events-none absolute inset-0 opacity-95 ${tone.wash}`} />
        <span
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gold transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />

        <span className="relative z-10 flex items-start justify-between gap-3">
          <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.eyebrow}`}>
            0{block.id + 1}
          </span>
          <Grip className={tone.grip} />
        </span>

        <span className="relative z-10 block">
          <span
            className={`block font-serif leading-[1.05] ${
              isFeature
                ? "text-2xl md:text-3xl lg:text-[2.1rem]"
                : "text-xl leading-[1.08] md:text-2xl"
            }`}
          >
            {principle.title}
          </span>
          <span
            className={`mt-3 block text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.short}`}
          >
            {principle.short}
          </span>
          {isFeature ? (
            <span className={`mt-3 hidden text-sm leading-relaxed md:block ${tone.body}`}>
              {principle.text}
            </span>
          ) : (
            <span
              className={`mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold transition-opacity duration-200 ${
                active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
              }`}
            >
              <ExpandGlyph className="text-gold" />
              Read
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  The interactive board                                              */
/* ------------------------------------------------------------------ */

function KlotskiBoard() {
  const reduceMotion = useReducedMotion() ?? false;
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const layoutIndexRef = useRef(0);
  const blocksRef = useRef(blocks);
  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    startCol: number;
    startRow: number;
    cell: number;
    occ: boolean[][];
    moved: boolean;
  } | null>(null);

  const isOpenable = useCallback(
    (id: number) => {
      const b = blocksRef.current.find((block) => block.id === id);
      return b ? b.w * b.h < 4 : false;
    },
    [],
  );

  // Close the reading card with Escape.
  useEffect(() => {
    if (openId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, id: number) => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const cell = rect.width / COLS;
      const block = blocksRef.current.find((b) => b.id === id);
      if (!block || cell === 0) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        startCol: block.col,
        startRow: block.row,
        cell,
        occ: buildOccupancy(blocksRef.current, id),
        moved: false,
      };
      setActiveId(id);
    },
    [],
  );

  const handlePointerMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const block = blocksRef.current.find((b) => b.id === drag.id);
    if (!block) return;

    // Once the pointer travels past a small threshold it's a drag, not a tap —
    // dismiss any open reading card so it doesn't fight the slide.
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 6) {
      drag.moved = true;
      setOpenId(null);
    }

    const targetCol = clamp(
      drag.startCol + Math.round((e.clientX - drag.startX) / drag.cell),
      0,
      COLS - block.w,
    );
    const targetRow = clamp(
      drag.startRow + Math.round((e.clientY - drag.startY) / drag.cell),
      0,
      ROWS - block.h,
    );

    setBlocks((prev) => {
      const current = prev.find((b) => b.id === drag.id);
      if (!current) return prev;
      const next = slideToward(drag.occ, current, targetCol, targetRow);
      if (next.col === current.col && next.row === current.row) return prev;
      setHasMoved(true);
      return prev.map((b) => (b.id === drag.id ? { ...b, ...next } : b));
    });
  }, []);

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (drag) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* pointer already released */
        }
        // A tap (no real drag) on a compact tile opens its full description.
        if (!drag.moved && isOpenable(drag.id)) {
          setOpenId((prev) => (prev === drag.id ? null : drag.id));
        }
      }
      dragRef.current = null;
      setActiveId(null);
    },
    [isOpenable],
  );

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLButtonElement>, id: number) => {
      // Enter / Space opens (or closes) the full description of a compact tile.
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        if (isOpenable(id)) {
          e.preventDefault();
          setOpenId((prev) => (prev === id ? null : id));
        }
        return;
      }

      const deltas: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
      const delta = deltas[e.key];
      if (!delta) return;
      e.preventDefault();
      setActiveId(id);
      setOpenId(null);

      setBlocks((prev) => {
        const current = prev.find((b) => b.id === id);
        if (!current) return prev;
        const occ = buildOccupancy(prev, id);
        const [dc, dr] = delta;
        if (!canPlace(occ, current.col + dc, current.row + dr, current.w, current.h)) {
          return prev;
        }
        setHasMoved(true);
        return prev.map((b) =>
          b.id === id ? { ...b, col: b.col + dc, row: b.row + dr } : b,
        );
      });
    },
    [isOpenable],
  );

  const reset = useCallback(() => {
    layoutIndexRef.current = 0;
    setBlocks(cloneLayout(0));
    setHasMoved(false);
    setActiveId(null);
    setOpenId(null);
  }, []);

  // Shuffle to a different hand-authored layout — this re-sizes the tiles as
  // well as re-positions them, so a new set of principles becomes feature-sized.
  const shuffle = useCallback(() => {
    let nextIndex = layoutIndexRef.current;
    if (layouts.length > 1) {
      while (nextIndex === layoutIndexRef.current) {
        nextIndex = Math.floor(Math.random() * layouts.length);
      }
    }
    layoutIndexRef.current = nextIndex;
    setBlocks(cloneLayout(nextIndex));
    setHasMoved(true);
    setActiveId(null);
    setOpenId(null);
  }, []);

  // Empty cells, for the recessed slot markers that hint where pieces slide.
  const occupied = buildOccupancy(blocks, -1);
  const emptyCells: Array<[number, number]> = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (!occupied[r][c]) emptyCells.push([c, r]);
    }
  }

  // The reading card: a compact tile, opened in place, grown to a readable
  // footprint and clamped inside the board frame (the guardrails).
  const openBlock = openId !== null ? blocks.find((b) => b.id === openId) ?? null : null;
  let openRect: { col: number; row: number; w: number; h: number } | null = null;
  if (openBlock) {
    const w = Math.max(openBlock.w, 2);
    const h = Math.max(openBlock.h, 2);
    openRect = {
      w,
      h,
      col: clamp(openBlock.col, 0, COLS - w),
      row: clamp(openBlock.row, 0, ROWS - h),
    };
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2.5 text-sm text-charcoal/55">
          <Grip className="text-gold" />
          <span>
            {hasMoved
              ? "However you arrange them, the principles hold together."
              : "Drag to slide the tiles — click a smaller one to read it in full."}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={shuffle}
            className="border border-charcoal/15 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70 transition-colors duration-200 hover:border-gold/55 hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            Shuffle
          </button>
          <button
            type="button"
            onClick={reset}
            className="border border-charcoal/15 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70 transition-colors duration-200 hover:border-gold/55 hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[960px] border border-charcoal/12 bg-[#efe9df]/70 p-3 shadow-[inset_0_2px_34px_-20px_rgba(30,37,32,0.55)] md:p-4">
        <div
          ref={gridRef}
          className="relative aspect-[5/4] w-full"
          role="group"
          aria-label="Movable principle tiles on a sliding board"
        >
          {/* recessed slots for empty cells */}
          {emptyCells.map(([c, r]) => (
            <span
              key={`slot-${c}-${r}`}
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                left: `${(c / COLS) * 100}%`,
                top: `${(r / ROWS) * 100}%`,
                width: `${(1 / COLS) * 100}%`,
                height: `${(1 / ROWS) * 100}%`,
              }}
            >
              <span className="absolute inset-[5px] border border-dashed border-charcoal/12 bg-charcoal/[0.025] md:inset-[7px]" />
            </span>
          ))}

          {blocks.map((block) => (
            <Tile
              key={block.id}
              block={block}
              active={activeId === block.id}
              dimmed={openId !== null && openId !== block.id}
              reduceMotion={reduceMotion}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={handleKeyDown}
            />
          ))}

          {openBlock && openRect && (
            <>
              <button
                type="button"
                aria-label="Close description"
                onClick={() => setOpenId(null)}
                className="absolute inset-0 z-30 cursor-default bg-[#1e2520]/30 backdrop-blur-[1px]"
              />
              <ReadingCard
                block={openBlock}
                rect={openRect}
                reduceMotion={reduceMotion}
                onClose={() => setOpenId(null)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reading card — the opened (resized) view of a compact tile.        */
/* ------------------------------------------------------------------ */

function ReadingCard({
  block,
  rect,
  reduceMotion,
  onClose,
}: {
  block: Block;
  rect: { col: number; row: number; w: number; h: number };
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const principle = principles[block.id];
  const tone = tones[block.id];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Principle ${block.id + 1}: ${principle.title}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-40"
      style={{
        left: `${(rect.col / COLS) * 100}%`,
        top: `${(rect.row / ROWS) * 100}%`,
        width: `${(rect.w / COLS) * 100}%`,
        height: `${(rect.h / ROWS) * 100}%`,
      }}
    >
      <div
        className={`absolute inset-[5px] flex flex-col overflow-hidden border p-5 shadow-[0_44px_110px_-44px_rgba(30,37,32,0.85)] md:inset-[7px] md:p-7 ${tone.surface}`}
      >
        <span className={`pointer-events-none absolute inset-0 opacity-95 ${tone.wash}`} />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gold" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.eyebrow}`}>
            Principle 0{block.id + 1}
          </span>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close description"
            className={`-mr-1 -mt-1 grid h-7 w-7 place-items-center rounded-full border border-gold/30 text-base leading-none transition-colors duration-200 hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${tone.short}`}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="relative z-10 pt-6">
          <h3 className="font-serif text-2xl leading-[1.06] md:text-3xl">{principle.title}</h3>
          <p className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.short}`}>
            {principle.short}
          </p>
          <p className={`mt-4 text-sm leading-relaxed md:text-base ${tone.body}`}>
            {principle.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile fallback — a clean, readable stack (no tiny drag targets).  */
/* ------------------------------------------------------------------ */

function MobileStack() {
  return (
    <div className="space-y-4 md:hidden">
      {principles.map((principle, index) => {
        const tone = tones[index];
        return (
          <article
            key={principle.title}
            className={`relative overflow-hidden border p-5 shadow-[0_20px_55px_-46px_rgba(30,37,32,0.45)] ${tone.surface}`}
          >
            <span className={`pointer-events-none absolute inset-0 opacity-95 ${tone.wash}`} />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gold/70" />
            <div className="relative z-10">
              <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.eyebrow}`}>
                Principle 0{index + 1}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{principle.title}</h3>
              <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.short}`}>
                {principle.short}
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${tone.body}`}>{principle.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Why-choose section (Klotski variant)                               */
/* ------------------------------------------------------------------ */

function KlotskiWhySection() {
  return (
    <section className="w-full border-t border-[#e8e3d8] bg-[#f7f4ed] px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.56fr_0.9fr] lg:items-end"
        >
          <div>
            <Eyebrow />
            <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-5xl lg:text-6xl">
              Why choose 3Ts?
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/64 md:text-lg">
            Six working principles, in play. Slide them, rearrange them, find your
            own configuration — they keep their shape and keep working together.
          </p>
        </motion.div>

        <div className="hidden md:block">
          <KlotskiBoard />
        </div>
        <MobileStack />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported section — Why Choose (Klotski) + Impact, mirroring the    */
/*  existing WhyAndImpact composition so the page slots in cleanly.    */
/* ------------------------------------------------------------------ */

export default function WhyChooseKlotski() {
  return (
    <section className="w-full bg-[#f8f6f2] flex flex-col">
      <KlotskiWhySection />

      {/* IMPACT Section */}
      <div className="w-full py-24 px-6 md:px-16 lg:px-24 bg-[#111613] border-t border-[#111613]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Left */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-12 mb-16 lg:mb-0">
            <div className="flex flex-col items-start space-y-4 mb-8">
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Selected Impact
              </span>
              <div className="w-12 h-[2px] bg-gold/60"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl leading-tight tracking-tight text-cream"
            >
              Better Decisions. Better Outcomes.
            </motion.h2>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-y-0">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
                  index !== 0 ? "lg:border-l lg:border-cream/10 lg:pl-8" : ""
                }`}
              >
                <div className="font-serif text-6xl md:text-7xl text-cream mb-4 tracking-tighter">
                  {impact.value}
                </div>
                <div className="w-8 h-px bg-gold/60 mb-6 hidden lg:block"></div>
                <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                  {impact.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
