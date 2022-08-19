export const isElementInScrollView = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const parentRect = element.parentElement!.getBoundingClientRect();

  return (bottom < parentRect.bottom && top > parentRect.top);
};

export const shouldBeChecked = (value: string, option: string) => {
  return value.includes(option);
};

export const applySearchHighlight = (options: string[], value: string) => {
  return options.map((option) => {
    const match = option.match(new RegExp(value, 'i'));

    if (match?.index !== undefined) {
      const begin = option.slice(0, match.index);
      const middle = option.slice(match.index, match.index + value.length);
      const end = option.slice(match.index + value.length);

      return {
        search: [begin, middle, end],
        option,
      };
    }

    return {
      search: undefined,
      option,
    };
  });
};
