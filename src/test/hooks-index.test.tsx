import { render, act, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  useScrollReveal,
  useMousePosition,
  useCardMouseGlow,
  useCounter,
  useMediaQuery,
  useLocalStorage,
} from '../hooks/index';

// ── useScrollReveal ──────────────────────────────────────────────────────────

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback;

function setupIO() {
  class MockIO {
    constructor(cb: IOCallback) { ioCallback = cb; }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
}

function Wrapper({ hook }: { hook: () => any }) {
  const result = hook();
  return <div ref={result.ref} data-visible={String(result.isVisible)} />;
}

describe('useScrollReveal', () => {
  beforeEach(setupIO);

  it('starts not visible', () => {
    const { container } = render(<Wrapper hook={useScrollReveal} />);
    expect(container.firstElementChild?.getAttribute('data-visible')).toBe('false');
  });

  it('becomes visible on intersection', () => {
    const { container } = render(<Wrapper hook={useScrollReveal} />);
    act(() => { ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]); });
    expect(container.firstElementChild?.getAttribute('data-visible')).toBe('true');
  });
});

// ── useMousePosition ─────────────────────────────────────────────────────────

describe('useMousePosition', () => {
  it('initializes at 0,0', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('updates on mousemove', () => {
    const { result } = renderHook(() => useMousePosition());
    act(() => { fireEvent.mouseMove(window, { clientX: 100, clientY: 200 }); });
    expect(result.current).toEqual({ x: 100, y: 200 });
  });
});

// ── useCardMouseGlow ─────────────────────────────────────────────────────────

describe('useCardMouseGlow', () => {
  it('returns ref and handleMouseMove', () => {
    const { result } = renderHook(() => useCardMouseGlow());
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.handleMouseMove).toBe('function');
  });

  it('sets CSS custom properties on mouse move', () => {
    const { result } = renderHook(() => useCardMouseGlow());
    const div = document.createElement('div');
    (result.current.ref as any).current = div;
    vi.spyOn(div, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => {} });
    act(() => { result.current.handleMouseMove({ clientX: 50, clientY: 50 } as any); });
    expect(div.style.getPropertyValue('--mx')).toBe('50%');
    expect(div.style.getPropertyValue('--my')).toBe('50%');
  });
});

// ── useCounter ───────────────────────────────────────────────────────────────

describe('useCounter', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('starts at 0', () => {
    const { result } = renderHook(() => useCounter(100, 1000, false));
    expect(result.current).toBe(0);
  });

  it('counts up when start=true', async () => {
    const { result } = renderHook(() => useCounter(100, 100, true));
    await act(async () => { vi.advanceTimersByTime(200); });
    expect(result.current).toBeGreaterThan(0);
  });

  it('reaches target value', async () => {
    const { result } = renderHook(() => useCounter(100, 100, true));
    await act(async () => { vi.advanceTimersByTime(500); });
    expect(result.current).toBe(100);
  });
});

// ── useMediaQuery ─────────────────────────────────────────────────────────────

describe('useMediaQuery', () => {
  it('returns false for non-matching query', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));
    expect(result.current).toBe(false);
  });

  it('returns true for matching query', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const { result } = renderHook(() => useMediaQuery('(min-width: 320px)'));
    expect(result.current).toBe(true);
  });
});

// ── useLocalStorage ───────────────────────────────────────────────────────────

describe('useLocalStorage', () => {
  beforeEach(() => { localStorage.clear(); });

  it('returns initial value when key not set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('persists value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    act(() => { result.current[1]('new-value'); });
    expect(localStorage.getItem('test-key')).toBe('"new-value"');
  });

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', '"stored"');
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('works with object values', () => {
    const { result } = renderHook(() => useLocalStorage('obj-key', { a: 1 }));
    act(() => { result.current[1]({ a: 2 }); });
    expect(result.current[0]).toEqual({ a: 2 });
  });
});
