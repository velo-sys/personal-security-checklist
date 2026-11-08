import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

import Hero from '~/components/furniture/hero';
import SectionLinkGrid from '~/components/psc/section-link-grid';
import Progress from '~/components/psc/progress';

import { ChecklistContext } from '~/store/checklist-context';

import { useChecklist } from '~/store/local-checklist-store';
import { langFromPath, strings } from '~/i18n';

export default component$(() => {
  const checklists = useContext(ChecklistContext);

  const localChecklist = useChecklist();

  return (
    <>
      <Hero />
      <Progress />
      <SectionLinkGrid sections={localChecklist.checklist.checklist || checklists.value} />
    </>
  );
});

export const head: DocumentHead = ({ url }) => {
  const lang = langFromPath(url.pathname);
  return {
    title: `${strings[lang].siteName} – ${strings[lang].heroTitle}`,
    meta: [{ name: 'description', content: strings[lang].siteTagline }],
  };
};
