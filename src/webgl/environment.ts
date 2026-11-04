import * as THREE from 'three';

/**
 * A procedural "photo studio" baked into a PMREM environment map.
 * Emissive panels act as softboxes; the chrome sculpture reflects them,
 * which is what sells the liquid-metal look — no HDR download required.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene();

  // Dark, slightly warm cyclorama.
  const room = new THREE.Mesh(
    new THREE.SphereGeometry(20, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          float h = vDir.y * 0.5 + 0.5;
          vec3 floorCol = vec3(0.012, 0.011, 0.010);
          vec3 skyCol = vec3(0.055, 0.050, 0.046);
          gl_FragColor = vec4(mix(floorCol, skyCol, smoothstep(0.2, 0.9, h)), 1.0);
        }`,
    }),
  );
  env.add(room);

  const panel = (
    w: number,
    h: number,
    color: THREE.ColorRepresentation,
    intensity: number,
    position: [number, number, number],
  ) => {
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    material.color.multiplyScalar(intensity);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(...position);
    mesh.lookAt(0, 0, 0);
    env.add(mesh);
    return mesh;
  };

  // Key: large warm softbox overhead, slightly in front.
  panel(14, 6, 0xfff3e6, 2.6, [0, 9, 3]);
  // Ember strip — the signature reflection along the left flank.
  panel(1.2, 14, 0xff5a1f, 7, [-8, 0, 2]);
  // Cool-neutral strip on the right for separation.
  panel(1, 12, 0xdfe6ee, 2.2, [8, 1, -1]);
  // Rim from behind.
  panel(10, 1.2, 0xff7a45, 3.2, [0, 2, -9]);
  // Subtle frontal fill so faces towards the camera never go fully black.
  panel(8, 3, 0x9a948c, 0.6, [0, -2, 10]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(env, 0.035);
  pmrem.dispose();
  env.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });

  return target.texture;
}
