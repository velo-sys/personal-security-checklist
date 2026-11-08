import { component$ } from '@builder.io/qwik';
import { useI18n } from '~/i18n';

export default component$(() => {
  const { t, link } = useI18n();
  return (
    <div class="p-8">
      <h1 class="text-3xl">404</h1>
      <p>{t('notFound')}</p>
      <a class="link link-primary" href={link('/')}>
        {t('backHome')}
      </a>
    </div>
  );
});
