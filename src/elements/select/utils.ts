interface Match { 
  search: string[],
  option: string,
}

export type SortOptions = 'default' | 'reduce' | 'off'

export const isElementInScrollView = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const parentRect = element.parentElement!.parentElement!.getBoundingClientRect();

  return (bottom < parentRect.bottom && top > parentRect.top);
};

export const shouldBeChecked = (value: string, option: string) => {
  return value.includes(option);
};

export const applySearchHighlight = (options: string[], value: string) => {
  if (!value) {
    return options.map((option) => ({ search: undefined, option }));
  }

  const matches = [];
  const noMatches = [];

  for (const option of options) {
    const match = option.match(new RegExp(value, 'i'));

    if (match?.index !== undefined) {
      const begin = option.slice(0, match.index);
      const middle = option.slice(match.index, match.index + value.length);
      const end = option.slice(match.index + value.length);
      matches.push({
        search: [begin, middle, end],
        option,
      });
    } else {
      noMatches.push({
        search: undefined,
        option,
      });
    }
  }

  sortArr(matches);
  return [...matches, ...noMatches];
};

export const matchingOnly = (options: string[], value: string) => {
  if (!value) {
    return options.map((option) => ({ search: undefined, option }));
  }

  const matches = [];

  for (const option of options) {
    const match = option.match(new RegExp(value, 'i'));

    if (match?.index !== undefined) {
      const begin = option.slice(0, match.index);
      const middle = option.slice(match.index, match.index + value.length);
      const end = option.slice(match.index + value.length);
      matches.push({
        search: [begin, middle, end],
        option,
      });
    } 
  }

  sortArr(matches);

  return [...matches];
};

const sortArr = (arr: Match[]) => {
  arr.sort((a, b) => {
    if (a.option.indexOf(a.search[1]!) < b.option.indexOf(b.search[1]!)) {
      return -1;
    }

    return 1;
  });
};
