type Rng = () => number;
type Generator = (count: number, rng: Rng) => Float32Array;

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

const unitVector = (rng: Rng): [number, number, number] => {
  const z = rng() * 2 - 1;
  const a = rng() * TAU;
  const r = Math.sqrt(1 - z * z);
  return [r * Math.cos(a), z, r * Math.sin(a)];
};

const rotateX = (p: number[], a: number) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
};

const rotateY = (p: number[], a: number) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
};

const rotateZ = (p: number[], a: number) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
};

const fill = (count: number, fn: (i: number) => ArrayLike<number>) => {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = fn(i);
    out[i * 3] = p[0];
    out[i * 3 + 1] = p[1];
    out[i * 3 + 2] = p[2];
  }
  return out;
};

const dust: Generator = (count, rng) =>
  fill(count, () => {
    const [x, y, z] = unitVector(rng);
    const r = 2.6 + Math.pow(rng(), 0.7) * 6.5;
    return [x * r, y * r * 0.7, z * r];
  });

const shell: Generator = (count, rng) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return fill(count, (i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = golden * i;
    const radius = rng() < 0.85 ? 1.62 + gaussian(rng) * 0.012 : 1.62 + rng() * 0.6;
    return [Math.cos(a) * r * radius, y * radius, Math.sin(a) * r * radius];
  });
};

const monolith: Generator = (count, rng) => {
  const w = 1.25;
  const h = 2.7;
  const d = 0.34;
  const hx = w / 2;
  const hy = h / 2;
  const hz = d / 2;
  const edges: Array<[number[], number[]]> = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1])
      edges.push([
        [sx * hx, -hy, sz * hz],
        [sx * hx, hy, sz * hz],
      ]);
    for (const sy of [-1, 1])
      edges.push([
        [sx * hx, sy * hy, -hz],
        [sx * hx, sy * hy, hz],
      ]);
  }
  for (const sy of [-1, 1])
    for (const sz of [-1, 1])
      edges.push([
        [-hx, sy * hy, sz * hz],
        [hx, sy * hy, sz * hz],
      ]);

  const faces = [
    {
      area: w * h,
      at: (u: number, v: number, s: number) => [(u - 0.5) * w, (v - 0.5) * h, s * hz],
    },
    {
      area: d * h,
      at: (u: number, v: number, s: number) => [s * hx, (v - 0.5) * h, (u - 0.5) * d],
    },
    {
      area: w * d,
      at: (u: number, v: number, s: number) => [(u - 0.5) * w, s * hy, (v - 0.5) * d],
    },
  ];
  const total = faces.reduce((acc, f) => acc + f.area, 0);

  return fill(count, () => {
    if (rng() < 0.28) {
      const [a, b] = edges[Math.floor(rng() * edges.length)];
      const t = rng();
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    let pick = rng() * total;
    const face = faces.find((f) => (pick -= f.area) <= 0) ?? faces[0];
    const p = face.at(rng(), rng(), rng() < 0.5 ? -1 : 1);

    const groove = Math.abs(Math.sin(p[1] * 9)) < 0.08 ? 0.02 : 0;
    return [p[0], p[1], p[2] + Math.sign(p[2]) * groove];
  });
};

export const BOOK_FACING_SPIN = 3.6;

