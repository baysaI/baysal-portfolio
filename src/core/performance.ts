import { ScrollTrigger } from './scroll';

/**
 * Decides when the WebGL stage may skip work:
 *  - while an opaque section (e.g. the light services block) fully covers the viewport
 *  - while the tab is hidden
 */
export function createRenderGate() {
  let covering = 0;

  document.querySelectorAll<HTMLElement>('[data-opaque]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onToggle: ({ isActive }) => {
        covering += isActive ? 1 : -1;
      },
    });
  });

  return {
    get open() {
      return covering <= 0 && !document.hidden;
    },
  };
}

/**
 * Adaptive resolution: if frames stay slow for a while, step the pixel ratio
 * down (never below 1). Keeps motion smooth on weaker GPUs and laptops on battery.
 */
export function createDprGovernor(apply: (dpr: number) => void, initial: number) {
  let dpr = initial;
  let acc = 0;
  let frames = 0;
  let cooldown = 2;

  return (delta: number) => {
    if (dpr <= 1) return;
    cooldown -= delta;
    acc += delta;
    frames++;
    if (acc < 1.5) return;
    const fps = frames / acc;
    acc = 0;
    frames = 0;
    if (cooldown > 0 || fps >= 45) return;
    dpr = Math.max(1, Math.round((dpr - 0.25) * 100) / 100);
    cooldown = 2;
    apply(dpr);
  };
}
