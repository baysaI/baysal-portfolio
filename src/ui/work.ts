import { gsap, ScrollTrigger } from '../core/scroll';
import { words } from './split';

export const WORK_HOLD = 0.55;

const pad = (n: number) => String(n).padStart(2, '0');

export interface WorkStage {
  trigger: ScrollTrigger;
  count: number;
}

export function initWork({ reduced }: { reduced: boolean }): WorkStage | null {
  const section = document.querySelector<HTMLElement>('.work');
  if (!section) return null;
  const items = Array.from(section.querySelectorAll<HTMLElement>('.project'));
  const bars = Array.from(section.querySelectorAll<HTMLElement>('.work__bar span'));
  const indexEl = section.querySelector<HTMLElement>('[data-work-index]');
  const count = items.length;
  let current = 0;
  let timeline: gsap.core.Timeline | null = null;

  const rest = (item: Element) =>
    item.querySelectorAll('.project__meta, .project__desc, .project__tags, .project__link');
  const title = (item: Element) => words(item.querySelector('.project__title')!);

  items.forEach((item, i) => {
    gsap.set(item, { autoAlpha: i === 0 ? 1 : 0 });
    item.classList.toggle('is-active', i === 0);
  });

  const show = (next: number, dir: 1 | -1) => {
    const prev = items[current];
    const incoming = items[next];
    current = next;
    if (indexEl) indexEl.textContent = pad(next + 1);

    timeline?.progress(1).kill();
    items.forEach((item, i) => {
      if (item !== prev && item !== incoming) gsap.set(item, { autoAlpha: 0 });
      item.classList.toggle('is-active', i === next);
    });

    if (reduced) {
      gsap.set(prev, { autoAlpha: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      return;
    }

    timeline = gsap
      .timeline()
      .to(
        title(prev),
        { yPercent: -115 * dir, duration: 0.45, ease: 'power3.in', stagger: 0.03 },
        0,
      )
      .to(rest(prev), { opacity: 0, y: -14 * dir, duration: 0.35, ease: 'power2.in' }, 0)
      .set(prev, { autoAlpha: 0 }, 0.5)
      .set(incoming, { autoAlpha: 1 }, 0.3)
      .fromTo(
        title(incoming),
        { yPercent: 115 * dir },
        { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.05 },
        0.3,
      )
      .fromTo(
        rest(incoming),
        { opacity: 0, y: 22 * dir },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 },
        0.4,
      );
  };

  const switchAt = WORK_HOLD + (1 - WORK_HOLD) / 2;

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * count}`,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress * count;
      bars.forEach((bar, i) => {
        bar.style.transform = `scaleX(${gsap.utils.clamp(0, 1, p - i)})`;
      });
      const next = gsap.utils.clamp(0, count - 1, Math.floor(p + (1 - switchAt)));
      if (next !== current) show(next, next > current ? 1 : -1);
    },
  });

  return { trigger, count };
}
