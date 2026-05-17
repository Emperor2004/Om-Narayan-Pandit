import { test, expect, request } from '@playwright/test';
import { getPerformanceConfig, assertApiLatency } from '../../src/test/performance-config';

const performanceConfig = getPerformanceConfig();
const BASE_URL = 'http://localhost:3001';

test.describe('API Latency Validation', () => {
  test.beforeEach(async ({ request }) => {
    // Reset any test data
    // Note: In a real app, you might want to set up test data here
  });

  test('GET /api/skills response time under threshold', async ({ request }) => {
    const responseTimes: number[] = [];
    
    // Make multiple requests to measure P95
    for (let i = 0; i < 20; i++) {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}/api/skills`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      // Verify response is successful
      expect(response.status()).toBe(200);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Calculate P95
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.DEFAULT, '/api/skills');
    
    console.log('API Latency Results:', {
      endpoint: '/api/skills',
      responseTimes: responseTimes.slice(0, 5),
      p95: p95ResponseTime,
      threshold: performanceConfig.API_LATENCY.DEFAULT,
    });
  });

  test('POST /api/contact response time under threshold', async ({ request }) => {
    const responseTimes: number[] = [];
    
    for (let i = 0; i < 10; i++) {
      const startTime = Date.now();
      const response = await request.post(`${BASE_URL}/api/contact`, {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message for performance testing',
        },
      });
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      expect(response.status()).toBe(200);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.DEFAULT, '/api/contact');
  });

  test('Authentication endpoints under threshold', async ({ request }) => {
    const responseTimes: number[] = [];
    
    // Test login endpoint
    for (let i = 0; i < 10; i++) {
      const startTime = Date.now();
      const response = await request.post(`${BASE_URL}/api/auth/login`, {
        data: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      });
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      // Accept either 200 or 401 for performance testing
      expect([200, 401]).toContain(response.status());
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.AUTH, '/api/auth/login');
  });

  test('Search endpoint performance', async ({ request }) => {
    const searchQueries = ['react', 'nodejs', 'typescript', 'performance', 'testing'];
    const responseTimes: number[] = [];
    
    for (const query of searchQueries) {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}/api/search?q=${query}`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      expect(response.status()).toBe(200);
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.SEARCH, '/api/search');
  });

  test('File upload performance', async ({ request }) => {
    const responseTimes: number[] = [];
    
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      const response = await request.post(`${BASE_URL}/api/upload`, {
        multipart: {
          file: {
            name: 'test-file.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('Test file content for performance testing'),
          },
        },
      });
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      expect(response.status()).toBe(200);
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.FILE_UPLOAD, '/api/upload');
  });

  test('Concurrent request performance', async ({ request }) => {
    const concurrentRequests = 10;
    const responseTimes: number[] = [];
    
    // Make concurrent requests
    const promises = Array.from({ length: concurrentRequests }, async (_, i) => {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}/api/skills`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      expect(response.status()).toBe(200);
      return responseTime;
    });
    
    await Promise.all(promises);
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.DEFAULT, 'concurrent requests');
  });

  test('Large response handling', async ({ request }) => {
    const responseTimes: number[] = [];
    
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}/api/projects?limit=1000`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      responseTimes.push(responseTime);
      
      expect(response.status()).toBe(200);
      
      // Check response size
      const responseBody = await response.body();
      expect(responseBody.length).toBeGreaterThan(0);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    responseTimes.sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95ResponseTime = responseTimes[p95Index];
    
    assertApiLatency(p95ResponseTime, performanceConfig.API_LATENCY.DATA_FETCH, 'large response');
  });
});
