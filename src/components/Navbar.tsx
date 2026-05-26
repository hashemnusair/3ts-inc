"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/services", label: "Services" },
  { href: "/perspectives", label: "Perspectives" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const linkContainerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="w-full bg-cream sticky top-0 z-[60] border-b border-charcoal/5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full px-6 md:px-12 py-6 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 z-[70]">
              <Image
                src="/3ts-logo-transparent.png"
                alt="3Ts Consulting Logo"
                width={50}
                height={29}
                className="w-auto h-10 md:h-12 shrink-0 drop-shadow-sm"
                priority
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl tracking-tight text-charcoal">
                  Shareef 3Ts Consulting
                </span>
                <span className="font-sans text-[10px] md:text-xs tracking-widest text-gold mt-1 uppercase">
                  Thoroughly. Thought. Through.
                </span>
              </div>
            </Link>
            <div className="hidden md:block w-px h-10 bg-charcoal/20"></div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest text-charcoal/80 uppercase">
            {links.slice(0, 5).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="w-px h-10 bg-charcoal/20"></div>
            <Link
              href="/contact"
              className="text-sm font-medium tracking-widest text-charcoal/80 uppercase hover:text-gold transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 -mr-2 z-[70] text-charcoal hover:text-gold transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} weight="light" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <List size={28} weight="light" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 h-[100dvh] bg-cream z-40 flex flex-col justify-center px-8 md:hidden overflow-hidden touch-none overscroll-none"
          >
            <motion.nav
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-start space-y-8"
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-4xl text-charcoal hover:text-gold transition-colors inline-block relative group"
                  >
                    {link.label}
                    <div className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              variants={linkVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-12 left-8 border-t border-charcoal/10 pt-8 w-[calc(100%-4rem)]"
            >
              <a
                href="mailto:shareef@3ts-inc.com"
                className="text-gold text-sm tracking-[0.2em] uppercase font-medium"
              >
                shareef@3ts-inc.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
