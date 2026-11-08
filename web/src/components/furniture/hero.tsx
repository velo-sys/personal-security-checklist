import { component$ } from '@builder.io/qwik';

import Icon from '~/components/core/icon';
import { useI18n } from '~/i18n';
import { REPO_URL } from '~/data/site';

export default component$(() => {
  const { t } = useI18n();
  return (
    <div class="hero mb-8 mx-auto xl:max-w-7xl max-w-6xl w-full xl:px-10">
      <div class="hero-content text-center bg-front shadow-xs lg:rounded-xl w-full">
        <div class="max-w-2xl flex flex-col place-items-center">
          <p>{t('heroPre')}</p>
          <h1 class="text-5xl font-bold">{t('heroTitle')}</h1>
          <p class="subtitle pb-6">{t('heroSub')}</p>
          <Icon class="mb-4" icon="shield" width={120} height={120} />
          <div class="flex flex-wrap gap-4 justify-center">
            <a href={REPO_URL} class="btn btn-primary btn-lg">
              <Icon icon="github" width={20} height={20} />
              {t('heroGithub')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
