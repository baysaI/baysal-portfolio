export type Tier = 'high' | 'medium' | 'low';

const mq = (q: string) => typeof matchMedia === 'function' && matchMedia(q).matches;

const probeRenderer = (): string => {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return '';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return name;
  } catch {
    return '';
  }
};

const detect = () => {
  const isTouch = mq('(hover: none), (pointer: coarse)');
  const reducedMotion = mq('(prefers-reduced-motion: reduce)');
  const isSmall = Math.min(window.innerWidth, window.innerHeight) < 600;
  const renderer = probeRenderer();
  const webgl2 = renderer !== '' || !!document.createElement('canvas').getContext('webgl2');
  const software = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  let tier: Tier = 'high';
  if (software || cores <= 2 || memory <= 2) tier = 'low';
  else if (isTouch || isSmall || cores <= 4 || memory <= 4) tier = 'medium';

  return { isTouch, reducedMotion, isSmall, webgl2, software, tier, renderer };
};

export const device = detect();
