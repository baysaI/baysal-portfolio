import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Stage } from './stage';

/** Lens pass: radial chromatic aberration, vignette and animated film grain. */
const LensShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uAberration: { value: 0.004 },
    uVignette: { value: 0.55 },
    uGrain: { value: 0.045 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    // sRGB ink (#0b0b0c) — the floor every pixel is lifted to.
    uLift: { value: new THREE.Vector3(11 / 255, 11 / 255, 12 / 255) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberration;
    uniform float uVignette;
    uniform float uGrain;
    uniform vec2 uResolution;
    uniform vec3 uLift;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      vec2 centered = vUv - 0.5;
      float dist = length(centered);
      vec2 offset = centered * dist * uAberration;

      vec3 color;
      color.r = texture2D(tDiffuse, vUv + offset).r;
      color.g = texture2D(tDiffuse, vUv).g;
      color.b = texture2D(tDiffuse, vUv - offset).b;

      color *= mix(1.0, smoothstep(0.9, 0.25, dist), uVignette);

      float grain = hash(floor(vUv * uResolution) + fract(uTime * 7.0) * 97.0) - 0.5;
      color += grain * uGrain;
      color = uLift + color * (1.0 - uLift);

      gl_FragColor = vec4(color, 1.0);
    }`,
};

export class Post {
  readonly composer: EffectComposer;
  readonly bloom: UnrealBloomPass | null = null;
  readonly lens: ShaderPass;

  constructor(private readonly stage: Stage) {
    const { renderer, scene, camera, size, tier } = stage;
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));

    if (tier !== 'low') {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.55, 0.65, 0.82);
      this.composer.addPass(this.bloom);
    }

    this.composer.addPass(new OutputPass());
    this.lens = new ShaderPass(LensShader);
    this.composer.addPass(this.lens);

    this.resize();
    stage.onResize(() => this.resize());
    stage.setRenderer(() => this.composer.render());
  }

  get uniforms() {
    return this.lens.uniforms as typeof LensShader.uniforms;
  }

  resize() {
    const { width, height, dpr } = this.stage.size;
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(width, height);
    this.uniforms.uResolution.value.set(width * dpr, height * dpr);
  }

  update(time: number) {
    this.uniforms.uTime.value = time;
  }
}
