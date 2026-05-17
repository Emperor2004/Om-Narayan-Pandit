import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OptimizedImage } from '../components/ui/OptimizedImage';

vi.mock('framer-motion', () => ({
  motion: {
    img: ({ src, alt, className, onLoad, onError, ...props }: any) => (
      <img src={src} alt={alt} className={className} onLoad={onLoad} onError={onError} />
    ),
    div: ({ children, className, style, ...props }: any) => <div className={className} style={style}>{children}</div>,
  },
}));

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback;

beforeEach(() => {
  vi.clearAllMocks();
  class MockIO {
    constructor(cb: IOCallback) { ioCallback = cb; }
    observe = vi.fn();
    unobserve = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
});

describe('OptimizedImage', () => {
  it('does not render img before intersection', () => {
    render(<OptimizedImage src="/img.jpg" alt="test" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders img after intersection', () => {
    render(<OptimizedImage src="/img.jpg" alt="test" />);
    act(() => { ioCallback([{ isIntersecting: true } as IntersectionObserverEntry]); });
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders img immediately when priority=true', () => {
    render(<OptimizedImage src="/img.jpg" alt="test" priority />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows error fallback on image error', () => {
    render(<OptimizedImage src="/img.jpg" alt="test" priority />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });

  it('sets alt attribute', () => {
    render(<OptimizedImage src="/img.jpg" alt="My Image" priority />);
    expect(screen.getByAltText('My Image')).toBeInTheDocument();
  });

  it('shows blur placeholder by default', () => {
    const { container } = render(<OptimizedImage src="/img.jpg" alt="test" />);
    expect(container.querySelector('.blur-sm')).toBeInTheDocument();
  });

  it('shows pulse placeholder when placeholder=empty', () => {
    const { container } = render(<OptimizedImage src="/img.jpg" alt="test" placeholder="empty" />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
