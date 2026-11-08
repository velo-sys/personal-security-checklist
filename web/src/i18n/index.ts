import { useLocation } from '@builder.io/qwik-city';
import type { Checklist } from '~/types/PSC';

export type Lang = 'en' | 'de';
export const LANGS: Lang[] = ['en', 'de'];

/** Base path the site is served under (e.g. "/personal-security-checklist/"), always ends with "/" */
export const BASE: string = import.meta.env.BASE_URL || '/';

/** Strip the base path from a pathname, returning a path that always starts with "/" */
export const stripBase = (pathname: string): string => {
  const base = BASE.replace(/\/$/, '');
  const path = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path.startsWith('/') ? path : `/${path}`;
};

/** Work out the language from a pathname: everything under /de/ is German */
export const langFromPath = (pathname: string): Lang => {
  const path = stripBase(pathname);
  return path === '/de' || path.startsWith('/de/') ? 'de' : 'en';
};

/** Build a site-internal link for a given language, e.g. href('de', '/checklist/email') -> /<base>/de/checklist/email/ */
export const href = (lang: Lang, path: string = '/'): string => {
  const [pathOnly, hash] = path.split('#');
  let clean = pathOnly.replace(/^\/+/, '');
  if (clean && !clean.endsWith('/')) clean += '/';
  const prefix = lang === 'de' ? 'de/' : '';
  return `${BASE}${prefix}${clean}${hash ? `#${hash}` : ''}`;
};

/** Same page, other language */
export const switchLangHref = (pathname: string, target: Lang): string => {
  let path = stripBase(pathname);
  if (path === '/de' || path.startsWith('/de/')) path = path.slice(3) || '/';
  return href(target, path);
};

/** Stable ID of a checklist item, shared between languages (used for saved progress) */
export const itemId = (item: Checklist): string => item.id || item.point.toLowerCase().replace(/ /g, '-');

/** Hook: current language, translation lookup and link builder */
export const useI18n = () => {
  const loc = useLocation();
  const lang = langFromPath(loc.url.pathname);
  const t = (key: keyof typeof strings.en): string => strings[lang][key];
  const link = (path: string = '/') => href(lang, path);
  return { lang, t, link, pathname: loc.url.pathname };
};

const en = {
  siteName: 'Digital Defense',
  siteTagline: 'The ultimate personal security checklist to secure your digital life',
  heroPre: 'The Ultimate',
  heroTitle: 'Personal Security Checklist',
  heroSub: 'Your guide to securing your digital life and protecting your privacy',
  heroGithub: 'View on GitHub',
  navChecklists: 'Checklists',
  navHome: 'Home',
  navArticles: 'Articles',
  navAbout: 'About',
  navViewAll: 'View all Pages',
  navSourceTip: 'View / Edit Source & Data',
  navTheme: 'Theme',
  navSettings: 'Settings',
  navLanguage: 'Deutsch',
  navLanguageTip: 'Auf Deutsch lesen',
  settingsData: 'Data',
  settingsDeleteAll: 'Delete All',
  settingsClose: 'Close',
  settingsConfirm: 'Are you sure you want to delete all local data? This will erase your progress.',
  footerFork: 'Fork of',
  footerBy: 'by',
  footerLicense: 'Content licensed under',
  footerChanges: 'Changes: German translation and additional checklist items.',
  footerSource: 'Source on',
  progressTitle: 'Your Progress',
  progressCompleted: "You've completed",
  progressOutOf: 'out of',
  progressItems: 'items',
  progressNoStats: 'No stats yet',
  progressNoStatsText: "You'll see your progress here, once you start ticking items off the checklists",
  progressGetStarted: 'Get started, by selecting a checklist below',
  progressNext: 'Next up, consider switching to more secure and privacy-respecting apps and services.',
  progressDirectory: 'View our directory of recommended software, at',
  progressTooltip: 'Completed {p}% of {n} items.',
  progressChartTooltip: 'Completed {p}% of {l} items',
  essential: 'Essential',
  optional: 'Optional',
  advanced: 'Advanced',
  basic: 'Basic',
  done: 'Done',
  items: 'Items',
  notStarted: 'Not yet started',
  tableDone: 'Done?',
  tableAdvice: 'Advice',
  tableLevel: 'Level',
  tableDetails: 'Details',
  tableIgnore: 'Ignore',
  tableComplete: '{d} out of {t} ({p}%) complete, {i} ignored',
  tableResetFilters: 'Reset Filters',
  tableShowFilters: 'Show Filters',
  tableHideFilters: 'Hide Filters',
  tableShow: 'Show',
  tableAll: 'All',
  tableRemaining: 'Remaining',
  tableCompleted: 'Completed',
  tableFilter: 'Filter',
  usefulLinks: 'Useful Links',
  recommendedSoftware: 'Recommended Software',
  viewFullChecklist: 'View Full Checklist ➜',
  notFound: "The page you're looking for doesn't exist.",
  backHome: 'Go back to the homepage',
  articlesNote: '',
};

