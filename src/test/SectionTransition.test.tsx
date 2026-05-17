import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SectionTransition } from '../components/ui/SectionTransition';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, id, className, animate, style, ...props }: any) => (
      <section id={id} className={className} data-animate={animate} style={style}>{children}</section>
    ),
    div: ({ children, animate, ...props }: any) => (
      <div data-animate={animate}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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

describe('SectionTransition', () => {
  it('renders with correct id', () => {
    render(<SectionTransition id="about"><span>Content</span></SectionTransition>);
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('starts hidden', () => {
    render(<SectionTransition id="s1"><span>X</span></SectionTransition>);
    expect(document.querySelector('[data-animate="hidden"]')).toBeInTheDocument();
  });

  it('becomes visible after intersection', () => {
    vi.useFakeTimers();
    render(<SectionTransition id="s1"><span>X</span></SectionTransition>);
    act(() => {
      ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
      vi.runAllTimers();
    });
    expect(document.querySelector('[data-animate="visible"]')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders children when visible', () => {
    vi.useFakeTimers();
    render(<SectionTransition id="s1"><span>Content</span></SectionTransition>);
    act(() => {
      ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
      vi.runAllTimers();
    });
    expect(screen.getByText('Content')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('applies custom className', () => {
    render(<SectionTransition id="s1" className="my-class"><span>X</span></SectionTransition>);
    expect(document.querySelector('section')).toHaveClass('my-class');
  });
});
