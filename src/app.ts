import { device } from './core/device';
import { createDprGovernor, createRenderGate } from './core/performance';
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
import { initParallax } from './ui/parallax';
import { initProcess } from './ui/process';
import { initReveals, playIntro } from './ui/reveal';
import { splitAll } from './ui/split';
import { initStats } from './ui/stats';
import { initWork } from './ui/work';
import type { World } from './webgl/world';

/** The 3D engine (three.js + shaders) is a separate chunk, fetched while the loader runs. */
const loadWebgl = () => Promise.all([import('./webgl/world'), import('./webgl/director')]);
type WebglModules = { Director: typeof import('./webgl/director').Director };

const createWorldSafely = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-webgl]');
  if (!canvas || !device.webgl2) return null;
  try {
    const [{ createWorld }, { Director }] = await loadWebgl();
    return { world: createWorld(canvas) as World, Director };
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

  // Start fetching the 3D engine immediately; the interface boots meanwhile.
  const webglPending = createWorldSafely();

  // Interface
  const cursor = device.isTouch ? null : initCursor();
  initHeader(cursor);
  initMagnetic();
  initClock();
  initReveals({ reduced });
  initAbout({ reduced });
  initMarquee({ reduced });
  initStats({ reduced });
  initParallax({ reduced });
  const work = initWork({ reduced });
  const process = initProcess();

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  onLangChange(() => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  let director: InstanceType<WebglModules['Director']> | null = null;
  let world: World | null = null;

  /** Resolves once the scene exists, is choreographed and its shaders are compiled. */
  const sceneReady = webglPending.then(async (webgl) => {
    if (!webgl) {
      root.classList.add('no-webgl');
      document.querySelector<HTMLElement>('[data-fallback-note]')?.removeAttribute('hidden');
      gsap.ticker.add((_t, deltaMs) => updatePointer(Math.min(deltaMs / 1000, 1 / 20)));
      return;
    }
    world = webgl.world;
    const stage = world.stage;
    // Created after the pins so every anchor sees pin spacing.
    director = new webgl.Director(world, { work, process });
    ScrollTrigger.refresh();

    const gate = createRenderGate();
    const governor = createDprGovernor((dpr) => stage.setPixelRatio(dpr), stage.size.dpr);
    let time = 0;
    gsap.ticker.add((_t, deltaMs) => {
      const delta = Math.min(deltaMs / 1000, 1 / 20);
      updatePointer(delta);
      if (!gate.open) return;
      time += delta;
      stage.update({ time, delta });
      governor(delta);
    });

    await world.compile().catch(() => undefined);
  });

  await runLoader(Promise.all([document.fonts?.ready, sceneReady]), { fast: reduced });

  root.classList.add('is-ready');
  lenis.start();
  playIntro({ reduced });
  if (director) {
    gsap.to(director, { intro: 1, duration: reduced ? 0.01 : 2.4, ease: 'expo.out', delay: 0.1 });
  }

  if (import.meta.env.DEV) Object.assign(window, { __world: world, __lenis: lenis, __director: director });
}
