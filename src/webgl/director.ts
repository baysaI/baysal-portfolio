import * as THREE from 'three';
import { device } from '../core/device';
import { pointer } from '../core/pointer';
import { ScrollTrigger, scrollState } from '../core/scroll';
import { WORK_HOLD } from '../ui/work';
import type { Frame } from './stage';
import type { World } from './world';

export interface SceneState {
  sx: number;
  sy: number;
  sz: number;
  sScale: number;
  sSpin: number;
  sAmp: number;
  sFreq: number;
  sTwist: number;
  sRidge: number;
  sFlow: number;
  sRim: number;

  pMorph: number;
  px: number;
  py: number;
  pz: number;
  pScale: number;
  pSpin: number;
  pTilt: number;
  pOpacity: number;
  pSize: number;
  pFree: number;
  pImage: number;

  camZ: number;
  camY: number;
}

type Keyframe = { at: () => number; state: Partial<SceneState> };
type ResolvedKeyframe = { at: () => number; state: SceneState };

export interface DirectorAnchors {
  work: { trigger: ScrollTrigger; count: number } | null;
  process: { trigger: ScrollTrigger } | null;
}

const BASE: SceneState = {
  sx: 0,
  sy: 0.15,
  sz: 0,
  sScale: 1.3,
  sSpin: 0,
  sAmp: 0.16,
  sFreq: 0.95,
  sTwist: 0,
  sRidge: 0,
  sFlow: 1,
  sRim: 0.06,
  pMorph: 0,
  px: 0,
  py: 0,
  pz: 0,
  pScale: 1,
  pSpin: 0,
  pTilt: 0,
  pOpacity: 0.55,
  pSize: 2.2,
  pFree: 1,
  pImage: 0,
  camZ: 9,
  camY: 0,
};

const KEYS = Object.keys(BASE) as Array<keyof SceneState>;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const anchorCache = new Map<string, ScrollTrigger>();

const mark = (trigger: string, start: string) => {
  const key = `${trigger}|${start}`;
  let st = anchorCache.get(key);
  if (!st) {
    const el = document.querySelector(trigger);
    if (!el) return () => 0;
    st = ScrollTrigger.create({ trigger: el, start });
    anchorCache.set(key, st);
  }
  const anchor = st;
  return () => anchor.start;
};

export class Director {
  private keys: ResolvedKeyframe[] = [];
  private readonly target: SceneState = { ...BASE };
  private readonly current: SceneState = { ...BASE };

  intro = 0;

  private readonly raycaster = new THREE.Raycaster();
  private readonly ndc = new THREE.Vector2();
  private readonly sphere = new THREE.Sphere();
  private readonly hit = new THREE.Vector3();
  private readonly touchDir = new THREE.Vector3(0, 0, 1);
  private drift = 0;

  private readonly calm: number;

  constructor(
    private readonly world: World,
    private readonly anchors: DirectorAnchors,
  ) {
    this.calm = device.reducedMotion ? 0 : 1;
    if (!this.calm) world.particles.uniforms.uScatter.value = 0;
    this.build();

    ScrollTrigger.addEventListener('refresh', () => this.build());
    world.stage.onUpdate((frame) => this.update(frame));
  }

