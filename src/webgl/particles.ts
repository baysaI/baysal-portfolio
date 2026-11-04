import * as THREE from 'three';
import type { Tier } from '../core/device';
import noise from './glsl/noise.glsl?raw';
import { createRng, SHAPES, SHAPE_ORDER } from './shapes';
import type { Frame } from './stage';

const COUNT: Record<Tier, number> = { high: 26000, medium: 14000, low: 7000 };
const LAST = SHAPE_ORDER.length - 1;

const shapeAttribute = (i: number) => (i === 0 ? 'position' : `aShape${i}`);

const vertexShader = `
  ${SHAPE_ORDER.slice(1)
    .map((_, i) => `attribute vec3 aShape${i + 1};`)
    .join('\n')}
  attribute vec4 aRand;

  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTurbulence;
  uniform float uScatter;

  varying float vAlpha;
  varying float vTint;

  ${noise}

  vec3 shapeAt(int i) {
    ${SHAPE_ORDER.map((_, i) => `if (i == ${i}) return ${shapeAttribute(i)};`).join('\n    ')}
    return position;
  }

  void main() {
    float m = clamp(uMorph, 0.0, ${LAST}.0);
    float base = min(floor(m), ${LAST - 1}.0);
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

    float t = uTime * 0.22;
    vec3 drift = vec3(
      snoise(p * 0.55 + vec3(t, 0.0, aRand.w * 10.0)),
      snoise(p * 0.55 + vec3(0.0, t, 7.0)),
      snoise(p * 0.55 + vec3(3.0, 0.0, t))
    );
    p += drift * (0.035 + uTurbulence);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = uSize * mix(0.45, 1.3, aRand.z);
    gl_PointSize = size * uPixelRatio * (8.0 / -mvPosition.z);

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aRand.x * 40.0);
    vAlpha = mix(0.3, 1.0, aRand.y) * twinkle;
    vTint = step(0.9, aRand.w);
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 color = mix(uColorA, uColorB, vTint);
    gl_FragColor = vec4(color, a * vAlpha * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class Particles {
  readonly points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  readonly count: number;

  readonly uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: 2.2 },
    uPixelRatio: { value: 1 },
    uTurbulence: { value: 0 },
    uScatter: { value: 1 },
    uOpacity: { value: 1 },
    uColorA: { value: new THREE.Color(0xede9e3) },
    uColorB: { value: new THREE.Color(0xff5a1f) },
  };

  constructor(tier: Tier) {
    this.count = COUNT[tier];
    const geometry = new THREE.BufferGeometry();

    SHAPE_ORDER.forEach((name, i) => {
      const data = SHAPES[name](this.count, createRng(1000 + i * 77));
      geometry.setAttribute(shapeAttribute(i), new THREE.BufferAttribute(data, 3));
    });

    const rng = createRng(42);
    const rand = new Float32Array(this.count * 4);
    for (let i = 0; i < rand.length; i++) rand[i] = rng();
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));

    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
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
