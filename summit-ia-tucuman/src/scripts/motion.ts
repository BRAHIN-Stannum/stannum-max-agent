import { animate, stagger } from 'motion';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealOnce(target: Element) {
  if (REDUCED) {
    target.classList.add('is-visible');
    (target as HTMLElement).style.opacity = '1';
    (target as HTMLElement).style.transform = 'none';
    return;
  }
  const children = target.querySelectorAll<HTMLElement>('.anim-in');
  if (children.length === 0) {
    animate(
      target as HTMLElement,
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.7, easing: [0.16, 1, 0.3, 1] }
    );
  } else {
    animate(
      Array.from(children),
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.7, easing: [0.16, 1, 0.3, 1], delay: stagger(0.08) }
    );
  }
}

function init() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (REDUCED) {
    targets.forEach((t) => {
      t.querySelectorAll<HTMLElement>('.anim-in').forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
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
