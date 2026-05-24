const TARGET = new Date('2026-05-21T16:00:00-03:00').getTime();

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function tick() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  const set = (id: string, v: string) => {
    const el = document.getElementById(id);
    if (el && el.textContent !== v) el.textContent = v;
  };
  set('cd-days', pad(days));
  set('cd-hours', pad(hours));
  set('cd-mins', pad(mins));
  set('cd-secs', pad(secs));
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
