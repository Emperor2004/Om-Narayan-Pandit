import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ServiceWorkerRegister } from '../components/ui/ServiceWorkerRegister';

describe('ServiceWorkerRegister', () => {
  it('returns null', () => {
    const { container } = render(<ServiceWorkerRegister />);
    expect(container.firstChild).toBe(null);
  });

  it('renders nothing', () => {
    const { container } = render(<ServiceWorkerRegister />);
    expect(container.innerHTML).toBe('');
  });
});
