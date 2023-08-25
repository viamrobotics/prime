import { describe, expect, it } from 'vitest';
import { useUniqueId } from '$lib';

describe('useUniqueId', () => {
  it('should return a unique ID with the default prefix', () => {
    const first = useUniqueId();
    const second = useUniqueId();
    const third = useUniqueId();

    expect(first.includes('uid_')).toBeTruthy();
    expect(second.includes('uid_')).toBeTruthy();
    expect(third.includes('uid_')).toBeTruthy();

    expect(new Set([first, second, third]).size).toBe(3);
  });

  it('should return a unique ID with the passed prefix', () => {
    const first = useUniqueId('test');
    const second = useUniqueId('test');
    const third = useUniqueId('test');

    expect(first.includes('test_')).toBeTruthy();
    expect(second.includes('test_')).toBeTruthy();
    expect(third.includes('test_')).toBeTruthy();

    expect(new Set([first, second, third]).size).toBe(3);
  });
});
