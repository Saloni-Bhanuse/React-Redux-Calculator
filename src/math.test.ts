import { describe, it, expect } from 'vitest'

describe('safeDivide function', () => {
  const safeDivide = (a: number, b: number) => b === 0 ? 'error' : Number((a / b).toPrecision(10))

  it('should divide normally', () => {
    expect(safeDivide(6, 2)).toBe(3)
  })

  it('should handle divide-by-zero', () => {
    expect(safeDivide(6, 0)).toBe('error')
  })

  it('should return 0 for 0 divided by any number', () => {
    expect(safeDivide(0, 5)).toBe(0)
  })

  it('should handle negative numerator', () => {
    expect(safeDivide(-10, 2)).toBe(-5)
  })

  it('should handle negative denominator', () => {
    expect(safeDivide(10, -2)).toBe(-5)
  })

  it('should handle both numerator and denominator negative', () => {
    expect(safeDivide(-10, -2)).toBe(5)
  })

  it('should handle floating-point result with precision', () => {
    expect(safeDivide(1, 3)).toBeCloseTo(0.3333333333)
  })

  it('should handle large numbers', () => {
    expect(safeDivide(1e12, 2)).toBe(5e11)
  })

  it('should handle small decimal values', () => {
    expect(safeDivide(0.000001, 2)).toBe(0.0000005)
  })
})
