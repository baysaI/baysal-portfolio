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
          vec3 skyCol = vec3(0.045, 0.044, 0.043);
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
  panel(12, 5, 0xfff4ea, 3.4, [0, 9, 4]);
  // Twin vertical strip lights — crisp white lines across the chrome.
  panel(0.7, 12, 0xffffff, 4.5, [-5.5, 1, 6]);
  panel(0.7, 12, 0xffffff, 3.2, [6, 1, 5]);
  // Ember strip — the single signature accent, raking from the left-back.
  panel(0.9, 12, 0xff5a1f, 4.2, [-8, 0, -2]);
  // Neutral rim from behind for silhouette separation.
  panel(10, 1, 0xf2ece4, 1.8, [0, 2, -9]);
  // Low frontal fill so faces towards the camera never collapse to black.
  panel(8, 2.5, 0x8f8a83, 0.5, [0, -3, 10]);
  // Floor bounce — gives the underside a soft horizon reflection.
  panel(14, 14, 0xd9d4cc, 0.09, [0, -9, 0]);

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
