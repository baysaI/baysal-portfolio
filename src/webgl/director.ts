import * as THREE from 'three';
import { device } from '../core/device';
import { pointer } from '../core/pointer';
import { ScrollTrigger, scrollState } from '../core/scroll';
import { WORK_HOLD } from '../ui/work';
import { SHAPE_ORDER, type ShapeName } from './shapes';
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
  camZ: 9,
  camY: 0,
};

const KEYS = Object.keys(BASE) as Array<keyof SceneState>;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const mark = (trigger: string, start: string) => {
  const el = document.querySelector(trigger);
  if (!el) return () => 0;
  const st = ScrollTrigger.create({ trigger: el, start });
  return () => st.start;
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

    const hero: Partial<SceneState> = {
      sx: 0,
      sy: mobile ? 0.55 : 0.15,
      sScale: 1.42 * m,
      sAmp: 0.16,
      sFreq: 0.95,
      sTwist: 0,
      sRidge: 0,
      sFlow: 1,
      pMorph: 0,
      px: 0,
      py: 0,
      pScale: 1,
      pSpin: 0,
      pOpacity: 0.55,
      camZ: 9,
    };

    const aboutX = mobile ? 0.45 : right;
    const aboutY = mobile ? -1.55 : lift;
    const about: Partial<SceneState> = {
      sx: aboutX,
      sy: aboutY,
      sScale: (mobile ? 0.55 : 0.95) * m,
      sAmp: 0.2,
      sFreq: 1.25,
      sTwist: 1.1,
      sRidge: 0.35,
      sFlow: 1.3,
      pMorph: 1,
      px: aboutX,
      py: aboutY,
      pScale: (mobile ? 0.6 : 0.98) * m,
      pOpacity: 0.85,
    };

    const keys: Keyframe[] = [
      { at: () => 0, state: hero },
      { at: mark('.about', 'top 25%'), state: about },
      { at: mark('.about', 'bottom 70%'), state: { ...about, pSpin: 0.9, sSpin: 1.2 } },
    ];

    const morphOf = (name: ShapeName) => SHAPE_ORDER.indexOf(name);
    const facing = new Set<ShapeName>(['clock', 'book']);
    const TAU = Math.PI * 2;
    let lastSpin = 2;
    let lastMorph = morphOf('shell');

    const work = this.anchors.work;
    if (work) {
      const { trigger, count } = work;
      const seg = (i: number) => () => trigger.start + ((trigger.end - trigger.start) * i) / count;
      const shapeOf = (i: number) => SHAPE_ORDER[2 + i];
      const spinOf = (i: number): [number, number] => {
        if (facing.has(shapeOf(i))) return [TAU - 0.18, TAU + 0.18];
        const base = i < 2 ? 1.6 + i * 0.9 : TAU + 0.6 + (i - 2) * 0.45;
        return [base, base + 0.45];
      };
      const projectState = (i: number): Partial<SceneState> => {
        const tidal = shapeOf(i) === 'tidal';
        return {
          sx: right,
          sy: lift,
          sScale: 0,
          sTwist: 2,
          pMorph: 2 + i,
          px: right,
          py: lift + (tidal ? 0.35 : 0),
          pz: 0,
          pScale: 1.05 * m,
          pSpin: spinOf(i)[0],
          pTilt: tidal ? 0.3 : 0,
          pOpacity: 1,
          pSize: 2.9,
          pFree: 0,
        };
      };
      for (let i = 0; i < count; i++) {
        keys.push({ at: seg(i), state: projectState(i) });
        keys.push({ at: seg(i + WORK_HOLD), state: { ...projectState(i), pSpin: spinOf(i)[1] } });
      }
      lastSpin = spinOf(count - 1)[1] + 0.45;
      lastMorph = 2 + count - 1;
      keys.push({ at: seg(count), state: { ...projectState(count - 1), pSpin: lastSpin } });
    }

    const knot: Partial<SceneState> = {
      sScale: 0,
      pMorph: morphOf('knot'),
      px: 0,
      py: mobile ? 0.6 : 0,
      pz: -1,
      pScale: 1.25 * m,
      pTilt: 0.35,
      pOpacity: 0.5,
      pSize: 2.2,
      pFree: 1,
    };

    keys.push({
      at: mark('.services', 'top 35%'),
      state: { pMorph: lastMorph, pOpacity: 0.28, pz: -1.2, pFree: 1 },
    });
    keys.push({ at: mark('.services', 'bottom 65%'), state: { ...knot, pSpin: lastSpin + 1 } });

    const process = this.anchors.process;
    if (process) {
      keys.push({ at: () => process.trigger.start, state: { ...knot, pSpin: lastSpin + 1.3 } });
      keys.push({
        at: () => process.trigger.end,
        state: { ...knot, pSpin: lastSpin + 4.1, pOpacity: 0.65 },
      });
    }

    keys.push({
      at: mark('.stats', 'bottom bottom'),
      state: { ...knot, py: 1.2, pSpin: lastSpin + 4.9, pOpacity: 0.3 },
    });

    const endCamZ = 8.6;
    const pxPerUnit = window.innerHeight / (2 * Math.tan((35 / 2) * (Math.PI / 180)) * endCamZ);
    const contactInner = document.querySelector('.contact__inner');
    const maxScroll = ScrollTrigger.maxScroll(window);
    const innerTopAtEnd = contactInner
      ? contactInner.getBoundingClientRect().top + window.scrollY - maxScroll
      : window.innerHeight * 0.4;
    const free = Math.min(Math.max(innerTopAtEnd, 0), window.innerHeight);
    const radiusPx = Math.min(Math.max(free * 0.34, 46), 150);
    const centerPx = Math.max(free / 2, radiusPx + 16);
    const finaleY = (window.innerHeight / 2 - centerPx) / pxPerUnit;
    const finaleR = radiusPx / pxPerUnit;

    const align = (from: number, phase: number) => from + ((((phase - from) % TAU) + TAU) % TAU);
    const finaleSpin = align(lastSpin + 5, 5.1);

    const finale: Partial<SceneState> = {
      sx: 0,
      sy: finaleY,
      sScale: finaleR / 1.12,
      sSpin: 3,
      sAmp: 0.14,
      sFreq: 0.9,
      sTwist: 0,
      sRidge: 0,
      sFlow: 0.9,
      sRim: 0.12,
      pMorph: morphOf('halo'),
      px: 0,
      py: finaleY,
      pz: 0,
      pScale: (finaleR * 1.55) / 1.75,
      pTilt: 0,
      pSpin: finaleSpin - 0.6,
      pOpacity: 0.8,
      pFree: 0,
      pSize: 2.2,
      camZ: endCamZ,
    };
    keys.push({
      at: mark('.contact', 'top 70%'),
      state: { ...finale, sScale: 0, pOpacity: 0.35, camZ: 9 },
    });
    keys.push({
      at: () => ScrollTrigger.maxScroll(window),
      state: { ...finale, pSpin: finaleSpin },
    });

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

    stage.camera.position.z = c.camZ;
    stage.camera.position.y = c.camY;
    post.uniforms.uAberration.value = 0.003 + energy * 0.025;
  }
}
