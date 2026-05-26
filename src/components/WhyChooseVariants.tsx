"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type Variants } from "framer-motion";

export type WhyVariant =
  | "mosaic"
  | "bento"
  | "principles"
  | "constellation"
  | "decision-room"
  | "alignment-loom"
  | "conditions-engine"
  | "decision-compass"
  | "decision-constellation"
  | "scroll-stack"
  | "facilitation-room-map";

type Principle = {
  title: string;
  text: string;
  room?: string;
  outcome?: string;
};

const principles: Principle[] = [
  {
    title: "Tailored Solutions",
    text: "There is no “one size fits all.” I’ll appreciatively enquire to tailor my engagement to meet your specific needs, challenges and goals.",
  },
  {
    title: "Walking the Talk",
    text: "Together, we’ll model effective teamwork by setting shared goals, clarifying roles, and communicating openly.",
  },
  {
    title: "One Team Mindset",
    text: "We’ll share responsibility for outcomes – successes and setbacks alike – because we will rise or fall together.",
  },
  {
    title: "Inclusive and Accountable",
    text: "We’ll honor diverse perspectives, foster mutual accountability, and create space for every voice to be heard.",
  },
  {
    title: "Creativity with Purpose",
    text: "We’ll embrace fun and creativity as important tools for innovation, connection, and sustainable progress.",
  },
  {
    title: "Serious About Work, Light on Ego",
    text: "We’ll take our mission, our stakeholders and each other – but not ourselves – VERY seriously.",
  },
];

const roomMarkers = principles.map((principle, index) => ({
  ...principle,
  position: [
    "md:left-[8%] md:top-[17%]",
    "md:right-[8%] md:top-[17%]",
    "md:left-[4%] md:top-[47%]",
    "md:right-[4%] md:top-[47%]",
    "md:left-[12%] md:bottom-[14%]",
    "md:right-[12%] md:bottom-[14%]",
  ][index],
}));

const loomInputs = ["Sponsors", "Communities", "Institutions", "Data", "Resistance", "Power"];
const loomOutputs = principles.slice(2, 6).map((principle) => principle.title);

const engineConditions = principles.slice(0, 5).map((principle) => principle.title);
const engineSteps = principles;
const engineOutcomes = principles.slice(1, 6).map((principle) => principle.title);

const compassPoints = principles.map((principle, index) => ({
  ...principle,
  angle: [-90, -30, 30, 90, 150, 210][index],
}));

function nearestBearing(current: number, target: number) {
  const delta = ((((target - current) % 360) + 540) % 360) - 180;
  return current + delta;
}

const constellationNodes = principles.map((principle, index) => ({
  ...principle,
  x: [18, 48, 78, 76, 44, 16][index],
  y: [24, 12, 28, 68, 82, 62][index],
}));

const roomStations = principles.map((principle, index) => ({
  ...principle,
  x: [22, 50, 78, 80, 50, 20][index],
  y: [23, 14, 25, 72, 84, 70][index],
  label: ["Discovery", "Practice", "Ownership", "Inclusion", "Creation", "Humility"][index],
}));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function SectionHeader() {
  return (
    <div className="w-full lg:w-1/3 pr-0 lg:pr-12 mb-16 lg:mb-0">
      <div className="flex flex-col items-start space-y-4 mb-8">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
          Why Choose 3Ts
        </span>
        <div className="w-12 h-[2px] bg-gold/60"></div>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-charcoal"
      >
        Why choose 3Ts?
      </motion.h2>
    </div>
  );
}

