import { useState, useCallback, useMemo, useEffect } from 'react';
import { Client, StatusSettings, ClientStats } from '../types';
import { APIClient } from '../utils/api';
import { APIError } from '../types/api';

interface UseClientStatusState {
  statusSettings: StatusSettings | null;  // Оставляем возможность null
  loading: boolean;
  error: APIError | null;
  clientStats: ClientStats;
  autoCalculationRequirements: {
    MIN_REGULAR_CLIENTS: number;
    MIN_LOYAL_CLIENTS: number;
  };
}

const calculateClientStats = (clients: Client[]): ClientStats => ({
  cold: clients.filter(c => c.status === 'cold').length,
  new: clients.filter(c => c.status === 'new').length,
  regular: clients.filter(c => c.status === 'regular').length,
  loyal: clients.filter(c => c.status === 'loyal').length,
  lost: clients.filter(c => c.status === 'lost').length
});

export const useClientStatus = (clients: Client[]) => {
  const [state, setState] = useState<UseClientStatusState>({
    statusSettings: null,
    loading: false,
    error: null,
    clientStats: {
      cold: 0,
      new: 0,
      regular: 0,
      loyal: 0,
      lost: 0
    },
    autoCalculationRequirements: {
      MIN_REGULAR_CLIENTS: 20,
      MIN_LOYAL_CLIENTS: 5
    }
  });

  const [showStatusSettings, setShowStatusSettings] = useState(false);

  const updateStatusSettings = useCallback(async (newSettings: Partial<StatusSettings>) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    
    try {
      const response = await APIClient.post<StatusSettings>('/status-settings/', newSettings);
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error as APIError
        }));
        throw response.error;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        statusSettings: response.data || prev.statusSettings
      }));

      return response.data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as APIError
      }));
      throw error;
    }
  }, []);

  const recalculateClientStatuses = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    
    try {
      const response = await APIClient.post<Client[]>('/recalculate-statuses/', {});
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error as APIError
        }));
        throw response.error;
      }

      const updatedClients = response.data || [];
      setState(prev => ({
        ...prev,
        loading: false,
        clientStats: calculateClientStats(updatedClients)
      }));

      return updatedClients;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as APIError
      }));
      throw error;
    }
  }, []);

  const fetchStatusSettings = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    
    try {
      const response = await APIClient.get<StatusSettings>('/status-settings/');
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error as APIError
        }));
        throw response.error;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        statusSettings: response.data || null, // Изменили здесь - если данных нет, явно устанавливаем null
        clientStats: calculateClientStats(clients)
      }));

      return response.data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as APIError
      }));
      throw error;
    }
  }, [clients]);

  const checkAutoCalculationPossibility = useCallback((): boolean => {
    return state.clientStats.regular >= state.autoCalculationRequirements.MIN_REGULAR_CLIENTS &&
           state.clientStats.loyal >= state.autoCalculationRequirements.MIN_LOYAL_CLIENTS;
  }, [state.clientStats, state.autoCalculationRequirements]);

  const handleError = useCallback((error: APIError) => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        console.error('Network connection error');
        break;
      case 'VALIDATION_ERROR':
        console.error('Validation error:', error.details);
        break;
      case 'NOT_FOUND':
        console.error('Resource not found');
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  }, []);

  const averageLoyalInterval = useMemo(() => {
    const loyalClients = clients.filter(c => c.status === 'loyal');
    if (!loyalClients.length) return 0;
    return Math.floor(loyalClients.reduce((acc, c) => acc + c.averageInterval, 0) / loyalClients.length);
  }, [clients]);

  const averageRegularInterval = useMemo(() => {
    const regularClients = clients.filter(c => c.status === 'regular');
    if (!regularClients.length) return 0;
    return Math.floor(regularClients.reduce((acc, c) => acc + c.averageInterval, 0) / regularClients.length);
  }, [clients]);

  useEffect(() => {
    fetchStatusSettings().catch(handleError);
  }, [fetchStatusSettings, handleError]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      clientStats: calculateClientStats(clients)
    }));
  }, [clients]);

  // Добавляем флаг isReady в возвращаемые значения
  const isReady = !state.loading && !state.error && state.statusSettings !== null;

  return {
    ...state,
    showStatusSettings,
    averageLoyalInterval,
    averageRegularInterval,
    toggleStatusSettings: () => setShowStatusSettings(prev => !prev),
    updateStatusSettings,
    recalculateClientStatuses,
    checkAutoCalculationPossibility,
    handleError,
    isReady // Добавляем в возвращаемые значения
  };
};