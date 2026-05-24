"use client";

import { motion } from "motion/react";

const columns = [
  {
    title: "Services",
    links: [
      "Performance growth",
      "Brand & narrative",
      "Product-led growth",
      "RevOps & analytics",
    ],
  },
  {
    title: "Company",
    links: ["About", "Case studies", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Growth audit", "Playbooks", "Founder briefings", "Contact"],
  },
];

export default function Footer() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-12 border-t border-border bg-surface/40 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-base font-semibold"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]"
              />
              Nexus<span className="text-muted">Agency</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-strong">
              Growth marketing partner for tech companies and venture-backed
              startups across the Americas and EMEA.
            </p>

            <form
              className="mt-6 flex w-full max-w-sm items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="founder@yourcompany.com"
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <button
                type="submit"
                className="h-11 cursor-pointer rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors duration-200 hover:bg-[#33ffa0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Request audit
              </button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="cursor-pointer text-muted-strong transition-colors duration-200 hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Nexus Agency. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#"
                className="cursor-pointer transition-colors duration-200 hover:text-foreground"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-pointer transition-colors duration-200 hover:text-foreground"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-pointer transition-colors duration-200 hover:text-foreground"
              >
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
}
