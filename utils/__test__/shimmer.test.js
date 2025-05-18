import { describe, it, expect } from 'vitest';
import { shimmer, toBase64 } from '~/utils/shimmer';

describe('shimmer utility', () => {
  it('generates default SVG', () => {
    const result = shimmer();
    expect(result).toContain('<svg width="100%" height="100%"');
    expect(result).toContain('<linearGradient id="g">');
    expect(result).toContain('<animate xlink:href="#r"');
  });

  it('generates SVG with custom dimensions', () => {
    const result = shimmer(200, 300);
    expect(result).toContain('width="200" height="300"');
  });
});

describe('toBase64 utility', () => {
  it('converts string to Base64', () => {
    const result = toBase64('test');
    expect(result).toBe('dGVzdA==');
  });

  it('works on server side', () => {
    const originalWindow = global.window;
    global.window = undefined;

    const result = toBase64('server');
    expect(result).toBe('c2VydmVy');

    global.window = originalWindow;
  });
});
