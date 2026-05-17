import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration dedicated to Visual Regression Testing.
 * Run with: npx playwright test --config=playwright.visual.config.ts
 */
export default defineConfig({
  testDir: './e2e/tests/visual',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 150,
      animations: 'disabled',
    },
  },
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
