import escapeRegExp from 'lodash/escapeRegExp';

export type SortOptions = 'default' | 'reduce' | 'off';

/**
 * A breakdown of how a search result should be highlighted. `before` is the
 * text preceding the highlighted portion of the result, `highlight` is the
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
 * @interface SearchMatch
 */
export interface SearchMatch {
  /**
   * The sorting priority for the option.
   */
  priority: number;

  /**
   * How the option should be highlighted.
   *
   * @type {(SearchHighlight | undefined)}
   * @memberof SearchMatch
   */
  highlight: SearchHighlight | undefined;

  /**
   * The select option that had a potential match.
   *
   * @type {string}
   * @memberof SearchMatch
   */
  option: string;
}

/**
 * A map of search results prioritized by where the match occured in the
 * option.
 */
export type SearchMatches = {
  [priority: number]: SearchMatch[];
  0: SearchMatch[];
  '-1': SearchMatch[];
};

/**
 * Returns the index of the word where the character with the passed index
 * occurs.
 */
const getWordIndex = (option: string, index: number) => {
  const preceding = option.slice(0, index);
  return (preceding.match(/\s/gu) || []).length;
};

/**
 * Returns the passed option broken down into segments to apply highlighting
 * to the portion of the option that matches the passed search term.
 */
const getSearchHighlight = (
  option: string,
  searchTerm: string,
  { index }: RegExpExecArray
): SearchHighlight | undefined => {
  const matchIndex = index === 0 ? 0 : index + 1;
  return [
    option.slice(0, matchIndex),
    option.slice(matchIndex, matchIndex + searchTerm.length),
    option.slice(matchIndex + searchTerm.length),
  ];
};

/**
 * Checks the passed select option for a match with the passed search term,
 * and returns the match with a priority based on the result:
 * - `0` is any matches on the initial character of a word
 * - The index of the word in the option that matched
 * - `-1` for non-matches
 */
const getSearchMatch = (option: string, searchTerm: string): SearchMatch => {
  // Match on the initial character of any word in the option
  const initialCharacterMatch = new RegExp(
    `(^${searchTerm}|\\s${searchTerm})`,
    'iu'
  ).exec(option);

  const anyMatch = new RegExp(searchTerm, 'giu').exec(option);

  if (initialCharacterMatch !== null) {
    // Match on an initial character is highest priority
    return {
      priority: 0,
      option,
      highlight: getSearchHighlight(option, searchTerm, initialCharacterMatch),
    };
  }

  if (anyMatch !== null) {
    /*
     * Matches on other characters are lower priority, so we add 1 to
     * prioritize them below matching on an initial character.
     */
    return {
      priority: getWordIndex(option, anyMatch.index) + 1,
      option,
      highlight: getSearchHighlight(option, searchTerm, anyMatch),
    };
  }

  // Don't prioritize if there are no matches
  return {
    priority: -1,
    option,
    highlight: undefined,
  };
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
    const match = getSearchMatch(option, searchTerm);
    results[match.priority] ||= [];
    results[match.priority]!.push(match);
  }

  return results;
};

/**
 * Sorts the passed options based on where a potential match occured
 * with the passed search term, and returns them along with their
 * highlighting breakdown for the match. If reduce is true, options
 * with no match (-1 priority) will not be included in the results.
 */
const getMatches = (options: string[], searchTerm: string, reduce: boolean) => {
  const prioritized = prioritizeMatches(options, searchTerm);
  const results: SearchMatch[] = [];

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
 * Sorts the passed results by the `highlight` segment of the result.
 */
const sortByHighlight = (results: SearchMatch[]) =>
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
 * @returns {SearchMatch[]} The search results
 */
export const getSearchResults = (
  options: string[],
  searchTerm?: string,
  reduce: boolean = false
): SearchMatch[] => {
  if (!searchTerm) {
    return options.map((option) => ({
      priority: -1,
      highlight: undefined,
      option,
    }));
  }

  const matches: SearchMatch[] = [];
  const noMatches = [];
  const escaped = escapeRegExp(searchTerm);
  const results = getMatches(options, escaped, reduce);

  for (const match of results) {
    if (match.highlight === undefined) {
      noMatches.push(match);
      continue;
    }

    matches.push(match);
  }

  const sorted = sortByHighlight(matches);
  return [...sorted, ...noMatches];
};
