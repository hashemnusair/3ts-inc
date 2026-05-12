"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#151a16] pt-16 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between border-t border-cream/10 pt-16">
        <div className="mb-12 md:mb-0 max-w-md">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Contributing to a world where collaboration, cooperation, and kindness thrive.
            </span>
            <div className="w-12 h-[2px] bg-gold/60"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Let&apos;s Chat
          </h2>
          <a
            href="mailto:shareef@3ts-inc.com"
            className="text-gold/80 hover:text-gold transition-colors font-sans tracking-widest uppercase text-sm border-b border-gold/30 hover:border-gold pb-1 inline-block mt-4"
          >
            shareef@3ts-inc.com
          </a>
          <p className="text-cream/50 text-xs tracking-widest uppercase mt-6">
            Washington, DC &middot; Sarasota, FL &middot; London, UK &middot; Amman, JO
          </p>
        </div>

        <div className="flex flex-col items-end text-right">
          <Image
            src="/3Ts-latest-logo.png"
            alt="3Ts Consulting Logo"
            width={70}
            height={41}
            className="w-auto h-12 mb-4 opacity-90"
          />
          <div className="font-serif text-3xl text-cream mb-2">
            Shareef 3Ts Consulting
          </div>
          <div className="text-gold text-xs tracking-[0.2em] uppercase mb-6">
            Thoroughly. Thought. Through.
          </div>
          <div className="text-cream/40 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} - Shareef - 3Ts Consulting
          </div>
        </div>
      </div>
    </footer>
  );
}
