import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing & Aesthetics', () => {
  const dynamicSelectorsToMask = [
    'canvas',
    '.custom-cursor',
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Full page layout matches baseline', async ({ page }) => {
    const maskLocators = dynamicSelectorsToMask.map(selector => page.locator(selector));

    await expect(page).toHaveScreenshot('home-full-page.png', { 
      fullPage: true,
      mask: maskLocators,
      maskColor: '#000000',
    });
  });

  test('Navbar component layout matches baseline', async ({ page }) => {
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveScreenshot('navbar-component.png', { timeout: 20000 });
  });

  test('Projects section matches baseline', async ({ page }) => {
    const projectsSection = page.locator('#projects').first();
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000); 

    await expect(projectsSection).toHaveScreenshot('projects-component.png', {
       mask: [page.locator('.mouse-glow')],
       timeout: 25000,
    });
  });
});
