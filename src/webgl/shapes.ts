import { dailyCommits, repoActivity } from '../content/activity';
import type { Device } from '../content/site';

export type Rng = () => number;
type Point = [number, number, number, number];

export interface ScreenRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Formation {
  positions: Float32Array;
  colors: Float32Array;
  screen?: ScreenRect;
}

export interface ScreenSource {
  image: CanvasImageSource;
  width: number;
  height: number;
  device: Device;
}

export interface SignatureSource {
  mask: ImageData;
  split: number;
}

export const DEFAULT_COLOR = -1;
const BONE = 0xede9e3;
const EMBER = 0xff5a1f;
const STONE = 0x5d5a56;
const ASH = 0x34322f;

export const createRng = (seed = 1337): Rng => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const TAU = Math.PI * 2;

const gaussian = (rng: Rng) => {
  const u = 1 - rng();
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
};

const rotateX = (p: Point, a: number): Point => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c, p[3]];
};

const mixHex = (a: number, b: number, t: number) => {
  const k = Math.min(1, Math.max(0, t));
  const ch = (shift: number) =>
    Math.round(((a >> shift) & 255) * (1 - k) + ((b >> shift) & 255) * k);
  return (ch(16) << 16) | (ch(8) << 8) | ch(0);
};

const packRgb = (r: number, g: number, b: number) =>
  (Math.min(255, Math.round(r)) << 16) |
  (Math.min(255, Math.round(g)) << 8) |
  Math.min(255, Math.round(b));

class Builder {
  readonly positions: Float32Array;
  readonly colors: Float32Array;
  private i = 0;

  constructor(readonly count: number) {
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count).fill(DEFAULT_COLOR);
  }

  get remaining() {
    return this.count - this.i;
  }

  push([x, y, z, color]: Point) {
    if (this.i >= this.count) return;
    this.positions.set([x, y, z], this.i * 3);
    this.colors[this.i] = color;
    this.i++;
  }

  fillWith(n: number, sample: () => Point) {
    const end = Math.min(this.count, this.i + Math.max(0, Math.floor(n)));
    while (this.i < end) this.push(sample());
  }

  done(sample: () => Point, screen?: ScreenRect): Formation {
    while (this.i < this.count) this.push(sample());
    return { positions: this.positions, colors: this.colors, screen };
  }
}

const jitter = (rng: Rng, s: number) => gaussian(rng) * s;

const onSegment = (
  rng: Rng,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color = DEFAULT_COLOR,
  thick = 0.006,
): Point => {
  const t = rng();
  return [
    x0 + (x1 - x0) * t + jitter(rng, thick),
    y0 + (y1 - y0) * t + jitter(rng, thick),
    jitter(rng, thick),
    color,
  ];
};

const onRoundedRect = (
  rng: Rng,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
  color = DEFAULT_COLOR,
  thick = 0.006,
): Point => {
  const sw = Math.max(0, w - 2 * r);
  const sh = Math.max(0, h - 2 * r);
  const arc = (Math.PI / 2) * r;
  const total = 2 * sw + 2 * sh + 4 * arc;
  let s = rng() * total;
  const hw = w / 2;
  const hh = h / 2;
  let x: number;
  let y: number;
  const corner = (ox: number, oy: number, a0: number) => {
    const a = a0 + (s / arc) * (Math.PI / 2);
    return [ox + Math.cos(a) * r, oy + Math.sin(a) * r];
  };
  if ((s -= sw) < 0) [x, y] = [-hw + r + (s + sw), hh];
  else if ((s -= arc) < 0)
    [x, y] = corner(hw - r, hh - r, Math.PI / 2 - Math.PI / 2 + 0) as [number, number];
  else if ((s -= sh) < 0) [x, y] = [hw, hh - r + s];
  else if ((s -= arc) < 0) [x, y] = corner(hw - r, -hh + r, -Math.PI / 2);
  else if ((s -= sw) < 0) [x, y] = [hw - r + s, -hh];
  else if ((s -= arc) < 0) [x, y] = corner(-hw + r, -hh + r, Math.PI);
  else if ((s -= sh) < 0) [x, y] = [-hw, -hh + r - s];
  else [x, y] = corner(-hw + r, hh - r, Math.PI / 2);
  return [cx + x + jitter(rng, thick), cy + y + jitter(rng, thick), jitter(rng, thick), color];
};

const inDisc = (rng: Rng, cx: number, cy: number, r: number, color = DEFAULT_COLOR): Point => {
  const a = rng() * TAU;
  const d = Math.sqrt(rng()) * r;
  return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, jitter(rng, 0.004), color];
};

