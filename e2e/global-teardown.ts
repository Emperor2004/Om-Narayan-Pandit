import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting E2E test global teardown...');
  
  // Clean up performance monitoring
  if (process.env.PERFORMANCE_TEST_START) {
    const testDuration = Date.now() - parseInt(process.env.PERFORMANCE_TEST_START);
    console.log(`⏱️ Total test duration: ${testDuration}ms`);
  }
  
  // Clean up any temporary files or data
  console.log('✅ Global teardown completed');
}

export default globalTeardown;
