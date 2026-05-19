import { describe, it, expect } from 'vitest';
import { siteMetadata, generatePageMetadata } from '../app/metadata';

describe('siteMetadata', () => {
  it('has correct default title', () => {
    expect((siteMetadata.title as any).default).toBe('Om Narayan Pandit - AI/ML Engineer');
  });

  it('has title template', () => {
    expect((siteMetadata.title as any).template).toBe('%s | Om Narayan Pandit');
  });

  it('has description', () => {
    expect(siteMetadata.description).toContain('AI/ML');
  });

  it('has keywords array', () => {
    expect(Array.isArray(siteMetadata.keywords)).toBe(true);
    expect((siteMetadata.keywords as string[])).toContain('Machine Learning');
  });

  it('has openGraph with correct type', () => {
    expect((siteMetadata.openGraph as any)?.type).toBe('website');
  });

  it('has robots config', () => {
    expect((siteMetadata.robots as any).index).toBe(true);
    expect((siteMetadata.robots as any).follow).toBe(true);
  });
});

describe('generatePageMetadata', () => {
  it('sets title', () => {
    const meta = generatePageMetadata('Blog');
    expect(meta.title).toBe('Blog');
  });

  it('uses provided description', () => {
    const meta = generatePageMetadata('Blog', 'My blog');
    expect(meta.description).toBe('My blog');
  });

  it('falls back to siteMetadata description when none provided', () => {
    const meta = generatePageMetadata('Blog');
    expect(meta.description).toBe(siteMetadata.description as string);
  });

  it('merges provided keywords with site keywords', () => {
    const meta = generatePageMetadata('Blog', undefined, ['React']);
    expect((meta.keywords as string[])).toContain('React');
    expect((meta.keywords as string[])).toContain('Machine Learning');
  });

  it('uses site keywords when none provided', () => {
    const meta = generatePageMetadata('Blog');
    expect(meta.keywords).toEqual(siteMetadata.keywords);
  });

  it('sets openGraph title', () => {
    const meta = generatePageMetadata('Projects');
    expect(meta.openGraph?.title).toBe('Projects');
  });
});
