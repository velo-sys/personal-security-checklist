import { $, component$, useStore, useSignal } from '@builder.io/qwik';
import { useCSSTransition } from 'qwik-transition';

import Icon from '~/components/core/icon';
import type { Priority, Section, Checklist } from '../../types/PSC';
import { marked } from 'marked';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import styles from './psc.module.css';
import { useI18n, itemId, fmt, priorityLabel } from '~/i18n';
import { vhsItemIndex } from '~/data/vhs';

export default component$((props: { section: Section }) => {
  const { lang, t, link } = useI18n();
  const [completed, setCompleted] = useLocalStorage('PSC_PROGRESS', {});
  const [ignored, setIgnored] = useLocalStorage('PSC_IGNORED', {});

  const showFilters = useSignal(false);
  const { stage } = useCSSTransition(showFilters, { timeout: 300 });

  const sortState = useStore({ column: '', ascending: true });

  const checklist = useSignal<Checklist[]>(props.section.checklist);

  const originalFilters = {
    show: 'all', // 'all', 'remaining', 'completed'
    levels: {
      essential: true,
      optional: true,
      advanced: true,
    },
  };

  const filterState = useStore(originalFilters);

  const getBadgeClass = (priority: Priority, precedeClass: string = '') => {
    switch (priority.toLocaleLowerCase()) {
      case 'essential':
        return `${precedeClass}success`;
      case 'optional':
        return `${precedeClass}warning`;
      case 'advanced':
        return `${precedeClass}error`;
      default:
        return `${precedeClass}neutral`;
    }
  };

  const parseMarkdown = (text: string | undefined): string => {
    return (marked.parse(text || '', { async: false }) as string) || '';
  };

  const isIgnored = (pointId: string) => {
    return ignored.value[pointId] || false;
  };

  const isChecked = (pointId: string) => {
    if (isIgnored(pointId)) return false;
    return completed.value[pointId] || false;
  };

  const filteredChecklist = checklist.value.filter((item) => {
    const id = itemId(item);
    const itemCompleted = isChecked(id);
    const itemIgnored = isIgnored(id);
    const itemLevel = item.priority;

    // Filter by completion status
    if (filterState.show === 'remaining' && (itemCompleted || itemIgnored)) return false;
    if (filterState.show === 'completed' && !itemCompleted) return false;

    // Filter by level
    return filterState.levels[itemLevel.toLocaleLowerCase() as Priority];
  });

  const sortChecklist = (a: Checklist, b: Checklist) => {
    const getValue = (item: Checklist) => {
      switch (sortState.column) {
        case 'done':
          if (isIgnored(itemId(item))) {
            return 2;
          }
          return isChecked(itemId(item)) ? 0 : 1;
        case 'advice':
          return item.point;
        case 'level':
          return ['essential', 'optional', 'advanced'].indexOf(item.priority.toLowerCase());
        default:
          return 0;
      }
    };
    const valueA = getValue(a);
    const valueB = getValue(b);

    if (valueA === valueB) {
      return 0;
    } else if (sortState.ascending) {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  };

  const handleSort = $((column: string) => {
    if (sortState.column === column) {
      // Reverse direction if same column
      sortState.ascending = !sortState.ascending;
    } else {
      // Sort table by column
      sortState.column = column;
      sortState.ascending = true; // Default to ascending
    }
  });

  const resetFilters = $(() => {
    checklist.value = props.section.checklist;
    sortState.column = '';
    sortState.ascending = true;
    filterState.levels = originalFilters.levels;
    filterState.show = originalFilters.show;
  });

  const calculateProgress = (): { done: number; total: number; percent: number; disabled: number } => {
    let done = 0;
    let disabled = 0;
    let total = 0;

    props.section.checklist.forEach((item) => {
      const id = itemId(item);
      if (isIgnored(id)) {
        disabled += 1;
      } else if (isChecked(id)) {
        done += 1;
        total += 1;
      } else {
        total += 1;
      }
    });

    const percent = Math.round((done / total) * 100);
    return { done, total: props.section.checklist.length, percent, disabled };
  };

  const { done, total, percent, disabled } = calculateProgress();

  return (
    <>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <progress class="progress w-64" value={percent} max="100"></progress>
          <p class="text-xs text-center">
            {fmt(t('tableComplete'), { d: done, t: total, p: percent || 0, i: disabled })}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 justify-end my-4">
          {(sortState.column || JSON.stringify(filterState) !== JSON.stringify(originalFilters)) && (
            <button class="btn btn-sm hover:btn-primary" onClick$={resetFilters}>
              <Icon width={18} height={16} icon="clear" />
              {t('tableResetFilters')}
            </button>
          )}
          <button
            class="btn btn-sm hover:btn-primary"
            onClick$={() => {
              showFilters.value = !showFilters.value;
            }}
          >
            <Icon width={18} height={16} icon="filters" />
            {showFilters.value ? t('tableHideFilters') : t('tableShowFilters')}
          </button>
        </div>
      </div>

      {showFilters.value && (
        <div
          class="flex flex-wrap justify-between bg-base-100 rounded-sm px-4 py-1 transition-all"
          style={{ opacity: stage.value === 'enterTo' ? 1 : 0, height: stage.value === 'enterTo' ? 'auto' : 0 }}
        >
          {/* Filter by completion */}
          <div class="flex justify-end items-center gap-1">
            <p class="font-bold text-sm">{t('tableShow')}</p>
            <label
              onClick$={() => (filterState.show = 'all')}
              class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2"
            >
              <span class="text-sm">{t('tableAll')}</span>
              <input type="radio" name="show" class="radio radio-sm checked:radio-info" checked />
            </label>
            <label
              onClick$={() => (filterState.show = 'remaining')}
              class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2"
            >
              <span class="text-sm">{t('tableRemaining')}</span>
              <input type="radio" name="show" class="radio radio-sm checked:radio-error" />
            </label>
            <label
              onClick$={() => (filterState.show = 'completed')}
              class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2"
            >
              <span class="text-sm">{t('tableCompleted')}</span>
              <input type="radio" name="show" class="radio radio-sm checked:radio-success" />
            </label>
          </div>
          {/* Filter by level */}
          <div class="flex justify-end items-center gap-1">
            <p class="font-bold text-sm">{t('tableFilter')}</p>
            <label class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2">
              <span class="text-sm">{t('basic')}</span>
              <input
                type="checkbox"
                checked={filterState.levels.essential}
                onChange$={() => (filterState.levels.essential = !filterState.levels.essential)}
                class="checkbox checkbox-sm checked:checkbox-success"
              />
            </label>
            <label class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2">
              <span class="text-sm">{t('optional')}</span>
              <input
                type="checkbox"
                checked={filterState.levels.optional}
                onChange$={() => (filterState.levels.optional = !filterState.levels.optional)}
                class="checkbox checkbox-sm checked:checkbox-warning"
              />
            </label>
            <label class="p-2 rounded-sm hover:bg-front transition-all cursor-pointer flex gap-2">
              <span class="text-sm">{t('advanced')}</span>
              <input
                type="checkbox"
                checked={filterState.levels.advanced}
                class="checkbox checkbox-sm checked:checkbox-error"
                onChange$={() => (filterState.levels.advanced = !filterState.levels.advanced)}
              />
            </label>
          </div>
        </div>
      )}

      <table class="table">
        <thead>
          <tr>
            {[
              { id: 'done', text: t('tableDone') },
              { id: 'advice', text: t('tableAdvice') },
              { id: 'level', text: t('tableLevel') },
            ].map((item) => (
              <th key={item.id} class="cursor-pointer" onClick$={() => handleSort(item.id)}>
                <span class="flex items-center gap-0.5 hover:text-primary transition">
                  <Icon width={12} height={14} icon="sort" />
                  {item.text}
                </span>
              </th>
            ))}
            <th>{t('tableDetails')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredChecklist.sort(sortChecklist).map((item, index) => {
            const badgeColor = getBadgeClass(item.priority);
            const rowId = itemId(item);
            const isItemCompleted = isChecked(rowId);
            const isItemIgnored = isIgnored(rowId);
            const vhsModules = vhsItemIndex[rowId] || [];
            return (
              <tr
                key={index}
                id={rowId}
                class={[
                  'rounded-xs transition-all',
                  isItemCompleted ? `bg-${badgeColor}/10` : '',
                  isItemIgnored ? 'bg-neutral/15' : '',
                  !isItemIgnored && !isItemCompleted ? `hover:bg-${badgeColor}/5` : '',
                ]}
              >
                <td class="text-center">
                  <input
                    type="checkbox"
                    class={`checkbox checked:checkbox-${badgeColor} hover:checkbox-${badgeColor}`}
                    id={`done-${rowId}`}
                    checked={isChecked(rowId)}
                    disabled={isIgnored(rowId)}
                    onClick$={() => {
                      const data = completed.value;
                      data[rowId] = !data[rowId];
                      setCompleted(data);
                    }}
                  />
                  <label for={`ignore-${rowId}`} class="text-small block opacity-50 mt-2">
                    {t('tableIgnore')}
                  </label>
                  <input
                    type="checkbox"
                    id={`ignore-${rowId}`}
                    class={`toggle toggle-xs toggle-${badgeColor}`}
                    checked={isIgnored(rowId)}
                    onClick$={() => {
                      const ignoredData = ignored.value;
                      ignoredData[rowId] = !ignoredData[rowId];
                      setIgnored(ignoredData);

                      const completedData = completed.value;
                      completedData[rowId] = false;
                      setCompleted(completedData);
                    }}
                  />
                </td>
                <td>
                  <label
                    for={`done-${rowId}`}
                    class={`text-base font-bold ${isIgnored(rowId) ? 'line-through' : 'cursor-pointer'}`}
                  >
                    {item.point}
                  </label>
                  {(vhsModules.length > 0 || item.vhsOnly) && (
                    <div class="flex flex-wrap gap-1 mt-1">
                      {vhsModules.map((mod) => (
                        <a
                          key={mod.id}
                          href={link(`/course#${mod.id}`)}
                          class="badge badge-sm badge-secondary badge-outline tooltip tooltip-right"
                          data-tip={`${t('vhsBadgeTip')}: ${mod.subtitle[lang]}`}
                        >
                          {t('vhsBadge')} {mod.short}
                        </a>
                      ))}
                      {item.vhsOnly && <span class="badge badge-sm badge-ghost">{t('vhsExtraTip')}</span>}
                    </div>
                  )}
                </td>
                <td>
                  <div class={`badge gap-2 badge-${badgeColor}`}>{priorityLabel(lang, item.priority)}</div>
                </td>
                <td class={styles.checklistItemDescription} dangerouslySetInnerHTML={parseMarkdown(item.details)}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
});
