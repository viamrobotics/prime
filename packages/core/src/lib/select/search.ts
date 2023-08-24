import escapeRegExp from 'lodash/escapeRegExp';

export type SortOptions = 'default' | 'reduce' | 'off';

/**
 * A breakdown of how a search result should be highlighted. `before` is the
 * text preceeding the highlighted portion of the result, `highlight` is the
 * part of  the result that should be highlighted, and `after` is the text
 * succeeding the highlighted portion of the result.
 */
export type SearchHighlight = [
  before: string,
  highlight: string,
  after: string,
];

/**
 * A search result with potential matches.
 *
 * @export
 * @interface SearchResult
 */
export interface SearchResult {
  /**
   * How the option should be highlighted
   *
   * @type {(SearchHighlight | undefined)}
   * @memberof SearchResult
   */
  highlight: SearchHighlight | undefined;

  /**
   * The select option that had a potential match.
   *
   * @type {string}
   * @memberof SearchResult
   */
  option: string;
}

/**
 * A map of search results prioritized by where the match occured in the
 * option.
 */
export type SearchMatches = {
  [priority: number]: string[];
  0: string[];
  '-1': string[];
};

/**
 * Checks the passed select option for a match with the passed search term,
 * and returns the match with a priority based on the result:
 * - `0` is any matches on the initial character of a word
 * - The index of the word in the option that matched
 * - `-1` for non-matches
 */
const getMatchPriority = (option: string, searchTerm: string): number => {
  const words = option.split(' ');

  // Match on the initial character of any word in the option
  const initialCharacterMatch = new RegExp(`^${searchTerm}`, 'iu');
  const anyMatch = new RegExp(searchTerm, 'giu');

  for (const [i, word] of words.entries()) {
    if (initialCharacterMatch.test(word)) {
      // Match on an initial character is highest priority
      return 0;
    }

    if (anyMatch.test(word)) {
      /*
       * Matches on other characters are lower priority, so we add 1 to
       * prioritize them below matching on an initial character.
       */
      return i + 1;
    }
  }

  // Don't prioritize if there are no matches
  return -1;
};

/**
 * Checks each passed option if it matches with the passed search term, and
 * returns a prioritized map of the results.
 */
const prioritizeMatches = (options: string[], searchTerm: string) => {
  const results: SearchMatches = {
    '0': [],
    '-1': [],
  };

  for (const option of options) {
    const priority = getMatchPriority(option, searchTerm);
    results[priority] ||= [];
    results[priority]!.push(option);
  }

  return results;
};

/**
 * Prioritized the passed options based on where a potential match occured
 * with  the passed search term. If reduce is true, options with no match (-1
 * priority) will not be included in the results.
 */
const getPrioritizedOptions = (
  options: string[],
  searchTerm: string,
  reduce: boolean
) => {
  const prioritized = prioritizeMatches(options, searchTerm);
  const results: string[] = [];

  for (const key of Object.keys(prioritized)) {
    const priority = Number.parseInt(key, 10);
    if (reduce && priority === -1) {
      continue;
    }

    const sorted = prioritized[priority] ?? [];
    results.push(...sorted);
  }

  return results;
};

/**
 * Returns the passed option broken down into segments to apply highlighting
 * to the portion of the option that matches the passed search term.
 */
const getSearchHighlight = (
  option: string,
  searchTerm: string
): SearchHighlight | undefined => {
  const match = option.match(new RegExp(searchTerm, 'iu'));

  if (match === null || match.index === undefined) {
    return undefined;
  }

  const { index } = match;
  const beginning = option.slice(0, index);
  const middle = option.slice(index, index + searchTerm.length);
  const end = option.slice(index + searchTerm.length);
  return [beginning, middle, end];
};

/**
 * Sorts the passed results by the `highlight` segment of the result.
 */
const sortByHighlight = (results: SearchResult[]) =>
  results.sort((a, b) => {
    const aIndex = a.highlight?.[1] ?? -1;
    const bIndex = b.highlight?.[1] ?? -1;
    return aIndex < bIndex ? -1 : 1;
  });

/**
 * Searches against the passed options with the passed search term before
 * sorting them and breaking them down into segments to allow for highlighting.
 *
 * @param options The select options to be searched and sorted
 * @param searchTerm The term to match against each of the `options`
 * @param reduce If true, will not return options that did not match the search term
 * @returns {SearchResult[]} The search results
 */
export const getSearchResults = (
  options: string[],
  searchTerm?: string,
  reduce: boolean = false
): SearchResult[] => {
  if (!searchTerm) {
    return options.map((option) => ({ highlight: undefined, option }));
  }

  const matches: SearchResult[] = [];
  const noMatches = [];
  const escaped = escapeRegExp(searchTerm);
  const prioritized = getPrioritizedOptions(options, escaped, reduce);

  for (const option of prioritized) {
    const highlight = getSearchHighlight(option, escaped);
    const result = { highlight, option };

    if (highlight === undefined) {
      noMatches.push(result);
      continue;
    }

    matches.push(result);
  }

  const sorted = sortByHighlight(matches);
  return [...sorted, ...noMatches];
};
