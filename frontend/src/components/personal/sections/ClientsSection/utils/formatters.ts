// src/components/personal/sections/ClientsSection/utils/formatters.ts

/**
 * Форматирование даты в локальный формат
 */
export const formatDate = (date: string | null, includeTime: boolean = false): string => {
  if (!date) return '—';
  
  try {
    const dateObj = new Date(date);
    if (includeTime) {
      return dateObj.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return dateObj.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return '—';
  }
};

/**
 * Форматирование валюты
 */
export const formatCurrency = (amount: string | number): string => {
  try {
    const value = typeof amount === 'string' 
      ? parseFloat(amount.replace(/[^\d.-]/g, ''))
      : amount;
      
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value) + ' ₸';
  } catch (error) {
    return '0 ₸';
  }
};

/**
 * Форматирование телефонного номера
 */
export const formatPhoneNumber = (phone: string): string => {
  try {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    
    return phone;
  } catch (error) {
    return phone;
  }
};

/**
 * Форматирование процентов
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Форматирование периода в днях
 */
export const formatPeriod = (days: number): string => {
  if (days === 0) return '—';
  return `${days} ${getDaysPluralForm(days)}`;
};

/**
 * Форматирование адреса
 */
export const formatAddress = (
  street: string,
  house: string,
  entrance?: string,
  floor?: string,
  apartment?: string
): string => {
  let address = `${street}, д. ${house}`;
  
  if (entrance) address += `, подъезд ${entrance}`;
  if (floor) address += `, этаж ${floor}`;
  if (apartment) address += `, кв. ${apartment}`;
  
  return address;
};

/**
 * Форматирование больших чисел
 */
export const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number.toString();
};

/**
 * Форматирование даты для input[type="date"]
 */
export const formatDateForInput = (date: string | null): string => {
  if (!date) return '';
  try {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
};

/**
 * Получение правильного склонения для дней
 */
const getDaysPluralForm = (days: number): string => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'дней';
  }

  if (lastDigit === 1) {
    return 'день';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня';
  }

  return 'дней';
};

/**
 * Форматирование времени для отображения временных промежутков
 */
export const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'только что';
  if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ч. назад`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} дн. назад`;
  
  return formatDate(date);
};

/**
 * Форматирование размера файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};