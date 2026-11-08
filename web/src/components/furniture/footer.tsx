import { component$ } from '@builder.io/qwik';

import { useI18n } from '~/i18n';
import { LICENSE_URL, REPO_URL, UPSTREAM_AUTHOR, UPSTREAM_AUTHOR_URL, UPSTREAM_SITE } from '~/data/site';

export default component$(() => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer class="footer footer-center px-4 py-2 mt-4 text-base-content bg-base-200/25">
      <aside>
        <p>
          {t('footerFork')}{' '}
          <a href={UPSTREAM_SITE} class="link link-primary">
            Digital Defense
          </a>{' '}
          {t('footerBy')}{' '}
          <a href={UPSTREAM_AUTHOR_URL} class="link link-primary">
            {UPSTREAM_AUTHOR}
          </a>{' '}
          (2019 - {currentYear}) · {t('footerLicense')}{' '}
          <a href={LICENSE_URL} class="link link-primary">
            CC BY 4.0
          </a>{' '}
          · {t('footerSource')}{' '}
          <a href={REPO_URL} class="link link-primary">
            GitHub
          </a>
        </p>
        <p class="text-xs opacity-70">{t('footerChanges')}</p>
      </aside>
    </footer>
  );
});
