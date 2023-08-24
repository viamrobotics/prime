export interface SearchMatch {
  search: string[] | undefined;
  option: string;
}

const addSpecialCharacterEscapes = (value: string) =>
  // eslint-disable-next-line no-useless-escape
  value.replaceAll(/[-[\]{}()*+?.,\\^$|#]/gu, '\\$&').replaceAll(/\s/gu, '\\s');

const matchEntries = (entries: string[], searchTerm: string) => {
  const results: Record<string, string[]> = {};
  const toMatch = addSpecialCharacterEscapes(searchTerm);
  const initialCharacterMatch = new RegExp(`^${toMatch}`, 'iu');
  const anyMatch = new RegExp(toMatch, 'giu');

  for (const datum of entries) {
    let index = -1;
    const words = datum.split(' ');

    for (const [i, word] of words.entries()) {
      if (initialCharacterMatch.test(word)) {
        index = 0;
        break;
      } else if (anyMatch.test(word)) {
        index = i + 1;
      }
    }

    if (results[index] === undefined) {
      results[index] = [datum];
    } else {
      results[index]!.push(datum);
    }
  }

  return results;
};

const sortMatches = (arr: SearchMatch[]) =>
  arr.sort((a, b) => {
    const aIndex = a.search?.[1] ?? -1;
    const bIndex = b.search?.[1] ?? -1;
    return aIndex < bIndex ? -1 : 1;
  });

export type SortOptions = 'default' | 'reduce' | 'off';

export const isElementInScrollView = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const parentRect =
    element.parentElement!.parentElement!.getBoundingClientRect();

  return bottom < parentRect.bottom && top > parentRect.top;
};

export const applySearchHighlight = (
  options: string[],
  value: string
): SearchMatch[] => {
  if (!value) {
    return options.map((option) => ({ search: undefined, option }));
  }

  const matches = [];
  const noMatches = [];
  const escaped = addSpecialCharacterEscapes(value);

  for (const option of options) {
    const match = option.match(new RegExp(escaped, 'iu'));

    if (match?.index === undefined) {
      noMatches.push({ search: undefined, option });
      continue;
    }

    const beginning = option.slice(0, match.index);
    const middle = option.slice(match.index, match.index + escaped.length);
    const end = option.slice(match.index + escaped.length);
    matches.push({ search: [beginning, middle, end], option });
  }

  const sorted = sortMatches(matches);
  return [...sorted, ...noMatches];
};

export const matchAndSortEntries = (
  entries: string[],
  searchTerm: string,
  reduce: boolean
) => {
  const results = matchEntries(entries, searchTerm);
  const finalResults: string[] = [];

  if (reduce) {
    for (const key of Object.keys(results)) {
      if (Number.parseInt(key, 10) !== -1) {
        const sorted = results[key] || [];
        finalResults.push(...sorted);
      }
    }

    return finalResults;
  }

  for (const key of Object.keys(results)) {
    const sorted = results[key] || [];
    finalResults.push(...sorted);
  }

  return finalResults;
};

export const clickedOutside = (event: Event, inner: Element) =>
  event.target !== null && !inner.contains(event.target as Node);
