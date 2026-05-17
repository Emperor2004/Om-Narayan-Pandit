"use client";

import { useState, useCallback } from "react";

interface LoadingState {
  loading: boolean;
  error: string | null;
}

export function useLoadingState() {
  const [state, setState] = useState<LoadingState>({
    loading: false,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null });
  }, []);

  const execute = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFn();
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    ...state,
    setLoading,
    setError,
    reset,
    execute,
  };
}
