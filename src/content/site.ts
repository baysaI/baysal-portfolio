export const site = {
  name: 'Mehmet Baysal',
  role: 'Web Developer · Game Development',
  email: 'mehmetbaysalweb@gmail.com',
  location: 'Antalya, Türkiye',
  timeZone: 'Europe/Istanbul',
  url: 'https://baysai.github.io/baysal-portfolio/',
  github: 'https://github.com/baysaI',
  linkedin: 'https://www.linkedin.com/in/mehmet-baysal-44b946376',
  socials: [
    { label: 'GitHub', href: 'https://github.com/baysaI' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehmet-baysal-44b946376' },
  ],
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
    tags: ['Three.js', 'GLSL', 'Web Audio', 'Electron'],
    href: 'https://mehmetbaysal.itch.io/almost-there',
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
    tags: ['Bootstrap', 'jQuery', 'Chart.js'],
    href: 'https://github.com/baysaI/BoruHattiAnalizKodlamasi',
    image: 'projects/boru-hatti.webp',
    device: 'monitor',
  },
];

export const services = [
  { key: 'services.s1', tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Bootstrap', 'jQuery'] },
  { key: 'services.s2', tags: ['Node.js', 'Express', 'EJS', 'SQLite', 'PHP', 'JWT'] },
  { key: 'services.s3', tags: ['Three.js', 'GLSL', 'Web Audio', 'Electron'] },
  { key: 'services.s4', tags: ['Git', 'GitHub Pages', 'Gemini API', 'Chart.js'] },
] as const;

export const processSteps = [
  'process.s1',
  'process.s2',
  'process.s3',
  'process.s4',
  'process.s5',
] as const;

export const marquee = ['marquee.a', 'marquee.b', 'marquee.c', 'marquee.d', 'marquee.e'] as const;

export const stats = [
  { key: 'stats.s1', value: 800, prefix: '', suffix: '+' },
  { key: 'stats.s2', value: 100, prefix: '~', suffix: '' },
  { key: 'stats.s3', value: 5, prefix: '', suffix: '' },
  { key: 'stats.s4', value: 7, prefix: '', suffix: '' },
] as const;

export interface ExperienceItem {
  key: string;
  desc?: boolean;
  href?: string;
  link?: string;
}

export const experience: { group: string; note?: string; items: ExperienceItem[] }[] = [
  {
    group: 'experience.group.web',
    items: [
      {
        key: 'experience.e1',
        desc: true,
        href: 'https://altuncupremium.com.tr',
        link: 'altuncupremium.com.tr',
      },
      { key: 'experience.e2', desc: true },
    ],
  },
  {
    group: 'experience.group.hotel',
    note: 'experience.group.hotel.note',
    items: [{ key: 'experience.e3' }, { key: 'experience.e4' }],
  },
];

export const certificates = [
  { year: '2026', keys: ['experience.cert.c1', 'experience.cert.c2', 'experience.cert.c3'] },
  {
    year: '2025',
    keys: ['experience.cert.c4', 'experience.cert.c5', 'experience.cert.c6', 'experience.cert.c7'],
  },
] as const;

export const spokenLanguages = ['experience.lang.tr', 'experience.lang.en'] as const;
