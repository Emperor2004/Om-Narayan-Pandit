"use client";

import { useEffect, useState } from "react";

interface BundleInfo {
  size: number;
  chunks: Array<{
    name: string;
    size: number;
    modules: number;
  }>;
}

export function BundleAnalyzer() {
  const [bundleInfo, setBundleInfo] = useState<BundleInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Analyze bundle size in development
      const analyzeBundle = () => {
        const performanceEntries = performance.getEntriesByType('resource');
        const jsFiles = performanceEntries.filter(entry => 
          entry.name.includes('.js') && !entry.name.includes('hot-update')
        );

        const totalSize = jsFiles.reduce((acc, entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;
          return acc + (resourceEntry.transferSize || 0);
        }, 0);
        
        const chunks = jsFiles.map(entry => {
          const resourceEntry = entry as PerformanceResourceTiming;
          return {
            name: entry.name.split('/').pop() || 'unknown',
            size: resourceEntry.transferSize || 0,
            modules: 1, // Simplified - in real implementation would parse bundle
          };
        });

        setBundleInfo({
          size: totalSize,
          chunks: chunks.sort((a, b) => b.size - a.size).slice(0, 10)
        });
      };

      // Analyze after page load
      if (document.readyState === 'complete') {
        setTimeout(analyzeBundle, 1000);
      } else {
        window.addEventListener('load', () => setTimeout(analyzeBundle, 1000));
      }
    }
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (process.env.NODE_ENV !== 'development' || !bundleInfo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-accent text-white px-3 py-2 rounded-lg text-sm hover:bg-accent/90 transition-colors"
      >
        📊 Bundle: {formatBytes(bundleInfo.size)}
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 shadow-lg">
          <h3 className="font-bold mb-3 text-[var(--text)]">Bundle Analysis</h3>
          <div className="space-y-2">
            <div className="text-sm text-[var(--muted)]">
              Total Size: {formatBytes(bundleInfo.size)}
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {bundleInfo.chunks.map((chunk, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-[var(--muted)] truncate flex-1 mr-2">
                    {chunk.name}
                  </span>
                  <span className="text-accent font-mono">
                    {formatBytes(chunk.size)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
