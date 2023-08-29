export const isOptionInScrollView = (option: Element) => {
  const { top, bottom } = option.getBoundingClientRect();
  const parentRect =
    option.parentElement!.parentElement!.getBoundingClientRect();

  return bottom < parentRect.bottom && top > parentRect.top;
};
