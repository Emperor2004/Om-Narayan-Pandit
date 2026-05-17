/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  // Test runner configuration
  testRunner: 'vitest',

  // Mutation testing configuration
  coverageAnalysis: 'perTest',
  
  // Disable vitest.related to avoid test file discovery issues
  vitest: {
    related: false
  },
  reporters: ['progress', 'clear-text', 'html'],
  logLevel: 'info',
  
  // Files to ignore in mutation testing
  ignorePatterns: [
    'node_modules',
    'dist',
    '.next',
    'src/**/*.d.ts',
    'src/**/*.stories.@(js|jsx|ts|tsx)',
    'src/**/index.@(js|jsx|ts|tsx)',
    'src/e2e/**/*',
    'e2e/**/*',
    'coverage',
    '*.config.js',
    '*.config.ts'
  ],
  
  // Scope mutations to files that have test coverage
  mutate: [
    'src/lib/utils.ts',
    'src/lib/rateLimit.ts',
    'src/lib/adminAuth.ts',
    'src/hooks/useLoadingState.ts',
    'src/hooks/useLazyLoad.ts',
    'src/components/ui/Button.tsx',
    'src/components/ui/Badge.tsx',
    'src/components/ui/SectionHeader.tsx',
    'src/components/ui/ErrorBoundary.tsx',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
  ],

  // Test files - match actual test file locations
  testFiles: [
    'src/test/**/*.{test,spec}.{ts,tsx}'
  ],
  
  // Mutation thresholds
  thresholds: {
    high: 70,
    low: 50,
    break: 30
  },
  
  // Timeout configuration
  timeoutMS: 30000,
  timeoutFactor: 1.5,
  
  // Concurrency
  concurrency: 2,
  
  // HTML reporter configuration
  htmlReporter: {
    fileName: 'mutation-report.html'
  },
  
  // Clear text reporter configuration
  clearTextReporter: {
    logTests: true,
    maxLogTests: 5
  }
};
