// src/components/personal/sections/ClientsSection/utils/statusHelpers.ts
import { COLORS, COMPONENT_STYLES } from '@/theme';
import { ClientStatus } from '../types';

/**
 * Получение цветовых классов для статуса клиента из темы
 */
export const getStatusColor = (status: ClientStatus): string => {
  return COLORS.clientStatus[status].bg + ' ' + COLORS.clientStatus[status].text;
};

/**
 * Получение стиля бейджа для статуса из темы
 */
export const getStatusBadgeStyle = (status: ClientStatus): string => {
  return `${COMPONENT_STYLES.badge.base} ${COMPONENT_STYLES.badge[status]}`;
};

/**
 * Получение текстового представления статуса
 */
export const getStatusText = (status: ClientStatus): string => {
  switch (status) {
    case 'cold': return 'Холодный';
    case 'new': return 'Новый';
    case 'regular': return 'Постоянный';
    case 'loyal': return 'Лояльный';
    case 'lost': return 'Потерянный';
  }
};

/**
 * Опции статусов для выпадающих списков с использованием констант темы
 */
export const statusOptions = [
  { value: 'all', label: 'Все статусы' },
  { value: 'cold', label: 'Холодный' },
  { value: 'new', label: 'Новый' },
  { value: 'regular', label: 'Постоянный' },
  { value: 'loyal', label: 'Лояльный' },
  { value: 'lost', label: 'Потерянный' }
] as const;

/**
 * Функция для определения изменения статуса (стрелка вверх/вниз)
 */
export const getStatusChangeStyle = (change: 'upgrade' | 'downgrade' | null): string => {
  if (!change) return '';

  return change === 'upgrade'
    ? `text-${COLORS.status.success.dark} ml-1`
    : `text-${COLORS.status.error.dark} ml-1`;
};

/**
 * Получение полного стиля для статуса с учетом изменения
 */
export const getFullStatusStyle = (
  status: ClientStatus, 
  change: 'upgrade' | 'downgrade' | null
): string => {
  const baseStyle = getStatusBadgeStyle(status);
  const changeStyle = getStatusChangeStyle(change);
  return `${baseStyle} ${changeStyle}`.trim();
};