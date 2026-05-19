import { test, expect } from '@playwright/test';

test.describe('Working Performance Tests', () => {
  test('page load performance test', async ({ page }) => {
    console.log('Testing page load performance on localhost:3000');
    
    try {
      const startTime = Date.now();
      
      // Navigate to the root page
      await page.goto('http://localhost:3000');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`Page load time: ${responseTime}ms`);
      
      // Verify page loaded
      const title = await page.title();
      console.log('Page title:', title);
      expect(title).toBeTruthy();
      
      // Check for performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
          loadComplete: navigation.loadEventEnd - navigation.startTime,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        };
      });
      
      console.log('Performance metrics:', performanceMetrics);
      
      // Basic performance assertions
      expect(responseTime).toBeLessThan(5000); // Should load in under 5 seconds
      
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  test('interaction performance test', async ({ page }) => {
    console.log('Testing interaction performance');
    
    try {
      // Navigate to the root page first
      await page.goto('http://localhost:3000');
      
      // Test button click performance
      const buttonSelector = 'button, a[role="button"]';
      await page.waitForSelector(buttonSelector, { timeout: 5000 });
      
      const startTime = Date.now();
      await page.click(buttonSelector);
      const endTime = Date.now();
      
      const clickResponseTime = endTime - startTime;
      console.log(`Button click response time: ${clickResponseTime}ms`);
      
      expect(clickResponseTime).toBeLessThan(500); // Should respond in under 500ms
      
    } catch (error) {
      console.error('Interaction test failed:', error);
      throw error;
    }
  });

  test('navigation performance test', async ({ page }) => {
    console.log('Testing navigation between pages');
    
    try {
      // Navigate to the root page
      await page.goto('http://localhost:3000');
      
      // Test navigation to different sections
      const startTime = Date.now();
      
      // Try to navigate to a common route (this will likely 404 but we can measure the navigation time)
      await page.goto('http://localhost:3000/some-page');
      
      const endTime = Date.now();
      const navigationTime = endTime - startTime;
      
      console.log(`Navigation time: ${navigationTime}ms`);
      
      expect(navigationTime).toBeLessThan(10000); // Should navigate quickly even for 404
      
    } catch (error) {
      console.error('Navigation test failed:', error);
      throw error;
    }
  });
});
