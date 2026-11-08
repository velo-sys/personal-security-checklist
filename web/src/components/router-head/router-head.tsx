import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

import { component$ } from '@builder.io/qwik';
import { BASE, langFromPath, strings, switchLangHref } from '~/i18n';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const lang = langFromPath(loc.url.pathname);
  const s = strings[lang];
  const fullTitle = `${s.siteName} – ${s.siteTagline}`;

  return (
    <>
      {/* Basics */}
      <title>{head.title || fullTitle}</title>
      {!head.meta.some((m) => m.name === 'description') && <meta name="description" content={s.siteTagline} />}

      {/* Site config */}
      <link rel="canonical" href={loc.url.href} />
      <link rel="alternate" hreflang="en" href={new URL(switchLangHref(loc.url.pathname, 'en'), loc.url.origin).href} />
      <link rel="alternate" hreflang="de" href={new URL(switchLangHref(loc.url.pathname, 'de'), loc.url.origin).href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href={`${BASE}favicon.png`} />
      <link rel="apple-touch-icon" href={`${BASE}favicon.png`} />
      <meta name="theme-color" content="#6419e6" />
      <link rel="manifest" href={`${BASE}manifest.json`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:title" content={head.title || fullTitle} />
      <meta property="og:description" content={s.siteTagline} />
      <meta property="og:locale" content={lang === 'de' ? 'de_DE' : 'en_GB'} />
      <meta property="og:image" content={`${BASE}banner.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={loc.url.href} />
      <meta name="twitter:title" content={head.title || fullTitle} />
      <meta name="twitter:description" content={s.siteTagline} />
      <meta name="twitter:image" content={`${BASE}banner.png`} />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML ? {} : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML ? {} : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
