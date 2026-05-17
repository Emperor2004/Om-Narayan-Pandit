import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatDateShort, slugify, readTime, truncate, statusConfig } from '../lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
    });

    it('handles conditional classes', () => {
      expect(cn('btn', false && 'hidden', 'active')).toBe('btn active');
    });

    it('merges Tailwind classes correctly', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
    });
  });

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('January 15, 2024');
    });

    it('handles different date formats', () => {
      const result = formatDate('2024-12-31');
      expect(result).toBe('December 31, 2024');
    });
  });

  describe('formatDateShort', () => {
    it('formats date to short format', () => {
      const result = formatDateShort('2024-01-15');
      expect(result).toBe('Jan 2024');
    });

    it('handles different months', () => {
      const result = formatDateShort('2024-06-15');
      expect(result).toBe('Jun 2024');
    });
  });

  describe('slugify', () => {
    it('converts text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('handles multiple spaces and hyphens', () => {
      expect(slugify('Hello   World --- Test')).toBe('hello-world-test');
    });

    it('handles leading/trailing hyphens', () => {
      expect(slugify('---Hello World---')).toBe('hello-world');
    });
  });

  describe('readTime', () => {
    it('calculates reading time correctly', () => {
      const content = 'word '.repeat(200); // 201 words due to trailing space
      expect(readTime(content)).toBe(2);
    });

    it('rounds up for partial minutes', () => {
      const content = 'word '.repeat(250); // 250 words
      expect(readTime(content)).toBe(2);
    });

    it('handles empty content', () => {
      const content = '';
      expect(readTime(content)).toBe(1);
    });
  });

  describe('truncate', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated';
      const result = truncate(text, 20);
      expect(result.length).toBe(22); // 20 chars + "..."
      expect(result).toBe('This is a very long...');
    });

    it('returns original text if under limit', () => {
      const text = 'Short text';
      const result = truncate(text, 20);
      expect(result).toBe('Short text');
    });

    it('handles exact length', () => {
      const text = 'Exact length';
      const result = truncate(text, 12);
      expect(result).toBe('Exact length');
    });
  });

  describe('statusConfig', () => {
    it('has correct configuration for all statuses', () => {
      expect(statusConfig['under-review']).toEqual({
        label: 'Under Review',
        class: 'text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10'
      });
      expect(statusConfig.published).toEqual({
        label: 'Published',
        class: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
      });
    });

    it('has all required statuses', () => {
      const statuses = [
        'under-review',
        'in-progress',
        'published',
        'technical-report',
        'completed',
        'ongoing',
        'archived'
      ];
      statuses.forEach(status => {
        expect(statusConfig[status as keyof typeof statusConfig]).toBeDefined();
        expect(statusConfig[status as keyof typeof statusConfig]).toHaveProperty('label');
        expect(statusConfig[status as keyof typeof statusConfig]).toHaveProperty('class');
      });
    });
  });
});
