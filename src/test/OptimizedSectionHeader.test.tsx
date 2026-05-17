import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OptimizedSectionHeader } from '../components/ui/OptimizedSectionHeader';

describe('OptimizedSectionHeader', () => {
  it('renders label', () => {
    render(<OptimizedSectionHeader label="ABOUT" title="About Me" />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<OptimizedSectionHeader label="ABOUT" title="About Me" />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<OptimizedSectionHeader label="L" title="T" subtitle="My subtitle" />);
    expect(screen.getByText('My subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<OptimizedSectionHeader label="L" title="T" />);
    expect(screen.queryByText('My subtitle')).not.toBeInTheDocument();
  });

  it('applies text-center when centered', () => {
    const { container } = render(<OptimizedSectionHeader label="L" title="T" centered />);
    expect(container.firstElementChild).toHaveClass('text-center');
  });

  it('does not apply text-center when not centered', () => {
    const { container } = render(<OptimizedSectionHeader label="L" title="T" />);
    expect(container.firstElementChild).not.toHaveClass('text-center');
  });

  it('applies justify-center to label row when centered', () => {
    const { container } = render(<OptimizedSectionHeader label="L" title="T" centered />);
    const labelRow = container.querySelector('.font-mono');
    expect(labelRow).toHaveClass('justify-center');
  });

  it('renders accent line when not centered', () => {
    const { container } = render(<OptimizedSectionHeader label="L" title="T" />);
    expect(container.querySelector('.bg-accent')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<OptimizedSectionHeader label="L" title="T" className="custom-class" />);
    expect(container.firstElementChild).toHaveClass('custom-class');
  });
});
