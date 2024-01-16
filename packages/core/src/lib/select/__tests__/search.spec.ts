import { describe, expect, it } from 'vitest';
import { getSearchResults } from '../search';

describe('getSearchResults', () => {
  const options = [
    'First Option',
    'Option 2',
    'C.) Option',
    'Something Else',
    'With A Whole Lot Of Parts',
  ];

  it('returns an array of search results sorted by priority', () => {
    const matches = getSearchResults(options, 's');

    expect(matches).toEqual([
      {
        option: 'Something Else',
        priority: 0,
        highlight: ['', 'S', 'omething Else'],
      },
      {
        option: 'First Option',
        priority: 1,
        highlight: ['Fir', 's', 't Option'],
      },
      {
        option: 'With A Whole Lot Of Parts',
        priority: 6,
        highlight: ['With A Whole Lot Of Part', 's', ''],
      },
      { option: 'Option 2', priority: -1 },
      { option: 'C.) Option', priority: -1 },
    ]);
  });

  it('returns an array of search results sorted by priority without any non-matches', () => {
    const matches = getSearchResults(options, 's', 'reduce');

    expect(matches).toEqual([
      expect.objectContaining({ option: 'Something Else' }),
      expect.objectContaining({ option: 'First Option' }),
      expect.objectContaining({ option: 'With A Whole Lot Of Parts' }),
    ]);
  });

  it('returns an array of search results with highlights but no sorting', () => {
    const matches = getSearchResults(options, 's', 'off');

    expect(matches).toEqual([
      expect.objectContaining({ option: 'First Option' }),
      expect.objectContaining({ option: 'Option 2' }),
      expect.objectContaining({ option: 'C.) Option' }),
      expect.objectContaining({ option: 'Something Else' }),
      expect.objectContaining({ option: 'With A Whole Lot Of Parts' }),
    ]);
  });

  it('matches and highlights special character at the start of an option', () => {
    const matches = getSearchResults(options, 'C.)', 'reduce');

    expect(matches).toEqual([
      { option: 'C.) Option', priority: 0, highlight: ['', 'C.)', ' Option'] },
    ]);
  });

  it('matches and highlights special character in the middle of an option', () => {
    const matches = getSearchResults(options, '.)', 'reduce');

    expect(matches).toEqual([
      { option: 'C.) Option', priority: 1, highlight: ['C', '.)', ' Option'] },
    ]);
  });
});
