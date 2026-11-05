import { gsap, ScrollTrigger, scrollState } from '../core/scroll';

interface NavigateOptions {
  reduced: boolean;
  settle?: () => void;
}

const LONG_JUMP = 1.25;

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const holderOf = (el: HTMLElement) =>
  el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;

const offsetOf = (el: HTMLElement | null) => {
  if (!el) return 0;
  const y = holderOf(el).getBoundingClientRect().top + window.scrollY;
  return Math.round(gsap.utils.clamp(0, ScrollTrigger.maxScroll(window), y));
};

const headingOf = (el: HTMLElement | null) => {
  const label = el?.querySelector('.label')?.textContent?.trim() ?? '';
  const match = /^\((\d+)\)\s*(.+)$/.exec(label);
  if (match) return { index: `(${match[1]})`, title: match[2] };
  return { index: '(00)', title: document.querySelector('.header__logo')?.textContent ?? '' };
};

export function initNavigation({ reduced, settle }: NavigateOptions) {
  const curtain = document.querySelector<HTMLElement>('[data-curtain]');
  const veil = curtain?.querySelector<HTMLElement>('.curtain__veil');
  const panel = curtain?.querySelector<HTMLElement>('.curtain__panel');
  const indexEl = curtain?.querySelector<HTMLElement>('[data-curtain-index]');
  const titleEl = curtain?.querySelector<HTMLElement>('[data-curtain-title]');
  const bar = curtain?.querySelector<HTMLElement>('[data-curtain-bar]');
  let busy = false;
  if (veil && panel) gsap.set([veil, panel], { yPercent: 100 });

  const land = (y: number) => {
    const lenis = scrollState.lenis;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.update();
    settle?.();
    scrollState.energy = reduced ? 0 : 0.8;
  };

  const glide = (y: number, distance: number) => {
    const lenis = scrollState.lenis;
    if (!lenis) return land(y);
    const screens = distance / window.innerHeight;
    lenis.scrollTo(y, {
      duration: 1 + Math.min(screens, LONG_JUMP) * 0.4,
      easing: easeInOutQuart,
      lock: true,
    });
  };

  const cut = (y: number, target: HTMLElement | null, dir: 1 | -1) => {
    if (!curtain || !veil || !panel || !titleEl) return land(y);
    const lenis = scrollState.lenis;
    const heading = headingOf(target);
    if (indexEl) indexEl.textContent = heading.index;
    titleEl.textContent = heading.title;

    busy = true;
    lenis?.stop();
    curtain.classList.add('is-active');

    gsap
      .timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          curtain.classList.remove('is-active');
          busy = false;
        },
      })
      .fromTo(veil, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.65 }, 0)
      .fromTo(panel, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.65 }, 0.07)
      .fromTo(
        titleEl,
        { yPercent: 110 * dir },
        { yPercent: 0, duration: 0.7, ease: 'expo.out' },
        0.32,
      )
      .fromTo(bar ?? [], { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0.3)
      .add(() => {
        land(y);
        lenis?.start();
      }, 0.74)
      .to(titleEl, { yPercent: -110 * dir, duration: 0.45, ease: 'power3.in' }, 0.86)
      .to(panel, { yPercent: -100 * dir, duration: 0.72 }, 0.92)
      .to(veil, { yPercent: -100 * dir, duration: 0.72 }, 0.99);
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href') ?? '';
    const target = id === '#top' || id === '#' ? null : document.querySelector<HTMLElement>(id);
    if (id !== '#top' && id !== '#' && !target) return;
    event.preventDefault();
    if (busy) return;

    const y = offsetOf(target);
    const from = scrollState.lenis?.animatedScroll ?? window.scrollY;
    const distance = Math.abs(y - from);

    if (distance > 2) {
      if (reduced) land(y);
      else if (distance <= window.innerHeight * LONG_JUMP) glide(y, distance);
      else cut(y, target, y > from ? 1 : -1);
    }

    const focusable = target ?? document.querySelector<HTMLElement>('#top');
    if (focusable) {
      focusable.setAttribute('tabindex', '-1');
      focusable.focus({ preventScroll: true });
    }
  });
}
