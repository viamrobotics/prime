import type { IconName } from '$lib';
import { escapeRegExp } from 'lodash-es';

/** How to handle sorting select options. */
export const SortOptions = {
  /** Sort matches at the beginning, prioritizing the beginnings of words. */
  DEFAULT: 'default',
  /** Sort matches by priority and remove any non-matches. */
  REDUCE: 'reduce',
  /** Neither sort nor remove options. */
  OFF: 'off',
} as const;

export type SortOption = (typeof SortOptions)[keyof typeof SortOptions];

/** Used for when you want to display things other than your keys */
export interface DetailedOption {
  /** Value of the option (used for onChange) */
  value: string;
  /** Display label */
  label?: string;
  /** Display description */
  description?: string;
  /** Icon for this option */
  icon?: IconName | undefined;
}

export const optionsToDetailedOptions = (
  opts: (string | DetailedOption)[]
): DetailedOption[] =>
  opts.map((option) =>
    typeof option === 'string'
      ? {
          value: option,
        }
      : option
  );

export const optionDisplayValue = (opt: DetailedOption): string =>
  opt.label ?? opt.value;

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

/** A search result with highlighting for potential matches */
export interface SearchResult {
  /** How the option should be highlighted. */
  highlight: SearchHighlight | undefined;

  /** The select option that had a potential match. */
  option: DetailedOption;

  /** The sorting priority for the option. */
  priority: number;
}

/**
 * A map of search results prioritized by where the match occurred in the
 * option.
 */
export interface PrioritizedSearchResults {
  [priority: number]: SearchResult[] | undefined;
  0: SearchResult[];
  '-1': SearchResult[];
}

/**
 * Returns the index of the word where the character with the passed index
 * occurs.
 */
const getWordIndex = (option: string, index: number) => {
  const preceding = option.slice(0, index);
  return (preceding.match(/\s/gu) ?? []).length;
};

/**
 * Returns the passed option broken down into segments to apply highlighting
 * to the portion of the option that matches the passed search term.
 */
const getSearchHighlight = (
  option: string,
  searchTerm: string,
  { index }: RegExpExecArray
): SearchHighlight => {
  const { length } = searchTerm.replaceAll(/\\(?<escaped>.)/gu, '$1');
  return [
    option.slice(0, index),
    option.slice(index, index + length),
    option.slice(index + length),
  ];
};

/**
 * Checks the passed select option for a match with the passed search term,
 * and returns the match with a priority based on the result:
 * - `0` is any matches on the initial character of a word
 * - The index of the word in the option that matched
 * - `-1` for non-matches
 */
export const getSearchResult = (
  option: DetailedOption,
  searchTerm: string
): SearchResult => {
  const searchKey = optionDisplayValue(option);
  // Match on the initial character of any word in the option
  const initialCharacterMatch = new RegExp(
    `(^${searchTerm}|(?<=\\s)${searchTerm})`,
    'iu'
  ).exec(searchKey);

  const anyMatch = new RegExp(searchTerm, 'giu').exec(searchKey);

  if (initialCharacterMatch !== null) {
    // Match on an initial character is highest priority
    return {
      priority: 0,
      option,
      highlight: getSearchHighlight(
        searchKey,
        searchTerm,
        initialCharacterMatch
      ),
    };
  }

  if (anyMatch !== null) {
    /*
     * Matches on other characters are lower priority, so we add 1 to
     * prioritize them below matching on an initial character.
     */
    return {
      priority: getWordIndex(searchKey, anyMatch.index) + 1,
      option,
      highlight: getSearchHighlight(searchKey, searchTerm, anyMatch),
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
const prioritizeMatches = (options: DetailedOption[], searchTerm: string) => {
  const results: PrioritizedSearchResults = {
    '0': [],
    '-1': [],
  };

  for (const option of options) {
    const match = getSearchResult(option, searchTerm);
    const priorityResults = results[match.priority] ?? [];

    priorityResults.push(match);
    results[match.priority] = priorityResults;
  }

  return results;
};

/**
 * Sorts the passed options based on where a potential match occurred with the
 * passed search term, and returns them along with their highlighting breakdown
 * for the match. If the passed sort option is `reduce`, options with no match
 * (-1 priority) will not be included in the results.
 */
const getSearchMatches = (
  options: DetailedOption[],
  searchTerm: string,
  sort: SortOption = SortOptions.DEFAULT
) => {
  // Just highlight search matches and return an unsorted array
  if (sort === 'off') {
    return options.map((option) => getSearchResult(option, searchTerm));
  }

  // Prioritize and sort results by how they matched
  const prioritized = prioritizeMatches(options, searchTerm);
  const results: SearchResult[] = [];
  const reduce = sort === 'reduce';

  for (const key of Object.keys(prioritized)) {
    const priority = Number.parseInt(key, 10);
    if (reduce && priority === -1) {
      continue;
    }

    const matches = prioritized[priority] ?? [];
    results.push(...matches);
  }

  return results;
};

/**
 * Searches against the passed options with the passed search term before
 * sorting them and breaking them down into segments to allow for highlighting.
 *
 * @param options The select options to be searched and sorted
 * @param searchTerm The term to match against each of the `options`
 * @param sort If true, will not return options that did not match the search term
 * @returns {SearchResult[]} The sorted search results
 */
export const getSearchResults = (
  options: DetailedOption[],
  searchTerm?: string,
  sort: SortOption = SortOptions.DEFAULT
): SearchResult[] => {
  if (!searchTerm) {
    return options.map((option) => ({
      priority: -1,
      highlight: undefined,
      option,
    }));
  }

  const matches: SearchResult[] = [];
  const noMatches = [];
  const escaped = escapeRegExp(searchTerm);
  const results = getSearchMatches(options, escaped, sort);

  for (const match of results) {
    // Unless sorting is off, push non-matches to the bottom
    if (match.highlight === undefined && sort !== 'off') {
      noMatches.push(match);
      continue;
    }

    matches.push(match);
  }

  return [...matches, ...noMatches];
};
