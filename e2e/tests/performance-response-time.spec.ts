import { test, expect } from '@playwright/test';
import { getPerformanceConfig, assertResponseTime } from '../../src/test/performance-config';

const performanceConfig = getPerformanceConfig();

test.describe('Response Time Benchmarks', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cache and cookies for consistent testing
    await page.context().clearCookies();
    await page.goto('http://localhost:3001');
  });

  test('Navigation response time under threshold', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3001/about');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    assertResponseTime(responseTime, performanceConfig.E2E_RESPONSE_TIME.NAVIGATION, 'Navigation');
    
    // Verify page loaded correctly
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Button click response time under threshold', async ({ page }) => {
    await page.goto('/');
    
    // Find and click a button
    const button = page.locator('button').first();
    await expect(button).toBeVisible();
    
    const startTime = Date.now();
    await button.click();
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    assertResponseTime(responseTime, performanceConfig.E2E_RESPONSE_TIME.BUTTON_CLICK, 'Button Click');
  });

  test('Modal open response time under threshold', async ({ page }) => {
    await page.goto('/');
    
    // Look for modal trigger (adjust selector based on actual implementation)
    const modalTrigger = page.locator('[data-testid="modal-trigger"], button:has-text("Contact"), button:has-text("Get in Touch")').first();
    
    if (await modalTrigger.isVisible()) {
      const startTime = Date.now();
      await modalTrigger.click();
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      assertResponseTime(responseTime, performanceConfig.E2E_RESPONSE_TIME.MODAL_OPEN, 'Modal Open');
      
      // Verify modal opened
      await expect(page.locator('[role="dialog"], .modal, [data-testid="modal"]')).toBeVisible();
    }
  });

  test('Form submission response time under threshold', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form fields (adjust selectors based on actual implementation)
    const nameField = page.locator('input[name="name"], input[placeholder*="name"]').first();
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message"]').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Submit")').first();
    
    if (await nameField.isVisible()) {
      await nameField.fill('Test User');
      await emailField.fill('test@example.com');
      await messageField.fill('Test message for performance testing');
      
      const startTime = Date.now();
      await submitButton.click();
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      assertResponseTime(responseTime, performanceConfig.E2E_RESPONSE_TIME.FORM_SUBMISSION, 'Form Submission');
      
      // Wait for submission to complete (success message or form reset)
      await page.waitForTimeout(1000);
    }
  });

  test('Complex interaction response time under threshold', async ({ page }) => {
    await page.goto('/');
    
    // Test complex interaction like tab switching or filter application
    const tabButton = page.locator('[role="tab"], button[role="tab"]').first();
    
    if (await tabButton.isVisible()) {
      const startTime = Date.now();
      await tabButton.click();
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      assertResponseTime(responseTime, performanceConfig.E2E_RESPONSE_TIME.DEFAULT, 'Complex Interaction');
      
      // Verify tab content loaded
      await expect(page.locator('[role="tabpanel"], .tab-content').first()).toBeVisible();
    }
  });

  test('Page load performance metrics', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', {
      waitUntil: 'networkidle',
    });
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Check overall page load time
    assertResponseTime(loadTime, performanceConfig.E2E_RESPONSE_TIME.NAVIGATION, 'Page Load');
    
    // Get performance metrics from the browser
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0,
      };
    });
    
    console.log('Performance Metrics:', performanceMetrics);
    
    // Assert key performance metrics
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1500);
    expect(performanceMetrics.loadComplete).toBeLessThan(2000);
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1000);
  });
});