const book: Generator = (count, rng) => {
  const width = 1.3;
  const height = 2.1;
  const restAngle = 0.32;
  const page = (angle: number, curl: number, u: number, v: number) => {
    const a = angle + curl * u * u;
    const lift = Math.sin(u * Math.PI) * 0.08;
    return [Math.cos(a) * u * width, (v - 0.5) * height, Math.sin(a) * u * width + lift];
  };
  return fill(count, () => {
    const roll = rng();
    let p: number[];
    if (roll < 0.62) {
      const side = rng() < 0.5 ? 1 : -1;
      const depth = Math.floor(rng() * 14) * 0.011;
      const base = side > 0 ? restAngle + depth : Math.PI - restAngle - depth;
      const u = rng() < 0.18 ? 1 : rng();
      const v = rng() < 0.12 ? (rng() < 0.5 ? 0 : 1) : rng();
      p = page(base, 0, u, v);
    } else if (roll < 0.94) {
      const sheet = Math.floor(rng() * 6);
      const angle = 0.62 + sheet * 0.36;
      const curl = sheet < 3 ? 0.42 : -0.42;
      p = page(angle, curl, rng(), rng());
    } else {
      const v = rng();
      p = [gaussian(rng) * 0.015, (v - 0.5) * height, -0.04 + gaussian(rng) * 0.015];
    }
    p = rotateX(p, -0.38);
    p = rotateZ(p, 0.06);
    return rotateY(p, -BOOK_FACING_SPIN);
  });
};

const orbit: Generator = (count, rng) => {
  const rings = [
    { r: 1.15, tiltX: 1.2, tiltZ: 0.2 },
    { r: 1.5, tiltX: -0.5, tiltZ: 0.9 },
    { r: 1.85, tiltX: 0.25, tiltZ: -0.6 },
  ];
  return fill(count, () => {
    if (rng() < 0.16) {
      const [x, y, z] = unitVector(rng);
      const r = 0.38 * Math.cbrt(rng());
      return [x * r, y * r, z * r];
    }
    const ring = rings[Math.floor(rng() * rings.length)];
    const a = rng() * TAU;
    const tube = 0.035;
    let p = [
      Math.cos(a) * ring.r + gaussian(rng) * tube,
      gaussian(rng) * tube,
      Math.sin(a) * ring.r + gaussian(rng) * tube,
    ];
    p = rotateX(p, ring.tiltX);
    return rotateZ(p, ring.tiltZ);
  });
};

const tidal: Generator = (count, rng) => {
  const cols = Math.ceil(Math.sqrt(count * 1.6));
  const rows = Math.ceil(count / cols);
  const w = 5.4;
  const d = 3.4;
  return fill(count, (i) => {
    const cx = (i % cols) / (cols - 1);
    const cz = Math.floor(i / cols) / Math.max(rows - 1, 1);
    const x = (cx - 0.5) * w + (rng() - 0.5) * 0.02;
    const z = (cz - 0.5) * d + (rng() - 0.5) * 0.02;
    const y = 0.32 * Math.sin(x * 1.6 + z * 0.8) + 0.18 * Math.sin(z * 2.6 - x * 0.7);
    return rotateX([x, y, z], 0.62);
  });
};

const knot: Generator = (count, rng) => {
  const p = 2;
  const q = 3;
  const R = 1.2;
  const r = 0.45;
  return fill(count, () => {
    const t = rng() * TAU;
    const cr = R + r * Math.cos(q * t);
    const center = [cr * Math.cos(p * t), r * Math.sin(q * t) * 1.4, cr * Math.sin(p * t)];
    const tube = 0.11 * Math.sqrt(rng());
    const [x, y, z] = unitVector(rng);
    return [center[0] + x * tube, center[1] + y * tube, center[2] + z * tube];
  });
};

const halo: Generator = (count, rng) =>
  fill(count, () => {
    if (rng() < 0.1) {
      const [x, y, z] = unitVector(rng);
      const r = 2 + rng() * 4;
      return [x * r, y * r * 0.5, z * r];
    }
    const band = Math.floor(rng() * 5);
    const r = 1.75 + band * 0.32 + Math.pow(rng(), 2) * 0.26;
    const a = rng() * TAU;
    let p = [Math.cos(a) * r, gaussian(rng) * 0.025, Math.sin(a) * r];
    p = rotateX(p, -0.32);
    return rotateZ(p, 0.18);
  });

export const SHAPES = { dust, shell, monolith, orbit, book, tidal, knot, halo } as const;
export const SHAPE_ORDER = Object.keys(SHAPES) as Array<keyof typeof SHAPES>;
export type ShapeName = keyof typeof SHAPES;
