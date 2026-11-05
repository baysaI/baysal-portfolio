import * as THREE from 'three';
import type { ScreenRect } from './shapes';

export interface ScreenItem {
  image: CanvasImageSource;
  rect: ScreenRect;
}

export class Screens {
  readonly group = new THREE.Group();
  private readonly meshes: Array<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>> = [];

  constructor(
    items: ScreenItem[],
    private readonly firstShape: number,
  ) {
    for (const { image, rect } of items) {
      const texture = new THREE.Texture(image as HTMLImageElement);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        toneMapped: false,
        depthWrite: false,
      });
      material.color.setScalar(0.84);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(rect.w, rect.h), material);
      mesh.position.set(rect.x, rect.y, 0.012);
      mesh.renderOrder = 2;
      mesh.visible = false;
      this.group.add(mesh);
      this.meshes.push(mesh);
    }
  }

  update(morph: number, amount: number) {
    const nearest = Math.round(morph);
    const settle = Math.max(0, 1 - Math.abs(morph - nearest) / 0.14);
    const fade = amount * settle * settle;
    this.meshes.forEach((mesh, i) => {
      const opacity = i === nearest - this.firstShape ? fade : 0;
      mesh.material.opacity = opacity;
      mesh.visible = opacity > 0.004;
    });
    return nearest >= this.firstShape && nearest < this.firstShape + this.meshes.length ? fade : 0;
  }
}
