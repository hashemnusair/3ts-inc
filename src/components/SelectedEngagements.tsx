"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cases = [
  {
    number: "01",
    title: "Saudi Arabia \u2014\nVision 2030 Assessment",
    description:
      "Supporting the World Bank GCC Prosperity team in the assessment of Saudi Arabia\u2019s Vision 2030 progress and next steps.\nOngoing.",
  },
  {
    number: "02",
    title: "Portland \u2014\nCommunity Safety Transformation",
    description:
      "Led citywide initiative to realign governance and community engagement around gun violence and safety. 43% reduction in predicted gun violence and 24% mitigation of predicted homicides over three months.",
  },
  {
    number: "03",
    title: "World Bank \u2014\nLeadership Development at Scale",
    description:
      "Delivered leadership training across 18 cohorts of World Bank Team Leaders and Supervisors. Cohorts recorded a 16% improvement in measured leadership scores.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function SelectedEngagements() {
  return (
    <section className="w-full bg-cream py-24 px-6 md:px-16 lg:px-24 border-t border-[#edebe4] relative overflow-hidden">
      {/* Background Stylized Map (Abstract representation) */}
      <div className="absolute right-0 top-0 w-full lg:w-[60%] h-[500px] opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* A highly simplified dotted path to represent the world map feeling without massive inline code */}
          <g fill="#A9835A">
            {Array.from({ length: 400 }).map((_, i) => {
              const x = Math.random() * 1000;
              const y = Math.random() * 500;
              // Roughly mask out oceans
              const inAmerica = x > 100 && x < 350 && y > 100 && y < 400;
              const inEurasia = x > 450 && x < 900 && y > 50 && y < 350;
              const inAfrica = x > 450 && x < 650 && y > 250 && y < 450;
              
              if (inAmerica || inEurasia || inAfrica) {
                // Add some noise to the boundaries
                if (Math.random() > 0.4) {
                  return <circle key={i} cx={x} cy={y} r="2" />;
                }
              }
              return null;
            })}
          </g>
          {/* Highlight Points */}
          <circle cx="580" cy="220" r="6" fill="#1E2520" /> {/* Saudi Arabia */}
          <circle cx="820" cy="320" r="6" fill="#1E2520" /> {/* Malaysia */}
          <circle cx="280" cy="200" r="6" fill="#1E2520" /> {/* Washington DC */}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start space-y-4 mb-8">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
            Selected Engagements
          </span>
          <div className="w-12 h-[2px] bg-gold/60"></div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-charcoal mb-6"
        >
          Most of our work <br className="hidden md:block" />
          is confidential.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold text-xl md:text-2xl font-serif italic mb-20"
        >
          Selected public-safe cases below.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cases.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-[#fcfbf9] border border-charcoal/5 p-10 flex flex-col shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col items-start mb-6">
                <span className="text-gold text-sm font-semibold tracking-[0.2em] mb-2">
                  {item.number}
                </span>
                <div className="w-6 h-px bg-charcoal/20 mb-6"></div>
                <h3 className="font-serif text-2xl text-charcoal leading-snug whitespace-pre-line">
                  {item.title}
                </h3>
              </div>
              <div className="w-full h-px bg-charcoal/10 mb-6"></div>
              <p className="text-charcoal/70 text-sm leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center"
        >
          <Link href="/approach" className="group flex flex-col">
            <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase pb-2">
              More engagements <span className="group-hover:ml-2 transition-all inline-block">&rarr;</span>
            </span>
            <div className="w-full h-px bg-gold/30 group-hover:bg-gold transition-colors"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
