// src/hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { APIError } from '../types/api';
import { getErrorMessage } from '../utils/error-utils';
import { ERROR_CODES } from '../constants/errors';

export const useErrorHandler = () => {
  const handleError = useCallback((error: APIError) => {
    const message = getErrorMessage(error);
    
    // Здесь можно интегрировать любую систему уведомлений
    console.error(`Error (${error.code}):`, message);
    
    // Можно добавить специальную обработку для разных типов ошибок
    switch (error.code) {
      case ERROR_CODES.UNAUTHORIZED:
        // Редирект на страницу логина с проверкой наличия window
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        break;
      
      case ERROR_CODES.FORBIDDEN:
        // Показать сообщение о недостаточных правах
        break;
        
      case ERROR_CODES.VALIDATION_ERROR:
        // Подсветить поля с ошибками
        break;
    }
  }, []);

  return { handleError };
};