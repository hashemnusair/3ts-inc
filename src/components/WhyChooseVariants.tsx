"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";

export type WhyVariant = "mosaic" | "bento" | "constellation" | "decision-room" | "expanding-panels";

type Principle = {
  title: string;
  text: string;
  short: string;
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
    short: "High standards without performance.",
    text: "We take our mission, our stakeholders and each other, but not ourselves, very seriously.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const mosaicStyles = [
  {
    surface: "border-[#151a16] bg-[#151a16] text-cream shadow-[0_28px_80px_-50px_rgba(0,0,0,0.62)]",
    number: "text-cream/[0.055]",
    short: "text-cream/56",
    body: "text-cream/70",
    wash: "bg-[linear-gradient(135deg,rgba(255,255,255,0.055),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(169,131,90,0.18),transparent_30%)]",
  },
  {
    surface: "border-[#d8cfbf] bg-[#fcfbf9] text-charcoal shadow-[0_22px_70px_-58px_rgba(30,37,32,0.3)]",
    number: "text-gold/10",
    short: "text-charcoal/45",
    body: "text-charcoal/68",
    wash: "bg-[linear-gradient(155deg,rgba(169,131,90,0.07),transparent_42%),linear-gradient(90deg,rgba(21,26,22,0.035)_1px,transparent_1px)] [background-size:auto,22px_22px]",
  },
  {
    surface: "border-[#d4c3a9] bg-[#efe9df] text-charcoal shadow-[0_22px_70px_-58px_rgba(30,37,32,0.32)]",
    number: "text-[#a9835a]/13",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    wash: "bg-[linear-gradient(145deg,rgba(255,255,255,0.34),transparent_44%),repeating-linear-gradient(135deg,rgba(169,131,90,0.07)_0,rgba(169,131,90,0.07)_1px,transparent_1px,transparent_12px)]",
  },
  {
    surface: "border-[#cad2bd] bg-[#e9eee2] text-charcoal shadow-[0_22px_70px_-58px_rgba(30,37,32,0.34)]",
    number: "text-[#7f9f50]/14",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    wash: "bg-[linear-gradient(160deg,rgba(127,159,80,0.13),transparent_45%),linear-gradient(90deg,rgba(21,26,22,0.035)_1px,transparent_1px)] [background-size:auto,20px_20px]",
  },
  {
    surface: "border-[#151a16] bg-[#151a16] text-cream shadow-[0_28px_80px_-50px_rgba(0,0,0,0.58)]",
    number: "text-cream/[0.06]",
    short: "text-cream/56",
    body: "text-cream/70",
    wash: "bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_78%_20%,rgba(169,131,90,0.2),transparent_32%),repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_18px)]",
  },
  {
    surface: "border-[#d9d3c8] bg-[#fcfbf9] text-charcoal shadow-[0_22px_70px_-58px_rgba(30,37,32,0.32)]",
    number: "text-charcoal/[0.055]",
    short: "text-charcoal/48",
    body: "text-charcoal/70",
    wash: "bg-[linear-gradient(145deg,rgba(21,26,22,0.05),transparent_38%),linear-gradient(0deg,rgba(169,131,90,0.08),transparent_28%)]",
  },
];

const panelStyles = [
  {
    surface: "border-[#151a16] bg-[#151a16] text-cream",
    closed: "text-cream/76",
    muted: "text-cream/58",
    wash: "bg-[radial-gradient(circle_at_78%_16%,rgba(169,131,90,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.07),transparent_42%)]",
  },
  {
    surface: "border-[#d5c9b8] bg-[#f9f6ef] text-charcoal",
    closed: "text-charcoal/72",
    muted: "text-charcoal/50",
    wash: "bg-[linear-gradient(145deg,rgba(169,131,90,0.12),transparent_42%),repeating-linear-gradient(90deg,rgba(21,26,22,0.035)_0,rgba(21,26,22,0.035)_1px,transparent_1px,transparent_18px)]",
  },
  {
    surface: "border-[#cad2bd] bg-[#e9eee2] text-charcoal",
    closed: "text-charcoal/72",
    muted: "text-charcoal/50",
    wash: "bg-[linear-gradient(150deg,rgba(127,159,80,0.16),transparent_44%),linear-gradient(0deg,rgba(255,255,255,0.36),transparent_38%)]",
  },
  {
    surface: "border-[#ded4c5] bg-[#fcfbf9] text-charcoal",
    closed: "text-charcoal/72",
    muted: "text-charcoal/50",
    wash: "bg-[linear-gradient(135deg,rgba(30,37,32,0.055),transparent_40%),radial-gradient(circle_at_16%_82%,rgba(169,131,90,0.11),transparent_34%)]",
  },
  {
    surface: "border-[#151a16] bg-[#151a16] text-cream",
    closed: "text-cream/76",
    muted: "text-cream/58",
    wash: "bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_82%_20%,rgba(127,159,80,0.18),transparent_31%),repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_14px)]",
  },
  {
    surface: "border-[#d4c3a9] bg-[#efe9df] text-charcoal",
    closed: "text-charcoal/72",
    muted: "text-charcoal/50",
    wash: "bg-[linear-gradient(160deg,rgba(169,131,90,0.15),transparent_46%),linear-gradient(90deg,rgba(255,255,255,0.36),transparent_36%)]",
  },
];

