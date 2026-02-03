import { useState, useCallback } from 'react';
import { walletHealthService } from '../services/api/walletHealth';
import type { APIResponse } from '../types/api';

export const useWalletCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkWallet = useCallback(async (address: string, isPremium: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await walletHealthService.checkWallet(address, isPremium);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    isLoading,
    data,
    error,
    checkWallet,
    reset,
  };
};
