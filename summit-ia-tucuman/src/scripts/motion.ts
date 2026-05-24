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
  const duration = 1600;
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
      { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
      { duration: 0.7, easing: [0.16, 1, 0.3, 1] }
    );
  } else {
    animate(
      Array.from(children),
      { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
      { duration: 0.7, easing: [0.16, 1, 0.3, 1], delay: stagger(0.08) }
    );
  }
  target.querySelectorAll<HTMLElement>('[data-counter]').forEach(startCounter);
}

function init() {
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
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  );

  targets.forEach((t) => io.observe(t));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
