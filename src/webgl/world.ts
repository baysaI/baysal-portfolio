import * as THREE from 'three';
import { device } from '../core/device';
import { createStudioEnvironment } from './environment';
import { Sculpture } from './sculpture';
import { Stage } from './stage';

/** Assembles the 3D scene: stage, lighting environment and actors. */
export function createWorld(canvas: HTMLCanvasElement) {
  const stage = new Stage(canvas, device.tier);
  stage.scene.environment = createStudioEnvironment(stage.renderer);

  const sculpture = new Sculpture(device.tier);
  stage.scene.add(sculpture.group);
  stage.onUpdate((frame) => sculpture.update(frame));

  const clock = new THREE.Timer();
  const tick = () => {
    clock.update();
    stage.update({ time: clock.getElapsed(), delta: Math.min(clock.getDelta(), 1 / 20) });
  };

  return { stage, sculpture, tick };
}
