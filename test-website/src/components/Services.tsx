"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Service = {
  title: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
};

const iconBase =
  "h-6 w-6 stroke-[1.6]";

const services: Service[] = [
  {
    title: "Performance growth",
    description:
      "Paid acquisition engineered as a system — search, social, and programmatic with weekly experimentation cycles.",
    bullets: ["Full-funnel attribution", "Creative testing engine", "MER & payback dashboards"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "Brand & narrative",
    description:
      "Positioning, messaging and identity systems that make Series A founders sound like category leaders.",
    bullets: ["Category design", "Messaging architecture", "Identity systems"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <path d="M12 2l2.39 4.84L20 7.6l-4 3.9.94 5.5L12 14.77 7.06 17l.94-5.5-4-3.9 5.61-.76L12 2z" />
      </svg>
    ),
  },
  {
    title: "Product-led growth",
    description:
      "Activation, onboarding and lifecycle loops co-designed with your product team to compound retention.",
    bullets: ["Onboarding redesign", "PLG instrumentation", "Lifecycle automation"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5-3 7H8c-1-2-3-4-3-7a7 7 0 0 1 7-7z" />
        <path d="M9 22h6" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    title: "Content & SEO",
    description:
      "Editorial calendars and programmatic SEO that compound into a defensible organic moat.",
    bullets: ["Topical authority maps", "Programmatic SEO", "Founder-led content"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <path d="M4 4h12l4 4v12H4z" />
        <path d="M16 4v4h4" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
  {
    title: "RevOps & analytics",
    description:
      "Clean data, working dashboards and revenue models you can defend in front of your board.",
    bullets: ["HubSpot / Salesforce ops", "Attribution modeling", "Board-ready reporting"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "Fractional CMO",
    description:
      "Embedded marketing leadership for founders not yet ready to hire a full-time executive.",
    bullets: ["Weekly leadership cadence", "Hiring & team design", "Board enablement"],
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconBase}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            What we do
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Six disciplines. One revenue engine.
          </h2>
          <p className="mt-4 text-lg text-muted-strong">
            We don&apos;t hand off siloed tactics. Every engagement combines the
            specialties below into a single accountable growth system.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.li
              key={s.title}
              variants={item}
              className="group relative cursor-default rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/50 hover:bg-surface-elev"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-accent transition-colors duration-200 group-hover:border-accent/60">
                {s.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                {s.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
