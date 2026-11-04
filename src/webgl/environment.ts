import * as THREE from 'three';

export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene();

  const room = new THREE.Mesh(
    new THREE.SphereGeometry(20, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
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

  panel(12, 5, 0xfff4ea, 3.4, [0, 9, 4]);

  panel(0.7, 12, 0xffffff, 4.5, [-5.5, 1, 6]);
  panel(0.7, 12, 0xffffff, 3.2, [6, 1, 5]);

  panel(0.9, 12, 0xff5a1f, 4.2, [-8, 0, -2]);

  panel(10, 1, 0xf2ece4, 1.8, [0, 2, -9]);

  panel(8, 2.5, 0x8f8a83, 0.5, [0, -3, 10]);

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
