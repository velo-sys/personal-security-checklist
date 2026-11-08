import { component$, useContext } from '@builder.io/qwik';
import { useLocation, type DocumentHead, type StaticGenerateHandler } from '@builder.io/qwik-city';
import { marked } from 'marked';

import Icon from '~/components/core/icon';
import checklistData, { getChecklists } from '~/data/checklist';
import { ChecklistContext } from '~/store/checklist-context';
import type { Section } from '~/types/PSC';
import Table from '~/components/psc/checklist-table';
import { useI18n, langFromPath, strings } from '~/i18n';

export default component$(() => {
  const checklists = useContext(ChecklistContext);
  const { t } = useI18n();

  const loc = useLocation();
  const slug = loc.params.title;

  const section: Section | undefined = checklists.value.find((item: Section) => item.slug === slug);

  const parseMarkdown = (text: string | undefined): string => {
    return (marked.parse(text || '', { async: false }) as string) || '';
  };

  return (
    <div class="md:my-8 md:px-16 sm:px-2 rounded-md">
      <article class="bg-back p-8 mx-auto w-full max-w-[1200px] rounded-lg shadow-md">
        <h1 class={['gap-2 text-5xl font-bold flex']}>
          <Icon height={36} width={36} icon={section?.icon || 'star'} />
          {section?.title}
        </h1>
        <div class="py-2 prose max-w-none" dangerouslySetInnerHTML={parseMarkdown(section?.intro)}></div>

        <div class="overflow-x-auto">{section && <Table section={section} />}</div>

        {section && section.softwareLinks && (
          <>
            <div class="divider my-4">{t('usefulLinks')}</div>
            <h3 class="text-xl my-2">{t('recommendedSoftware')}</h3>
            <ul class="list-disc pl-4">
              {section.softwareLinks.map((link, index) => (
                <li key={index}>
                  <a class="link link-primary" href={link.url} title={link.description}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </div>
  );
});

export const head: DocumentHead = ({ url, params }) => {
  const lang = langFromPath(url.pathname);
  const section = getChecklists(lang).find((s) => s.slug === params.title);
  return {
    title: section ? `${section.title} | ${strings[lang].siteName}` : strings[lang].siteName,
    meta: [{ name: 'description', content: section?.description || strings[lang].siteTagline }],
  };
};

export const onStaticGenerate: StaticGenerateHandler = () => ({
  params: checklistData.map((section) => ({ title: section.slug })),
});
