import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TiltCard } from '../components/ui/TiltCard';

describe('TiltCard', () => {
  it('renders children', () => {
    render(<TiltCard><span>Content</span></TiltCard>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TiltCard className="my-class"><span>X</span></TiltCard>);
    expect(container.firstElementChild).toHaveClass('my-class');
  });

  it('resets transform on mouse leave', () => {
    const { container } = render(<TiltCard><span>X</span></TiltCard>);
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseLeave(card);
    expect(card.style.transform).toContain('rotateX(0)');
  });

  it('updates transform on mouse move', () => {
    const { container } = render(<TiltCard><span>X</span></TiltCard>);
    const card = container.firstElementChild as HTMLElement;
    // Mock getBoundingClientRect
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {} });
    fireEvent.mouseMove(card, { clientX: 150, clientY: 150 });
    expect(card.style.transform).toContain('perspective');
  });

  it('renders glare overlay when glare=true', () => {
    const { container } = render(<TiltCard glare><span>X</span></TiltCard>);
    const glare = container.querySelector('.absolute.inset-0.pointer-events-none');
    expect(glare).toBeInTheDocument();
  });

  it('does not render glare overlay when glare=false', () => {
    const { container } = render(<TiltCard glare={false}><span>X</span></TiltCard>);
    // glare div only appears after mousemove with glare=true; with glare=false it won't have background set
    const card = container.firstElementChild as HTMLElement;
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {} });
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    const glareEl = container.querySelector('.absolute.inset-0.pointer-events-none') as HTMLElement;
    expect(glareEl?.style.background ?? '').toBe('');
  });
});
