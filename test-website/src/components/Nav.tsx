"use client";

import { motion } from "motion/react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-3 backdrop-blur-md"
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]"
          />
          Nexus<span className="text-muted">Agency</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-muted-strong md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="cursor-pointer transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="cursor-pointer rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Book a strategy call
        </a>
      </nav>
    </motion.header>
  );
}
