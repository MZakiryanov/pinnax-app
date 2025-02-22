// src/components/personal/sections/ClientsSection/types/api.ts
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface APIResponse<T> {
  data?: T;
  error?: APIError;
}