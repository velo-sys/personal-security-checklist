import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

import Icon from '~/components/core/icon';
import { ChecklistContext } from '~/store/checklist-context';
import { vhsModules } from '~/data/vhs';
import { useI18n, itemId, langFromPath, strings } from '~/i18n';
import type { Checklist, Section } from '~/types/PSC';

const text = {
  de: {
    title: 'VHS-Kurs: Digitale Selbstverteidigung',
    intro:
      'Diese Seite begleitet die Kurse an der Volkshochschule. Hier finden Sie die Inhalte der Präsentationen zum Nachlesen, alle im Kurs genannten Werkzeuge und – verknüpft mit der Checkliste – die Punkte, die Sie direkt umsetzen können. Ihr Fortschritt wird nur lokal in Ihrem Browser gespeichert.',
    takeaways: 'Das Wichtigste in Kürze',
    tools: 'Werkzeuge & Links',
    checklist: 'Passende Punkte in der Checkliste',
    jump: 'Inhalt',
  },
  en: {
    title: 'VHS Course: Digital Self-Defence',
    intro:
      'This page accompanies the courses held at the German adult education centre (Volkshochschule, VHS). Here you can re-read the presentation content, find every tool mentioned in class and – linked to the checklist – the points you can put into practice right away. Your progress is stored only locally in your browser.',
    takeaways: 'Key takeaways',
    tools: 'Tools & links',
    checklist: 'Related checklist items',
    jump: 'Contents',
  },
};

export default component$(() => {
  const checklists = useContext(ChecklistContext);
  const { lang, link } = useI18n();
  const tx = text[lang];

  const findItem = (slug: string, id: string): { section?: Section; item?: Checklist } => {
    const section = checklists.value.find((s) => s.slug === slug);
    const item = section?.checklist.find((i) => itemId(i) === id);
    return { section, item };
  };

  return (
    <div class="md:my-8 md:px-16 px-2 rounded-md">
      <article class="bg-back p-8 mx-auto w-full max-w-[1200px] rounded-lg shadow-md">
        <h1 class="text-4xl md:text-5xl font-bold flex gap-3 items-center">
          <Icon icon="human" width={40} height={40} />
          {tx.title}
        </h1>
        <p class="py-4 text-lg">{tx.intro}</p>

        <nav class="flex flex-wrap gap-3 mb-4" aria-label={tx.jump}>
          {vhsModules.map((mod) => (
            <a key={mod.id} href={`#${mod.id}`} class="btn btn-outline btn-secondary">
              {mod.subtitle[lang]}
            </a>
          ))}
        </nav>

        {vhsModules.map((mod) => (
          <section key={mod.id} id={mod.id} class="mt-10 scroll-mt-4">
            <div class="divider"></div>
            <p class="text-secondary font-bold uppercase tracking-wide text-sm">{mod.subtitle[lang]}</p>
            <h2 class="text-3xl md:text-4xl font-bold mb-2">{mod.title[lang]}</h2>
            {mod.sessions && <p class="opacity-70 mb-4">{mod.sessions[lang]}</p>}

            {mod.chapters.map((chapter, ci) => (
              <div key={ci} class="my-6">
                <h3 class="text-2xl mb-2">{chapter.title[lang]}</h3>
                {chapter.quote && (
                  <blockquote class="border-l-4 border-secondary pl-4 my-3 text-xl italic">
                    {chapter.quote[lang]}
                  </blockquote>
                )}
                <ul class="list-disc pl-6 space-y-1">
                  {chapter.points[lang].map((point, pi) => (
                    <li key={pi}>{point}</li>
                  ))}
                </ul>
                {chapter.links && chapter.links.length > 0 && (
                  <div class="mt-3">
                    <p class="font-bold">{tx.tools}</p>
                    <ul class="pl-6 list-disc">
                      {chapter.links.map((l) => (
                        <li key={l.url}>
                          <a class="link link-primary" href={l.url} target="_blank" rel="noopener noreferrer">
                            {l.title}
                          </a>{' '}
                          – {l.description[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {mod.homework && (
              <div class="my-6 card bg-front shadow-md">
                <div class="card-body">
                  <h3 class="card-title text-2xl">{mod.homework.title[lang]}</h3>
                  <ul class="pl-6 list-disc space-y-1">
                    {mod.homework.links.map((l) => (
                      <li key={l.url}>
                        <a class="link link-primary" href={l.url} target="_blank" rel="noopener noreferrer">
                          {l.title}
                        </a>{' '}
                        – {l.description[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div class="my-6 card bg-front shadow-md">
              <div class="card-body">
                <h3 class="card-title text-2xl">{tx.takeaways}</h3>
                <ul class="pl-6 list-disc space-y-1">
                  {mod.takeaways[lang].map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 class="text-2xl mt-8 mb-3">{tx.checklist}</h3>
            <div class="grid md:grid-cols-2 gap-4">
              {Object.entries(mod.items).map(([slug, ids]) => {
                const section = checklists.value.find((s) => s.slug === slug);
                if (!section) return null;
                return (
                  <div key={slug} class={`rounded-box bg-front p-4 border-l-4 border-${section.color}-400`}>
                    <a
                      href={link(`/checklist/${slug}`)}
                      class={`font-bold flex gap-2 items-center text-${section.color}-400 hover:underline`}
                    >
                      <Icon icon={section.icon} color={section.color} width={18} height={18} />
                      {section.title}
                    </a>
                    <ul class="mt-2 pl-5 list-disc">
                      {ids.map((id) => {
                        const { item } = findItem(slug, id);
                        if (!item) return null;
                        return (
                          <li key={id}>
                            <a class="link link-hover" href={`${link(`/checklist/${slug}`)}#${encodeURIComponent(id)}`}>
                              {item.point}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
});

export const head: DocumentHead = ({ url }) => {
  const lang = langFromPath(url.pathname);
  return {
    title: `${text[lang].title} | ${strings[lang].siteName}`,
    meta: [{ name: 'description', content: text[lang].intro }],
  };
};
