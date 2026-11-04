import * as THREE from 'three';
import type { Tier } from '../core/device';

export interface Frame {
  time: number;

  delta: number;
}

type Updater = (frame: Frame) => void;

const DPR_CAP: Record<Tier, number> = { high: 2, medium: 1.5, low: 1 };

export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly size = { width: 1, height: 1, dpr: 1, aspect: 1 };

  private readonly updaters = new Set<Updater>();
  private readonly resizers = new Set<() => void>();
  private renderFn: (() => void) | null = null;
  private lastWidth = 0;
  private dprLimit = Infinity;
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

    this.renderer.setClearColor(0x000000, 1);
    this.scene.background = new THREE.Color(0x000000);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 0, 9);
    this.scene.add(this.camera);

    this.resize(true);
    window.addEventListener('resize', () => this.resize());
  }

  onUpdate(fn: Updater) {
    this.updaters.add(fn);
    return () => this.updaters.delete(fn);
  }

  onResize(fn: () => void) {
    this.resizers.add(fn);
    return () => this.resizers.delete(fn);
  }

  setRenderer(fn: () => void) {
    this.renderFn = fn;
  }

  setPixelRatio(dpr: number) {
    this.dprLimit = dpr;
    this.size.dpr = dpr;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.size.width, this.size.height, false);
    this.resizers.forEach((fn) => fn());
  }

  resize(force = false) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const heightJitter = Math.abs(height - this.lastHeight) < 120 && width === this.lastWidth;
    if (!force && heightJitter) return;
    this.lastWidth = width;
    this.lastHeight = height;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP[this.tier], this.dprLimit);
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
