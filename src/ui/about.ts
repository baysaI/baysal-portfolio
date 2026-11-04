import { ScrollTrigger } from '../core/scroll';
import { onLangChange } from './i18n';
import { words } from './split';

export function initAbout({ reduced }: { reduced: boolean }) {
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
