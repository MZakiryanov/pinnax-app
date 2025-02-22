// src/utils/api.ts
import { APIError, APIResponse } from '../types/api';

export class APIClient {
  private static baseUrl = '/api';

  private static async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    if (!response.ok) {
      let error: APIError;
      try {
        // Use type assertion to handle unknown type
        const errorData = await response.json() as Record<string, unknown>;
        error = {
          message: typeof errorData.message === 'string' 
            ? errorData.message 
            : 'An unexpected error occurred',
          code: typeof errorData.code === 'string' 
            ? errorData.code 
            : 'UNKNOWN_ERROR',
          details: typeof errorData === 'object' ? errorData : undefined
        };
      } catch {
        error = {
          message: 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR'
        };
      }
      return { error };
    }

    const data = await response.json() as T;
    return { data };
  }

  static async get<T>(endpoint: string): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        error: {
          message: 'Network error occurred',
          code: 'NETWORK_ERROR'
        }
      };
    }
  }

  static async post<T>(endpoint: string, data: unknown): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        error: {
          message: 'Network error occurred',
          code: 'NETWORK_ERROR'
        }
      };
    }
  }
}