import type { Plugin } from 'vite';
import { dict, type DictKey } from '../src/content/i18n';
import { partials, tokens } from '../src/content/partials';

const en = dict.en as Record<string, string>;

const lookup = (key: string, where: string) => {
  const value = en[key as DictKey];
  if (value === undefined) throw new Error(`[html-content] Missing i18n key "${key}" (${where})`);
  return value;
};

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function htmlContent(): Plugin {
  return {
    name: 'html-content',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        html = html.replace(/<!--\s*@(\w+)\s*-->/g, (_, name: string) => {
          const render = partials[name];
          if (!render) throw new Error(`[html-content] Unknown partial "@${name}"`);
          return render();
        });

        html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, name: string) => {
          const value = tokens[name];
          if (value === undefined) throw new Error(`[html-content] Unknown token "{{${name}}}"`);
          return value;
        });

        html = html.replace(
          /<([a-z][a-z0-9]*)\b([^>]*?)\sdata-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,
          (_m, tag: string, before: string, key: string, after: string) =>
            `<${tag}${before} data-i18n="${key}"${after}>${lookup(key, `<${tag}>`)}</${tag}>`,
        );

        html = html.replace(
          /<[a-z][^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g,
          (tagHtml, spec: string) => {
            let out = tagHtml;
            for (const pair of spec.split(',')) {
              const [attr, key] = pair.split(':').map((s) => s.trim());
              const value = escapeAttr(lookup(key, `[${attr}]`));
              const attrRe = new RegExp(`\\s${attr}="[^"]*"`);
              out = attrRe.test(out)
                ? out.replace(attrRe, ` ${attr}="${value}"`)
                : out.replace(/\s*\/?>$/, (end) => ` ${attr}="${value}"${end}`);
            }
            return out;
          },
        );

        return html;
      },
    },
  };
}
