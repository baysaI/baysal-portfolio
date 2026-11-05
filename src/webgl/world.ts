import { device } from '../core/device';
import { loadAssets } from './assets';
import { createStudioEnvironment } from './environment';
import { PARTICLE_COUNT, Particles } from './particles';
import { Post } from './post';
import { Screens } from './screens';
import { Sculpture } from './sculpture';
import {
  activityMap,
  browserWindow,
  createRng,
  journeyGraph,
  projectScreen,
  signature,
} from './shapes';
import { Stage } from './stage';

export interface Layout {
  browser: number;
  activity: number;
  firstProject: number;
  projects: number;
  journey: number;
  signature: number;
}

export async function createWorld(canvas: HTMLCanvasElement) {
  const stage = new Stage(canvas, device.tier);
  stage.scene.environment = createStudioEnvironment(stage.renderer);

  const sculpture = new Sculpture(device.tier);
  stage.scene.add(sculpture.group);
  stage.onUpdate((frame) => sculpture.update(frame));

  const assets = await loadAssets();
  const count = PARTICLE_COUNT[device.tier];
  const rng = (i: number) => createRng(1000 + i * 77);
  const screens = assets.screens.map((source, i) => projectScreen(count, rng(2 + i), source));
  const formations = [
    browserWindow(count, rng(0)),
    activityMap(count, rng(1)),
    ...screens,
    journeyGraph(count, rng(20)),
    signature(count, rng(21), assets.signature),
  ];
  const layout: Layout = {
    browser: 0,
    activity: 1,
    firstProject: 2,
    projects: screens.length,
    journey: 2 + screens.length,
    signature: 3 + screens.length,
  };

  const particles = new Particles(
    count,
    formations,
    [layout.firstProject, layout.firstProject + layout.projects - 1],
    layout.journey,
  );
  particles.setPixelRatio(stage.size.dpr);
  stage.scene.add(particles.points);
  stage.onUpdate((frame) => particles.update(frame));
  stage.onResize(() => particles.setPixelRatio(stage.size.dpr));

  const projectScreens = new Screens(
    screens.map((formation, i) => ({
      image: assets.screens[i].image,
      rect: formation.screen ?? { x: 0, y: 0, w: 1, h: 1 },
    })),
    layout.firstProject,
  );
  particles.points.add(projectScreens.group);

  const post = new Post(stage);
  stage.onUpdate(({ time }) => post.update(time));

  const compile = () => stage.renderer.compileAsync(stage.scene, stage.camera);

  return { stage, sculpture, particles, screens: projectScreens, post, layout, compile };
}

export type World = Awaited<ReturnType<typeof createWorld>>;
