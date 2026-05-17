import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, LinkButton } from '../components/ui/Button';

describe('Button Component', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-accent', 'text-white');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'text-[var(--text)]');
  });

  it('applies danger variant', () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600/20', 'text-red-400');
  });

  it('applies outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'text-accent');
  });

  it('applies small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-xs', 'px-3', 'py-1.5');
  });

  it('applies medium size by default', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-sm', 'px-5', 'py-2.5');
  });

  it('applies large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-base', 'px-7', 'py-3.5');
  });

  it('handles click events', () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading={true}>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Loading');
  });

  it('supports custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByText('Custom Button')).toHaveClass('custom-class');
  });

  it('supports accessibility attributes', () => {
    render(<Button aria-label="Custom button label">Accessible Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom button label');
  });

  it('is disabled when loading', () => {
    render(<Button loading={true}>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none');
  });

  it('forwards other button props', () => {
    render(<Button data-testid="test-button" disabled>Disabled</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });
});

describe('LinkButton Component', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<LinkButton href="/test">Link</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies primary variant by default', () => {
    render(<LinkButton href="/test">Primary</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-accent', 'text-white');
  });

  it('applies ghost variant', () => {
    render(<LinkButton variant="ghost" href="/test">Ghost</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-transparent', 'text-[var(--text)]');
  });

  it('applies outline variant', () => {
    render(<LinkButton variant="outline" href="/test">Outline</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-transparent', 'text-accent');
  });

  it('applies small size', () => {
    render(<LinkButton size="sm" href="/test">Small</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-xs', 'px-3', 'py-1.5');
  });

  it('applies medium size by default', () => {
    render(<LinkButton href="/test">Medium</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-sm', 'px-5', 'py-2.5');
  });

  it('applies large size', () => {
    render(<LinkButton size="lg" href="/test">Large</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-base', 'px-7', 'py-3.5');
  });

  it('handles click events', () => {
    render(<LinkButton href="/test" onClick={mockOnClick}>Click me</LinkButton>);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('forwards other anchor props', () => {
    render(<LinkButton href="/test" target="_blank" rel="noopener">External</LinkButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('supports custom className', () => {
    render(<LinkButton className="custom-class" href="/test">Custom</LinkButton>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});