  private build() {
    const mobile = window.innerWidth < 800;
    const aspect = window.innerWidth / window.innerHeight;
    const halfWidth = Math.tan((35 / 2) * (Math.PI / 180)) * 9 * aspect;
    const right = mobile ? 0 : Math.min(halfWidth * 0.5, 3.4);
    const lift = mobile ? 0.95 : 0;
    const m = mobile ? 0.72 : 1;
    const TAU = Math.PI * 2;
    const L = this.world.layout;

    const hero: Partial<SceneState> = {
      sx: 0,
      sy: mobile ? 0.55 : 0.15,
      sScale: 1.42 * m,
      sAmp: 0.16,
      sFreq: 0.95,
      sTwist: 0,
      sRidge: 0,
      sFlow: 1,
      pMorph: L.browser,
      px: 0,
      py: mobile ? 0.4 : 0.05,
      pz: -1.6,
      pScale: mobile ? Math.min(0.42, (halfWidth * 1.9) / 7) : Math.min(1, (halfWidth * 1.82) / 7),
      pSpin: TAU,
      pTilt: 0,
      pOpacity: 0.62,
      pSize: 2.3,
      pFree: 0,
      pImage: 0,
      camZ: 9,
    };

    const mapX = mobile ? 0 : right * 0.95;
    const mapY = mobile ? -1.75 : -0.55;
    const about: Partial<SceneState> = {
      sx: mobile ? 0.6 : right + 1.2,
      sy: mobile ? -1.2 : 0.4,
      sScale: 0,
      sTwist: 1.1,
      pMorph: L.activity,
      px: mapX,
      py: mapY,
      pz: 0,
      pScale: mobile ? 0.5 : Math.min(0.78, (halfWidth * 0.95) / 4.9),
      pSpin: TAU - 0.42,
      pTilt: 0.16,
      pOpacity: 0.95,
      pSize: 2.4,
      pFree: 0,
    };

    const keys: Keyframe[] = [
      { at: () => 0, state: hero },
      { at: mark('.about', 'top 30%'), state: about },
      { at: mark('.about', 'bottom 60%'), state: { ...about, pSpin: TAU - 0.18 } },
    ];

    let lastMorph = L.activity;
    const work = this.anchors.work;
    if (work) {
      const { trigger, count } = work;
      const seg = (i: number) => () => trigger.start + ((trigger.end - trigger.start) * i) / count;
      const projectState = (i: number, spin: number): Partial<SceneState> => ({
        sx: right,
        sy: lift,
        sScale: 0,
        pMorph: L.firstProject + i,
        px: right,
        py: lift,
        pz: 0,
        pScale: mobile ? 0.6 : Math.min(1, (halfWidth - 0.2) / 2.1),
        pSpin: spin,
        pTilt: 0,
        pOpacity: 1,
        pSize: 2.6,
        pFree: 0,
        pImage: 1,
      });
      for (let i = 0; i < count; i++) {
        keys.push({ at: seg(i), state: projectState(i, TAU - 0.24) });
        keys.push({ at: seg(i + WORK_HOLD), state: projectState(i, TAU - 0.08) });
      }
      keys.push({ at: seg(count), state: { ...projectState(count - 1, TAU), pImage: 0.6 } });
      lastMorph = L.firstProject + count - 1;
    }

    const journey: Partial<SceneState> = {
      sScale: 0,
      pMorph: L.journey,
      py: mobile ? 0.9 : -0.15,
      pz: -0.8,
      pScale: mobile ? 0.48 : 1,
      pSpin: TAU,
      pTilt: 0.12,
      pOpacity: 0.95,
      pSize: 2.5,
      pFree: 0,
      pImage: 0,
    };

    keys.push({
      at: mark('.services', 'top 35%'),
      state: { pMorph: lastMorph, pImage: 0, pOpacity: 0.2, pz: -1.2 },
    });
    keys.push({ at: mark('.services', 'bottom 65%'), state: { ...journey, px: mobile ? 0 : 2.2 } });

    const process = this.anchors.process;
    if (process) {
      keys.push({ at: () => process.trigger.start, state: { ...journey, px: mobile ? 1.2 : 2.2 } });
      keys.push({ at: () => process.trigger.end, state: { ...journey, px: mobile ? -1.2 : -2.2 } });
    }

    keys.push({
      at: mark('.stats', 'bottom bottom'),
      state: { ...journey, px: mobile ? -1.2 : -2.2, py: 1.5, pOpacity: 0.22 },
    });

    const endCamZ = 8.6;
    const pxPerUnit = window.innerHeight / (2 * Math.tan((35 / 2) * (Math.PI / 180)) * endCamZ);
    const contactInner = document.querySelector('.contact__inner');
    const maxScroll = ScrollTrigger.maxScroll(window);
    const innerTopAtEnd = contactInner
      ? contactInner.getBoundingClientRect().top + window.scrollY - maxScroll
      : window.innerHeight * 0.4;
    const free = Math.min(Math.max(innerTopAtEnd, 0), window.innerHeight);
    const centerPx = Math.max(free / 2, 40);
    const finaleY = (window.innerHeight / 2 - centerPx) / pxPerUnit;
    const freeWorld = Math.max(free, 80) / pxPerUnit;
    const viewWorldW = (window.innerWidth / pxPerUnit) * 0.86;
    const signatureScale = Math.min((freeWorld * 0.82) / 1.25, viewWorldW / 4.6, 1.15);

    const finale: Partial<SceneState> = {
      sx: 0,
      sy: finaleY,
      sScale: 0,
      pMorph: L.signature,
      px: 0,
      py: finaleY,
      pz: 0,
      pScale: signatureScale,
      pTilt: 0,
      pSpin: TAU,
      pOpacity: 0.95,
      pSize: 2.2,
      pFree: 0,
      pImage: 0,
      camZ: endCamZ,
    };
    keys.push({
      at: mark('.contact', 'top 70%'),
      state: { ...finale, pOpacity: 0.3, camZ: 9 },
    });
    keys.push({ at: () => ScrollTrigger.maxScroll(window), state: finale });

    let carry: SceneState = { ...BASE };
    this.keys = keys.map((k) => {
      carry = { ...carry, ...k.state };
      return { at: k.at, state: carry };
    });
  }

