// src/utils/error-handlers.ts
import { APIError } from '../types/api';

export const displayErrorNotification = (error: APIError) => {
    // Здесь можно интегрировать любую библиотеку уведомлений
    console.error('Error:', error.message);
};
  
export const isNetworkError = (error: APIError): boolean => {
    return error.code === 'NETWORK_ERROR';
};
  
export const isValidationError = (error: APIError): boolean => {
    return error.code === 'VALIDATION_ERROR';
};