import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OptimizedButton } from '../components/ui/OptimizedButton';

vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, onMouseEnter, onMouseLeave, disabled, className, ...props }: any) => (
      <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} disabled={disabled} className={className}>{children}</button>
    ),
    span: ({ children, ...props }: any) => <span>{children}</span>,
    div: ({ children, className, ...props }: any) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('OptimizedButton', () => {
  it('renders children', () => {
    render(<OptimizedButton>Click me</OptimizedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<OptimizedButton onClick={onClick}>Click</OptimizedButton>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading=true', () => {
    render(<OptimizedButton loading>Click</OptimizedButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<OptimizedButton loading>Click</OptimizedButton>);
    // Children are hidden when loading; button is disabled
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByText('Click')).not.toBeInTheDocument();
  });

  it('applies primary variant classes by default', () => {
    render(<OptimizedButton>Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent');
  });

  it('applies ghost variant classes', () => {
    render(<OptimizedButton variant="ghost">Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('applies danger variant classes', () => {
    render(<OptimizedButton variant="danger">Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('text-red-400');
  });

  it('applies outline variant classes', () => {
    render(<OptimizedButton variant="outline">Click</OptimizedButton>);
    expect(screen.getByRole('button').className).toContain('border-accent');
  });

  it('applies sm size classes', () => {
    render(<OptimizedButton size="sm">Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('text-xs');
  });

  it('applies lg size classes', () => {
    render(<OptimizedButton size="lg">Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
  });

  it('applies custom className', () => {
    render(<OptimizedButton className="my-class">Click</OptimizedButton>);
    expect(screen.getByRole('button')).toHaveClass('my-class');
  });
});
