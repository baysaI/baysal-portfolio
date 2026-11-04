import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Tier } from '../core/device';
import type { Frame } from './stage';
import noise from './glsl/noise.glsl?raw';

const DETAIL: Record<Tier, number> = { high: 96, medium: 64, low: 40 };

export class Sculpture {
  readonly group = new THREE.Group();
  readonly mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;

  readonly uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.16 },
    uFreq: { value: 0.95 },
    uSpeed: { value: 1 },
    uTwist: { value: 0 },
    uRidge: { value: 0 },
    uRim: { value: 0.06 },
    uRimColor: { value: new THREE.Color(0xff5a1f) },

    uPointer: { value: new THREE.Vector3(0, 0, 1) },
    uPointerStrength: { value: 0 },
  };

  private flowTime = 0;

  constructor(tier: Tier) {
    let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, DETAIL[tier]);
    geometry.deleteAttribute('normal');
    geometry.deleteAttribute('uv');
    geometry = mergeVertices(geometry);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe4ded6,
      metalness: 1,
      roughness: 0.12,
      clearcoat: 0.5,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.3,
    });

    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uTime;
          uniform float uAmp;
          uniform float uFreq;
          uniform float uTwist;
          uniform float uRidge;
          uniform vec3 uPointer;
          uniform float uPointerStrength;
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
            float detail = mix(n2 * 0.18, ridge * ridge * 0.55 - 0.18, uRidge);
            return (n1 * 0.75 + detail) * uAmp;
          }

          float touch(vec3 b) {
            float d = distance(b, uPointer);
            float swell = smoothstep(0.95, 0.0, d);
            float ripple = 0.75 + 0.25 * cos(d * 14.0 - uTime * 5.0);
            return swell * swell * ripple * uPointerStrength;
          }

          vec3 deform(vec3 b) {
            vec3 p = b * (1.0 + field(b) + touch(b));
            return rotY(p, b.y * uTwist);
          }`,
        )
        .replace(
          '#include <beginnormal_vertex>',
          `
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
          `#include <common>
          uniform float uRim;
          uniform vec3 uRimColor;`,
        )
        .replace(
          '#include <opaque_fragment>',
          `
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