function Eyebrow({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mb-8 flex flex-col items-start space-y-4">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Why Choose 3Ts
      </span>
      <div className={`h-[2px] w-12 ${dark ? "bg-gold/70" : "bg-gold/60"}`} />
    </div>
  );
}

function MosaicVariant({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
  ];
  const baseWidths = [44, 31, 25, 31, 28, 41];
  const activeWidths: Record<number, number[]> = {
    0: [52, 27, 21],
    1: [34, 44, 22],
    2: [36, 25, 39],
    3: [43, 23, 34],
    4: [27, 40, 33],
    5: [27, 25, 48],
  };

  function cardWidth(index: number, row: number[]) {
    if (active === null) return baseWidths[index];
    if (!row.includes(active)) return baseWidths[index];
    return activeWidths[active][row.indexOf(index)];
  }

  return (
    <section className="w-full border-t border-[#e8e3d8] bg-[#f7f4ed] px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.56fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow />
            <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-5xl lg:text-6xl">
              Why choose 3Ts?
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/64 md:text-lg">
            Six working principles, held in motion: structured enough to guide decisions, flexible enough to meet the room as it is.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onMouseLeave={() => setActive(null)}
          className="space-y-4"
        >
          {rows.map((row) => (
            <div
              key={row.join("-")}
              className="grid grid-cols-1 gap-4 md:flex md:h-[420px] md:items-stretch"
            >
              {row.map((index) => {
                const item = principles[index];
                const isActive = active === index;
                const style = mosaicStyles[index];
                const activeSurface = "border-[#151a16] bg-[#151a16] text-cream shadow-[0_34px_95px_-52px_rgba(0,0,0,0.72)]";
                const activeWash = "bg-[linear-gradient(135deg,rgba(255,255,255,0.065),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(169,131,90,0.2),transparent_30%)]";
                const activeLightSurface = "border-[#bda886] bg-[#fcfbf9] text-charcoal shadow-[0_34px_95px_-54px_rgba(30,37,32,0.48)]";
                const activeLightWash = "bg-[linear-gradient(145deg,rgba(169,131,90,0.13),transparent_40%),linear-gradient(90deg,rgba(21,26,22,0.04)_1px,transparent_1px)] [background-size:auto,20px_20px]";
                const startsDark = index === 0 || index === 4 || (compact && index === 0);
                const activeOnDefaultDark = isActive && startsDark;
                const activeOnDefaultLight = isActive && !startsDark;
                const isDark = activeOnDefaultLight || (!isActive && startsDark);
                const needsSlowerCopyReveal = index === 2 || index === 4;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    variants={itemVariants}
                    layout={!reduceMotion}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(index)}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    style={{ flexBasis: `${cardWidth(index, row)}%` }}
                    className={`group relative min-h-[260px] w-full shrink overflow-hidden border p-6 text-left transition-[flex-basis,background-color,border-color,box-shadow] duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gold/70 md:min-h-0 md:p-7 lg:p-8 ${
                      activeOnDefaultDark ? activeLightSurface : activeOnDefaultLight ? activeSurface : style.surface
                    } ${isActive ? "z-10" : "z-0"}`}
                  >
                    <div className={`pointer-events-none absolute inset-0 opacity-95 ${activeOnDefaultDark ? activeLightWash : activeOnDefaultLight ? activeWash : style.wash}`} />
                    <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px bg-current opacity-[0.045] md:block" />
                    <div className={`pointer-events-none absolute right-5 top-4 font-serif text-7xl leading-none transition-colors duration-300 md:text-8xl ${isActive ? "text-gold/14" : style.number}`}>
                      0{index + 1}
                    </div>
                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      } bg-gold`}
                    />
                    <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                          Principle 0{index + 1}
                        </span>
                        <h3
                          className={`mt-5 max-w-[13ch] font-serif leading-tight ${
                            isActive
                              ? "text-4xl md:text-5xl"
                              : "text-3xl md:text-4xl"
                          } ${index === 5 && !isActive ? "lg:text-[2.75rem]" : "lg:text-5xl"}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div>
                        <p className={`text-sm font-semibold uppercase tracking-[0.12em] ${isDark ? "text-cream/56" : activeOnDefaultDark ? "text-charcoal/48" : style.short}`}>
                          {item.short}
                        </p>
                        <p
                          className={`mt-4 max-w-2xl leading-relaxed transition-[max-height,opacity,transform] duration-300 ${
                            isDark
                              ? "text-base text-cream/70 md:text-lg"
                              : activeOnDefaultDark
                                ? "text-base text-charcoal/70 md:text-lg"
                                : `text-base md:text-lg ${style.body}`
                          } ${
                            isActive
                              ? `md:max-h-32 md:translate-y-0 md:opacity-100 ${needsSlowerCopyReveal ? "md:delay-[360ms]" : "md:delay-150"}`
                              : "md:max-h-0 md:translate-y-2 md:overflow-hidden md:opacity-0 md:delay-0"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExpandingPanelsVariant() {
  const [active, setActive] = useState<number | null>(null);
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
  ];

  function panelFlexBasis(index: number, row: number[]) {
    const rowGap = `${Math.max(row.length - 1, 0)}rem`;
    const rowHasActive = active !== null && row.includes(active);
    if (!rowHasActive) {
      return `calc((100% - ${rowGap}) / ${row.length})`;
    }

    const activeWeight = 4.35;
    const totalWeight = activeWeight + row.length - 1;
    const weight = active === index ? activeWeight : 1;
    return `calc((100% - ${rowGap}) * ${weight / totalWeight})`;
  }

  return (
    <section
      className="w-full overflow-hidden border-t border-[#e8e3d8] bg-[#f7f4ed] px-6 py-20 md:px-16 lg:px-24"
      onMouseLeave={() => setActive(null)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.55fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow />
            <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-5xl lg:text-6xl">
              Why choose 3Ts?
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/64 md:text-lg">
            Principles that flex in place: responsive enough to reveal depth, steady enough to keep the room easy to read.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="space-y-4"
        >
          {rows.map((row, rowIndex) => (
            <div
              key={`expanding-panel-row-${rowIndex}`}
              className="grid grid-cols-1 gap-4 md:flex md:h-[360px] md:items-stretch lg:h-[390px]"
            >
              {row.map((index) => (
                <ExpandingPanel
                  key={index}
                  index={index}
                  active={active === index}
                  dimmed={active !== null && active !== index}
                  flexBasis={panelFlexBasis(index, row)}
                  onActivate={() => setActive(index)}
                  onDeactivate={() => setActive(null)}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExpandingPanel({
  index,
  active,
  dimmed,
  flexBasis,
  onActivate,
  onDeactivate,
}: {
  index: number;
  active: boolean;
  dimmed: boolean;
  flexBasis: string;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const principle = principles[index];
  const style = panelStyles[index];

  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onActivate}
      aria-expanded={active}
      style={{ flexBasis }}
      className={`group relative min-h-[240px] w-full overflow-hidden border p-5 text-left shadow-[0_24px_70px_-58px_rgba(30,37,32,0.48)] transition-[flex-basis,filter,border-color,box-shadow] duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gold/75 md:min-h-0 md:w-auto md:shrink-0 md:grow-0 md:p-0 ${
        style.surface
      } ${active ? "z-10 md:shadow-[0_34px_95px_-54px_rgba(30,37,32,0.62)]" : ""} ${
        dimmed ? "md:saturate-[0.86]" : ""
      }`}
    >
      <div className={`pointer-events-none absolute inset-0 opacity-95 ${style.wash}`} />
      <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-current opacity-[0.06] md:inset-x-6" />
      <div className="pointer-events-none absolute inset-y-5 right-5 w-px bg-current opacity-[0.06] md:inset-y-6" />
      <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between gap-8 md:min-h-0 md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            0{index + 1}
          </span>
          <span
            className={`mt-1 h-2.5 w-2.5 shrink-0 border border-gold/55 transition-colors duration-300 ${
              active ? "bg-gold" : "bg-gold/20"
            }`}
          />
        </div>

        <div
          aria-hidden={active}
          className={`flex flex-col transition-all duration-300 ${
            active
              ? "md:pointer-events-none md:max-h-0 md:flex-none md:translate-y-3 md:overflow-hidden md:opacity-0"
              : "flex-1 justify-center md:max-h-[230px] md:translate-y-0 md:opacity-100"
          }`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${style.muted}`}>
            Principle 0{index + 1}
          </p>
          <h3
            className={`mt-3 font-serif text-2xl leading-[1.04] ${
              dimmed
                ? "max-w-[11ch] md:text-[1.35rem] lg:text-[1.55rem]"
                : "max-w-[15ch] md:text-[1.65rem] lg:text-3xl"
            } ${style.closed}`}
          >
            {principle.title}
          </h3>
          <p className={`mt-4 max-w-[21rem] text-sm leading-relaxed transition-opacity duration-300 ${style.muted} ${dimmed ? "md:opacity-0" : ""}`}>
            {principle.short}
          </p>
        </div>

        <div
          aria-hidden={!active}
          className={`transition-[max-height,opacity,transform] duration-300 ${
            active
              ? "md:max-h-[310px] md:translate-y-0 md:opacity-100"
              : "md:max-h-0 md:translate-y-3 md:overflow-hidden md:opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Principle 0{index + 1}
          </p>
          <h3
            className={`mt-3 max-w-[14ch] font-serif text-3xl leading-[1.02] md:text-4xl ${
              index === 5 ? "lg:text-[2.85rem]" : "lg:text-5xl"
            }`}
          >
            {principle.title}
          </h3>
          <p className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${active ? style.closed : style.muted}`}>
            {principle.text}
          </p>
        </div>
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gold transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.button>
  );
}

function ConstellationVariant() {
  const nodePositions = [
    [13, 27],
    [46, 14],
    [78, 30],
    [84, 70],
    [48, 84],
    [17, 64],
  ];

  return (
    <section className="w-full border-t border-[#e8e3d8] bg-cream px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow />
            <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-6xl">
              Why choose 3Ts?
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-charcoal/64">
            A connected practice: each principle stands on its own, but the value is in how they reinforce each other.
          </p>
        </div>

        <div className="relative overflow-hidden border border-charcoal/10 bg-[#fcfbf9] p-5 shadow-[0_28px_80px_-62px_rgba(30,37,32,0.35)] md:p-8 lg:min-h-[650px] lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(169,131,90,0.12),transparent_34%),linear-gradient(180deg,rgba(245,243,237,0),rgba(245,243,237,0.76))]" />
          <svg className="pointer-events-none absolute inset-8 hidden h-[calc(100%-4rem)] w-[calc(100%-4rem)] lg:block" viewBox="0 0 900 620" aria-hidden="true">
            {nodePositions.map(([x, y], index) => {
              const centerX = 450;
              const centerY = 310;
              return (
                <g key={index}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={(x / 100) * 900}
                    y2={(y / 100) * 620}
                    stroke="rgba(169,131,90,0.26)"
                    strokeWidth="1.1"
                  />
                  <circle cx={(x / 100) * 900} cy={(y / 100) * 620} r="7" fill="rgba(169,131,90,0.36)" />
                </g>
              );
            })}
            <circle cx="450" cy="310" r="76" fill="rgba(21,26,22,0.05)" stroke="rgba(169,131,90,0.28)" />
          </svg>

          <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_180px_1fr] lg:grid-rows-3 lg:items-center">
            <div className="flex min-h-36 items-center justify-center border border-gold/35 bg-[#151a16] p-7 text-center text-cream md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:min-h-44 lg:rounded-full">
              <span className="font-serif text-3xl leading-tight">
                Why
                <br />
                choose
                <br />
                3Ts?
              </span>
            </div>
            {principles.map((item, index) => (
              <article
                key={item.title}
                className={`min-h-[190px] border border-charcoal/10 bg-cream p-5 shadow-[0_18px_48px_-38px_rgba(30,37,32,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/55 hover:bg-white ${
                  ["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2", "lg:col-start-1 lg:row-start-3", "lg:col-start-3 lg:row-start-3"][index]
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    0{index + 1}
                  </span>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-gold/50 bg-gold/20" />
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-charcoal md:text-[1.65rem]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/72">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionRoomVariant() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full overflow-hidden border-t border-[#151a16] bg-[#111613] px-6 py-24 text-cream md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.72fr_0.9fr] lg:items-end">
          <div>
            <Eyebrow dark />
            <h2 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
              Why choose 3Ts?
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-cream/62">
            A room designed for clarity: each principle has a place, but the work is in the movement between them.
          </p>
        </div>

        <div className="hidden xl:block">
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[700px] overflow-hidden border border-cream/10 bg-[radial-gradient(circle_at_50%_45%,rgba(169,131,90,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" aria-hidden="true">
              {[
                "M270 140 C405 140 450 250 540 310",
                "M930 140 C795 140 750 250 660 310",
                "M270 350 L540 350",
                "M930 350 L660 350",
                "M270 560 C405 560 450 450 540 390",
                "M930 560 C795 560 750 450 660 390",
              ].map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke={index === active ? "rgba(230,183,113,0.95)" : "rgba(169,131,90,0.34)"}
                  strokeWidth={index === active ? 2 : 1}
                  initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0.25 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                />
              ))}
            </svg>

            <div className="relative z-10 grid min-h-[700px] grid-cols-[minmax(250px,0.82fr)_minmax(360px,1.24fr)_minmax(250px,0.82fr)] items-center gap-8 px-10 py-12 xl:gap-12 xl:px-14">
              <div className="space-y-5">
                {[0, 2, 4].map((index) => (
                  <RoomCard key={principles[index].title} index={index} active={active === index} onActivate={() => setActive(index)} />
                ))}
              </div>
              <div className="relative mx-auto flex h-[540px] w-full max-w-[520px] items-center justify-center">
                <div className="absolute inset-x-0 bottom-7 top-7 border border-cream/18 bg-[linear-gradient(135deg,rgba(245,243,237,0.16),rgba(127,159,80,0.12)_44%,rgba(30,37,32,0.18))] shadow-[inset_0_0_70px_rgba(245,243,237,0.035)] [clip-path:polygon(18%_0,82%_0,100%_50%,82%_100%,18%_100%,0_50%)]" />
                <div className="absolute inset-x-14 bottom-28 top-28 border border-gold/22 bg-[#151a16]/54 [clip-path:polygon(10%_0,90%_0,100%_50%,90%_100%,10%_100%,0_50%)]" />
                <div className="relative z-10 flex h-44 w-72 items-center justify-center border border-gold/40 bg-[#151a16]/92 p-8 text-center shadow-[0_30px_90px_-45px_rgba(0,0,0,0.9)]">
                  <p className="font-serif text-4xl leading-tight text-cream">Why Choose 3Ts</p>
                </div>
              </div>
              <div className="space-y-5">
                {[1, 3, 5].map((index) => (
                  <RoomCard key={principles[index].title} index={index} active={active === index} onActivate={() => setActive(index)} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl xl:hidden">
          <div className="border-l border-gold/35 pl-5">
            {principles.map((principle, index) => (
              <button
                key={principle.title}
                type="button"
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className="relative mb-6 block w-full border border-cream/12 bg-[#151a16] p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gold/70"
              >
                <span className="absolute -left-[30px] top-6 h-3 w-3 rounded-full bg-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Principle 0{index + 1}
                </span>
                <span className="mt-2 block font-serif text-2xl">{principle.title}</span>
                <span className="mt-3 block text-sm leading-relaxed text-cream/68">{principle.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomCard({
  index,
  active,
  onActivate,
}: {
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const principle = principles[index];

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`block min-h-[154px] w-full border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
        active
          ? "border-gold/70 bg-cream text-charcoal shadow-[0_22px_60px_-30px_rgba(0,0,0,0.8)]"
          : "border-cream/18 bg-[#151a16]/94 text-cream hover:border-gold/50"
      }`}
    >
      <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${active ? "text-gold" : "text-gold/85"}`}>
        Principle 0{index + 1}
      </span>
      <span className="mt-2 block font-serif text-2xl leading-tight">{principle.title}</span>
      <span className={`mt-3 block text-sm leading-relaxed ${active ? "text-charcoal/72" : "text-cream/76"}`}>
        {principle.text}
      </span>
    </button>
  );
}

export default function WhyChooseVariants({ variant = "mosaic" }: { variant?: WhyVariant }) {
  if (variant === "expanding-panels") return <ExpandingPanelsVariant />;
  if (variant === "decision-room") return <DecisionRoomVariant />;
  if (variant === "constellation") return <ConstellationVariant />;
  if (variant === "bento") return <MosaicVariant compact />;
  return <MosaicVariant />;
}
