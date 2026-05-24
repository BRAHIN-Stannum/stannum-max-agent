const TARGET = new Date('2026-06-17T16:00:00-03:00').getTime();

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const previous: Record<string, string> = {};

function setBlock(id: string, value: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (previous[id] === value) return;
  previous[id] = value;
  if (REDUCED) {
    el.textContent = value;
    return;
  }
  el.innerHTML = '';
  for (const ch of value) {
    const wrap = document.createElement('span');
    wrap.className = 'flip-digit';
    const inner = document.createElement('span');
    inner.textContent = ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  }
}

function tick() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  setBlock('cd-days', pad(days));
  setBlock('cd-hours', pad(hours));
  setBlock('cd-mins', pad(mins));
  setBlock('cd-secs', pad(secs));
}

function start() {
  tick();
  setInterval(tick, 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
