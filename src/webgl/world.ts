import * as THREE from 'three';
import { device } from '../core/device';
import { createStudioEnvironment } from './environment';
import { Particles } from './particles';
import { Sculpture } from './sculpture';
import { Stage } from './stage';

/** Assembles the 3D scene: stage, lighting environment and actors. */
export function createWorld(canvas: HTMLCanvasElement) {
  const stage = new Stage(canvas, device.tier);
  stage.scene.environment = createStudioEnvironment(stage.renderer);

  const sculpture = new Sculpture(device.tier);
  stage.scene.add(sculpture.group);
  stage.onUpdate((frame) => sculpture.update(frame));

  const particles = new Particles(device.tier);
  particles.setPixelRatio(stage.size.dpr);
  stage.scene.add(particles.points);
  stage.onUpdate((frame) => particles.update(frame));
  stage.onResize(() => particles.setPixelRatio(stage.size.dpr));

  const clock = new THREE.Timer();
  const tick = () => {
    clock.update();
    stage.update({ time: clock.getElapsed(), delta: Math.min(clock.getDelta(), 1 / 20) });
  };

  return { stage, sculpture, particles, tick };
}
