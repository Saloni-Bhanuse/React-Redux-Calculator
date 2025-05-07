import { describe, it, expect } from 'vitest'

describe('Safe division', () => {
  const safeDivide = (a: number, b: number) => b === 0 ? 'error' : a / b;

  it('should divide normally', () => {
    expect(safeDivide(6, 2)).toBe(3);
  });

  it('should handle divide-by-zero', () => {
    expect(safeDivide(6, 0)).toBe('error');
  });
});
