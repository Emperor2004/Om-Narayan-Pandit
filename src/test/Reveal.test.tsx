import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reveal } from '../components/ui/Reveal';

// Mock useScrollReveal from hooks
const mockUseScrollReveal = vi.fn(() => ({ ref: { current: null }, isVisible: false }));
vi.mock('@/hooks', () => ({ useScrollReveal: () => mockUseScrollReveal() }));

describe('Reveal', () => {
  beforeEach(() => {
    mockUseScrollReveal.mockReturnValue({ ref: { current: null }, isVisible: false });
  });

  it('renders children', () => {
    render(<Reveal><span>Content</span></Reveal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('is invisible initially (opacity 0)', () => {
    const { container } = render(<Reveal><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.opacity).toBe('0');
  });

  it('becomes visible when isVisible=true', () => {
    mockUseScrollReveal.mockReturnValue({ ref: { current: null }, isVisible: true });
    const { container } = render(<Reveal><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.opacity).toBe('1');
  });

  it('applies translateY transform for up direction', () => {
    const { container } = render(<Reveal direction="up"><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.transform).toContain('translateY');
  });

  it('applies translateX transform for left direction', () => {
    const { container } = render(<Reveal direction="left"><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.transform).toContain('translateX(-28px)');
  });

  it('applies translateX transform for right direction', () => {
    const { container } = render(<Reveal direction="right"><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.transform).toContain('translateX(28px)');
  });

  it('applies no transform for none direction', () => {
    const { container } = render(<Reveal direction="none"><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.transform).toBe('none');
  });

  it('applies custom className', () => {
    const { container } = render(<Reveal className="my-class"><span>X</span></Reveal>);
    expect(container.firstElementChild).toHaveClass('my-class');
  });

  it('includes delay in transition style', () => {
    const { container } = render(<Reveal delay={300}><span>X</span></Reveal>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.transition).toContain('300ms');
  });
});
