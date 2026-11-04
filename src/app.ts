import { device } from './core/device';
import { updatePointer } from './core/pointer';
import { gsap, initScroll, ScrollTrigger } from './core/scroll';
import { initAbout } from './ui/about';
import { initClock } from './ui/clock';
import { initCursor } from './ui/cursor';
import { initHeader } from './ui/header';
import { applyLang, detectLang, initLangSwitch, onLangChange } from './ui/i18n';
import { runLoader } from './ui/loader';
import { initMagnetic } from './ui/magnetic';
import { initMarquee } from './ui/marquee';
import { initProcess } from './ui/process';
import { initReveals, playIntro } from './ui/reveal';
import { splitAll } from './ui/split';
import { initStats } from './ui/stats';
import { initWork } from './ui/work';
import { Director } from './webgl/director';
import { createWorld, type World } from './webgl/world';

const createWorldSafely = (): World | null => {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-webgl]');
  if (!canvas || !device.webgl2) return null;
  try {
    return createWorld(canvas);
  } catch (error) {
    console.warn('[baysai] WebGL unavailable, continuing without 3D.', error);
    return null;
  }
};

export async function boot() {
  const reduced = device.reducedMotion;
  const root = document.documentElement;
  root.classList.toggle('is-touch', device.isTouch);
  root.classList.toggle('is-reduced', reduced);

  // Copy first, so every split and measurement sees the final text.
  const lang = detectLang();
  splitAll();
  if (lang !== 'en') applyLang(lang);
  else applyLang('en');
  initLangSwitch();

  const lenis = initScroll({ smooth: !reduced });
  lenis.stop();
  window.scrollTo(0, 0);

  const world = createWorldSafely();
  if (!world) {
    root.classList.add('no-webgl');
    document.querySelector<HTMLElement>('[data-fallback-note]')?.removeAttribute('hidden');
  }

  // Interface
  const cursor = device.isTouch ? null : initCursor();
  initHeader(cursor);
  initMagnetic();
  initClock();
  initReveals({ reduced });
  initAbout({ reduced });
  initMarquee({ reduced });
  initStats({ reduced });
  const work = initWork({ reduced });
  const process = initProcess();

  // 3D choreography — created after the pins so every anchor sees pin spacing.
  const director = world ? new Director(world, { work, process }) : null;

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  onLangChange(() => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // One clock for pointer easing and rendering.
  if (world) {
    let time = 0;
    gsap.ticker.add((_t, deltaMs) => {
      const delta = Math.min(deltaMs / 1000, 1 / 20);
      time += delta;
      updatePointer(delta);
      world.stage.update({ time, delta });
    });
  } else {
    gsap.ticker.add((_t, deltaMs) => updatePointer(Math.min(deltaMs / 1000, 1 / 20)));
  }

  const ready = Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    world?.compile().catch(() => undefined),
  ]);
  await runLoader(ready, { fast: reduced });

  root.classList.add('is-ready');
  lenis.start();
  playIntro({ reduced });
  if (director) gsap.to(director, { intro: 1, duration: reduced ? 0.01 : 2.4, ease: 'expo.out', delay: 0.1 });

  if (import.meta.env.DEV) Object.assign(window, { __world: world, __lenis: lenis, __director: director });
}
