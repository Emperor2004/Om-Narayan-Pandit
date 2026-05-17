import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnimatedText } from '../components/ui/AnimatedText';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('AnimatedText', () => {
  it('renders with typewriter type immediately', () => {
    const { container } = render(<AnimatedText text="Hello" type="typewriter" />);
    const span = container.querySelector('span.inline-block') as HTMLElement;
    expect(span.textContent).toBe('Hello');
  });

  it('starts empty for reveal type and fills over time', async () => {
    render(<AnimatedText text="Hi" type="reveal" delay={0} speed={10} />);
    // Initially empty
    const span = document.querySelector('span.inline-block') as HTMLElement;
    expect(span.textContent).toBe('');
    // Advance timers to complete animation
    await act(async () => { vi.advanceTimersByTime(500); });
    expect(span.textContent).toBe('Hi');
  });

  it('starts empty for scramble type and resolves', async () => {
    render(<AnimatedText text="AB" type="scramble" delay={0} speed={10} />);
    const span = document.querySelector('span.inline-block') as HTMLElement;
    expect(span.textContent).toBe('');
    await act(async () => { vi.advanceTimersByTime(500); });
    expect(span.textContent).toBe('AB');
  });

  it('applies custom className', () => {
    render(<AnimatedText text="X" type="typewriter" className="my-class" />);
    expect(document.querySelector('.my-class')).toBeInTheDocument();
  });

  it('respects delay for reveal type', async () => {
    render(<AnimatedText text="Hi" type="reveal" delay={200} speed={10} />);
    const span = document.querySelector('span.inline-block') as HTMLElement;
    // Before delay
    await act(async () => { vi.advanceTimersByTime(100); });
    expect(span.textContent).toBe('');
    // After delay + animation
    await act(async () => { vi.advanceTimersByTime(500); });
    expect(span.textContent).toBe('Hi');
  });
});
