"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="w-full bg-[#f8f6f2] py-24 px-6 md:px-16 lg:px-24 border-t border-[#edebe4]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-16 mt-16 lg:mt-0 z-10">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              About 3Ts
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-charcoal">
              3Ts Consulting is a private advisory practice led by Shareef Khatib.
            </p>
            <p className="text-charcoal/70 text-base md:text-lg leading-relaxed">
              20 years of senior international experience across the Gulf, the Levant, Africa, and Asia, including chief-of-party leadership of multi-country governance and reform portfolios up to $161 million.
            </p>
            <p className="text-charcoal/70 text-base md:text-lg leading-relaxed">
              World Bank facilitator and trainer roster member. Georgetown-trained in Leadership Coaching and in Organizational Development &amp; Change Leadership. British and Jordanian; working across the region in English, French, and Arabic.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex items-center"
          >
            <Link href="/about" className="group flex flex-col">
              <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase pb-2">
                More About Shareef Khatib <span className="group-hover:ml-2 transition-all inline-block">&rarr;</span>
              </span>
              <div className="w-full h-px bg-gold/30 group-hover:bg-gold transition-colors"></div>
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] lg:h-[600px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
        >
          <Image
            src="/notebookEtc.png"
            alt="Notebook and pen"
            fill
            className="object-cover"
          />
          {/* Subtle inner border for the "Liquid Glass" feel as per rules, even though it's an image */}
          <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}
