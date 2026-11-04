import { gsap, ScrollTrigger } from '../core/scroll';

export function initStats({ reduced }: { reduced: boolean }) {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count) || 0;
    const state = { value: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          value: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        }),
    });
  });
}
