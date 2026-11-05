import { gsap, ScrollTrigger } from '../core/scroll';
import { onLangChange } from './i18n';
import { words } from './split';

export function initAbout({ reduced }: { reduced: boolean }) {
  revealPortrait(reduced);

  const el = document.querySelector<HTMLElement>('.about__text');
  if (!el) return;

  let list = words(el);
  let progress = 0;

  const paint = () => {
    const p = progress * (list.length + 4);
    list.forEach((w, i) => {
      const k = Math.min(1, Math.max(0, p - i) / 4);
      w.style.opacity = String(0.16 + 0.84 * k);
    });
  };

  if (reduced) {
    progress = 1;
    paint();
  } else {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'bottom 42%',
      onUpdate: (self) => {
        progress = self.progress;
        paint();
      },
    });
  }

  onLangChange(() => {
    list = words(el);
    paint();
  });
}

function revealPortrait(reduced: boolean) {
  const portrait = document.querySelector<HTMLElement>('[data-portrait]');
  const photo = portrait?.querySelector<HTMLElement>('.about__photo');
  const caption = portrait?.querySelector<HTMLElement>('figcaption');
  if (!portrait || !photo || reduced) return;

  gsap.set(photo, { clipPath: 'inset(100% 0% 0% 0%)' });
  if (caption) gsap.set(caption, { opacity: 0, y: 12 });

  ScrollTrigger.create({
    trigger: portrait,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
      if (caption)
        gsap.to(caption, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.7 });
    },
  });
}
