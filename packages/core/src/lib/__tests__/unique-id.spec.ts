import { describe, expect, it } from 'vitest';
import { uniqueId } from '$lib';

describe('uniqueId', () => {
  it('should return a unique ID with the default prefix', () => {
    const first = uniqueId();
    const second = uniqueId();
    const third = uniqueId();

    expect(first.includes('uid_')).toBeTruthy();
    expect(second.includes('uid_')).toBeTruthy();
    expect(third.includes('uid_')).toBeTruthy();

    expect(new Set([first, second, third]).size).toBe(3);
  });

  it('should return a unique ID with the passed prefix', () => {
    const first = uniqueId('test');
    const second = uniqueId('test');
    const third = uniqueId('test');

    expect(first.includes('test_')).toBeTruthy();
    expect(second.includes('test_')).toBeTruthy();
    expect(third.includes('test_')).toBeTruthy();

    expect(new Set([first, second, third]).size).toBe(3);
  });
});
