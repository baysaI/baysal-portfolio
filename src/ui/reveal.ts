import { gsap, ScrollTrigger } from '../core/scroll';
import { onLangChange } from './i18n';
import { words } from './split';

const SPLIT = '[data-split]:not([data-split-manual])';
const FADE = [
  '.about__side',
  '.archive__item',
  '.service',
  '.step',
  '.stat',
  '.contact__text',
  '.contact__cta',
  '.contact__social',
].join(',');

const revealed = new WeakSet<Element>();

export function revealWords(el: Element, delay = 0) {
  revealed.add(el);
  return gsap.to(words(el), {
    yPercent: 0,
    duration: 1.25,
    ease: 'expo.out',
    stagger: 0.06,
    delay,
  });
}

export function initReveals({ reduced }: { reduced: boolean }) {
  const splitEls = Array.from(document.querySelectorAll<HTMLElement>(SPLIT));

  const hide = (el: Element) => gsap.set(words(el), { yPercent: 115 });

  if (!reduced) {
    splitEls.forEach((el) => {
      hide(el);
      if (el.closest('.hero')) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => revealWords(el),
      });
    });

    gsap.utils.toArray<HTMLElement>(FADE).forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });
  }

  onLangChange(() => {
    splitEls.forEach((el) => {
      if (!revealed.has(el) && !reduced) hide(el);
    });
  });
}

export function playIntro({ reduced }: { reduced: boolean }) {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const lines = hero.querySelectorAll('[data-split]');
  const fades = hero.querySelectorAll('.hero__top > *, .hero__intro, .hero__scroll');

  const headerParts = document.querySelectorAll('[data-header] > *');

  if (reduced) {
    lines.forEach((l) => revealed.add(l));
    gsap.set(lines.length ? Array.from(lines).flatMap(words) : [], { yPercent: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  lines.forEach((line, i) => tl.add(revealWords(line), 0.1 + i * 0.12));
  tl.from(fades, { y: 24, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.45);
  tl.from(headerParts, { y: -28, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.3);
  return tl;
}
