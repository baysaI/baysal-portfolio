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

export interface ProjectMeta {
  key: string;
  year: string;
  tags: string[];
  href: string;
}

export const projects: ProjectMeta[] = [
  {
    key: 'work.p1',
    year: '2026',
    tags: ['Three.js', 'GLSL', 'Electron'],
    href: 'https://baysaI.github.io/almost-there/',
  },
  {
    key: 'work.p2',
    year: '2026',
    tags: ['Node.js', 'Express', 'EJS', 'SQLite'],
    href: 'https://github.com/baysaI/cypilan',
  },
  {
    key: 'work.p3',
    year: '2026',
    tags: ['Node.js', 'Express', 'SQLite', 'Gemini API'],
    href: 'https://github.com/baysaI/okuryazmaz',
  },
  {
    key: 'work.p4',
    year: '2026',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://github.com/baysaI/altuncu-premium',
  },
];

export interface ArchiveItem {
  key: string;
  name: string;
  year: string;
  tags: string[];
  href: string;
}

export const archive: ArchiveItem[] = [
  {
    key: 'others.o1',
    name: 'Boru Hattı Analiz Paneli',
    year: '2026',
    tags: ['Bootstrap', 'jQuery', 'Chart.js'],
    href: 'https://github.com/baysaI/BoruHattiAnalizKodlamasi',
  },
  {
    key: 'others.o2',
    name: 'Sigara Takip Sistemi',
    year: '2026',
    tags: ['Node.js', 'Express', 'SQLite'],
    href: 'https://github.com/baysaI/sigara-takip-sistemi',
  },
  {
    key: 'others.o3',
    name: 'Oiia Cat',
    year: '2025',
    tags: ['Three.js', 'JavaScript'],
    href: 'https://github.com/baysaI/oiia-cat',
  },
  {
    key: 'others.o4',
    name: 'Munch',
    year: '2025',
    tags: ['JavaScript', 'CSS', 'localStorage'],
    href: 'https://github.com/baysaI/vanilla-js-shopping-cart',
  },
  {
    key: 'others.o5',
    name: 'PHP Login Template',
    year: '2025',
    tags: ['PHP', 'MySQL', 'CSS'],
    href: 'https://github.com/baysaI/simple-php-auth',
  },
];

export const services = [
  { key: 'services.s1', tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { key: 'services.s2', tags: ['Node.js', 'Express', 'SQLite', 'PHP'] },
  { key: 'services.s3', tags: ['Three.js', 'GLSL', 'Electron'] },
  { key: 'services.s4', tags: ['i18n', 'Gemini API', 'Chart.js'] },
] as const;

export const processSteps = ['process.s1', 'process.s2', 'process.s3', 'process.s4'] as const;

export const marquee = ['marquee.a', 'marquee.b', 'marquee.c', 'marquee.d'] as const;

export const stats = [
  { key: 'stats.s1', value: 9, suffix: '' },
  { key: 'stats.s2', value: 800, suffix: '+' },
  { key: 'stats.s3', value: 15, suffix: '+' },
  { key: 'stats.s4', value: 5, suffix: '' },
] as const;
