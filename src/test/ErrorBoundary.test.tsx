import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('catches errors and renders default fallback', () => {
    const ThrowError = () => { throw new Error('Test error'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const CustomFallback = ({ error, reset }: { error?: Error; reset: () => void }) => (
      <div data-testid="custom-fallback">
        <h2>Custom Error: {error?.message}</h2>
        <button onClick={reset}>Try again</button>
      </div>
    );
    const ThrowError = () => { throw new Error('Test error'); };
    render(<ErrorBoundary fallback={CustomFallback}><ThrowError /></ErrorBoundary>);
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error: Test error')).toBeInTheDocument();
  });

  it('calls componentDidCatch when error occurs', () => {
    const ThrowError = () => { throw new Error('Test error'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(console.error).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it('resets error state when reset is called — clears hasError and error', () => {
    let shouldThrow = true;
    const ThrowError = () => {
      if (shouldThrow) throw new Error('Test error');
      return <div>Recovered</div>;
    };

    let capturedReset: (() => void) | undefined;
    const CustomFallback = ({ reset }: { error?: Error; reset: () => void }) => {
      capturedReset = reset;
      return <button onClick={reset}>Reset</button>;
    };

    render(<ErrorBoundary fallback={CustomFallback}><ThrowError /></ErrorBoundary>);
    expect(screen.getByText('Reset')).toBeInTheDocument();

    shouldThrow = false;
    act(() => { capturedReset!(); });
    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });

  it('passes error and reset props to custom fallback', () => {
    let receivedError: Error | undefined;
    let receivedReset: (() => void) | undefined;
    const CustomFallback = ({ error, reset }: { error?: Error; reset: () => void }) => {
      receivedError = error;
      receivedReset = reset;
      return <div>Custom fallback</div>;
    };
    const ThrowError = () => { throw new Error('Test error message'); };
    render(<ErrorBoundary fallback={CustomFallback}><ThrowError /></ErrorBoundary>);
    expect(receivedError).toBeInstanceOf(Error);
    expect(receivedError?.message).toBe('Test error message');
    expect(typeof receivedReset).toBe('function');
  });

  it('shows error message when present', () => {
    const ThrowError = () => { throw new Error('Specific error message'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(screen.getByText('Specific error message')).toBeInTheDocument();
  });

  it('shows fallback text when error has no message', () => {
    const ThrowError = () => { const e = new Error(); e.message = ''; throw e; };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(screen.getByText('An unexpected error occurred. Please refresh the page.')).toBeInTheDocument();
  });

  it('logs error details in default fallback', () => {
    const ThrowError = () => { throw new Error('Test error'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(console.error).toHaveBeenCalledWith(
      "Error occurred:",
      expect.objectContaining({
        message: 'Test error',
        stack: expect.any(String),
        timestamp: expect.any(String),
        userAgent: expect.any(String),
        url: expect.any(String),
      })
    );
  });

  it('does not log when error is undefined in useEffect', () => {
    // Render without error — useEffect should not call console.error with "Error occurred:"
    render(<ErrorBoundary><div>OK</div></ErrorBoundary>);
    const calls = (console.error as ReturnType<typeof vi.fn>).mock.calls;
    const loggedOccurred = calls.some(c => c[0] === 'Error occurred:');
    expect(loggedOccurred).toBe(false);
  });

  it('handles undefined error gracefully', () => {
    const CustomFallback = ({ error, reset }: { error?: Error; reset: () => void }) => (
      <div>
        <span>Error: {error?.message || 'Unknown error'}</span>
        <button onClick={reset}>Reset</button>
      </div>
    );
    const ThrowUndefined = () => { throw undefined; };
    render(<ErrorBoundary fallback={CustomFallback}><ThrowUndefined /></ErrorBoundary>);
    expect(screen.getByText('Error: Unknown error')).toBeInTheDocument();
  });

  it('renders Try again and Refresh page buttons in default fallback', () => {
    const ThrowError = () => { throw new Error('err'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Refresh page')).toBeInTheDocument();
  });

  it('reload button calls window.location.reload', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', { value: { ...window.location, reload: reloadMock }, writable: true });
    const ThrowError = () => { throw new Error('err'); };
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);
    fireEvent.click(screen.getByText('Refresh page'));
    expect(reloadMock).toHaveBeenCalled();
  });

  it('initializes with correct state — renders children by default', () => {
    const { container } = render(<ErrorBoundary><div>Test Content</div></ErrorBoundary>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
