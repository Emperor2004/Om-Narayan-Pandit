import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LazyImage } from '../components/ui/LazyImage';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, initial, animate, transition, ...props }: any) => (
      <div className={className} style={style} {...props}>{children}</div>
    ),
    img: ({ src, alt, className, onLoad, onError, initial, animate, transition, ...props }: any) => (
      <img src={src} alt={alt} className={className} onLoad={onLoad} onError={onError} {...props} />
    ),
  },
}));

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  class MockIO {
    constructor(cb: IOCallback) { ioCallback = cb; }
    observe = mockObserve;
    unobserve = mockUnobserve;
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
});

describe('LazyImage', () => {
  it('does not render img before intersection', () => {
    render(<LazyImage src="/img.jpg" alt="test" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders img after intersection', () => {
    render(<LazyImage src="/img.jpg" alt="test" />);
    act(() => { ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]); });
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders img immediately when priority=true', () => {
    render(<LazyImage src="/img.jpg" alt="test" priority />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows error fallback on image error', () => {
    render(<LazyImage src="/img.jpg" alt="test" priority />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<LazyImage src="/img.jpg" alt="test" className="my-class" />);
    expect(container.firstElementChild).toHaveClass('my-class');
  });

  it('sets alt attribute', () => {
    render(<LazyImage src="/img.jpg" alt="My Image" priority />);
    expect(screen.getByAltText('My Image')).toBeInTheDocument();
  });
});
