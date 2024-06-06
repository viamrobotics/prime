import { describe, it, expect } from 'vitest';
import { patternForNumericInput } from '../utils';

describe('Input utils', () => {
  it.each([
    { val: '1.2', allowNegative: true, expected: true },
    { val: '-1.2', allowNegative: true, expected: true },
    { val: '+1.2', allowNegative: true, expected: true },
    { val: '1.2', allowNegative: false, expected: true },
    { val: '-1.2', allowNegative: false, expected: false },
    { val: '+1.2', allowNegative: false, expected: true },
    { val: '0', allowNegative: true, expected: true },
    { val: '123', allowNegative: true, expected: true },
    { val: '001.200', allowNegative: true, expected: true },
    { val: '1.', allowNegative: true, expected: false },
    { val: '.1', allowNegative: true, expected: true },
    { val: 'abc', allowNegative: true, expected: false },
    { val: '1.2.3', allowNegative: true, expected: false },
    { val: '--1.2', allowNegative: true, expected: false },
    { val: '1.2-', allowNegative: true, expected: false },
    { val: '', allowNegative: true, expected: false },
    { val: ' ', allowNegative: true, expected: false },
  ])(
    'validates floating-point numbers ($val)',
    ({ val, allowNegative, expected }) => {
      const pattern = patternForNumericInput('number', allowNegative);
      expect(pattern.test(val)).toBe(expected);
    }
  );

  it.each([
    { val: '123', allowNegative: true, expected: true },
    { val: '-123', allowNegative: true, expected: true },
    { val: '+123', allowNegative: true, expected: true },
    { val: '123', allowNegative: false, expected: true },
    { val: '-123', allowNegative: false, expected: false },
    { val: '+123', allowNegative: false, expected: true },
    { val: '0', allowNegative: true, expected: true },
    { val: '001', allowNegative: true, expected: true },
    { val: '1.0', allowNegative: true, expected: false },
    { val: '1.23', allowNegative: true, expected: false },
    { val: 'abc', allowNegative: true, expected: false },
    { val: '123abc', allowNegative: true, expected: false },
    { val: '--123', allowNegative: true, expected: false },
    { val: '123-', allowNegative: true, expected: false },
    { val: '', allowNegative: true, expected: false },
    { val: ' ', allowNegative: true, expected: false },
  ])('validates integers ($val)', ({ val, allowNegative, expected }) => {
    const pattern = patternForNumericInput('integer', allowNegative);
    expect(pattern.test(val)).toBe(expected);
  });
});