export function browserWindow(count: number, rng: Rng): Formation {
  const b = new Builder(count);
  const w = 7;
  const h = 4.3;
  const bar = 0.42;
  const top = h / 2;
  const left = -w / 2;
  b.fillWith(count * 0.24, () => onRoundedRect(rng, 0, 0, w, h, 0.16, BONE, 0.007));
  b.fillWith(count * 0.05, () => onSegment(rng, left, top - bar, -left, top - bar, BONE));
  [EMBER, BONE, BONE].forEach((color, i) => {
    b.fillWith(count * 0.012, () =>
      inDisc(rng, left + 0.32 + i * 0.24, top - bar / 2, 0.065, color),
    );
  });
  b.fillWith(count * 0.05, () =>
    onRoundedRect(rng, 0.2, top - bar / 2, w * 0.42, bar * 0.48, bar * 0.24, STONE),
  );
  const lines: Array<[number, number, number]> = [
    [-3.05, -0.95, -1.15],
    [-3.05, -1.25, -1.45],
    [-3.05, -0.25, -1.55],
    [-3.05, -0.75, -1.75],
  ];
  for (const [x0, x1, y] of lines)
    b.fillWith(count * 0.02, () => onSegment(rng, x0, y, x1, y, STONE, 0.012));
  const step = 0.35;
  const cols = Math.floor((w - 0.5) / step);
  const rows = Math.floor((h - bar - 0.4) / step);
  return b.done(() => {
    const cx = left + 0.25 + Math.floor(rng() * (cols + 1)) * step;
    const cy = top - bar - 0.25 - Math.floor(rng() * (rows + 1)) * step;
    return [cx + jitter(rng, 0.006), cy + jitter(rng, 0.006), jitter(rng, 0.01), ASH];
  });
}

export function activityMap(count: number, rng: Rng): Formation {
  const b = new Builder(count);
  const weeks = Math.ceil(dailyCommits.length / 7);
  const cell = 0.1;
  const size = cell * 0.78;
  const max = Math.max(...dailyCommits);
  const scale = Math.log2(1 + max);
  const cells = dailyCommits.map((c, i) => {
    const week = Math.floor(i / 7);
    const day = i % 7;
    const t = c > 0 ? Math.log2(1 + c) / scale : 0;
    return {
      x: (week - (weeks - 1) / 2) * cell,
      z: (day - 3) * cell,
      c,
      t,
      h: c > 0 ? 0.06 + t * 1.5 : 0,
    };
  });
  const place = (p: Point): Point => {
    const r = rotateX([p[0], p[1] - 0.45, p[2], p[3]], 0.5);
    return r;
  };
  for (const cl of cells) {
    b.fillWith(count * (0.34 / cells.length), () => {
      const edge = rng() < 0.6;
      let x = (rng() - 0.5) * size;
      let z = (rng() - 0.5) * size;
      if (edge) {
        if (rng() < 0.5) x = Math.sign(x || 1) * (size / 2);
        else z = Math.sign(z || 1) * (size / 2);
      }
      return place([cl.x + x, 0, cl.z + z, cl.c > 0 ? mixHex(STONE, EMBER, 0.45) : STONE]);
    });
  }
  const active = cells.filter((cl) => cl.c > 0);
  const weight = active.reduce((a, cl) => a + cl.h + 0.05, 0);
  for (const cl of active) {
    const n = (count * 0.66 * (cl.h + 0.05)) / weight;
    b.fillWith(n, () => {
      const top = rng() < 0.3;
      const y = top ? cl.h : rng() * cl.h;
      let x = (rng() - 0.5) * size;
      let z = (rng() - 0.5) * size;
      if (!top) {
        if (rng() < 0.5) x = Math.sign(x || 1) * (size / 2);
        else z = Math.sign(z || 1) * (size / 2);
      }
      const color = mixHex(BONE, EMBER, top ? 0.4 + cl.t * 0.6 : (y / 1.56) * 0.9 + cl.t * 0.2);
      return place([cl.x + x, y, cl.z + z, color]);
    });
  }
  return b.done(() => place([(rng() - 0.5) * weeks * cell, 0, (rng() - 0.5) * 7 * cell, ASH]));
}

