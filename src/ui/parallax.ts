import { gsap } from '../core/scroll';

export function initParallax({ reduced }: { reduced: boolean }) {
  if (reduced) return;

  const hero = document.querySelector<HTMLElement>('.hero');
  if (hero) {
    const [lineA, lineB] = Array.from(hero.querySelectorAll<HTMLElement>('.hero__line'));
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (lineA) gsap.to(lineA, { xPercent: -14, opacity: 0.15, ease: 'none', scrollTrigger: scrub });
    if (lineB) gsap.to(lineB, { xPercent: 14, opacity: 0.15, ease: 'none', scrollTrigger: scrub });
    gsap.to(hero.querySelectorAll('.hero__top, .hero__bottom'), {
      yPercent: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { ...scrub, end: 'center top' },
    });
  }

  gsap.utils
    .toArray<HTMLElement>('.services__title, .process__title, .contact__title')
    .forEach((title) => {
      gsap.fromTo(
        title,
        { y: 60 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
}
