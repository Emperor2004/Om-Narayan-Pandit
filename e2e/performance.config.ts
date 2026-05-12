import { defineConfig, devices } from '@playwright/test';
import { getPerformanceConfig } from '../src/test/performance-config';

const performanceConfig = getPerformanceConfig();

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/performance-results.json' }],
    ['junit', { outputFile: 'test-results/performance-results.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Performance monitoring configuration
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--enable-automation',
      ],
    },
    // Custom performance fixtures
    actionTimeout: performanceConfig.E2E_RESPONSE_TIME.DEFAULT,
    navigationTimeout: performanceConfig.E2E_RESPONSE_TIME.NAVIGATION,
  },
  projects: [
    {
      name: 'chromium-performance',
      use: {
        ...devices['Desktop Chrome'],
        // Enable performance monitoring
        bypassCSP: true,
        // Capture performance metrics
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: 'firefox-performance',
      use: {
        ...devices['Desktop Firefox'],
        // Firefox specific performance settings
        // Firefox user preferences would go here if needed
      },
    },
    {
      name: 'webkit-performance',
      use: {
        ...devices['Desktop Safari'],
        // Safari specific performance settings
        ignoreHTTPSErrors: true,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  // Global setup for performance testing
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
});
