import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Extend Vitest matchers
import { expect } from 'vitest';

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  callback: any;
  root: any;
  rootMargin: any;
  thresholds: any;

  constructor(callback: any) {
    this.callback = callback;
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }

  observe() {
    // Mock implementation
    setTimeout(() => {
      this.callback([{ isIntersecting: true }]);
    }, 100);
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }

  takeRecords() {
    // Mock implementation
    return [];
  }
};

// Mock ResizeObserver for tests
global.ResizeObserver = class ResizeObserver {
  callback: any;

  constructor(callback: any) {
    this.callback = callback;
  }

  observe() {
    // Mock implementation
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
