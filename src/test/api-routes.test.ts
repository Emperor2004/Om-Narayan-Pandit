import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';

vi.mock('@/data', () => ({
  projects: [{ id: 1, title: 'Project A' }],
  publications: [{ id: 1, title: 'Paper A' }],
  blogPosts: [{ id: 1, title: 'Post A' }],
}));

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({ data, init })),
  },
}));

describe('GET /api/projects', () => {
  it('returns projects with success:true', async () => {
    const { GET } = await import('../app/api/projects/route');
    await GET();
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: [{ id: 1, title: 'Project A' }] });
  });
});

describe('GET /api/publications', () => {
  it('returns publications with success:true', async () => {
    const { GET } = await import('../app/api/publications/route');
    await GET();
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: [{ id: 1, title: 'Paper A' }] });
  });
});

describe('GET /api/blog', () => {
  it('returns blogPosts with success:true', async () => {
    const { GET } = await import('../app/api/blog/route');
    await GET();
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: [{ id: 1, title: 'Post A' }] });
  });
});
