import { test, expect } from '@playwright/test';

test.describe('Performance Audits', () => {
  test('homepage loads under 3s', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(3000);
  });

  test('homepage has correct title', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Om Narayan Pandit/);
  });

  test('blog page loads under 3s', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://localhost:3000/blog', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(3000);
  });

  test('homepage has no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    // Filter out known non-critical errors
    const critical = errors.filter(e => !e.includes('ResizeObserver') && !e.includes('Non-Error'));
    expect(critical).toHaveLength(0);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
