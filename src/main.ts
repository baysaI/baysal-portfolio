import './styles/main.css';
import { createWorld } from './webgl/world';

const canvas = document.querySelector<HTMLCanvasElement>('[data-webgl]');
if (canvas) {
  const world = createWorld(canvas);
  document.documentElement.classList.add('is-ready');
  const loop = () => {
    world.tick();
    requestAnimationFrame(loop);
  };
  loop();
}
