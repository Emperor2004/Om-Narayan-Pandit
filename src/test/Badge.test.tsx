import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge, TechPill } from '../components/ui/Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Badge variant="success">Success Badge</Badge>);
    const badge = screen.getByText('Success Badge');
    expect(badge).toHaveClass('text-emerald-400 border-emerald-400/30 bg-emerald-400/10');
  });

  it('applies accent variant by default', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('text-accent border-accent/30 bg-accent/10');
  });

  it('applies cyan variant', () => {
    render(<Badge variant="cyan">Cyan Badge</Badge>);
    const badge = screen.getByText('Cyan Badge');
    expect(badge).toHaveClass('text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10');
  });

  it('applies pink variant', () => {
    render(<Badge variant="pink">Pink Badge</Badge>);
    const badge = screen.getByText('Pink Badge');
    expect(badge).toHaveClass('text-pink-glow border-pink-glow/30 bg-pink-glow/10');
  });

  it('applies muted variant', () => {
    render(<Badge variant="muted">Muted Badge</Badge>);
    const badge = screen.getByText('Muted Badge');
    expect(badge).toHaveClass('text-[var(--muted)] border-[var(--border)] bg-white/5');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('has base styling classes', () => {
    render(<Badge>Base Badge</Badge>);
    const badge = screen.getByText('Base Badge');
    expect(badge).toHaveClass('inline-block font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border');
  });

  it('renders TechPill component', () => {
    render(<TechPill label="React" />);
    const pill = screen.getByText('React');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('font-mono text-[0.65rem] px-2 py-0.5 rounded-[4px] border transition-colors');
  });

  it('renders TechPill with hot variant', () => {
    render(<TechPill label="Hot" variant="hot" />);
    const pill = screen.getByText('Hot');
    expect(pill).toHaveClass('bg-pink-glow/7 text-pink-glow border-pink-glow/15');
  });

  it('renders TechPill with default variant', () => {
    render(<TechPill label="Default" variant="default" />);
    const pill = screen.getByText('Default');
    expect(pill).toHaveClass('bg-cyan-glow/7 text-cyan-glow border-cyan-glow/15');
  });
});
