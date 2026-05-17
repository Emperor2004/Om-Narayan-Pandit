import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../components/layout/Footer';

describe('Footer', () => {
  it('renders footer with all elements', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('border-t', 'border-[var(--border)]', 'py-8', 'relative', 'z-10');
  });

  it('renders author information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Designed & Built by/i)).toBeInTheDocument();
    expect(screen.getByText('Om Narayan Pandit')).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('highlights author name', () => {
    render(<Footer />);
    
    const authorSpan = screen.getByText('Om Narayan Pandit');
    expect(authorSpan).toHaveClass('text-accent', 'font-bold');
  });

  it('renders social links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const youtubeLink = screen.getByRole('link', { name: 'YouTube' });
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(youtubeLink).toBeInTheDocument();
  });

  it('has correct link attributes', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('has correct link hrefs', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    const youtubeLink = screen.getByRole('link', { name: 'YouTube' });
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Emperor2004');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/om-narayan-pandit');
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@omnarayanpandit4386');
  });

  it('applies correct styling to links', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      expect(link).toHaveClass('font-mono', 'text-[0.7rem]', 'text-[var(--muted)]', 'hover:text-[var(--accent2)]', 'transition-colors');
    });
  });

  it('renders footer tagline', () => {
    render(<Footer />);
    
    const tagline = screen.getByText('Made with curiosity & caffeine ☕');
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveClass('font-mono', 'text-[0.7rem]', 'text-[var(--muted)]');
  });

  it('has correct container structure', () => {
    render(<Footer />);
    
    const container = screen.getByRole('contentinfo').querySelector('.max-w-6xl');
    expect(container).toHaveClass('mx-auto', 'px-6', 'flex', 'flex-col', 'md:flex-row', 'items-center', 'justify-between', 'gap-4');
  });

  it('has correct text content structure', () => {
    render(<Footer />);
    
    const authorText = screen.getByText(/Designed & Built by/i);
    expect(authorText).toHaveClass('font-mono', 'text-[0.7rem]', 'text-[var(--muted)]');
  });

  it('renders all three social links', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('has semantic footer element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
  });
});
