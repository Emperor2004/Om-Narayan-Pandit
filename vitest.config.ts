import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      '**/*.d.ts',
      '**/*.stories.{js,jsx,ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/coverage/**',
        'test/**',
        'src/test/**',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      include: [
        'src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
      ],
      reportsDirectory: './coverage',
    },
  },
});
