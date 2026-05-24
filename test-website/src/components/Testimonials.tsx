"use client";

import { motion, type Variants } from "motion/react";

type Quote = {
  body: string;
  name: string;
  role: string;
  company: string;
};

const quotes: Quote[] = [
  {
    body:
      "Nexus rebuilt our acquisition stack in eight weeks. We cut blended CAC by 38% and finally have a pipeline our board trusts.",
    name: "Sofía Martínez",
    role: "Co-founder & CEO",
    company: "Lattice.dev",
  },
  {
    body:
      "They operate like a product team, not a marketing vendor. Every experiment shipped with instrumentation, hypothesis and a decision rule.",
    name: "Andrés Kahn",
    role: "Head of Growth",
    company: "Volta AI",
  },
  {
    body:
      "We hired Nexus six months before our Series B. The narrative they built is the same one we used on stage at the closing.",
    name: "Priya Raman",
    role: "CMO",
    company: "Helix Labs",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      aria-hidden
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-accent"
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Operator-trusted
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The teams we&apos;ve helped scale.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            From seed to Series C — operators who care less about deliverables
            and more about outcomes.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {quotes.map((q) => (
            <motion.li
              key={q.name}
              variants={item}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="text-accent"
                fill="currentColor"
              >
                <path d="M7.5 7C5 7 3 9 3 11.5V18h6v-6.5H6.5C6.5 10 7.5 9 9 9V7H7.5zm10 0C15 7 13 9 13 11.5V18h6v-6.5h-2.5c0-1.5 1-2.5 2.5-2.5V7h-1.5z" />
              </svg>
              <p className="mt-5 text-base leading-relaxed text-muted-strong">
                {q.body}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <Initials name={q.name} />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{q.name}</p>
                  <p className="text-muted">
                    {q.role} · {q.company}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
