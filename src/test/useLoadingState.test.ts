import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLoadingState } from '../hooks/useLoadingState';

describe('useLoadingState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useLoadingState());
    
    expect(result.current).toEqual({
      loading: false,
      error: null,
    setLoading: expect.any(Function),
      setError: expect.any(Function),
      reset: expect.any(Function),
      execute: expect.any(Function),
    });
  });

  it('sets loading state correctly', async () => {
    const { result } = renderHook(() => useLoadingState());
    
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets error state correctly', async () => {
    const { result } = renderHook(() => useLoadingState());
    
    act(() => {
      result.current.setError('Test error');
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Test error');
  });

  it('resets state correctly', async () => {
    const { result } = renderHook(() => useLoadingState());
    
    // First set some state
    act(() => {
      result.current.setLoading(true);
      result.current.setError('Some error');
    });
    
    // Then reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current).toEqual({
      loading: false,
      error: null,
      setLoading: expect.any(Function),
      setError: expect.any(Function),
      reset: expect.any(Function),
      execute: expect.any(Function),
    });
  });

  it('handles successful execution', async () => {
    const { result } = renderHook(() => useLoadingState());
    const mockAsyncFn = vi.fn().mockResolvedValue('success');
    
    let executionResult: string | null;
    await act(async () => {
      executionResult = await result.current.execute(mockAsyncFn);
    });
    
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    expect(executionResult).toBe('success');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles execution error', async () => {
    const { result } = renderHook(() => useLoadingState());
    const error = new Error('Test error');
    const mockAsyncFn = vi.fn().mockRejectedValue(error);
    
    let executionResult: string | null;
    await act(async () => {
      const tempResult = await result.current.execute(mockAsyncFn);
      executionResult = tempResult;
    });
    
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    expect(executionResult).toBe(null);
    expect(result.current.error).toBe(error.message);
  });

  it('handles non-Error objects', async () => {
    const { result } = renderHook(() => useLoadingState());
    const mockAsyncFn = vi.fn().mockRejectedValue('string error');
    
    let executionResult: string | null;
    await act(async () => {
      executionResult = await result.current.execute(mockAsyncFn);
    });
    
    expect(executionResult).toBe(null);
    expect(result.current.error).toBe('string error');
  });

  it('sets loading to false after execution', async () => {
    const { result } = renderHook(() => useLoadingState());
    const mockAsyncFn = vi.fn().mockResolvedValue('success');
    
    await act(async () => {
      await result.current.execute(mockAsyncFn);
    });
    
    expect(result.current.loading).toBe(false);
  });

  it('maintains stable function references', () => {
    const { result, rerender } = renderHook(() => useLoadingState());
    const setLoading1 = result.current.setLoading;
    const setError1 = result.current.setError;
    
    // Rerender
    rerender();
    
    expect(result.current.setLoading).toBe(setLoading1);
    expect(result.current.setError).toBe(setError1);
  });

  it('provides all required functions', () => {
    const { result } = renderHook(() => useLoadingState());
    
    expect(typeof result.current.setLoading).toBe('function');
    expect(typeof result.current.setError).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.execute).toBe('function');
  });

  it('handles concurrent operations', async () => {
    const { result } = renderHook(() => useLoadingState());
    const mockAsyncFn = vi.fn().mockResolvedValue('success');

    await act(async () => {
      await result.current.execute(mockAsyncFn);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('clears error when setting loading', async () => {
    const { result } = renderHook(() => useLoadingState());
    
    // Set error first
    act(() => {
      result.current.setError('Previous error');
    });
    
    // Then set loading
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);
  });

  it('handles reset during loading', async () => {
    const { result } = renderHook(() => useLoadingState());
    const mockAsyncFn = vi.fn().mockResolvedValue('success');
    
    // Start execution
    act(() => {
      result.current.execute(mockAsyncFn);
    });
    
    // Reset while loading
    act(() => {
      result.current.reset();
    });
    
    expect(result.current).toEqual({
      loading: false,
      error: null,
      setLoading: expect.any(Function),
      setError: expect.any(Function),
      reset: expect.any(Function),
      execute: expect.any(Function),
    });
  });
});