const deviceFrame = (b: Builder, rng: Rng, n: number, device: Device, w: number, h: number) => {
  const part = (share: number, sample: () => Point) => b.fillWith(n * share, sample);
  if (device === 'browser') {
    const bar = h * 0.085;
    const top = h / 2 + bar;
    part(0.5, () => onRoundedRect(rng, 0, bar / 2, w + 0.02, h + bar + 0.02, 0.07, BONE));
    part(0.14, () => onSegment(rng, -w / 2, h / 2, w / 2, h / 2, BONE));
    [EMBER, BONE, BONE].forEach((color, i) =>
      part(0.04, () => inDisc(rng, -w / 2 + 0.16 + i * 0.13, top - bar / 2, 0.035, color)),
    );
    part(0.24, () =>
      onRoundedRect(rng, 0.1, top - bar / 2, w * 0.44, bar * 0.5, bar * 0.25, STONE),
    );
  } else if (device === 'phone') {
    part(0.62, () => onRoundedRect(rng, 0, 0, w + 0.16, h + 0.34, 0.24, BONE, 0.008));
    part(0.14, () => onRoundedRect(rng, 0, h / 2 + 0.085, 0.4, 0.07, 0.035, BONE));
    part(0.12, () => onSegment(rng, -0.28, -h / 2 - 0.09, 0.28, -h / 2 - 0.09, STONE));
    part(0.12, () => onRoundedRect(rng, 0, 0, w + 0.02, h + 0.02, 0.08, STONE, 0.004));
  } else if (device === 'tv') {
    part(0.6, () => onRoundedRect(rng, 0, 0, w + 0.4, h + 0.4, 0.22, BONE, 0.008));
    part(0.25, () => onRoundedRect(rng, 0, 0, w + 0.03, h + 0.03, 0.05, STONE, 0.005));
    part(0.05, () => inDisc(rng, w / 2 + 0.06, -h / 2 - 0.11, 0.03, EMBER));
    part(0.1, () => onSegment(rng, -w * 0.22, -h / 2 - 0.42, w * 0.22, -h / 2 - 0.42, STONE, 0.01));
  } else {
    part(0.52, () => onRoundedRect(rng, 0, 0, w + 0.14, h + 0.14, 0.05, BONE, 0.007));
    part(0.18, () => onSegment(rng, 0, -h / 2 - 0.07, 0, -h / 2 - 0.45, BONE, 0.02));
    part(0.2, () => onRoundedRect(rng, 0, -h / 2 - 0.47, w * 0.34, 0.05, 0.025, BONE));
    part(0.1, () => inDisc(rng, 0, -h / 2 - 0.035, 0.022, EMBER));
  }
};

export function projectScreen(count: number, rng: Rng, source: ScreenSource): Formation {
  const b = new Builder(count);
  const aspect = source.width / source.height;
  const tall = aspect < 1;
  const h = tall ? 3.3 : 3.55 / aspect;
  const w = h * aspect;
  const frameShare = 0.16;
  const pixels = Math.floor(count * (1 - frameShare));
  const cols = Math.max(2, Math.round(Math.sqrt(pixels * aspect)));
  const rows = Math.max(2, Math.floor(pixels / cols));

  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let data: Uint8ClampedArray | null = null;
  if (ctx) {
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source.image, 0, 0, cols, rows);
    data = ctx.getImageData(0, 0, cols, rows).data;
  }

  const order = Array.from({ length: cols * rows }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (const idx of order) {
    const cx = idx % cols;
    const cy = Math.floor(idx / cols);
    const k = idx * 4;
    const color = data
      ? packRgb(data[k] * 1.08 + 6, data[k + 1] * 1.08 + 6, data[k + 2] * 1.08 + 6)
      : BONE;
    b.push([
      ((cx + 0.5) / cols - 0.5) * w + jitter(rng, 0.002),
      (0.5 - (cy + 0.5) / rows) * h + jitter(rng, 0.002),
      jitter(rng, 0.004),
      color,
    ]);
  }

  deviceFrame(b, rng, b.remaining, source.device, w, h);
  return b.done(() => onRoundedRect(rng, 0, 0, w, h, 0.05, BONE), { x: 0, y: 0, w, h });
}

const JOURNEY_SPAN = 7.4;
const JOURNEY_LANE = 0.24;
const JOURNEY_BEND = 0.28;
const journeyWeeks = repoActivity[0]?.weekly.length ?? 49;
const journeyWeekOf = (date: string) =>
  Math.floor((Date.parse(date) - Date.parse('2025-12-01')) / (7 * 864e5));
const journeyXOf = (week: number) => (week / Math.max(1, journeyWeeks - 1) - 0.5) * JOURNEY_SPAN;
const journeyLanes = repoActivity.map(
  (_, i) => (i % 2 === 0 ? 1 : -1) * (Math.floor(i / 2) + 1) * JOURNEY_LANE,
);

