"use client";

import { useEffect, useRef, useState } from "react";

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const metricsRef = useRef(metrics);

  useEffect(() => {
    // Measure Core Web Vitals
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      const newMetrics: Partial<PerformanceMetrics> = {
        ttfb: navigation.responseStart - navigation.requestStart,
        fcp: 0, // Will be measured by PerformanceObserver
        lcp: 0, // Will be measured by PerformanceObserver
        fid: 0, // Will be measured by PerformanceObserver
        cls: 0, // Will be measured by PerformanceObserver
      };

      // Measure First Contentful Paint
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
      if (fcpEntry) {
        newMetrics.fcp = fcpEntry.startTime;
      }

      // Set metrics
      setMetrics(newMetrics);
      metricsRef.current = newMetrics;

      // Log metrics for analytics
      console.log("Performance Metrics:", newMetrics);
      
      // Send to analytics service (in production)
      if (process.env.NODE_ENV === 'production') {
        // sendToAnalytics(newMetrics);
      }
    };

    // Use PerformanceObserver for advanced metrics
    if ('PerformanceObserver' in window) {
      try {
        // Observe Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Observe Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (e) {
        console.warn("PerformanceObserver not fully supported:", e);
      }
    }

    // Fallback measurement
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  // Performance monitoring for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const logPerformance = () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        console.log("Navigation Timing:", {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        });
      };

      if (document.readyState === 'complete') {
        logPerformance();
      } else {
        window.addEventListener('load', logPerformance);
        return () => window.removeEventListener('load', logPerformance);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      
      // Consider slow if load time > 3 seconds
      setIsSlow(loadTime > 3000);
    };

    if (document.readyState === 'complete') {
      checkPerformance();
    } else {
      window.addEventListener('load', checkPerformance);
      return () => window.removeEventListener('load', checkPerformance);
    }
  }, []);

  return { isSlow };
}
