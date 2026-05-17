import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from '../components/ui/SectionHeader';

describe('SectionHeader', () => {
  it('renders with required props', () => {
    render(<SectionHeader label="Projects" title="My Projects" />);
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    render(<SectionHeader label="Projects" title="My Projects" subtitle="Latest work" />);
    
    expect(screen.getByText('Latest work')).toBeInTheDocument();
  });

  it('renders without subtitle when not provided', () => {
    render(<SectionHeader label="Projects" title="My Projects" />);
    
    expect(screen.queryByText('Latest work')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SectionHeader label="Projects" title="My Projects" className="custom-class" />);
    
    const container = screen.getByText('Projects').closest('div')?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders centered when centered prop is true', () => {
    render(<SectionHeader label="Projects" title="My Projects" centered={true} />);
    
    const container = screen.getByText('Projects').closest('div')?.parentElement;
    expect(container).toHaveClass('text-center');
  });

  it('renders left-aligned by default', () => {
    render(<SectionHeader label="Projects" title="My Projects" />);
    
    const container = screen.getByText('Projects').closest('div')?.parentElement;
    expect(container).not.toHaveClass('text-center');
  });

  it('shows line when not centered', () => {
    render(<SectionHeader label="Projects" title="My Projects" centered={false} />);
    
    const line = document.querySelector('.w-6.h-px.bg-accent');
    expect(line).toBeInTheDocument();
  });

  it('hides line when centered', () => {
    render(<SectionHeader label="Projects" title="My Projects" centered={true} />);
    
    const line = document.querySelector('.w-6.h-px.bg-accent');
    expect(line).not.toBeInTheDocument();
  });

  it('applies correct label styling', () => {
    render(<SectionHeader label="Projects" title="My Projects" />);
    
    const label = screen.getByText('Projects');
    expect(label).toHaveClass('font-mono', 'text-[0.7rem]', 'text-accent', 'uppercase', 'tracking-[0.15em]');
  });

  it('applies correct title styling', () => {
    render(<SectionHeader label="Projects" title="My Projects" />);
    
    const title = screen.getByText('My Projects');
    expect(title).toHaveClass('font-poppins', 'font-extrabold', 'text-3xl', 'md:text-4xl', 'tracking-tight', 'leading-tight');
  });

  it('applies subtitle styling when provided', () => {
    render(<SectionHeader label="Projects" title="My Projects" subtitle="Latest work" />);
    
    const subtitle = screen.getByText('Latest work');
    expect(subtitle).toHaveClass('text-[var(--muted)]', 'max-w-xl', 'leading-relaxed');
  });

  it('centers subtitle when centered', () => {
    render(<SectionHeader label="Projects" title="My Projects" subtitle="Latest work" centered={true} />);
    
    const subtitle = screen.getByText('Latest work');
    expect(subtitle).toHaveStyle('margin: 0.75rem auto 0');
  });

  it('renders with React title as string', () => {
    render(<SectionHeader label="Projects" title={<span>React Title</span>} />);
    
    expect(screen.getByText('React Title')).toBeInTheDocument();
  });

  it('renders with React title as element', () => {
    render(<SectionHeader label="Projects" title={<strong>Strong Title</strong>} />);
    
    expect(screen.getByText('Strong Title')).toBeInTheDocument();
    expect(screen.getByText('Strong Title').tagName).toBe('STRONG');
  });
});
