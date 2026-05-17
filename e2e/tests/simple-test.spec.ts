import { test, expect } from '@playwright/test';

test.describe('Simple Test', () => {
  test('basic navigation test', async ({ page }) => {
    console.log('Testing navigation to localhost:3000');
    
    try {
      await page.goto('http://localhost:3000');
      console.log('Navigation successful');
      
      // Wait a bit for the page to load
      await page.waitForTimeout(2000);
      
      // Check if we can see the page
      const title = await page.title();
      console.log('Page title:', title);
      expect(title).toBeTruthy();
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  });
});
