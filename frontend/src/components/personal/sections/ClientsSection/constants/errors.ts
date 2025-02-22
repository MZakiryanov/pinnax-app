// src/constants/errors.ts
export const ERROR_CODES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
  } as const;
  
  export const ERROR_MESSAGES = {
    [ERROR_CODES.NETWORK_ERROR]: 'Network connection error occurred',
    [ERROR_CODES.VALIDATION_ERROR]: 'Validation error occurred',
    [ERROR_CODES.NOT_FOUND]: 'Requested resource not found',
    [ERROR_CODES.UNAUTHORIZED]: 'Authentication required',
    [ERROR_CODES.FORBIDDEN]: 'Access denied',
    [ERROR_CODES.SERVER_ERROR]: 'Server error occurred',
    [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred'
  } as const;