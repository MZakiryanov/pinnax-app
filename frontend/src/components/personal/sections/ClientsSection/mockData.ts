import { Client } from './types';

export const mockClients: Client[] = [
  {
    id: '1234',
    name: 'Алия Сатпаева',
    phone: '+7 777 123 45 67',
    street: 'ул. Абая',
    house: '123',
    entrance: '1',
    floor: '5',
    apartment: '51',
    email: 'aliya@mail.kz',
    noMailings: false,
    abandonedCarts: true,
    channel: 'WhatsApp',
    created: '2024-01-15',
    ordersCount: 12,
    totalAmount: '245,000 ₸',
    lastOrder: '2025-02-14',
    status: 'loyal',
    statusChange: 'upgrade',
    discount: 0,
    averageCheck: '20,417 ₸',
    orderFrequency: 15,
    comment: 'Предпочитает доставку после 18:00',
    ordersByMonth: [
      { month: 'Янв', orders: 2 },
      { month: 'Фев', orders: 3 },
    ],
    products: [
      { id: 'P001', name: 'Товар 1', quantity: 5, price: '15,000 ₸', total: '75,000 ₸' },
      { id: 'P002', name: 'Товар 2', quantity: 3, price: '20,000 ₸', total: '60,000 ₸' },
    ],
    orders: [
      {
        id: 'O001',
        date: '2025-02-14 15:30',
        items: [
          { id: 'P001', name: 'Товар 1', quantity: 2, price: '15,000 ₸', total: '30,000 ₸' }
        ],
        total: '30,000 ₸'
      }
    ],
    averageInterval: 15,  // Используем фиксированное значение
    daysSinceLastOrder: 8 // Используем фиксированное значение
  },
  {
    id: '1235',
    name: 'Марат Алиев',
    phone: '+7 777 234 56 78',
    street: 'пр. Достык',
    house: '45',
    entrance: '2',
    floor: '7',
    apartment: '72',
    email: 'marat@mail.kz',
    noMailings: true,
    abandonedCarts: false,
    channel: 'Telegram',
    created: '2024-02-01',
    ordersCount: 3,
    totalAmount: '85,000 ₸',
    lastOrder: '2025-02-10',
    status: 'regular',
    statusChange: null,
    discount: 5,
    averageCheck: '28,333 ₸',
    orderFrequency: 20,
    comment: 'Аллергия на орехи',
    ordersByMonth: [
      { month: 'Янв', orders: 1 },
      { month: 'Фев', orders: 2 },
    ],
    products: [
      { id: 'P003', name: 'Товар 3', quantity: 2, price: '25,000 ₸', total: '50,000 ₸' }
    ],
    orders: [],
    averageInterval: 20,  // Используем фиксированное значение
    daysSinceLastOrder: 12 // Используем фиксированное значение
  }
];