import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Skeleton, CardSkeleton, ProjectGridSkeleton } from '../components/ui/Skeleton';

describe('Skeleton', () => {
  it('renders text variant with one line by default', () => {
    const { container } = render(<Skeleton />);
    const lines = container.querySelectorAll('.animate-pulse');
    expect(lines.length).toBe(1);
  });

  it('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const lines = container.querySelectorAll('.animate-pulse');
    expect(lines.length).toBe(3);
  });

  it('last line of text variant is 75% width', () => {
    const { container } = render(<Skeleton variant="text" lines={2} />);
    const lines = container.querySelectorAll('[style]');
    const last = lines[lines.length - 1] as HTMLElement;
    expect(last.style.width).toBe('75%');
  });

  it('renders card variant', () => {
    const { container } = render(<Skeleton variant="card" />);
    expect(container.firstElementChild).toHaveClass('h-32');
  });

  it('renders avatar variant with rounded-full', () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.firstElementChild).toHaveClass('rounded-full');
  });

  it('renders project variant', () => {
    const { container } = render(<Skeleton variant="project" />);
    expect(container.firstElementChild).toHaveClass('h-48');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="my-custom" />);
    expect(container.firstElementChild).toHaveClass('my-custom');
  });
});

describe('CardSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<CardSkeleton />);
    expect(container.firstElementChild).toBeTruthy();
  });
});

describe('ProjectGridSkeleton', () => {
  it('renders 6 cards by default', () => {
    const { container } = render(<ProjectGridSkeleton />);
    expect(container.querySelectorAll('.rounded-2xl').length).toBe(6);
  });

  it('renders custom count', () => {
    const { container } = render(<ProjectGridSkeleton count={3} />);
    expect(container.querySelectorAll('.rounded-2xl').length).toBe(3);
  });
});
