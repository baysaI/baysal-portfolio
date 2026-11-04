export const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  nx: 0,
  ny: 0,
  sx: 0,
  sy: 0,
  active: false,
};

window.addEventListener(
  'pointermove',
  (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ny = -((e.clientY / window.innerHeight) * 2 - 1);
    pointer.active = true;
  },
  { passive: true },
);

document.documentElement.addEventListener('pointerleave', () => {
  pointer.active = false;
});

export function updatePointer(delta: number) {
  const k = 1 - Math.exp(-delta * 4);
  pointer.sx += (pointer.nx - pointer.sx) * k;
  pointer.sy += (pointer.ny - pointer.sy) * k;
}
