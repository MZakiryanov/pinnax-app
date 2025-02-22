// src/utils/error-utils.ts
import { APIError } from '../types/api';
import { ERROR_CODES } from '../constants/errors';
import { ERROR_MESSAGES } from '../constants/errors';

export const getErrorMessage = (error: APIError): string => {
  return error.message || ERROR_MESSAGES[error.code as keyof typeof ERROR_MESSAGES] || 'An unexpected error occurred';
};

export const shouldRetry = (error: APIError): boolean => {
  return error.code === ERROR_CODES.NETWORK_ERROR || 
         error.code === ERROR_CODES.SERVER_ERROR;
};