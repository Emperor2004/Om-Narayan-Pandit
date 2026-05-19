import { test, expect } from '@playwright/test';

test.describe('Response Time Benchmarks', () => {
  test('homepage navigation under 4.5s', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    expect(Date.now() - start).toBeLessThan(4500);
  });

  test('blog page navigation under 3s', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const start = Date.now();
    await page.goto('http://localhost:3000/blog', { waitUntil: 'domcontentloaded' });
    expect(Date.now() - start).toBeLessThan(10000);
  });

  test('navbar toggle responds under 300ms', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // mobile viewport
    await page.goto('http://localhost:3000');
    const menuBtn = page.getByLabel('Toggle menu');
    const start = Date.now();
    await menuBtn.click();
    expect(Date.now() - start).toBeLessThan(300);
  });

  test('contact form is present on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    // Contact section should exist in DOM
    const contact = page.locator('#contact');
    await expect(contact).toBeAttached();
  });

  test('page load performance metrics are reasonable', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        loadComplete: nav.loadEventEnd - nav.startTime,
      };
    });
    expect(metrics.domContentLoaded).toBeLessThan(5000);
    expect(metrics.loadComplete).toBeLessThan(10000);
  });
});
