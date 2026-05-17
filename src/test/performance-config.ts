/**
 * Centralized performance configuration for all tests
 * Adjust these thresholds to change performance requirements across the entire application
 */

export const PERFORMANCE_THRESHOLDS = {
  // Response Time Benchmarks (Playwright)
  E2E_RESPONSE_TIME: {
    // Maximum apparent response time for user interactions (ms)
    DEFAULT: 500,
    LOGIN: 800, // Login flows typically take longer due to authentication
    FORM_SUBMISSION: 600,
    NAVIGATION: 300,
    BUTTON_CLICK: 200,
    MODAL_OPEN: 400,
  },

  // API Latency Validation (Playwright)
  API_LATENCY: {
    // Maximum P95 response time for API endpoints (ms)
    DEFAULT: 200,
    AUTH: 400, // Authentication endpoints
    DATA_FETCH: 150, // Simple data fetching
    FILE_UPLOAD: 2000, // File upload operations
    SEARCH: 300, // Search functionality
  },

  // Lighthouse Performance Metrics
  LIGHTHOUSE: {
    // Performance scores (0-100)
    PERFORMANCE_SCORE: 90,
    ACCESSIBILITY_SCORE: 95,
    BEST_PRACTICES_SCORE: 90,
    SEO_SCORE: 85,

    // Core Web Vitals thresholds
    LARGEST_CONTENTFUL_PAINT: 2500, // ms
    FIRST_CONTENTFUL_PAINT: 1800, // ms
    SPEED_INDEX: 3400, // ms
    TIME_TO_INTERACTIVE: 3800, // ms
    TOTAL_BLOCKING_TIME: 200, // ms
    CUMULATIVE_LAYOUT_SHIFT: 0.1,
  },

  // Unit Test Benchmarks (Vitest)
  UNIT_PERFORMANCE: {
    // Maximum execution time for unit tests (ms)
    CALCULATION_FUNCTIONS: 10,
    DATA_TRANSFORMATIONS: 5,
    VALIDATION_LOGIC: 2,
    STRING_OPERATIONS: 1,
    ARRAY_OPERATIONS: 3,
  },

  // Memory Usage Thresholds
  MEMORY: {
    // Maximum memory usage (MB)
    COMPONENT_RENDER: 50,
    PAGE_LOAD: 100,
    API_RESPONSE: 10,
  },

  // Animation Performance
  ANIMATION: {
    // Target frame rate and timing
    TARGET_FPS: 60,
    MAX_FRAME_TIME: 16.67, // ms (1000ms / 60fps)
    SMOOTH_TRANSITION_TIME: 300, // ms
  },
} as const;

// Environment-specific overrides
export const ENVIRONMENT_OVERRIDES = {
  development: {
    ...PERFORMANCE_THRESHOLDS,
    E2E_RESPONSE_TIME: {
      ...PERFORMANCE_THRESHOLDS.E2E_RESPONSE_TIME,
      DEFAULT: 1000, // More lenient in development
    },
  },
  staging: {
    ...PERFORMANCE_THRESHOLDS,
    E2E_RESPONSE_TIME: {
      ...PERFORMANCE_THRESHOLDS.E2E_RESPONSE_TIME,
      DEFAULT: 600, // Slightly more lenient than production
    },
  },
  production: PERFORMANCE_THRESHOLDS,
} as const;

// Get current environment configuration
export function getPerformanceConfig() {
  const env = process.env.NODE_ENV || 'development';
  return ENVIRONMENT_OVERRIDES[env as keyof typeof ENVIRONMENT_OVERRIDES] || ENVIRONMENT_OVERRIDES.development;
}

// Helper functions for performance assertions
export function assertResponseTime(actualTime: number, threshold: number, context: string) {
  if (actualTime > threshold) {
    throw new Error(
      `Performance assertion failed in ${context}: Response time ${actualTime}ms exceeds threshold ${threshold}ms`
    );
  }
}

export function assertApiLatency(responseTime: number, threshold: number, endpoint: string) {
  if (responseTime > threshold) {
    throw new Error(
      `API latency assertion failed for ${endpoint}: ${responseTime}ms exceeds threshold ${threshold}ms`
    );
  }
}

export function assertLighthouseScore(score: number, threshold: number, metric: string) {
  if (score < threshold) {
    throw new Error(
      `Lighthouse assertion failed for ${metric}: Score ${score} below threshold ${threshold}`
    );
  }
}
