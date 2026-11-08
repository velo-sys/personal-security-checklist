import { defineConfig, type UserConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Base path the site is served from, e.g. "/personal-security-checklist/" on GitHub Pages
const base = process.env.BASE_PATH || '/';

export default defineConfig((): UserConfig => {
  return {
    base,
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: '../personal-security-checklist.yml',
            dest: 'public',
          },
          {
            src: '../personal-security-checklist.de.yml',
            dest: 'public',
          },
        ],
      }),
    ],
    optimizeDeps: {
      include: ['chart.js', 'js-yaml', 'marked', 'progressbar.js', 'tailwindcss/colors'],
    },
    server: {
      fs: {
        allow: ['.', '../personal-security-checklist.yml', '../personal-security-checklist.de.yml'],
      },
      headers: {
        'Cache-Control': 'public, max-age=0',
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
