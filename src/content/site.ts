/**
 * Site-wide, language-independent configuration.
 * Edit this file to make the portfolio yours — name, contact, socials and project meta.
 * Translatable copy lives in `./i18n.ts`.
 */

export const site = {
  name: 'Baysal',
  role: 'Creative Developer & 3D Designer',
  email: 'hello@baysal.dev',
  location: 'Istanbul, TR',
  timeZone: 'Europe/Istanbul',
  url: 'https://baysai.github.io/baysal-portfolio/',
  socials: [
    { label: 'GitHub', href: 'https://github.com/baysaI' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
  ],
} as const;

export interface ProjectMeta {
  /** i18n key prefix, e.g. `work.p1` */
  key: string;
  year: string;
  tags: string[];
  href: string;
}

export const projects: ProjectMeta[] = [
  { key: 'work.p1', year: '2026', tags: ['WebGL', 'GLSL', 'GSAP'], href: '#contact' },
  { key: 'work.p2', year: '2025', tags: ['Three.js', 'Data viz', 'WebGPU'], href: '#contact' },
  { key: 'work.p3', year: '2025', tags: ['R3F', 'Configurator', 'E-commerce'], href: '#contact' },
  { key: 'work.p4', year: '2024', tags: ['Generative', 'Audio', 'Identity'], href: '#contact' },
];

export const services = [
  { key: 'services.s1', tags: ['TypeScript', 'React', 'Astro', 'Vite'] },
  { key: 'services.s2', tags: ['Three.js', 'GLSL', 'WebGPU', 'R3F'] },
  { key: 'services.s3', tags: ['GSAP', 'Lenis', 'Rive', 'Lottie'] },
  { key: 'services.s4', tags: ['Blender', 'Houdini', 'Figma', 'Substance'] },
] as const;

export const processSteps = ['process.s1', 'process.s2', 'process.s3', 'process.s4'] as const;

export const marquee = ['marquee.a', 'marquee.b', 'marquee.c', 'marquee.d'] as const;

/** Replace these numbers with your own. `value` animates from 0 on scroll. */
export const stats = [
  { key: 'stats.s1', value: 8, suffix: '+' },
  { key: 'stats.s2', value: 60, suffix: '+' },
  { key: 'stats.s3', value: 12, suffix: '' },
  { key: 'stats.s4', value: 60, suffix: 'fps' },
] as const;
