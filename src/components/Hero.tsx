"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type HeroVisualVariant = "notebook" | "decision-field" | "brand-mark";

function HeroVisual({ variant }: { variant: HeroVisualVariant }) {
  if (variant === "brand-mark") {
    return (
      <div className="absolute inset-0 bg-[#151a16]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(169,131,90,0.22),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(245,243,237,0.16),transparent_28%)]"></div>
        <div className="absolute inset-12 border border-cream/10"></div>
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <Image
            src="/3ts-logo-cups.png"
            alt="3Ts Consulting cups logo"
            width={640}
            height={640}
            priority
            className="w-full max-w-[460px] drop-shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src="/notebookEtc.png"
        alt="Notebook and pen beside a city view"
        fill
        priority
        className="object-cover"
      />
      {variant === "decision-field" && (
        <div className="absolute inset-0 bg-[#151a16]/20">
          <div className="absolute inset-8 border border-cream/20"></div>
          <div className="absolute left-[18%] top-[22%] h-px w-[48%] bg-gold/70"></div>
          <div className="absolute left-[18%] top-[22%] h-[38%] w-px bg-gold/70"></div>
          <div className="absolute left-[18%] top-[60%] h-px w-[58%] bg-gold/70"></div>
          <div className="absolute left-[65%] top-[20%] rounded-full border border-gold/70 bg-[#151a16]/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream">
            Clarity
          </div>
          <div className="absolute left-[12%] top-[58%] rounded-full border border-gold/70 bg-[#151a16]/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream">
            Alignment
          </div>
          <div className="absolute left-[72%] top-[58%] rounded-full border border-gold/70 bg-[#151a16]/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream">
            Action
          </div>
        </div>
      )}
    </>
  );
}

export default function Hero({ visualVariant = "notebook" }: { visualVariant?: HeroVisualVariant }) {
  return (
    <section className="relative w-full flex flex-col md:flex-row bg-cream overflow-hidden md:min-h-[calc(100vh-100px)]">
      {/* Left Content */}
      <div className="w-full md:w-[55%] pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-12 pt-20 pb-12 flex flex-col md:justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-start space-y-4 mb-12">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Considered collaboration. Consequential change.
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-charcoal mb-8 max-w-2xl">
            Thoroughly. Thought. Through.
          </h1>

          <p className="text-charcoal/70 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
            A better world starts with intention and is built through better decisions, made by the right people, with honest information, in rooms designed for clarity rather than comfort.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/contact">
              <button className="bg-[#2A372C] text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#1E2520] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg">
                Get Started &rarr;
              </button>
            </Link>
            <a
              href="https://calendly.com/shareef3ts/a-30min-slot-with-shareef"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm tracking-widest uppercase font-medium border border-gold/30 px-6 py-4 hover:bg-gold/10 transition-all"
            >
              Book Now
            </a>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 flex items-start space-x-6 border-t border-charcoal/10 pt-8 max-w-xl"
        >
          <div className="font-serif text-4xl text-gold shrink-0 italic pr-2 border-r border-charcoal/10">
            3<span className="text-3xl ml-0.5">T</span>
          </div>
          <p className="text-sm text-charcoal/60 leading-relaxed font-medium">
            Coaching; Facilitation, Teambuilding &amp; Training; OD &amp; Change Management; Program Design &mdash; grounded in neuroscience, governance, and 20 years of global leadership experience.
          </p>
        </motion.div>
      </div>

      {/* Right Image with Angled Cut */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hidden md:block w-full md:w-[55%] md:absolute md:right-0 md:top-0 md:bottom-0 h-[50vh] md:h-auto z-0"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <HeroVisual variant={visualVariant} />
      </motion.div>
    </section>
  );
}
