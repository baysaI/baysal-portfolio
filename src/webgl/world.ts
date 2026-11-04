import { device } from '../core/device';
import { createStudioEnvironment } from './environment';
import { Particles } from './particles';
import { Post } from './post';
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

  const post = new Post(stage);
  stage.onUpdate(({ time }) => post.update(time));

  /** Compile every program up-front so the first scroll never hitches. */
  const compile = () => stage.renderer.compileAsync(stage.scene, stage.camera);

  return { stage, sculpture, particles, post, compile };
}

export type World = ReturnType<typeof createWorld>;
