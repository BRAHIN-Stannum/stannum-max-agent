let lastY = 0;
let ticking = false;

function update() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const y = window.scrollY;
  if (y > 120 && y > lastY) {
    nav.dataset.hidden = 'true';
  } else {
    nav.dataset.hidden = 'false';
  }
  lastY = y;
  ticking = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  },
  { passive: true }
);
