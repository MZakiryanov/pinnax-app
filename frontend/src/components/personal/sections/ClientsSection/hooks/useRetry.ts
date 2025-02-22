// src/components/personal/sections/ClientsSection/hooks/useRetry.ts
import { useState, useCallback } from 'react';
import { APIError } from '../types/api';
import { shouldRetry } from '../utils/error-utils';

interface UseRetryOptions {
  maxAttempts?: number;
  delayMs?: number;
}

export const useRetry = (options: UseRetryOptions = {}) => {
  const { maxAttempts = 3, delayMs = 1000 } = options;
  const [attempts, setAttempts] = useState(0);

  const retry = useCallback(async <T>(
    operation: () => Promise<T>,
    onError?: (error: APIError) => void
  ): Promise<T> => {
    try {
      const result = await operation();
      setAttempts(0);
      return result;
    } catch (error) {
      const apiError = error as APIError;
      
      if (attempts < maxAttempts && shouldRetry(apiError)) {
        setAttempts(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        return retry(operation, onError);
      }
      
      if (onError) {
        onError(apiError);
      }
      throw apiError;
    }
  }, [attempts, maxAttempts, delayMs]);

  return {
    retry,
    attempts,
    resetAttempts: () => setAttempts(0)
  };
};