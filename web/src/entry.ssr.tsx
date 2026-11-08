/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';
import { langFromPath } from './i18n';

export default function (opts: RenderToStreamOptions) {
  // German pages live under /de/, everything else is English
  const url = opts.serverData?.url as string | undefined;
  const lang = url && langFromPath(new URL(url, 'http://localhost').pathname) === 'de' ? 'de' : 'en';
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang,
      ...opts.containerAttributes,
    },
  });
}
