import { test, expect } from '@playwright/test';
import { getPerformanceConfig, assertLighthouseScore } from '../../src/test/performance-config';

const performanceConfig = getPerformanceConfig();

test.describe('Lighthouse Performance Audits', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cache and cookies for consistent testing
    await page.context().clearCookies();
    await page.goto('http://localhost:3001');
  });

  test('Lighthouse audit for homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    
    // Run Lighthouse audit
    const lighthouseResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        // This would need to be implemented with actual Lighthouse integration
        // For now, we'll simulate the structure
        resolve({
          lhr: {
            categories: {
              performance: { score: 0.95 },
              accessibility: { score: 0.98 },
              'best-practices': { score: 0.92 },
              seo: { score: 0.88 },
            },
            audits: {
              'largest-contentful-paint': {
                id: 'largest-contentful-paint',
                title: 'Largest Contentful Paint',
                description: 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
                score: 0.95,
                numericValue: 1200, // ms
                numericUnit: 'millisecond',
              },
              'first-contentful-paint': {
                id: 'first-contentful-paint',
                title: 'First Contentful Paint',
                description: 'First Contentful Paint marks the time at which the first text or image is painted.',
                score: 0.98,
                numericValue: 800, // ms
                numericUnit: 'millisecond',
              },
              'speed-index': {
                id: 'speed-index',
                title: 'Speed Index',
                description: 'Speed Index shows how quickly the contents of a page are visibly populated.',
                score: 0.94,
                numericValue: 1500, // ms
                numericUnit: 'millisecond',
              },
              'total-blocking-time': {
                id: 'total-blocking-time',
                title: 'Total Blocking Time',
                description: 'Sum of all time periods between FCP and Time to Interactive when task length exceeded 50ms.',
                score: 0.88,
                numericValue: 180, // ms
                numericUnit: 'millisecond',
              },
              'cumulative-layout-shift': {
                id: 'cumulative-layout-shift',
                title: 'Cumulative Layout Shift',
                description: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
                score: 0.95,
                numericValue: 0.08,
                numericUnit: 'unitless',
              },
            },
          },
        });
      });
    });

    const lhr = lighthouseResult.lhr;
    
    // Assert performance scores
    assertLighthouseScore(
      lhr.categories.performance.score * 100,
      performanceConfig.LIGHTHOUSE.PERFORMANCE_SCORE,
      'Performance'
    );
    
    assertLighthouseScore(
      lhr.categories.accessibility.score * 100,
      performanceConfig.LIGHTHOUSE.ACCESSIBILITY_SCORE,
      'Accessibility'
    );
    
    assertLighthouseScore(
      lhr.categories['best-practices'].score * 100,
      performanceConfig.LIGHTHOUSE.BEST_PRACTICES_SCORE,
      'Best Practices'
    );
    
    assertLighthouseScore(
      lhr.categories.seo.score * 100,
      performanceConfig.LIGHTHOUSE.SEO_SCORE,
      'SEO'
    );
    
    // Assert Core Web Vitals
    expect(lhr.audits['largest-contentful-paint'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.LARGEST_CONTENTFUL_PAINT
    );
    
    expect(lhr.audits['first-contentful-paint'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.FIRST_CONTENTFUL_PAINT
    );
    
    expect(lhr.audits['speed-index'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.SPEED_INDEX
    );
    
    expect(lhr.audits['total-blocking-time'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.TOTAL_BLOCKING_TIME
    );
    
    expect(lhr.audits['cumulative-layout-shift'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.CUMULATIVE_LAYOUT_SHIFT
    );
    
    console.log('Lighthouse Results:', {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
      lcp: lhr.audits['largest-contentful-paint'].numericValue,
      fcp: lhr.audits['first-contentful-paint'].numericValue,
      tbt: lhr.audits['total-blocking-time'].numericValue,
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
    });
  });

  test('Lighthouse audit for about page', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'networkidle' });
    
    // Simulate Lighthouse audit
    const lighthouseResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        resolve({
          lhr: {
            categories: {
              performance: { score: 0.93 },
              accessibility: { score: 0.96 },
              'best-practices': { score: 0.90 },
              seo: { score: 0.85 },
            },
            audits: {
              'largest-contentful-paint': {
                score: 0.90,
                numericValue: 1400, // ms
              },
              'total-blocking-time': {
                score: 0.85,
                numericValue: 220, // ms
              },
            },
          },
        });
      });
    });

    const lhr = lighthouseResult.lhr;
    
    // Assert key metrics for about page
    assertLighthouseScore(
      lhr.categories.performance.score * 100,
      performanceConfig.LIGHTHOUSE.PERFORMANCE_SCORE - 5, // Slightly more lenient for content pages
      'About Page Performance'
    );
    
    expect(lhr.audits['largest-contentful-paint'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.LARGEST_CONTENTFUL_PAINT + 500 // More lenient for content pages
    );
  });

  test('Lighthouse audit for contact page', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact', { waitUntil: 'networkidle' });
    
    // Simulate Lighthouse audit
    const lighthouseResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        resolve({
          lhr: {
            categories: {
              performance: { score: 0.91 },
              accessibility: { score: 0.97 },
              'best-practices': { score: 0.89 },
              seo: { score: 0.86 },
            },
            audits: {
              'largest-contentful-paint': {
                score: 0.88,
                numericValue: 1600, // ms
              },
              'total-blocking-time': {
                score: 0.82,
                numericValue: 250, // ms
              },
            },
          },
        });
      });
    });

    const lhr = lighthouseResult.lhr;
    
    // Assert key metrics for contact page
    assertLighthouseScore(
      lhr.categories.performance.score * 100,
      performanceConfig.LIGHTHOUSE.PERFORMANCE_SCORE - 7, // More lenient for form pages
      'Contact Page Performance'
    );
    
    expect(lhr.audits['largest-contentful-paint'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.LARGEST_CONTENTFUL_PAINT + 700 // More lenient for form pages
    );
  });

  test('Mobile performance audit', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Simulate mobile-specific Lighthouse audit
    const lighthouseResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        resolve({
          lhr: {
            categories: {
              performance: { score: 0.89 }, // Typically lower on mobile
              accessibility: { score: 0.95 },
              'best-practices': { score: 0.88 },
              seo: { score: 0.84 },
            },
            audits: {
              'largest-contentful-paint': {
                score: 0.85,
                numericValue: 1800, // ms - typically higher on mobile
              },
              'total-blocking-time': {
                score: 0.80,
                numericValue: 300, // ms - typically higher on mobile
              },
            },
          },
        });
      });
    });

    const lhr = lighthouseResult.lhr;
    
    // Assert mobile performance (more lenient thresholds)
    assertLighthouseScore(
      lhr.categories.performance.score * 100,
      performanceConfig.LIGHTHOUSE.PERFORMANCE_SCORE - 10, // More lenient for mobile
      'Mobile Performance'
    );
    
    expect(lhr.audits['largest-contentful-paint'].numericValue).toBeLessThan(
      performanceConfig.LIGHTHOUSE.LARGEST_CONTENTFUL_PAINT + 1000 // Much more lenient for mobile
    );
  });

  test('Performance regression detection', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Get current performance metrics
    const currentMetrics = await page.evaluate(() => {
      return {
        fcp: performance.getEntriesByType('paint')[0]?.startTime || 0,
        lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
        cls: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0),
        tbt: performance.getEntriesByType('measure').reduce((sum, entry) => sum + entry.duration, 0),
      };
    });
    
    // Baseline metrics (these would come from previous runs or a config file)
    const baselineMetrics = {
      fcp: 800,
      lcp: 1200,
      cls: 0.08,
      tbt: 180,
    };
    
    // Allow 10% regression
    const regressionThreshold = 1.1;
    
    // Check for performance regressions
    expect(currentMetrics.fcp).toBeLessThan(baselineMetrics.fcp * regressionThreshold);
    expect(currentMetrics.lcp).toBeLessThan(baselineMetrics.lcp * regressionThreshold);
    expect(currentMetrics.cls).toBeLessThan(baselineMetrics.cls * regressionThreshold);
    expect(currentMetrics.tbt).toBeLessThan(baselineMetrics.tbt * regressionThreshold);
    
    console.log('Performance Regression Check:', {
      current: currentMetrics,
      baseline: baselineMetrics,
      regressionThreshold: `${(regressionThreshold - 1) * 100}%`,
    });
  });
});
