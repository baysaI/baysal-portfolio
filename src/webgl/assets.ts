import { projects, site } from '../content/site';
import type { ScreenSource, SignatureSource } from './shapes';

const fallbackImage = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 10;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1a1a1b';
    ctx.fillRect(0, 0, 16, 10);
  }
  return canvas;
};

const loadImage = async (src: string) => {
  const img = new Image();
  img.decoding = 'async';
  img.src = new URL(src, document.baseURI).href;
  try {
    await img.decode();
    return img;
  } catch {
    return null;
  }
};

const loadScreens = () =>
  Promise.all(
    projects.map(async (project): Promise<ScreenSource> => {
      const img = await loadImage(project.image);
      const image = img ?? fallbackImage();
      return {
        image,
        width: img?.naturalWidth ?? 16,
        height: img?.naturalHeight ?? 10,
        device: project.device,
      };
    }),
  );

const loadSignature = async (): Promise<SignatureSource | null> => {
  const family = '"Instrument Serif", Georgia, serif';
  try {
    await document.fonts.load(`italic 200px ${family}`);
  } catch {
    return null;
  }
  const [first, ...rest] = site.name.split(' ');
  const second = rest.join(' ');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const size = 200;
  ctx.font = `italic ${size}px ${family}`;
  const gap = size * 0.28;
  const w1 = ctx.measureText(first).width;
  const w2 = ctx.measureText(second).width;
  canvas.width = Math.ceil(w1 + gap + w2 + size * 0.4);
  canvas.height = Math.ceil(size * 1.35);
  ctx.font = `italic ${size}px ${family}`;
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'alphabetic';
  const x0 = size * 0.2;
  const baseline = size * 1.0;
  ctx.fillText(first, x0, baseline);
  ctx.fillText(second, x0 + w1 + gap, baseline);
  return {
    mask: ctx.getImageData(0, 0, canvas.width, canvas.height),
    split: (x0 + w1 + gap * 0.5) / canvas.width,
  };
};

export async function loadAssets() {
  const [screens, signature] = await Promise.all([loadScreens(), loadSignature()]);
  return { screens, signature };
}
