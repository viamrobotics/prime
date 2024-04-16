import { describe, expect, it } from 'vitest';
import { getSearchResults } from '../search';

describe('getSearchResults', () => {
  const options = [
    { value: 'First Option' },
    { value: 'Option 2' },
    { value: 'C.) Option' },
    { value: 'Something Else' },
    { value: 'With A Whole Lot Of Parts' },
  ];

  it('returns an array of search results sorted by priority', () => {
    const matches = getSearchResults(options, 's');

    expect(matches).toEqual([
      {
        option: { value: 'Something Else' },
        priority: 0,
        highlight: ['', 'S', 'omething Else'],
      },
      {
        option: { value: 'First Option' },
        priority: 1,
        highlight: ['Fir', 's', 't Option'],
      },
      {
        option: { value: 'With A Whole Lot Of Parts' },
        priority: 6,
        highlight: ['With A Whole Lot Of Part', 's', ''],
      },
      { option: { value: 'Option 2' }, priority: -1 },
      { option: { value: 'C.) Option' }, priority: -1 },
    ]);
  });

  it('returns an array of search results sorted by priority without any non-matches', () => {
    const matches = getSearchResults(options, 's', 'reduce');

    expect(matches).toEqual([
      expect.objectContaining({ option: { value: 'Something Else' } }),
      expect.objectContaining({ option: { value: 'First Option' } }),
      expect.objectContaining({
        option: { value: 'With A Whole Lot Of Parts' },
      }),
    ]);
  });

  it('returns an array of search results with highlights but no sorting', () => {
    const matches = getSearchResults(options, 's', 'off');

    expect(matches).toEqual([
      expect.objectContaining({ option: { value: 'First Option' } }),
      expect.objectContaining({ option: { value: 'Option 2' } }),
      expect.objectContaining({ option: { value: 'C.) Option' } }),
      expect.objectContaining({ option: { value: 'Something Else' } }),
      expect.objectContaining({
        option: { value: 'With A Whole Lot Of Parts' },
      }),
    ]);
  });

  it('matches and highlights special character at the start of an option', () => {
    const matches = getSearchResults(options, 'C.)', 'reduce');

    expect(matches).toEqual([
      {
        option: { value: 'C.) Option' },
        priority: 0,
        highlight: ['', 'C.)', ' Option'],
      },
    ]);
  });

  it('matches and highlights special character in the middle of an option', () => {
    const matches = getSearchResults(options, '.)', 'reduce');

    expect(matches).toEqual([
      {
        option: { value: 'C.) Option' },
        priority: 1,
        highlight: ['C', '.)', ' Option'],
      },
    ]);
  });
});
