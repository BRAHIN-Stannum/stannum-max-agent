import { animate, stagger } from 'motion';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

function revealOnce(target: Element) {
  if (REDUCED) {
    (target as HTMLElement).style.opacity = '1';
    (target as HTMLElement).style.transform = 'none';
    target.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    target.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
    return;
  }
  const children = target.querySelectorAll<HTMLElement>('.anim-in');
  if (children.length === 0) {
    animate(
      target as HTMLElement,
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.6, easing: 'ease' }
    );
  } else {
    animate(
      Array.from(children),
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.6, easing: 'ease', delay: stagger(0.1) }
    );
  }
  target.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
}

function heroEntrance() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  if (REDUCED) {
    hero.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return;
  }
  const eyebrow = hero.querySelector<HTMLElement>('[data-hero-eyebrow]');
  const words = hero.querySelectorAll<HTMLElement>('[data-hero-word]');
  const sub = hero.querySelector<HTMLElement>('[data-hero-sub]');
  const cta = hero.querySelector<HTMLElement>('[data-hero-cta]');

  if (eyebrow) {
    animate(
      eyebrow,
      { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] },
      { duration: 0.4, easing: 'ease' }
    );
  }
  if (words.length) {
    animate(
      Array.from(words),
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
      { duration: 0.6, easing: 'ease', delay: stagger(0.15, { start: 0.3 }) }
    );
  }
  if (sub) {
    animate(
      sub,
      { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0)'] },
      { duration: 0.5, easing: 'ease', delay: 0.3 + words.length * 0.15 + 0.1 }
    );
  }
  if (cta) {
    animate(
      cta,
      { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] },
      { duration: 0.4, easing: 'ease', delay: 0.3 + words.length * 0.15 + 0.4 }
    );
  }
}

function init() {
  heroEntrance();

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (REDUCED) {
    targets.forEach((t) => {
      t.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      t.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealOnce(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((t) => io.observe(t));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
