import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('API Latency Validation', () => {
  test('GET /api/projects responds under 500ms', async ({ request }) => {
    const start = Date.now();
    const res = await request.get(`${BASE_URL}/api/projects`);
    const elapsed = Date.now() - start;
    expect(res.status()).toBe(200);
    expect(elapsed).toBeLessThan(1000);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /api/publications responds under 500ms', async ({ request }) => {
    const start = Date.now();
    const res = await request.get(`${BASE_URL}/api/publications`);
    const elapsed = Date.now() - start;
    expect(res.status()).toBe(200);
    expect(elapsed).toBeLessThan(1000);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test('GET /api/blog responds under 500ms', async ({ request }) => {
    const start = Date.now();
    const res = await request.get(`${BASE_URL}/api/blog`);
    const elapsed = Date.now() - start;
    expect(res.status()).toBe(200);
    expect(elapsed).toBeLessThan(1000);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test('POST /api/contact returns 400 for missing fields', async ({ request }) => {
    const start = Date.now();
    const res = await request.post(`${BASE_URL}/api/contact`, {
      data: { name: '', email: '', subject: '', message: '' },
      timeout: 5000,
    });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
    expect([400, 429, 500]).toContain(res.status());
  });

  test('concurrent requests to /api/projects all succeed', async ({ request }) => {
    const requests = Array.from({ length: 5 }, () =>
      request.get(`${BASE_URL}/api/projects`)
    );
    const responses = await Promise.all(requests);
    for (const res of responses) {
      expect(res.status()).toBe(200);
    }
  });
});
