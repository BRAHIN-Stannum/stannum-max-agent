function init() {
  const items = document.querySelectorAll<HTMLElement>('[data-faq-item]');
  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
    const panel = item.querySelector<HTMLElement>('[data-faq-panel]');
    const icon = item.querySelector<HTMLElement>('[data-faq-icon]');
    if (!trigger || !panel) return;

    panel.style.height = '0px';
    panel.style.overflow = 'hidden';
    panel.style.transition = 'height 320ms cubic-bezier(0.16, 1, 0.3, 1)';
    panel.setAttribute('aria-hidden', 'true');

    trigger.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';
      if (isOpen) {
        panel.style.height = panel.scrollHeight + 'px';
        requestAnimationFrame(() => {
          panel.style.height = '0px';
        });
        item.dataset.open = 'false';
        panel.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        if (icon) icon.textContent = '+';
      } else {
        panel.style.height = panel.scrollHeight + 'px';
        const onEnd = () => {
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
        item.dataset.open = 'true';
        panel.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