function ImmersiveHeader({
  title,
  text,
  dark = false,
}: {
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-7xl mx-auto mb-14 md:mb-20">
      <div className="flex flex-col items-start space-y-4 mb-8">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
          Why Choose 3Ts
        </span>
        <div className="w-12 h-[2px] bg-gold/60"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_0.7fr] gap-8 lg:gap-20 items-end">
        <h2
          className={`font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight ${
            dark ? "text-cream" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
        {text ? (
          <p className={`text-lg md:text-xl leading-relaxed ${dark ? "text-cream/68" : "text-charcoal/68"}`}>
            {text}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MosaicVariant() {
  return (
    <section className="w-full border-t border-[#edebe4] bg-[#f8f6f2] px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-18">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Why Choose 3Ts
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_0.7fr] gap-8 lg:gap-20 items-end">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-charcoal">
              Why choose 3Ts?
            </h2>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(210px,auto)] gap-4"
        >
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className={`group relative overflow-hidden border border-charcoal/10 bg-[#fcfbf9] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.3)] ${
                index === 0 || index === 5 ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <div className="absolute right-5 top-4 font-serif text-7xl text-gold/10 transition-all duration-300 group-hover:text-gold/20">
                0{index + 1}
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <h3 className="max-w-[11ch] font-serif text-3xl md:text-4xl leading-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm md:text-base leading-relaxed text-charcoal/68">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoVariant() {
  const bentoClasses = [
    "md:col-span-4 md:row-span-2 bg-[#151a16] text-cream border-[#151a16]",
    "md:col-span-2 bg-[#fcfbf9] text-charcoal border-charcoal/10",
    "md:col-span-2 bg-[#efe9df] text-charcoal border-gold/20",
    "md:col-span-3 bg-[#fcfbf9] text-charcoal border-charcoal/10",
    "md:col-span-3 bg-[#e9eee2] text-charcoal border-[#7f9f50]/20",
    "md:col-span-6 bg-[#fcfbf9] text-charcoal border-charcoal/10",
  ];

  return (
    <section className="w-full border-t border-[#edebe4] bg-cream px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-18">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Why Choose 3Ts
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_0.65fr] gap-8 lg:gap-20 items-end">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-charcoal">
              Why choose 3Ts?
            </h2>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4"
        >
          {principles.map((card, index) => {
            const dark = index === 0;
            return (
            <motion.article
              key={card.title}
              variants={itemVariants}
              className={`group relative overflow-hidden border p-7 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-45px_rgba(0,0,0,0.35)] ${bentoClasses[index]}`}
            >
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 max-w-[13ch] font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {card.title}
                  </h3>
                </div>
                <p className={`max-w-2xl text-sm md:text-base leading-relaxed ${dark ? "text-cream/68" : "text-charcoal/68"}`}>
                  {card.text}
                </p>
              </div>
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full border ${dark ? "border-cream/10" : "border-gold/15"}`}></div>
            </motion.article>
          );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PrinciplesVariant() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full lg:w-2/3 border-y border-charcoal/10"
    >
      {principles.map((item, index) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-[120px_1fr_24px] gap-5 border-b border-charcoal/10 py-7 last:border-b-0"
        >
          <div className="pr-4 md:border-r md:border-charcoal/10">
            <span className="font-serif text-3xl text-gold">
              0{index + 1}
            </span>
          </div>
          <div>
            <h3 className="mt-2 font-serif text-2xl text-charcoal">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{item.text}</p>
          </div>
          <div className="hidden items-center justify-end text-gold/60 md:flex">
            &rarr;
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ConstellationVariant() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full lg:w-2/3"
    >
      <div className="relative min-h-[640px] overflow-hidden border border-charcoal/10 bg-[#fcfbf9] p-6 md:p-10">
        <div className="absolute inset-10 hidden md:block">
          <div className="absolute left-[50%] top-[50%] h-px w-[42%] -translate-y-1/2 bg-gold/20"></div>
          <div className="absolute right-[50%] top-[50%] h-px w-[42%] -translate-y-1/2 bg-gold/20"></div>
          <div className="absolute left-[50%] top-[18%] h-[64%] w-px bg-gold/20"></div>
          <div className="absolute left-[24%] top-[28%] h-px w-[52%] rotate-[25deg] bg-gold/20"></div>
          <div className="absolute left-[24%] bottom-[28%] h-px w-[52%] -rotate-[25deg] bg-gold/20"></div>
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/35 bg-[#151a16] text-cream shadow-[0_24px_70px_-35px_rgba(0,0,0,0.7)] md:flex md:items-center md:justify-center md:p-8 md:text-center">
          <span className="font-serif text-2xl leading-tight">Why choose 3Ts?</span>
        </div>

        <div className="relative z-20 grid grid-cols-1 gap-4 md:block">
          {principles.map((item, index) => {
            const positions = [
              "md:absolute md:left-[3%] md:top-[8%]",
              "md:absolute md:right-[2%] md:top-[10%]",
              "md:absolute md:left-[0%] md:top-[43%]",
              "md:absolute md:right-[0%] md:top-[42%]",
              "md:absolute md:left-[8%] md:bottom-[6%]",
              "md:absolute md:right-[8%] md:bottom-[7%]",
            ];
            return (
              <article
                key={item.title}
                className={`${positions[index]} group min-h-[150px] border border-charcoal/10 bg-cream/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white md:w-[230px]`}
              >
                <span className="text-gold text-xs font-semibold tracking-[0.18em] uppercase">
                  0{index + 1}
                </span>
                <h3 className="mt-2 font-serif text-xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function RoomMarkerButton({
  active,
  index,
  marker,
  onActivate,
  shouldReduceMotion,
}: {
  active: boolean;
  index: number;
  marker: Principle;
  onActivate: () => void;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`block min-h-[158px] w-full border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
        active
          ? "border-gold/70 bg-cream text-charcoal shadow-[0_22px_60px_-30px_rgba(0,0,0,0.8)]"
          : "border-cream/18 bg-[#151a16]/94 text-cream hover:border-gold/50"
      }`}
    >
      <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${active ? "text-gold" : "text-gold/85"}`}>
        0{index + 1}
      </span>
      <span className="mt-2 block font-serif text-2xl leading-tight">{marker.title}</span>
      <span className={`mt-3 block text-sm leading-relaxed ${active ? "text-charcoal/72" : "text-cream/76"}`}>
        {marker.text}
      </span>
    </motion.button>
  );
}

function DecisionRoomVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const leftMarkers = [roomMarkers[0], roomMarkers[2], roomMarkers[4]];
  const rightMarkers = [roomMarkers[1], roomMarkers[3], roomMarkers[5]];
  const cardByColumn = [
    { markers: leftMarkers, side: "left" },
    { markers: rightMarkers, side: "right" },
  ];

  return (
    <section className="w-full overflow-hidden border-t border-[#151a16] bg-[#111613] px-6 py-24 text-cream md:px-16 lg:px-24">
      <ImmersiveHeader
        dark
        title="Why choose 3Ts?"
      />

      <div className="mx-auto hidden max-w-7xl xl:block">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-[720px] overflow-hidden border border-cream/10 bg-[radial-gradient(circle_at_50%_45%,rgba(169,131,90,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 720" aria-hidden="true">
            {[
              ["M270 142 C405 142 450 258 540 312"],
              ["M930 142 C795 142 750 258 660 312"],
              ["M270 360 L540 360"],
              ["M930 360 L660 360"],
              ["M270 578 C405 578 450 462 540 408"],
              ["M930 578 C795 578 750 462 660 408"],
            ].map(([d], index) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke={index === active ? "rgba(230,183,113,0.95)" : "rgba(169,131,90,0.34)"}
                strokeWidth={index === active ? 2 : 1}
                initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.25 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              />
            ))}
          </svg>

          <div className="relative z-10 grid min-h-[720px] grid-cols-[minmax(250px,0.82fr)_minmax(360px,1.24fr)_minmax(250px,0.82fr)] items-center gap-8 px-10 py-12 xl:gap-12 xl:px-14">
            <div className="space-y-5">
              {cardByColumn[0].markers.map((marker) => {
                const index = roomMarkers.findIndex((item) => item.title === marker.title);
                return (
                  <RoomMarkerButton
                    key={marker.title}
                    active={active === index}
                    index={index}
                    marker={marker}
                    onActivate={() => setActive(index)}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                );
              })}
            </div>

            <div className="relative mx-auto flex h-[560px] w-full max-w-[520px] items-center justify-center">
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-x-0 top-7 bottom-7 border border-cream/18 bg-[linear-gradient(135deg,rgba(245,243,237,0.16),rgba(127,159,80,0.12)_44%,rgba(30,37,32,0.18))] shadow-[inset_0_0_70px_rgba(245,243,237,0.035)] [clip-path:polygon(18%_0,82%_0,100%_50%,82%_100%,18%_100%,0_50%)]"
              />
              <div className="absolute inset-x-14 top-28 bottom-28 border border-gold/22 bg-[#151a16]/54 [clip-path:polygon(10%_0,90%_0,100%_50%,90%_100%,10%_100%,0_50%)]" />
              <div className="relative z-10 flex h-44 w-72 items-center justify-center border border-gold/40 bg-[#151a16]/92 p-8 text-center shadow-[0_30px_90px_-45px_rgba(0,0,0,0.9)]">
                <p className="font-serif text-4xl leading-tight text-cream">
                  Why Choose 3T&apos;s
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {cardByColumn[1].markers.map((marker) => {
                const index = roomMarkers.findIndex((item) => item.title === marker.title);
                return (
                  <RoomMarkerButton
                    key={marker.title}
                    active={active === index}
                    index={index}
                    marker={marker}
                    onActivate={() => setActive(index)}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl xl:hidden">
        <div className="border-l border-gold/35 pl-5">
          {roomMarkers.map((marker, index) => (
            <button
              key={marker.title}
              type="button"
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="relative mb-6 block w-full border border-cream/12 bg-[#151a16] p-5 text-left focus:outline-none focus:ring-2 focus:ring-gold/70"
            >
              <span className="absolute -left-[30px] top-6 h-3 w-3 rounded-full bg-gold"></span>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">
                Agenda 0{index + 1}
              </span>
              <span className="mt-2 block font-serif text-2xl">{marker.title}</span>
              <span className="mt-3 block text-sm leading-relaxed text-cream/68">{marker.text}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlignmentLoomVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const threadColors = ["#7f9f50", "#c09a55", "#af5536", "#d2b37a", "#5d7463", "#9a7b55"];

  return (
    <section className="w-full overflow-hidden border-t border-[#edebe4] bg-[#f8f6f2] px-6 py-24 md:px-16 lg:px-24">
      <ImmersiveHeader
        title="Why choose 3Ts?"
      />

      <div className="mx-auto hidden max-w-7xl grid-cols-[0.7fr_1.45fr_0.7fr] gap-8 lg:grid">
        <div className="space-y-5 pt-10">
          {loomInputs.map((input, index) => (
            <motion.div
              key={input}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="border border-charcoal/10 bg-cream px-5 py-4 font-serif text-2xl text-charcoal shadow-[0_16px_45px_-35px_rgba(0,0,0,0.25)]"
            >
              {input}
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-[640px] border border-charcoal/10 bg-[#fcfbf9] p-8">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 640" aria-hidden="true">
            {principles.map((principle, index) => {
              const y = 92 + index * 82;
              const d = `M 20 ${y} C 180 ${y - 70}, 250 ${y + 70}, 380 ${y} S 585 ${y - 55}, 740 ${y + 10}`;
              return (
                <motion.path
                  key={principle.title}
                  d={d}
                  fill="none"
                  stroke={threadColors[index]}
                  strokeWidth={active === index ? 5 : 2.5}
                  strokeOpacity={active === index ? 0.95 : 0.35}
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: index * 0.09, ease: "easeInOut" }}
                />
              );
            })}
            <motion.rect
              x="314"
              y="76"
              width="132"
              height="472"
              fill="rgba(21,26,22,0.04)"
              stroke="rgba(169,131,90,0.28)"
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            />
            {Array.from({ length: 8 }, (_, index) => (
              <line
                key={index}
                x1={322 + index * 16}
                x2={322 + index * 16}
                y1="76"
                y2="548"
                stroke="rgba(30,37,32,0.14)"
              />
            ))}
          </svg>

          <div className="relative z-10 grid h-full grid-cols-2 gap-4 content-between">
            {principles.map((principle, index) => (
              <button
                key={principle.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`min-h-[145px] border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                  active === index
                    ? "border-gold/70 bg-cream shadow-[0_24px_60px_-35px_rgba(0,0,0,0.32)]"
                    : "border-charcoal/10 bg-cream/72 hover:border-gold/45"
                }`}
              >
                <span className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">Thread 0{index + 1}</span>
                <span className="mt-2 block font-serif text-2xl text-charcoal">{principle.title}</span>
                <span className="mt-3 block text-sm leading-relaxed text-charcoal/64">{principle.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-24">
          {loomOutputs.map((output, index) => (
            <motion.div
              key={output}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className="border-l-2 border-gold bg-cream px-5 py-5 font-serif text-2xl text-charcoal"
            >
              {output}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 lg:hidden">
        {principles.map((principle, index) => (
          <button
            key={principle.title}
            type="button"
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="block w-full border border-charcoal/10 bg-[#fcfbf9] p-5 text-left focus:outline-none focus:ring-2 focus:ring-gold/70"
          >
            <span className="mb-4 block h-1 w-full" style={{ backgroundColor: threadColors[index] }}></span>
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">Thread 0{index + 1}</span>
            <span className="mt-2 block font-serif text-2xl text-charcoal">{principle.title}</span>
            <span className="mt-3 block text-sm leading-relaxed text-charcoal/64">{principle.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ConditionsEngineVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full overflow-hidden border-t border-[#151a16] bg-[#101511] px-6 py-24 text-cream md:px-16 lg:px-24">
      <ImmersiveHeader
        dark
        title="Why choose 3Ts?"
      />

      <div className="mx-auto max-w-7xl">
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[0.88fr_0.9fr_0.88fr]">
          <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 620" aria-hidden="true">
            {engineConditions.map((_, index) => {
              const y = 86 + index * 106;
              const outY = 86 + index * 106;
              return (
                <g key={index}>
                  <motion.path
                    d={`M 315 ${y} C 420 ${y}, 420 ${310}, 505 ${310}`}
                    fill="none"
                    stroke="rgba(169,131,90,0.35)"
                    strokeWidth="1.5"
                    initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.25 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                  />
                  <motion.path
                    d={`M 695 ${310} C 785 ${310}, 790 ${outY}, 890 ${outY}`}
                    fill="none"
                    stroke="rgba(169,131,90,0.35)"
                    strokeWidth="1.5"
                    initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.25 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.35 + index * 0.08 }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="relative z-10 space-y-4">
            <span className="block text-gold text-xs font-semibold uppercase tracking-[0.2em]">Conditions</span>
            {engineConditions.map((condition, index) => (
              <motion.div
                key={condition}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={shouldReduceMotion ? undefined : { opacity: [0.82, 1, 0.82] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.22 }}
                className="border border-cream/12 bg-[#151a16] px-5 py-5 font-serif text-2xl text-cream"
              >
                {condition}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 border border-gold/30 bg-[#182018] p-5 shadow-[0_35px_90px_-55px_rgba(0,0,0,0.9)]">
            <span className="block text-gold text-xs font-semibold uppercase tracking-[0.2em]">3Ts method</span>
            <div className="mt-5 space-y-3">
              {engineSteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`block w-full border px-5 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                    active === index
                      ? "border-gold/75 bg-cream text-charcoal"
                      : "border-cream/12 bg-[#101511] text-cream hover:border-gold/45"
                  }`}
                >
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${active === index ? "text-gold" : "text-gold/85"}`}>
                    Step 0{index + 1}
                  </span>
                  <span className="mt-1 block font-serif text-3xl">{step.title}</span>
                  <span className={`mt-3 block text-sm leading-relaxed ${active === index ? "text-charcoal/68" : "text-cream/60"}`}>
                    {step.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <span className="block text-gold text-xs font-semibold uppercase tracking-[0.2em]">Outcomes</span>
            {engineOutcomes.map((outcome, index) => (
              <motion.div
                key={outcome}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 + index * 0.12 }}
                className={`border px-5 py-5 font-serif text-2xl transition-colors duration-300 ${
                  index <= active
                    ? "border-gold/50 bg-cream text-charcoal"
                    : "border-cream/12 bg-[#151a16] text-cream/64"
                }`}
              >
                {outcome}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionCompassVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activePoint = compassPoints[active];
  const needleRotation = useMotionValue(compassPoints[0].angle);

  useEffect(() => {
    const targetBearing = nearestBearing(needleRotation.get(), activePoint.angle);

    if (shouldReduceMotion) {
      needleRotation.set(targetBearing);
      return;
    }

    const travel = targetBearing - needleRotation.get();
    const controls = animate(needleRotation, targetBearing, {
      type: "spring",
      stiffness: 520,
      damping: 9,
      mass: 0.52,
      restDelta: 0.04,
      restSpeed: 0.08,
      velocity: travel * 12,
    });

    return () => controls.stop();
  }, [activePoint.angle, needleRotation, shouldReduceMotion]);

  return (
    <section className="w-full overflow-hidden border-t border-[#edebe4] bg-cream px-6 py-24 md:px-16 lg:px-24">
      <ImmersiveHeader
        title="Why choose 3Ts?"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.72fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[720px]">
          <div className="absolute inset-[4%] rounded-full border border-charcoal/8 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),rgba(245,243,237,0.2)_34%,rgba(169,131,90,0.08)_70%,transparent_71%)] shadow-[inset_0_0_70px_rgba(169,131,90,0.1)]"></div>
          <div className="absolute inset-[10%] rounded-full border border-charcoal/10"></div>
          <div className="absolute inset-[17%] rounded-full border border-gold/28"></div>
          <div className="absolute inset-[28%] rounded-full border border-charcoal/10"></div>

          <svg className="absolute inset-[5%] h-[90%] w-[90%]" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <radialGradient id="compassFaceGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
                <stop offset="46%" stopColor="#f5f3ed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#a9835a" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="285" fill="url(#compassFaceGlow)" />
            <circle cx="300" cy="300" r="252" fill="none" stroke="rgba(30,37,32,0.1)" />
            <circle cx="300" cy="300" r="186" fill="none" stroke="rgba(169,131,90,0.18)" />
            {Array.from({ length: 72 }, (_, index) => {
              const isCardinal = index % 18 === 0;
              const isMajor = index % 6 === 0;
              return (
                <line
                  key={index}
                  x1={300 + (isCardinal ? 222 : isMajor ? 235 : 246)}
                  x2={300 + 268}
                  y1="300"
                  y2="300"
                  stroke={isCardinal ? "rgba(30,37,32,0.46)" : isMajor ? "rgba(169,131,90,0.42)" : "rgba(30,37,32,0.18)"}
                  strokeWidth={isCardinal ? 2 : 1}
                  strokeLinecap="round"
                  transform={`rotate(${index * 5} 300 300)`}
                />
              );
            })}
            {["N", "E", "S", "W"].map((label, index) => (
              <text
                key={label}
                x={300 + 230 * Math.cos(([-90, 0, 90, 180][index] * Math.PI) / 180)}
                y={306 + 230 * Math.sin(([-90, 0, 90, 180][index] * Math.PI) / 180)}
                textAnchor="middle"
                className="fill-charcoal/45 text-[18px] font-semibold tracking-[0.18em]"
              >
                {label}
              </text>
            ))}
          </svg>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[76%]" style={{ transform: "translate(-50%, -50%)" }}>
            <motion.div
              className="relative h-24"
              style={{ rotate: needleRotation }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scaleX: [1, 1.025, 0.992, 1.008, 1],
                      filter: [
                        "drop-shadow(0 0 8px rgba(169,131,90,0.18))",
                        "drop-shadow(0 0 26px rgba(169,131,90,0.42))",
                        "drop-shadow(0 0 12px rgba(169,131,90,0.3))",
                        "drop-shadow(0 0 18px rgba(169,131,90,0.34))",
                        "drop-shadow(0 0 10px rgba(169,131,90,0.24))",
                      ],
                    }
              }
              transition={{ duration: 0.7, times: [0, 0.16, 0.38, 0.62, 1], ease: "easeOut" }}
            >
              <div className="absolute left-1/2 top-1/2 h-[5px] w-[48%] origin-left -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_rgba(169,131,90,0.48)]"></div>
              <div className="absolute left-[calc(50%_+_47%)] top-1/2 h-14 w-24 -translate-y-1/2 bg-gold shadow-[0_18px_36px_-22px_rgba(0,0,0,0.7)] [clip-path:polygon(0_50%,100%_0,78%_50%,100%_100%)]"></div>
              <div className="absolute right-1/2 top-1/2 h-[4px] w-[31%] origin-right -translate-y-1/2 rounded-full bg-charcoal/48"></div>
              <div className="absolute right-[calc(50%_+_29%)] top-1/2 h-5 w-10 -translate-y-1/2 rounded-full border border-charcoal/30 bg-[#313832]/38"></div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-[#151a16] p-6 text-center text-cream shadow-[0_30px_80px_-45px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <span className="relative z-10 font-serif text-2xl leading-tight">Why choose 3Ts?</span>
          </div>

          {compassPoints.map((point, index) => {
            const radius = 39;
            const x = 50 + radius * Math.cos((point.angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((point.angle * Math.PI) / 180);
            return (
              <button
                key={point.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`absolute z-40 -translate-x-1/2 -translate-y-1/2 border px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 md:text-sm ${
                  active === index
                    ? "border-gold bg-[#151a16] text-cream shadow-[0_22px_55px_-34px_rgba(0,0,0,0.9)]"
                    : "border-charcoal/10 bg-[#fcfbf9]/92 text-charcoal shadow-[0_14px_36px_-34px_rgba(0,0,0,0.45)] hover:border-gold/50 hover:bg-white"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {active === index && !shouldReduceMotion ? (
                  <motion.span
                    className="absolute inset-[-7px] -z-10 border border-gold/42"
                    initial={{ opacity: 0.85, scale: 0.86 }}
                    animate={{ opacity: 0, scale: 1.18 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                  />
                ) : null}
                {point.title}
              </button>
            );
          })}
        </div>

        <motion.aside
          key={activePoint.title}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="border-l border-gold/40 bg-[#fcfbf9]/72 px-7 py-8 shadow-[0_24px_80px_-62px_rgba(30,37,32,0.35)] md:px-9 md:py-10"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Current bearing
          </span>
          <h3 className="mt-5 max-w-[11ch] font-serif text-4xl leading-[1.08] text-charcoal md:text-5xl">
            {activePoint.title}
          </h3>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-charcoal/66">
            {activePoint.text}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

function DecisionConstellationVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeNode = constellationNodes[active];

  return (
    <section className="w-full overflow-hidden border-t border-[#edebe4] bg-[#101511] px-6 py-24 text-cream md:px-16 lg:px-24">
      <ImmersiveHeader
        dark
        title="Why choose 3Ts?"
        text="A premium constellation of the conditions that make difficult collaboration productive."
      />

      <div className="mx-auto hidden max-w-7xl grid-cols-[1.08fr_0.56fr] gap-8 lg:grid">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative min-h-[680px] overflow-hidden border border-cream/10 bg-[radial-gradient(circle_at_50%_46%,rgba(169,131,90,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_52%)]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 680" aria-hidden="true">
            <defs>
              <radialGradient id="constellationCenter">
                <stop offset="0%" stopColor="#e0b477" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a9835a" stopOpacity="0.08" />
              </radialGradient>
            </defs>
            {constellationNodes.map((node, index) => {
              const x = node.x * 10;
              const y = node.y * 6.8;
              const next = constellationNodes[(index + 1) % constellationNodes.length];
              const nextX = next.x * 10;
              const nextY = next.y * 6.8;
              return (
                <g key={node.title}>
                  <motion.path
                    d={`M ${x} ${y} L 500 340`}
                    fill="none"
                    stroke={active === index ? "rgba(230,183,113,0.95)" : "rgba(169,131,90,0.28)"}
                    strokeWidth={active === index ? 2.1 : 1}
                    initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.35 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: index * 0.08 }}
                  />
                  <motion.path
                    d={`M ${x} ${y} L ${nextX} ${nextY}`}
                    fill="none"
                    stroke={active === index ? "rgba(230,183,113,0.42)" : "rgba(245,243,237,0.08)"}
                    strokeWidth="1"
                    initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.25 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.25 + index * 0.08 }}
                  />
                </g>
              );
            })}
            <motion.circle
              cx="500"
              cy="340"
              r="120"
              fill="url(#constellationCenter)"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 bg-[#151a16]/92 p-8 text-center shadow-[0_32px_90px_-45px_rgba(0,0,0,0.92)]">
            <div>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.22em]">Center</span>
              <p className="mt-4 font-serif text-3xl leading-tight">Decisions that hold</p>
            </div>
          </div>

          {constellationNodes.map((node, index) => (
            <motion.button
              key={node.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.82 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.07 }}
              className={`absolute z-20 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border p-4 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                active === index
                  ? "border-gold bg-cream text-charcoal shadow-[0_24px_70px_-32px_rgba(0,0,0,0.82)]"
                  : "border-cream/14 bg-[#151a16]/86 text-cream hover:border-gold/55"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${active === index ? "text-gold" : "text-gold/85"}`}>
                0{index + 1}
              </span>
              <span className="mt-2 block font-serif text-lg leading-tight">{node.title}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.aside
          key={activeNode.title}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="self-stretch border border-cream/10 bg-[#151a16] p-8 shadow-[0_32px_85px_-58px_rgba(0,0,0,0.9)]"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Active condition
          </span>
          <h3 className="mt-8 font-serif text-5xl leading-tight text-cream">{activeNode.title}</h3>
          <p className="mt-6 text-lg leading-relaxed text-cream/68">{activeNode.text}</p>
          <div className="mt-12 border-t border-cream/10 pt-8">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cream/38">
              Connected to
            </span>
            <p className="mt-3 font-serif text-3xl text-gold">decisions that hold</p>
          </div>
        </motion.aside>
      </div>

      <div className="mx-auto max-w-3xl lg:hidden">
        <div className="mb-8 rounded-full border border-gold/35 bg-[#151a16] px-6 py-5 text-center font-serif text-2xl">
          Decisions that hold
        </div>
        <div className="border-l border-gold/35 pl-5">
          {constellationNodes.map((node, index) => (
            <button
              key={node.title}
              type="button"
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="relative mb-5 block w-full border border-cream/12 bg-[#151a16] p-5 text-left focus:outline-none focus:ring-2 focus:ring-gold/70"
            >
              <span className="absolute -left-[29px] top-6 h-3 w-3 rounded-full border border-gold bg-[#101511]"></span>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">
                Node 0{index + 1}
              </span>
              <span className="mt-2 block font-serif text-2xl">{node.title}</span>
              <span className="mt-3 block text-sm leading-relaxed text-cream/68">{node.text}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollStackVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full overflow-hidden border-t border-[#edebe4] bg-[#f8f6f2] px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.58fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:min-h-[560px]">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Why Choose 3Ts
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-charcoal">
            Why choose 3Ts?
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-charcoal/62">
            Six working commitments, revealed as the engagement moves from first question to shared ownership.
          </p>

          <div className="mt-12 hidden max-w-sm lg:block">
            <div className="relative ml-5 border-l border-charcoal/12 py-1">
              <motion.span
                className="absolute -left-px top-0 w-px bg-gold"
                animate={{ height: `${((active + 1) / principles.length) * 100}%` }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              />
              {principles.map((principle, index) => (
                <button
                  key={principle.title}
                  type="button"
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="group relative mb-5 block w-full pl-8 text-left last:mb-0 focus:outline-none"
                >
                  <span
                    className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full border transition-colors duration-300 ${
                      active === index ? "border-gold bg-gold" : "border-charcoal/20 bg-[#f8f6f2] group-focus:border-gold"
                    }`}
                  />
                  <span className={`block text-xs font-semibold uppercase tracking-[0.18em] ${active === index ? "text-gold" : "text-charcoal/38"}`}>
                    0{index + 1}
                  </span>
                  <span className={`mt-1 block font-serif text-xl leading-tight transition-colors duration-300 ${active === index ? "text-charcoal" : "text-charcoal/44"}`}>
                    {principle.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-10">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              tabIndex={0}
              onFocus={() => setActive(index)}
              onViewportEnter={() => setActive(index)}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-38% 0px -38% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`group relative min-h-[260px] overflow-hidden border p-7 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/60 md:p-10 lg:min-h-[360px] ${
                active === index
                  ? "border-gold/50 bg-[#fcfbf9] shadow-[0_30px_85px_-58px_rgba(0,0,0,0.34)]"
                  : "border-charcoal/10 bg-cream"
              }`}
            >
              <div className="absolute right-6 top-4 font-serif text-8xl leading-none text-gold/10 transition-colors duration-300 group-focus:text-gold/18 lg:text-9xl">
                0{index + 1}
              </div>
              <div className="relative z-10 flex min-h-[210px] flex-col justify-between gap-12 lg:min-h-[280px]">
                <div>
                  <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
                    Commitment 0{index + 1}
                  </span>
                  <h3 className="mt-5 max-w-[13ch] font-serif text-4xl leading-tight text-charcoal md:text-5xl">
                    {principle.title}
                  </h3>
                </div>
                <p className="max-w-2xl text-lg leading-relaxed text-charcoal/66">{principle.text}</p>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gold"
                animate={{ width: active === index ? "100%" : "0%" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitationRoomMapVariant() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeStation = roomStations[active];

  return (
    <section className="w-full overflow-hidden border-t border-[#edebe4] bg-[#efe9df] px-6 py-24 md:px-16 lg:px-24">
      <ImmersiveHeader
        title="Why choose 3Ts?"
        text="The value is not the room itself. It is what the room becomes able to decide."
      />

      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_0.62fr] gap-8 lg:grid">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative min-h-[680px] overflow-hidden border border-charcoal/10 bg-[#f8f6f2]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 680" aria-hidden="true">
            <motion.rect
              x="86"
              y="70"
              width="828"
              height="540"
              rx="18"
              fill="none"
              stroke="rgba(30,37,32,0.18)"
              strokeWidth="2"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <motion.path
              d="M 352 258 C 352 210, 648 210, 648 258 L 648 426 C 648 474, 352 474, 352 426 Z"
              fill="rgba(21,26,22,0.05)"
              stroke="rgba(169,131,90,0.36)"
              strokeWidth="2"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.08, ease: "easeOut" }}
            />
            <motion.path
              d="M 410 340 L 590 340 M 500 250 L 500 430"
              stroke="rgba(169,131,90,0.22)"
              strokeWidth="1.5"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            />
            {roomStations.map((station, index) => (
              <motion.path
                key={station.title}
                d={`M ${station.x * 10} ${station.y * 6.8} L 500 340`}
                fill="none"
                stroke={active === index ? "rgba(169,131,90,0.9)" : "rgba(30,37,32,0.12)"}
                strokeWidth={active === index ? 2 : 1}
                strokeDasharray={active === index ? "0" : "4 8"}
                initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0.25 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.07 }}
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-gold/35 bg-[#151a16] p-7 text-center text-cream shadow-[0_30px_85px_-48px_rgba(0,0,0,0.72)]">
            <div>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
                Shared center
              </span>
              <p className="mt-3 font-serif text-3xl leading-tight">Shared work. Clearer outcomes.</p>
            </div>
          </div>

          {roomStations.map((station, index) => (
            <motion.button
              key={station.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.07 }}
              className={`absolute z-20 w-44 -translate-x-1/2 -translate-y-1/2 border px-5 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                active === index
                  ? "border-gold/70 bg-[#151a16] text-cream shadow-[0_24px_60px_-36px_rgba(0,0,0,0.55)]"
                  : "border-charcoal/10 bg-[#fcfbf9]/94 text-charcoal hover:border-gold/50"
              }`}
              style={{ left: `${station.x}%`, top: `${station.y}%` }}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${active === index ? "text-gold" : "text-gold"}`}>
                {station.label}
              </span>
              <span className="mt-2 block font-serif text-xl leading-tight">{station.title}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.aside
          key={activeStation.title}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="self-stretch border border-charcoal/10 bg-[#fcfbf9] p-8 shadow-[0_30px_85px_-58px_rgba(0,0,0,0.28)]"
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Room station 0{active + 1}
          </span>
          <h3 className="mt-8 font-serif text-5xl leading-tight text-charcoal">{activeStation.title}</h3>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/68">{activeStation.text}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/42">
                Room role
              </span>
              <p className="mt-2 font-serif text-2xl text-charcoal">{activeStation.label}</p>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/42">
                Produces
              </span>
              <p className="mt-2 font-serif text-2xl text-charcoal">clearer outcomes</p>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="mx-auto max-w-3xl lg:hidden">
        <div className="mb-8 border border-charcoal/10 bg-[#fcfbf9] p-6 text-center">
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Shared center
          </span>
          <p className="mt-3 font-serif text-3xl leading-tight text-charcoal">
            Shared work. Clearer outcomes.
          </p>
        </div>
        <div className="space-y-4">
          {roomStations.map((station, index) => (
            <button
              key={station.title}
              type="button"
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="grid w-full grid-cols-[64px_1fr] gap-5 border border-charcoal/10 bg-[#fcfbf9] p-5 text-left focus:outline-none focus:ring-2 focus:ring-gold/70"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/45 font-serif text-2xl text-gold">
                0{index + 1}
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {station.label}
                </span>
                <span className="mt-2 block font-serif text-2xl leading-tight text-charcoal">
                  {station.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-charcoal/66">
                  {station.text}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassicVariant({ variant }: { variant: "principles" | "constellation" }) {
  return (
    <div className="w-full py-24 px-6 md:px-16 lg:px-24 border-t border-[#edebe4]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <SectionHeader />
        {variant === "principles" ? (
          <PrinciplesVariant />
        ) : (
          <ConstellationVariant />
        )}
      </div>
    </div>
  );
}

export default function WhyChooseVariants({ variant = "mosaic" }: { variant?: WhyVariant }) {
  if (variant === "decision-room") {
    return <DecisionRoomVariant />;
  }

  if (variant === "alignment-loom") {
    return <AlignmentLoomVariant />;
  }

  if (variant === "conditions-engine") {
    return <ConditionsEngineVariant />;
  }

  if (variant === "decision-compass") {
    return <DecisionCompassVariant />;
  }

  if (variant === "decision-constellation") {
    return <DecisionConstellationVariant />;
  }

  if (variant === "scroll-stack") {
    return <ScrollStackVariant />;
  }

  if (variant === "facilitation-room-map") {
    return <FacilitationRoomMapVariant />;
  }

  if (variant === "bento") {
    return <BentoVariant />;
  }

  if (variant === "mosaic") {
    return <MosaicVariant />;
  }

  return <ClassicVariant variant={variant} />;
}
