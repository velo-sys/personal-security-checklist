import * as jsyaml from 'js-yaml';

import type { Sections } from '~/types/PSC';
import type { Lang } from '~/i18n';
import checklistYamlEn from '../../../personal-security-checklist.yml?raw';
import checklistYamlDe from '../../../personal-security-checklist.de.yml?raw';

const checklistsEn = jsyaml.load(checklistYamlEn) as Sections;
const checklistsDe = jsyaml.load(checklistYamlDe) as Sections;

export const getChecklists = (lang: Lang): Sections => (lang === 'de' ? checklistsDe : checklistsEn);

export default checklistsEn;
