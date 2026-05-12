import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting E2E test global setup...');
  
  // Ensure browser is available
  const browser = await chromium.launch();
  await browser.close();
  
  // Set up performance monitoring
  process.env.PERFORMANCE_TEST_START = Date.now().toString();
  
  console.log('✅ Global setup completed');
}

export default globalSetup;
