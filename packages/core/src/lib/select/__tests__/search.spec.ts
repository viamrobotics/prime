import { describe, expect, it } from 'vitest';
import {
  getSearchHighlight,
  getSearchMatch,
  getSearchMatches,
  getSearchResults,
  getWordIndex,
  prioritizeMatches,
} from '../search';
import { escapeRegExp } from 'lodash';

describe('search', () => {
  const options = [
    'First Option',
    'Option 2',
    'C.) Option',
    'Something Else',
    'With A Whole Lot Of Parts',
  ];

  describe('getWordIndex', () => {
    it('should return the index of the word containing the character at the passed index', () => {
      const option = 'With A Whole Lot Of Parts';
      const index = option.indexOf('c');
      expect(getWordIndex(option, index)).toBe(5);
    });
  });

  describe('getSearchHighlight', () => {
    const option = 'Test Option';

    it('should return a highlighting breakdown of the passed option with a term matching the start of a word', () => {
      const search = 'Opt';
      const match = new RegExp(escapeRegExp(search), 'giu').exec(option);
      const highlight = getSearchHighlight(option, search, match!);

      expect(highlight[0]).toBe('Test ');
      expect(highlight[1]).toBe(search);
      expect(highlight[2]).toBe('ion');
    });

    it('should return a highlighting breakdown of the passed option with a term matching anywhere', () => {
      const search = 'pt';
      const match = new RegExp(escapeRegExp(search), 'giu').exec(option);
      const highlight = getSearchHighlight(option, search, match!);

      expect(highlight[0]).toBe('Test O');
      expect(highlight[1]).toBe(search);
      expect(highlight[2]).toBe('ion');
    });
  });

  describe('getSearchMatch', () => {
    const option = 'Test Option';

    it('should return a priority 0 match (start of word)', () => {
      const search = 'Opt';
      const match = getSearchMatch(option, search);

      expect(match.priority).toBe(0);
    });

    it('should return a priority 1 match (in first word)', () => {
      const search = 'est';
      const match = getSearchMatch(option, search);

      expect(match.priority).toBe(1);
    });

    it('should return a priority 2 match (in second word)', () => {
      const search = 'pt';
      const match = getSearchMatch(option, search);

      expect(match.priority).toBe(2);
    });

    it('should return a priority -1 match (no match)', () => {
      const search = 'rf';
      const match = getSearchMatch(option, search);

      expect(match.priority).toBe(-1);
    });
  });

  describe('prioritizeMatches', () => {
    it('should return a prioritized map of matches', () => {
      const matches = prioritizeMatches(options, 's');

      expect(matches['-1'].length).toBe(2);
      expect(matches['0'].length).toBe(1);
      expect(matches['1']?.length).toBe(1);
      expect(matches['6']?.length).toBe(1);
    });
  });

  describe('getSearchMatches', () => {
    it('should return an array of search matches sorted by their priority', () => {
      const matches = getSearchMatches(options, 's');

      expect(matches[0]?.priority).toBe(0);
      expect(matches[1]?.priority).toBe(1);
      expect(matches[2]?.priority).toBe(6);
      expect(matches[3]?.priority).toBe(-1);
      expect(matches[4]?.priority).toBe(-1);
    });

    it('should return an array of search matches sorted by their priority without any non-matches', () => {
      const matches = getSearchMatches(options, 's', 'reduce');

      expect(matches[0]?.priority).toBe(0);
      expect(matches[1]?.priority).toBe(1);
      expect(matches[2]?.priority).toBe(6);
      expect(matches[3]).toBe(undefined);
      expect(matches[4]).toBe(undefined);
    });
  });

  describe('getSearchResults', () => {
    it('should return an array of search results sorted by priority', () => {
      const matches = getSearchResults(options, 's');

      expect(matches[0]?.option).toBe('Something Else');
      expect(matches[1]?.option).toBe('First Option');
      expect(matches[2]?.option).toBe('With A Whole Lot Of Parts');
      expect(matches[3]?.option).toBe('Option 2');
      expect(matches[4]?.option).toBe('C.) Option');
    });

    it('should return an array of search results sorted by priority without any non-matches', () => {
      const matches = getSearchResults(options, 's', 'reduce');

      expect(matches[0]?.option).toBe('Something Else');
      expect(matches[1]?.option).toBe('First Option');
      expect(matches[2]?.option).toBe('With A Whole Lot Of Parts');
      expect(matches[3]).toBe(undefined);
      expect(matches[4]).toBe(undefined);
    });

    it('should return an array of search results with highlights but no sorting', () => {
      const matches = getSearchResults(options, 's', 'off');

      expect(matches[0]?.option).toBe(options[0]);
      expect(matches[1]?.option).toBe(options[1]);
      expect(matches[2]?.option).toBe(options[2]);
      expect(matches[3]?.option).toBe(options[3]);
      expect(matches[4]?.option).toBe(options[4]);
    });
  });
});
