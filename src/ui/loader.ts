import { gsap } from '../core/scroll';

/**
 * Preloader: counts towards 100 while fonts load and shaders compile, then
 * wipes upward to reveal the page. Resolves the moment the wipe starts so the
 * intro choreography can overlap it.
 */
export async function runLoader(ready: Promise<unknown>, { fast = false } = {}) {
  const root = document.querySelector<HTMLElement>('[data-loader]');
  const count = root?.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root?.querySelector<HTMLElement>('[data-loader-bar]');
  if (!root || !count || !bar) return;

  const progress = { value: 0 };
  const render = () => {
    const v = Math.round(progress.value);
    count.textContent = String(v);
    bar.style.transform = `scaleX(${v / 100})`;
  };

  const brand = root.querySelector('.loader__brand');
  if (brand) gsap.from(brand, { yPercent: 100, opacity: 0, duration: 1.1, ease: 'expo.out' });

  // Fake-but-honest: race to 80% on a timer, finish only when work is done.
  const minTime = fast ? 0.2 : 1.4;
  await gsap.to(progress, { value: 80, duration: minTime, ease: 'power2.out', onUpdate: render });
  await ready;
  await gsap.to(progress, { value: 100, duration: fast ? 0.2 : 0.5, ease: 'power3.inOut', onUpdate: render });

  const exit = gsap.timeline();
  exit
    .to(root.children, { yPercent: -30, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
    .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, 0.15)
    .add(() => document.documentElement.classList.add('is-loaded'));

  await new Promise((resolve) => gsap.delayedCall(0.55, resolve));
}
