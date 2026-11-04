import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const scrollState = {
  lenis: null as Lenis | null,

  velocity: 0,

  energy: 0,

  progress: 0,
  direction: 1 as 1 | -1,
};

export function initScroll({ smooth }: { smooth: boolean }) {
  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: smooth,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1,
  });
  scrollState.lenis = lenis;

  lenis.on('scroll', (l: Lenis) => {
    scrollState.velocity = l.velocity;
    scrollState.progress = l.progress;
    scrollState.direction = l.direction === -1 ? -1 : 1;
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
    const target = gsap.utils.clamp(-1, 1, scrollState.velocity / 40);
    scrollState.energy += (target - scrollState.energy) * 0.08;
  });
  gsap.ticker.lagSmoothing(0);

  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href') ?? '';
    const target = id === '#top' || id === '#' ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    event.preventDefault();
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    if (target instanceof HTMLElement) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });

  return lenis;
}

export { gsap, ScrollTrigger };
