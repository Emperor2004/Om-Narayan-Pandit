import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLazyLoad } from '../hooks/useLazyLoad';

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let ioCallback: IOCallback;
let mockObserve: ReturnType<typeof vi.fn>;
let mockUnobserve: ReturnType<typeof vi.fn>;
let lastOpts: IntersectionObserverInit | undefined;

function makeEntry(isIntersecting: boolean) {
  return { isIntersecting } as IntersectionObserverEntry;
}

function Wrapper({ options = {} }: { options?: Parameters<typeof useLazyLoad>[0] }) {
  const { elementRef, isInView } = useLazyLoad(options);
  return <div ref={elementRef as React.RefObject<HTMLDivElement>} data-inview={String(isInView)} />;
}

beforeEach(() => {
  mockObserve = vi.fn();
  mockUnobserve = vi.fn();
  class MockIO {
    constructor(cb: IOCallback, opts?: IntersectionObserverInit) {
      ioCallback = cb;
      lastOpts = opts;
    }
    observe = mockObserve;
    unobserve = mockUnobserve;
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
});

describe('useLazyLoad', () => {
  it('initializes isInView as false', () => {
    const { container } = render(<Wrapper />);
    expect(container.firstElementChild?.getAttribute('data-inview')).toBe('false');
  });

  it('creates IntersectionObserver and observes element', () => {
    render(<Wrapper />);
    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it('sets isInView to true when element intersects', () => {
    const { container } = render(<Wrapper />);
    act(() => { ioCallback([makeEntry(true)]); });
    expect(container.firstElementChild?.getAttribute('data-inview')).toBe('true');
  });

  it('unobserves after intersection when triggerOnce=true', () => {
    render(<Wrapper options={{ triggerOnce: true }} />);
    act(() => { ioCallback([makeEntry(true)]); });
    expect(mockUnobserve).toHaveBeenCalledTimes(1);
  });

  it('does NOT unobserve after intersection when triggerOnce=false', () => {
    render(<Wrapper options={{ triggerOnce: false }} />);
    act(() => { ioCallback([makeEntry(true)]); });
    expect(mockUnobserve).not.toHaveBeenCalled();
  });

  it('sets isInView to false when not intersecting and triggerOnce=false', () => {
    const { container } = render(<Wrapper options={{ triggerOnce: false }} />);
    act(() => { ioCallback([makeEntry(true)]); });
    act(() => { ioCallback([makeEntry(false)]); });
    expect(container.firstElementChild?.getAttribute('data-inview')).toBe('false');
  });

  it('does not reset isInView when not intersecting and triggerOnce=true', () => {
    const { container } = render(<Wrapper options={{ triggerOnce: true }} />);
    act(() => { ioCallback([makeEntry(true)]); });
    act(() => { ioCallback([makeEntry(false)]); });
    expect(container.firstElementChild?.getAttribute('data-inview')).toBe('true');
  });

  it('passes custom threshold and rootMargin to IntersectionObserver', () => {
    render(<Wrapper options={{ threshold: 0.5, rootMargin: '100px' }} />);
    expect(lastOpts).toEqual({ threshold: 0.5, rootMargin: '100px' });
  });

  it('uses default threshold=0.1 and rootMargin=50px', () => {
    render(<Wrapper />);
    expect(lastOpts).toEqual({ threshold: 0.1, rootMargin: '50px' });
  });

  it('unobserves on unmount', () => {
    const { unmount } = render(<Wrapper />);
    unmount();
    expect(mockUnobserve).toHaveBeenCalledTimes(1);
  });
});