export const journeyX = (date: string) =>
  journeyXOf(Math.min(Math.max(journeyWeekOf(date), 0), journeyWeeks - 1));

export const journeyBounds = () => {
  const top = Math.max(0, ...journeyLanes) + 0.18;
  const bottom = Math.min(0, ...journeyLanes) - 0.18;
  return {
    width: JOURNEY_SPAN + JOURNEY_BEND + 0.3,
    height: top - bottom,
    centerX: JOURNEY_BEND / 2,
    centerY: (top + bottom) / 2,
  };
};

export function journeyGraph(count: number, rng: Rng): Formation {
  const b = new Builder(count);
  const span = JOURNEY_SPAN;
  const xOf = journeyXOf;
  const weekOf = journeyWeekOf;
  const repos = [...repoActivity].sort((a, b) => a.first.localeCompare(b.first));
  const lanes = journeyLanes;
  const maxCommits = Math.max(...repos.flatMap((r) => r.weekly));
  const ease = (t: number) => t * t * (3 - 2 * t);

  b.fillWith(count * 0.1, () => onSegment(rng, -span / 2, 0, span / 2, 0, BONE, 0.008));

  const curves = repos.map((repo, i) => {
    const s = weekOf(repo.first);
    const e = Math.max(s + 1, weekOf(repo.last));
    const lane = lanes[i];
    const x0 = xOf(s);
    const x1 = xOf(e);
    const bend = JOURNEY_BEND;
    const at = (t: number): [number, number] => {
      const x = x0 + (x1 + bend - x0) * t;
      let y = lane;
      if (x < x0 + bend) y = lane * ease((x - x0) / bend);
      else if (x > x1) y = lane * (1 - ease((x - x1) / bend));
      return [x, y];
    };
    return { repo, lane, at, length: x1 - x0 + bend };
  });

  const totalLength = curves.reduce((a, c) => a + c.length, 0);
  for (const c of curves) {
    b.fillWith((count * 0.32 * c.length) / totalLength, () => {
      const [x, y] = c.at(rng());
      return [
        x + jitter(rng, 0.006),
        y + jitter(rng, 0.006),
        c.lane * 0.25 + jitter(rng, 0.006),
        STONE,
      ];
    });
  }

  const nodes = curves.flatMap((c) =>
    c.repo.weekly.map((n, week) => ({ n, week, c })).filter((node) => node.n > 0),
  );
  const nodeWeight = nodes.reduce((a, node) => a + Math.sqrt(node.n), 0);
  for (const node of nodes) {
    const t = Math.log2(1 + node.n) / Math.log2(1 + maxCommits);
    const radius = 0.035 + t * 0.12;
    const x = xOf(node.week);
    const color = mixHex(BONE, EMBER, 0.25 + t * 0.75);
    b.fillWith((count * 0.58 * Math.sqrt(node.n)) / nodeWeight, () => {
      const p = inDisc(rng, x, node.c.lane, radius, color);
      return [p[0], p[1], node.c.lane * 0.25 + jitter(rng, radius * 0.4), color];
    });
  }

  return b.done(() => onSegment(rng, -span / 2, 0, span / 2, 0, BONE, 0.008));
}

export function signature(count: number, rng: Rng, source: SignatureSource | null): Formation {
  const b = new Builder(count);
  if (!source) {
    return b.done(() => onRoundedRect(rng, 0, 0, 4, 0.9, 0.45, BONE));
  }
  const { mask, split } = source;
  const pts: Array<[number, number]> = [];
  const { width, height, data } = mask;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  const worldW = 4.6;
  const unit = worldW / width;
  const toWorld = (x: number, y: number): Point => {
    const wx = (x - width / 2) * unit;
    const wy = (height / 2 - y) * unit;
    return [wx, wy, jitter(rng, 0.008), x / width > split ? EMBER : BONE];
  };
  if (pts.length === 0) return b.done(() => onRoundedRect(rng, 0, 0, 4, 0.9, 0.45, BONE));
  b.fillWith(count * 0.9, () => {
    const [x, y] = pts[Math.floor(rng() * pts.length)];
    return toWorld(x + rng() - 0.5, y + rng() - 0.5);
  });
  const baseline = -height * 0.3 * unit;
  return b.done(() => {
    const t = rng();
    const x = (t - 0.5) * worldW * 0.92;
    const y = baseline - 0.06 + Math.sin(t * Math.PI) * -0.05;
    return [
      x + jitter(rng, 0.005),
      y + jitter(rng, 0.005),
      jitter(rng, 0.005),
      mixHex(BONE, EMBER, t),
    ];
  });
}