  private sample(y: number) {
    const { keys, target } = this;
    let i = 0;
    while (i < keys.length - 1 && y >= keys[i + 1].at()) i++;
    const a = keys[i];
    const b = keys[Math.min(i + 1, keys.length - 1)];
    const start = a.at();
    const span = b.at() - start;
    const t = a === b || span <= 0 ? 0 : easeInOut(Math.min(1, Math.max(0, (y - start) / span)));
    for (const k of KEYS) target[k] = a.state[k] + (b.state[k] - a.state[k]) * t;
  }

  private updateTouch(scale: number, delta: number) {
    const { sculpture, stage } = this.world;
    const u = sculpture.uniforms;
    let strength = 0;

    if (!device.isTouch && pointer.active && sculpture.group.visible) {
      this.ndc.set(pointer.nx, pointer.ny);
      this.raycaster.setFromCamera(this.ndc, stage.camera);
      sculpture.group.getWorldPosition(this.sphere.center);
      this.sphere.radius = scale * 1.15;
      if (this.raycaster.ray.intersectSphere(this.sphere, this.hit)) {
        sculpture.mesh.worldToLocal(this.hit).normalize();
        this.touchDir.lerp(this.hit, 1 - Math.exp(-delta * 10)).normalize();
        strength = 0.2;
      }
    }

    u.uPointer.value.copy(this.touchDir);
    u.uPointerStrength.value += (strength - u.uPointerStrength.value) * (1 - Math.exp(-delta * 4));
  }

  update({ time, delta }: Frame) {
    const y = scrollState.lenis?.animatedScroll ?? window.scrollY;
    this.sample(y);

    const k = 1 - Math.exp(-delta * 5);
    for (const key of KEYS) this.current[key] += (this.target[key] - this.current[key]) * k;

    const c = this.current;
    const energy = Math.abs(scrollState.energy) * this.calm;
    const { sculpture, particles, stage, post } = this.world;

    const scale = Math.max(c.sScale * this.intro, 0.0001);
    sculpture.group.visible = scale > 0.01;
    sculpture.group.position.set(c.sx + pointer.sx * 0.12, c.sy + pointer.sy * 0.08, c.sz);
    sculpture.group.scale.setScalar(scale);
    sculpture.mesh.rotation.y = time * 0.12 + c.sSpin + pointer.sx * 0.35;
    sculpture.mesh.rotation.x = -pointer.sy * 0.25 + Math.sin(time * 0.3) * 0.08;
    const su = sculpture.uniforms;
    su.uAmp.value = c.sAmp + energy * 0.08;
    su.uFreq.value = c.sFreq;
    su.uTwist.value = c.sTwist + scrollState.energy * 0.6 * this.calm;
    su.uRidge.value = c.sRidge;
    su.uSpeed.value = (c.sFlow + energy * 2.5) * (this.calm ? 1 : 0.3);
    su.uRim.value = c.sRim;
    this.updateTouch(scale, delta);

    particles.points.position.set(c.px + pointer.sx * 0.06, c.py + pointer.sy * 0.04, c.pz);
    particles.points.scale.setScalar(c.pScale);
    const turn = Math.PI * 2;
    const settle = 1 - Math.exp(-delta * 2);
    this.drift += delta * 0.04 * c.pFree;
    this.drift += (Math.round(this.drift / turn) * turn - this.drift) * (1 - c.pFree) * settle;
    particles.points.rotation.y = this.drift + c.pSpin + pointer.sx * 0.18;
    particles.points.rotation.x = c.pTilt - pointer.sy * 0.1;
    const pu = particles.uniforms;
    pu.uMorph.value = c.pMorph;
    pu.uOpacity.value = c.pOpacity * this.intro;
    pu.uSize.value = c.pSize;
    pu.uTurbulence.value = energy * 0.3;
    pu.uImageFade.value = this.world.screens.update(c.pMorph, c.pImage * this.intro);

    stage.camera.position.z = c.camZ;
    stage.camera.position.y = c.camY;
    post.uniforms.uAberration.value = 0.003 + energy * 0.025;
  }
}
