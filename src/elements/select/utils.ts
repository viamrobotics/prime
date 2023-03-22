import { addSpecialCharacterEscapes } from '../../lib/sort';

interface Match {
  search: string[];
  option: string;
}

export type SortOptions = 'default' | 'reduce' | 'off';

export const isElementInScrollView = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const parentRect =
    element.parentElement!.parentElement!.getBoundingClientRect();

  return bottom < parentRect.bottom && top > parentRect.top;
};

export const shouldBeChecked = (value: string, option: string) => {
  const values = value.split(',').map((v) => v.trim());
  return values.includes(option);
};

export const applySearchHighlight = (options: string[], value: string) => {
  if (!value) {
    return options.map((option) => ({ search: undefined, option }));
  }

  const matches = [];
  const noMatches = [];

  const valueCopy = addSpecialCharacterEscapes(value);

  for (const option of options) {
    const match = option.match(new RegExp(valueCopy, 'i'));

    if (match?.index === undefined) {
      noMatches.push({
        search: undefined,
        option,
      });
    } else {
      const begin = option.slice(0, match.index);
      const middle = option.slice(match.index, match.index + valueCopy.length);
      const end = option.slice(match.index + valueCopy.length);
      matches.push({
        search: [begin, middle, end],
        option,
      });
    }
  }

  sortArr(matches);
  return [...matches, ...noMatches];
};

const sortArr = (arr: Match[]) => {
  arr.sort((a, b) => {
    if (a.option.indexOf(a.search[1]!) < b.option.indexOf(b.search[1]!)) {
      return -1;
    }

    return 1;
  });
};
