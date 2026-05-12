import { test, expect } from '@playwright/test';

test.describe('Working Test', () => {
  test('basic navigation test', async ({ page }) => {
    console.log('Testing navigation to localhost:3000');
    
    try {
      // Navigate to the root first
      await page.goto('http://localhost:3000');
      console.log('Initial navigation successful');
      
      // Then navigate to about page
      await page.goto('http://localhost:3000/about');
      console.log('About page navigation successful');
      
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
