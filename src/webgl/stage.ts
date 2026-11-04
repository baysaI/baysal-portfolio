import * as THREE from 'three';
import type { Tier } from '../core/device';

export interface Frame {
  /** Seconds since start. */
  time: number;
  /** Seconds since last frame, clamped. */
  delta: number;
}

type Updater = (frame: Frame) => void;

const DPR_CAP: Record<Tier, number> = { high: 2, medium: 1.5, low: 1 };

/**
 * Owns the renderer, scene and camera. Everything 3D registers an updater
 * here; the stage is ticked from the global GSAP ticker so scroll, DOM
 * animation and rendering share one clock.
 */
export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly size = { width: 1, height: 1, dpr: 1, aspect: 1 };

  private readonly updaters = new Set<Updater>();
  private readonly resizers = new Set<() => void>();
  private renderFn: (() => void) | null = null;
  private lastWidth = 0;
  private lastHeight = 0;

  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly tier: Tier,
  ) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: tier !== 'low',
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setClearColor(0x0b0b0c, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 0, 9);
    this.scene.add(this.camera);

    this.resize(true);
    window.addEventListener('resize', () => this.resize());
  }

  /** Register a per-frame callback. Returns an unsubscribe function. */
  onUpdate(fn: Updater) {
    this.updaters.add(fn);
    return () => this.updaters.delete(fn);
  }

  onResize(fn: () => void) {
    this.resizers.add(fn);
    return () => this.resizers.delete(fn);
  }

  /** Swap the default render call for e.g. a post-processing composer. */
  setRenderer(fn: () => void) {
    this.renderFn = fn;
  }

  resize(force = false) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Ignore tiny height changes from mobile browser chrome collapsing — avoids jank.
    const heightJitter = Math.abs(height - this.lastHeight) < 120 && width === this.lastWidth;
    if (!force && heightJitter) return;
    this.lastWidth = width;
    this.lastHeight = height;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP[this.tier]);
    Object.assign(this.size, { width, height, dpr, aspect: width / height });

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.resizers.forEach((fn) => fn());
  }

  update(frame: Frame) {
    this.updaters.forEach((fn) => fn(frame));
    if (this.renderFn) this.renderFn();
    else this.renderer.render(this.scene, this.camera);
  }
}
