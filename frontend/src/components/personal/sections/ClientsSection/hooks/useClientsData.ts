// src/components/personal/sections/ClientsSection/hooks/useClientData.ts
import { useState, useCallback } from 'react';
import { Client } from '../types';

interface UseClientDataReturn {
  clients: Client[];
  selectedClientId: string | null;
  selectClient: (id: string | null) => void;
  updateClientDiscount: (clientId: string, discount: number) => void;
  exportClientsToCSV: () => void;
}

export const useClientData = (initialClients: Client[]): UseClientDataReturn => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const selectClient = useCallback((id: string | null) => {
    setSelectedClientId(id);
  }, []);

  const updateClientDiscount = useCallback((clientId: string, discount: number) => {
    setClients(currentClients => 
      currentClients.map(client => 
        client.id === clientId 
          ? { ...client, discount } 
          : client
      )
    );
  }, []);

  const exportClientsToCSV = useCallback(() => {
    // Заголовки CSV
    const headers = [
      'ID',
      'Имя',
      'Телефон',
      'Количество заказов',
      'Сумма',
      'Последний заказ',
      'Статус'
    ];

    // Преобразование данных клиентов
    const csvData = clients.map(client => [
      client.id,
      client.name,
      client.phone,
      client.ordersCount,
      client.totalAmount,
      client.lastOrder ? new Date(client.lastOrder).toLocaleDateString('ru-RU') : '',
      client.status
    ]);

    // Добавление заголовков
    csvData.unshift(headers);

    // Преобразование в CSV строку
    const csvString = csvData
      .map(row => 
        row
          .map(cell => {
            const cellStr = String(cell).replace(/"/g, '""');
            return cellStr.includes(',') ? `"${cellStr}"` : cellStr;
          })
          .join(',')
      )
      .join('\n');

    // Создание и скачивание файла
    const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `clients_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [clients]);

  return {
    clients,
    selectedClientId,
    selectClient,
    updateClientDiscount,
    exportClientsToCSV
  };
};