const de: typeof en = {
  siteName: 'Digital Defense',
  siteTagline: 'Die persönliche Sicherheits-Checkliste für Ihr digitales Leben',
  heroPre: 'Die große',
  heroTitle: 'Persönliche Sicherheits-Checkliste',
  heroSub: 'Ihr Leitfaden, um Ihr digitales Leben abzusichern und Ihre Privatsphäre zu schützen',
  heroGithub: 'Auf GitHub ansehen',
  navChecklists: 'Checklisten',
  navHome: 'Startseite',
  navArticles: 'Artikel (englisch)',
  navAbout: 'Über (englisch)',
  navViewAll: 'Alle Seiten anzeigen',
  navSourceTip: 'Quellcode & Daten ansehen / bearbeiten',
  navTheme: 'Design',
  navSettings: 'Einstellungen',
  navLanguage: 'English',
  navLanguageTip: 'Read in English',
  settingsData: 'Daten',
  settingsDeleteAll: 'Alles löschen',
  settingsClose: 'Schließen',
  settingsConfirm: 'Wirklich alle lokal gespeicherten Daten löschen? Ihr Fortschritt geht dabei verloren.',
  footerFork: 'Fork von',
  footerBy: 'von',
  footerLicense: 'Inhalte lizenziert unter',
  footerChanges: 'Änderungen: deutsche Übersetzung und zusätzliche Checklisten-Punkte.',
  footerSource: 'Quellcode auf',
  progressTitle: 'Ihr Fortschritt',
  progressCompleted: 'Sie haben',
  progressOutOf: 'von',
  progressItems: 'Punkten erledigt',
  progressNoStats: 'Noch keine Statistik',
  progressNoStatsText: 'Hier sehen Sie Ihren Fortschritt, sobald Sie Punkte in den Checklisten abhaken.',
  progressGetStarted: 'Wählen Sie unten eine Checkliste, um zu beginnen.',
  progressNext: 'Als Nächstes: Steigen Sie auf sicherere, datenschutzfreundliche Apps und Dienste um.',
  progressDirectory: 'Empfohlene Software finden Sie (englisch) auf',
  progressTooltip: '{p}% von {n} Punkten erledigt.',
  progressChartTooltip: '{p}% der Punkte „{l}“ erledigt',
  essential: 'Grundlegend',
  optional: 'Optional',
  advanced: 'Fortgeschritten',
  basic: 'Grundlegend',
  done: 'erledigt',
  items: 'Punkte',
  notStarted: 'Offen',
  tableDone: 'Erledigt?',
  tableAdvice: 'Empfehlung',
  tableLevel: 'Stufe',
  tableDetails: 'Details',
  tableIgnore: 'Ignorieren',
  tableComplete: '{d} von {t} ({p}%) erledigt, {i} ignoriert',
  tableResetFilters: 'Filter zurücksetzen',
  tableShowFilters: 'Filter anzeigen',
  tableHideFilters: 'Filter ausblenden',
  tableShow: 'Zeige',
  tableAll: 'Alle',
  tableRemaining: 'Offen',
  tableCompleted: 'Erledigt',
  tableFilter: 'Filter',
  usefulLinks: 'Nützliche Links',
  recommendedSoftware: 'Empfohlene Software',
  viewFullChecklist: 'Ganze Checkliste ansehen ➜',
  notFound: 'Diese Seite gibt es leider nicht.',
  backHome: 'Zur Startseite',
  articlesNote: 'Die Artikel sind nur auf Englisch verfügbar.',
};

export const strings: Record<Lang, typeof en> = { en, de };

/** Replace {placeholders} in a string */
export const fmt = (text: string, values: Record<string, string | number>): string =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => (k in values ? String(values[k]) : ''));

/** Translate a priority value (Essential/Optional/Advanced) */
export const priorityLabel = (lang: Lang, priority: string): string => {
  const key = priority.toLowerCase() as 'essential' | 'optional' | 'advanced';
  return strings[lang][key] || priority;
};
