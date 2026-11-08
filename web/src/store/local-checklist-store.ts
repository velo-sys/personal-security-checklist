import { $, useStore, useOnWindow } from '@builder.io/qwik';
import * as jsyaml from 'js-yaml';
import type { Sections } from '~/types/PSC';
import { BASE, langFromPath } from '~/i18n';

/**
 * Fetches the latest checklist YAML (for the current language) client-side,
 * so the page reflects the published data file
 */
export const useChecklist = () => {
  const state = useStore<{ checklist: Sections | null }>({ checklist: null });

  const fetchChecklist = $(async () => {
    const lang = langFromPath(window.location.pathname);
    const localUrl = `${BASE}personal-security-checklist${lang === 'de' ? '.de' : ''}.yml`;
    return fetch(localUrl)
      .then((res) => res.text())
      .then((yamlText) => {
        return jsyaml.load(yamlText);
      });
  });

  useOnWindow(
    'load',
    $(() => {
      fetchChecklist()
        .then((checklist) => {
          if (Array.isArray(checklist)) state.checklist = checklist as Sections;
        })
        .catch(() => {});
    }),
  );

  const setChecklist = $((newChecklist: Sections) => {
    state.checklist = newChecklist;
  });

  return { checklist: state, setChecklist };
};
