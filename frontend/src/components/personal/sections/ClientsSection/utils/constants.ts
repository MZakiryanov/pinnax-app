// src/components/personal/sections/ClientsSection/utils/constants.ts

// Настройки пагинации
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  INITIAL_PAGE: 1
} as const;

// Задержки
export const DELAYS = {
  SEARCH_DEBOUNCE: 300,  // мс
  CART_REMINDER: 30 * 60 * 1000, // 30 минут в миллисекундах
} as const;

// Форматы дат
export const DATE_FORMATS = {
  DISPLAY: 'dd.MM.yyyy',
  DISPLAY_WITH_TIME: 'dd.MM.yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
} as const;

// Статусы клиентов
export const CLIENT_STATUSES = {
  COLD: 'cold',
  NEW: 'new',
  REGULAR: 'regular',
  LOYAL: 'loyal',
  LOST: 'lost',
} as const;

// Изменения статуса
export const STATUS_CHANGES = {
  UPGRADE: 'upgrade',
  DOWNGRADE: 'downgrade',
} as const;

// Каналы связи
export const COMMUNICATION_CHANNELS = {
  WHATSAPP: 'WhatsApp',
  TELEGRAM: 'Telegram',
  INSTAGRAM: 'Instagram',
  MESSENGER: 'Messenger',
} as const;

// Настройки экспорта
export const EXPORT_SETTINGS = {
  FILENAME_PREFIX: 'clients_export_',
  ENCODING: 'utf-8',
  DELIMITER: ',',
} as const;

// Валидация
export const VALIDATION = {
  PHONE_REGEX: /^\+7 \d{3} \d{3} \d{2} \d{2}$/,
  MAX_DISCOUNT: 99,
  MIN_DISCOUNT: 0,
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  INVALID_PHONE: 'Неверный формат телефона',
  INVALID_DISCOUNT: 'Скидка должна быть от 0 до 99%',
  INVALID_DATE: 'Неверный формат даты',
} as const;

// Подсказки
export const TOOLTIPS = {
  AUTO_CALCULATION: 'Автоматический расчет статусов на основе данных о заказах',
  MANUAL_SETTINGS: 'Ручная настройка параметров определения статусов',
  EXPORT: 'Экспорт данных в CSV',
} as const;

// Заголовки таблицы
export const TABLE_HEADERS = {
  base: [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Клиент' },
    { key: 'phone', title: 'Телефон' },
    { key: 'ordersCount', title: 'Заказы' },
    { key: 'totalAmount', title: 'Сумма' },
    { key: 'lastOrder', title: 'Последний заказ' },
    { key: 'status', title: 'Статус' },
  ],
  extended: [
    { key: 'street', title: 'Улица' },
    { key: 'house', title: 'Дом' },
    { key: 'entrance', title: 'Подъезд' },
    { key: 'floor', title: 'Этаж' },
    { key: 'apartment', title: 'Квартира' },
    { key: 'comment', title: 'Комментарий' },
    { key: 'email', title: 'Email' },
    { key: 'noMailings', title: 'Рассылка' },
    { key: 'abandonedCarts', title: 'Корзины' },
    { key: 'discount', title: 'Скидка' },
    { key: 'channel', title: 'Канал' },
    { key: 'created', title: 'Создан' },
  ],
} as const;