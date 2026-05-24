import { animate, stagger, inView } from 'motion';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE_BRIEF: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function startCounter(el: HTMLElement) {
  const target = parseFloat(el.dataset.target || '0');
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  if (REDUCED) {
    el.textContent = `${prefix}${target.toLocaleString('es-AR')}${suffix}`;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = easeOutQuart(t);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value.toLocaleString('es-AR')}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function heroEntrance() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const eyebrow = hero.querySelector<HTMLElement>('[data-hero-eyebrow]');
  const w0 = hero.querySelector<HTMLElement>('[data-hero-word="0"]');
  const w1 = hero.querySelector<HTMLElement>('[data-hero-word="1"]');
  const w2 = hero.querySelector<HTMLElement>('[data-hero-word="2"]');
  const sub = hero.querySelector<HTMLElement>('[data-hero-sub]');
  const cta = hero.querySelector<HTMLElement>('[data-hero-cta]');

  if (REDUCED) {
    [eyebrow, w0, w1, w2, sub, cta].forEach((el) => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  if (eyebrow) {
    animate(
      eyebrow,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      { duration: 0.6, easing: EASE_BRIEF }
    );
  }
  if (w0) {
    animate(
      w0,
      { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
      { duration: 0.8, delay: 0.2, easing: EASE_BRIEF }
    );
  }
  if (w1) {
    animate(
      w1,
      { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
      { duration: 0.8, delay: 0.35, easing: EASE_BRIEF }
    );
  }
  if (w2) {
    animate(
      w2,
      { opacity: [0, 1], transform: ['translateX(-20px)', 'translateX(0)'] },
      { duration: 0.8, delay: 0.5, easing: EASE_BRIEF }
    );
  }
  if (sub) {
    animate(
      sub,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      { duration: 0.6, delay: 0.7, easing: EASE_BRIEF }
    );
  }
  if (cta) {
    animate(
      cta,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      { duration: 0.6, delay: 0.8, easing: EASE_BRIEF }
    );
  }
}

function revealSection(el: Element) {
  if (REDUCED) {
    el.classList.add('is-visible');
    el.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    el.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
    return;
  }

  el.classList.add('is-visible');

  const children = el.querySelectorAll<HTMLElement>('.anim-in');
  if (children.length) {
    animate(
      Array.from(children),
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
      { duration: 0.7, easing: EASE_BRIEF, delay: stagger(0.08) }
    );
  }
  el.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
}

function init() {
  heroEntrance();

  const sections = document.querySelectorAll<HTMLElement>('.reveal-section, [data-reveal]');

  if (REDUCED) {
    sections.forEach((s) => {
      s.classList.add('is-visible');
      s.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      s.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
    });
    return;
  }

  sections.forEach((section) => {
    inView(
      section,
      () => {
        revealSection(section);
      },
      { amount: 0.1 }
    );
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
