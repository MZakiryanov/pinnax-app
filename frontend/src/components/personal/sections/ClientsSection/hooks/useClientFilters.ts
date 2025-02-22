// src/components/personal/sections/ClientsSection/hooks/useClientFilters.ts
import { useState, useCallback, useMemo } from 'react';
import { Client, ClientFilters } from '../types';

interface UseClientFiltersReturn {
  filters: ClientFilters;
  searchQuery: string;
  showFilters: boolean;
  filteredClients: Client[];
  updateFilters: (newFilters: Partial<ClientFilters>) => void;
  setSearchQuery: (query: string) => void;
  toggleFilters: () => void;
}

const initialFilters: ClientFilters = {
  ordersFrom: '',
  ordersTo: '',
  amountFrom: '',
  amountTo: '',
  status: 'all', // Set default value to 'all' instead of empty string
  lastOrderFrom: '',
  lastOrderTo: ''
};

export const useClientFilters = (clients: Client[]): UseClientFiltersReturn => {
  const [filters, setFilters] = useState<ClientFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = useCallback((newFilters: Partial<ClientFilters>) => {
    setFilters(current => ({ ...current, ...newFilters }));
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(current => !current);
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Search by ID or phone
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          client.id.toLowerCase().includes(searchLower) ||
          client.phone.replace(/\D/g, '').includes(searchQuery.replace(/\D/g, ''));
        
        if (!matchesSearch) return false;
      }

      // Filter by orders count
      if (filters.ordersFrom && client.ordersCount < parseInt(filters.ordersFrom)) return false;
      if (filters.ordersTo && client.ordersCount > parseInt(filters.ordersTo)) return false;

      // Filter by order amount
      const amount = parseFloat(client.totalAmount.replace(/[^\d.-]/g, ''));
      if (filters.amountFrom && amount < parseFloat(filters.amountFrom)) return false;
      if (filters.amountTo && amount > parseFloat(filters.amountTo)) return false;

      // Filter by status
      if (filters.status && filters.status !== 'all' && client.status !== filters.status) return false;

      // Filter by last order date
      if (filters.lastOrderFrom && client.lastOrder) {
        const orderDate = new Date(client.lastOrder);
        const fromDate = new Date(filters.lastOrderFrom);
        if (orderDate < fromDate) return false;
      }
      
      if (filters.lastOrderTo && client.lastOrder) {
        const orderDate = new Date(client.lastOrder);
        const toDate = new Date(filters.lastOrderTo);
        if (orderDate > toDate) return false;
      }

      return true;
    });
  }, [clients, searchQuery, filters]);

  return {
    filters,
    searchQuery,
    showFilters,
    filteredClients,
    updateFilters,
    setSearchQuery,
    toggleFilters
  };
};