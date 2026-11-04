import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Tier } from '../core/device';
import type { Frame } from './stage';
import noise from './glsl/noise.glsl?raw';

const DETAIL: Record<Tier, number> = { high: 96, medium: 64, low: 40 };

/**
 * The hero object: a liquid-chrome sphere deformed on the GPU by layered
 * simplex noise. Normals are rebuilt per-vertex from neighbouring samples, so
 * reflections stay crisp while the surface flows.
 */
export class Sculpture {
  readonly group = new THREE.Group();
  readonly mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;

  readonly uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.22 },
    uFreq: { value: 1.1 },
    uSpeed: { value: 1 },
    uTwist: { value: 0 },
    uRidge: { value: 0 },
    uRim: { value: 0.6 },
    uRimColor: { value: new THREE.Color(0xff5a1f) },
  };

  /** Shader time advances at a variable rate so scroll can speed the flow up. */
  private flowTime = 0;

  constructor(tier: Tier) {
    let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, DETAIL[tier]);
    geometry.deleteAttribute('normal');
    geometry.deleteAttribute('uv');
    geometry = mergeVertices(geometry);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd9d3ca,
      metalness: 1,
      roughness: 0.16,
      clearcoat: 0.5,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.3,
    });

    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          /* glsl */ `#include <common>
          uniform float uTime;
          uniform float uAmp;
          uniform float uFreq;
          uniform float uTwist;
          uniform float uRidge;
          ${noise}

          vec3 rotY(vec3 p, float a) {
            float s = sin(a), c = cos(a);
            return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
          }

          float field(vec3 b) {
            vec3 q = b * uFreq;
            float t = uTime;
            float n1 = snoise(q + vec3(0.0, t * 0.35, t * 0.18));
            float n2 = snoise(q * 2.1 - vec3(t * 0.22, 0.0, t * 0.3));
            float ridge = 1.0 - abs(n2);
            float detail = mix(n2 * 0.25, ridge * ridge * 0.55 - 0.18, uRidge);
            return (n1 * 0.75 + detail) * uAmp;
          }

          vec3 deform(vec3 b) {
            vec3 p = b * (1.0 + field(b));
            return rotY(p, b.y * uTwist);
          }`,
        )
        .replace(
          '#include <beginnormal_vertex>',
          /* glsl */ `
          vec3 baseDir = normalize(position);
          vec3 helper = abs(baseDir.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
          vec3 tangentDir = normalize(cross(baseDir, helper));
          vec3 bitangentDir = normalize(cross(baseDir, tangentDir));
          const float EPS = 0.008;
          vec3 displacedPosition = deform(baseDir);
          vec3 neighbourA = deform(normalize(baseDir + tangentDir * EPS));
          vec3 neighbourB = deform(normalize(baseDir + bitangentDir * EPS));
          vec3 objectNormal = normalize(cross(neighbourA - displacedPosition, neighbourB - displacedPosition));
          if (dot(objectNormal, displacedPosition) < 0.0) objectNormal = -objectNormal;
          #ifdef USE_TANGENT
            vec3 objectTangent = tangentDir;
          #endif`,
        )
        .replace('#include <begin_vertex>', 'vec3 transformed = displacedPosition;');

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          /* glsl */ `#include <common>
          uniform float uRim;
          uniform vec3 uRimColor;`,
        )
        .replace(
          '#include <opaque_fragment>',
          /* glsl */ `
          float facing = abs(dot(normalize(normal), normalize(vViewPosition)));
          outgoingLight += uRimColor * pow(1.0 - facing, 3.0) * uRim;
          #include <opaque_fragment>`,
        );
    };
    material.customProgramCacheKey = () => 'liquid-chrome';

    this.mesh = new THREE.Mesh(geometry, material);
    this.group.add(this.mesh);
  }

  update({ delta }: Frame) {
    this.flowTime += delta * this.uniforms.uSpeed.value;
    this.uniforms.uTime.value = this.flowTime;
  }
}
