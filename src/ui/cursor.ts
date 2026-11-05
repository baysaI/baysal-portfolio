import { pointer } from '../core/pointer';
import { gsap } from '../core/scroll';
import type { DictKey } from '../content/i18n';
import { t } from './i18n';

const LABELS: Record<string, DictKey> = {
  view: 'cursor.view',
  mail: 'cursor.mail',
};

export function initCursor() {
  const root = document.querySelector<HTMLElement>('[data-cursor]');
  if (!root) return;
  const dot = root.querySelector<HTMLElement>('.cursor__dot')!;
  const ring = root.querySelector<HTMLElement>('.cursor__ring')!;
  const label = root.querySelector<HTMLElement>('[data-cursor-label]')!;
  const html = document.documentElement;
  let hidden = false;
  const setHidden = (value: boolean) => {
    if (hidden === value) return;
    hidden = value;
    root.classList.toggle('is-hidden', value);
    html.classList.toggle('has-cursor', !value);
  };
  hidden = true;
  root.classList.add('is-hidden');

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') setHidden(false);
    },
    { passive: true },
  );
  html.addEventListener('pointerleave', () => setHidden(true));
  window.addEventListener('blur', () => setHidden(true));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) setHidden(true);
  });

  const ringPos = { x: pointer.x, y: pointer.y };
  const dotPos = { x: pointer.x, y: pointer.y };

  gsap.ticker.add((_time, deltaMs) => {
    const k = (rate: number) => 1 - Math.exp(-(deltaMs / 1000) * rate);
    dotPos.x += (pointer.x - dotPos.x) * k(40);
    dotPos.y += (pointer.y - dotPos.y) * k(40);
    ringPos.x += (pointer.x - ringPos.x) * k(11);
    ringPos.y += (pointer.y - ringPos.y) * k(11);
    dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
  });

  document.addEventListener('pointerover', (e) => {
    const target = (e.target as Element).closest<HTMLElement>('a, button, [data-cursor]');
    const labelled = target?.closest<HTMLElement>('[data-cursor]');
    const key = labelled?.dataset.cursor ? LABELS[labelled.dataset.cursor] : undefined;
    root.classList.toggle('is-hover', !!target && !key);
    root.classList.toggle('has-label', !!key);
    if (key) label.textContent = t(key);
  });

  document.addEventListener('pointerdown', () => gsap.to(ring, { scale: 0.85, duration: 0.2 }));
  document.addEventListener('pointerup', () =>
    gsap.to(ring, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' }),
  );

  return root;
}
