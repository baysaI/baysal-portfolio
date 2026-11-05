import * as THREE from 'three';
import type { Tier } from '../core/device';
import noise from './glsl/noise.glsl?raw';
import type { Formation } from './shapes';
import type { Frame } from './stage';

export const PARTICLE_COUNT: Record<Tier, number> = { high: 26000, medium: 16000, low: 9000 };

const positionAttribute = (i: number) => (i === 0 ? 'position' : `aShape${i}`);
const colorSlot = (i: number) => `aCol${Math.floor(i / 4)}.${'xyzw'[i % 4]}`;

const vertexShader = (shapes: number, imageFrom: number, imageTo: number, journey: number) => {
  const last = shapes - 1;
  const colorGroups = Math.ceil(shapes / 4);
  return `
  ${Array.from({ length: shapes - 1 }, (_, i) => `attribute vec3 aShape${i + 1};`).join('\n')}
  ${Array.from({ length: colorGroups }, (_, i) => `attribute vec4 aCol${i};`).join('\n')}
  attribute vec4 aRand;

  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTurbulence;
  uniform float uScatter;
  uniform float uImageFade;
  uniform float uReveal;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vAlpha;
  varying vec3 vColor;

  ${noise}

  vec3 shapeAt(int i) {
    ${Array.from({ length: shapes }, (_, i) => `if (i == ${i}) return ${positionAttribute(i)};`).join('\n    ')}
    return position;
  }

  float colorAt(int i) {
    ${Array.from({ length: shapes }, (_, i) => `if (i == ${i}) return ${colorSlot(i)};`).join('\n    ')}
    return -1.0;
  }

  vec3 unpack(float v, vec3 fallback) {
    if (v < 0.0) return fallback;
    float r = floor(v / 65536.0);
    float g = floor((v - r * 65536.0) / 256.0);
    float b = v - r * 65536.0 - g * 256.0;
    return pow(vec3(r, g, b) / 255.0, vec3(2.2));
  }

  void main() {
    float m = clamp(uMorph, 0.0, ${last}.0);
    float base = min(floor(m), ${Math.max(0, last - 1)}.0);
    float f = m - base;
    int i0 = int(base);

    float delay = aRand.x * 0.45;
    float k = smoothstep(delay, delay + 0.55, f);
    vec3 p = mix(shapeAt(i0), shapeAt(i0 + 1), k);

    float transit = sin(k * 3.14159265);
    vec3 burst = vec3(
      snoise(p * 0.8 + aRand.y * 5.0),
      snoise(p * 0.8 + 13.1 + aRand.z * 5.0),
      snoise(p * 0.8 + 27.3 + aRand.w * 5.0)
    );
    p += burst * transit * 0.55 * uScatter;

    float onJourney = 1.0 - smoothstep(0.0, 0.6, abs(m - ${journey}.0));
    float unseen = smoothstep(uReveal - 0.02, uReveal + 0.2, ${positionAttribute(journey)}.x) * onJourney;
    float pen = step(aRand.x, 0.018);
    vec3 penTip = vec3(uReveal + 0.05, 0.0, 0.0) + (aRand.yzw - 0.5) * vec3(0.16, 0.16, 0.12);
    p = mix(p, penTip, unseen * pen);

    int nearest = int(floor(m + 0.5));
    float settled = 1.0 - smoothstep(0.0, 0.25, abs(m - float(nearest)));

    float t = uTime * 0.22;
    vec3 drift = vec3(
      snoise(p * 0.55 + vec3(t, 0.0, aRand.w * 10.0)),
      snoise(p * 0.55 + vec3(0.0, t, 7.0)),
      snoise(p * 0.55 + vec3(3.0, 0.0, t))
    );
    p += drift * (0.035 * (1.0 - settled * 0.8) + uTurbulence);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float c0 = colorAt(i0);
    float c1 = colorAt(i0 + 1);
    vec3 fallback = mix(uColorA, uColorB, step(0.92, aRand.w));
    vColor = mix(unpack(c0, fallback), unpack(c1, fallback), k);
    float custom = mix(step(0.0, c0), step(0.0, c1), k);

    float size = uSize * mix(mix(0.45, 1.3, aRand.z), 0.95, custom);
    gl_PointSize = size * uPixelRatio * (8.0 / -mvPosition.z);

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aRand.x * 40.0);
    vAlpha = mix(mix(0.3, 1.0, aRand.y) * twinkle, 0.95, custom);

    float nearestColor = colorAt(nearest);
    float isPixel = (nearest >= ${imageFrom} && nearest <= ${imageTo} && nearestColor >= 0.0) ? 1.0 : 0.0;
    vAlpha *= 1.0 - isPixel * uImageFade * 0.88;

    vColor = mix(vColor, uColorB, unseen * pen);
    vAlpha *= mix(1.0, pen * 0.6, unseen);
  }
`;
};

const fragmentShader = `
  uniform float uOpacity;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class Particles {
  readonly points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;

  readonly uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: 2.2 },
    uPixelRatio: { value: 1 },
    uTurbulence: { value: 0 },
    uScatter: { value: 1 },
    uImageFade: { value: 0 },
    uReveal: { value: 99 },
    uOpacity: { value: 1 },
    uColorA: { value: new THREE.Color(0xede9e3) },
    uColorB: { value: new THREE.Color(0xff5a1f) },
  };

  constructor(
    readonly count: number,
    formations: Formation[],
    imageRange: [number, number],
    journey: number,
    seed = 42,
  ) {
    const geometry = new THREE.BufferGeometry();
    formations.forEach((formation, i) => {
      geometry.setAttribute(
        positionAttribute(i),
        new THREE.BufferAttribute(formation.positions, 3),
      );
    });

    const groups = Math.ceil(formations.length / 4);
    for (let g = 0; g < groups; g++) {
      const packed = new Float32Array(count * 4).fill(-1);
      for (let c = 0; c < 4; c++) {
        const formation = formations[g * 4 + c];
        if (!formation) continue;
        for (let i = 0; i < count; i++) packed[i * 4 + c] = formation.colors[i];
      }
      geometry.setAttribute(`aCol${g}`, new THREE.BufferAttribute(packed, 4));
    }

    let s = seed >>> 0;
    const rand = new Float32Array(count * 4);
    for (let i = 0; i < rand.length; i++) {
      s = (s * 1664525 + 1013904223) >>> 0;
      rand[i] = s / 4294967296;
    }
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader(formations.length, imageRange[0], imageRange[1], journey),
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = false;
  }

  setPixelRatio(dpr: number) {
    this.uniforms.uPixelRatio.value = dpr;
  }

  update({ time }: Frame) {
    this.uniforms.uTime.value = time;
  }
}
