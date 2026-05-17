import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OptimizedReveal } from '../components/ui/OptimizedReveal';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, variants, transition, ...props }: any) => (
      <div data-animate={animate} {...props}>{children}</div>
    ),
  },
}));

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback;

beforeEach(() => {
  class MockIO {
    constructor(cb: IOCallback) { ioCallback = cb; }
    observe = vi.fn();
    unobserve = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
});

describe('OptimizedReveal', () => {
  it('renders children', () => {
    render(<OptimizedReveal><span>Content</span></OptimizedReveal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('starts hidden', () => {
    const { container } = render(<OptimizedReveal><span>X</span></OptimizedReveal>);
    expect(container.querySelector('[data-animate="hidden"]')).toBeInTheDocument();
  });

  it('becomes visible when intersecting', () => {
    const { container } = render(<OptimizedReveal><span>X</span></OptimizedReveal>);
    act(() => { ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]); });
    expect(container.querySelector('[data-animate="visible"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<OptimizedReveal className="my-class"><span>X</span></OptimizedReveal>);
    expect(container.firstElementChild).toHaveClass('my-class');
  });
});
