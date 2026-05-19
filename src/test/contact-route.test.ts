import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock rateLimit
const mockRateLimit = vi.fn();
vi.mock('@/lib/rateLimit', () => ({ rateLimit: mockRateLimit }));

// Mock Resend
const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

// Mock next/server
vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn((data: unknown, init?: { status?: number }) => ({ data, init, status: init?.status ?? 200 })),
  },
}));

function makeRequest(body: object, headers: Record<string, string> = {}) {
  return {
    headers: { get: (k: string) => headers[k] ?? null },
    json: async () => body,
  } as any;
}

type MockRes = { data: { success: boolean; message: string }; status: number };

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.EMAIL_TO = 'test@example.com';
    mockRateLimit.mockReturnValue({ success: true });
    mockSend.mockResolvedValue({ id: 'email-id' });
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_TO;
  });

  it('returns 429 when rate limited', async () => {
    mockRateLimit.mockReturnValue({ success: false });
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'A', email: 'a@b.com', subject: 'S', message: 'M' })) as unknown as MockRes;
    expect(res.status).toBe(429);
    expect(res.data.success).toBe(false);
  });

  it('returns 500 when env vars missing', async () => {
    delete process.env.RESEND_API_KEY;
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'A', email: 'a@b.com', subject: 'S', message: 'M' }));
    expect(res.status).toBe(500);
  });

  it('returns 400 when fields missing', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: '', email: 'a@b.com', subject: 'S', message: 'M' })) as unknown as MockRes;
    expect(res.status).toBe(400);
    expect(res.data.message).toBe('All fields are required.');
  });

  it('returns 400 for invalid email', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'A', email: 'not-an-email', subject: 'S', message: 'M' })) as unknown as MockRes;
    expect(res.status).toBe(400);
    expect(res.data.message).toBe('Invalid email address.');
  });

  it('sends two emails and returns success on valid input', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'alice@example.com', subject: 'Hello', message: 'Hi there' })) as unknown as MockRes;
    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(res.data.success).toBe(true);
  });

  it('sanitizes HTML in inputs', async () => {
    const { POST } = await import('../app/api/contact/route');
    await POST(makeRequest({ name: '<b>Alice</b>', email: 'alice@example.com', subject: '<script>', message: 'msg' }));
    const firstCall = mockSend.mock.calls[0][0];
    expect(firstCall.html).toContain('&lt;b&gt;Alice&lt;/b&gt;');
    expect(firstCall.html).toContain('&lt;script&gt;');
  });

  it('returns 500 on Resend error', async () => {
    mockSend.mockRejectedValue(new Error('Resend failed'));
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'A', email: 'a@b.com', subject: 'S', message: 'M' })) as unknown as MockRes;
    expect(res.status).toBe(500);
    expect(res.data.success).toBe(false);
  });

  it('uses x-forwarded-for header for rate limiting', async () => {
    const { POST } = await import('../app/api/contact/route');
    await POST(makeRequest({ name: 'A', email: 'a@b.com', subject: 'S', message: 'M' }, { 'x-forwarded-for': '1.2.3.4' }));
    expect(mockRateLimit).toHaveBeenCalledWith('1.2.3.4', 3, 60000);
  });

  it('falls back to x-real-ip when x-forwarded-for absent', async () => {
    const { POST } = await import('../app/api/contact/route');
    await POST(makeRequest({ name: 'A', email: 'a@b.com', subject: 'S', message: 'M' }, { 'x-real-ip': '5.6.7.8' }));
    expect(mockRateLimit).toHaveBeenCalledWith('5.6.7.8', 3, 60000);
  });
});
