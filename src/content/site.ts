export const site = {
  name: 'Mehmet Baysal',
  role: 'Web Design & Coding Student',
  email: 'mehmetbaysalweb@gmail.com',
  location: 'Türkiye',
  timeZone: 'Europe/Istanbul',
  url: 'https://baysai.github.io/baysal-portfolio/',
  github: 'https://github.com/baysaI',
  socials: [{ label: 'GitHub', href: 'https://github.com/baysaI' }],
} as const;

export type Device = 'browser' | 'phone' | 'tv' | 'monitor';

export interface ProjectMeta {
  key: string;
  year: string;
  commits: number;
  tags: string[];
  href: string;
  repo?: string;
  image: string;
  device: Device;
}

export const projects: ProjectMeta[] = [
  {
    key: 'work.p1',
    year: '2026',
    commits: 429,
    tags: ['Three.js', 'GLSL', 'Electron'],
    href: 'https://baysaI.github.io/almost-there/',
    repo: 'https://github.com/baysaI/almost-there',
    image: 'projects/almost-there.webp',
    device: 'tv',
  },
  {
    key: 'work.p2',
    year: '2026',
    commits: 299,
    tags: ['Node.js', 'Express', 'EJS', 'SQLite'],
    href: 'https://github.com/baysaI/cypilan',
    image: 'projects/cypilan.webp',
    device: 'browser',
  },
  {
    key: 'work.p3',
    year: '2026',
    commits: 62,
    tags: ['Node.js', 'Express', 'SQLite'],
    href: '#contact',
    image: 'projects/dagitim-takip.webp',
    device: 'phone',
  },
  {
    key: 'work.p4',
    year: '2026',
    commits: 36,
    tags: ['Node.js', 'Express', 'SQLite', 'Gemini API'],
    href: 'https://github.com/baysaI/okuryazmaz',
    image: 'projects/okuryazmaz.webp',
    device: 'browser',
  },
  {
    key: 'work.p5',
    year: '2026',
    commits: 12,
    tags: ['Bootstrap', 'jQuery', 'Chart.js', 'Gemini API'],
    href: 'https://github.com/baysaI/BoruHattiAnalizKodlamasi',
    image: 'projects/boru-hatti.webp',
    device: 'monitor',
  },
];

export const services = [
  { key: 'services.s1', tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { key: 'services.s2', tags: ['Node.js', 'Express', 'EJS', 'SQLite'] },
  { key: 'services.s3', tags: ['Three.js', 'GLSL', 'Electron'] },
  { key: 'services.s4', tags: ['i18n', 'Gemini API', 'Chart.js'] },
] as const;

export const processSteps = [
  'process.s1',
  'process.s2',
  'process.s3',
  'process.s4',
  'process.s5',
] as const;

export const marquee = ['marquee.a', 'marquee.b', 'marquee.c', 'marquee.d'] as const;

export const stats = [
  { key: 'stats.s1', value: 800, suffix: '+' },
  { key: 'stats.s2', value: 429, suffix: '' },
  { key: 'stats.s3', value: 5, suffix: '' },
  { key: 'stats.s4', value: 14, suffix: '' },
] as const;
