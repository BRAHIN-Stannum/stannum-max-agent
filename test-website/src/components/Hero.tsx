"use client";

import { motion } from "motion/react";

const stats = [
  { value: "3.4x", label: "Avg. pipeline lift" },
  { value: "<90d", label: "Time to first ROI" },
  { value: "47+", label: "Funded startups scaled" },
];

const ArrowRight = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-6 pt-40 pb-28 sm:pt-48 sm:pb-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-5xl rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-strong backdrop-blur-sm"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
          />
          Now onboarding Q3 cohort — 4 spots left
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Marketing built for the{" "}
          <span className="relative inline-block text-accent">
            next unicorn
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong sm:text-xl"
        >
          We partner with founders and product teams to turn early traction into
          category leadership — through performance, brand and product-led
          growth executed with engineering rigor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-background transition-colors duration-200 hover:bg-[#33ffa0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Start a growth audit
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight />
            </span>
          </a>
          <a
            href="#services"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See how we work
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-surface/50 px-5 py-4 backdrop-blur-sm"
            >
              <dt className="text-xs uppercase tracking-wider text-muted">
                {s.label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
