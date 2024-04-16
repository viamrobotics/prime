import type { FloatingSizeOptions } from './floating-style';

export const matchWidth: FloatingSizeOptions = {
  apply: ({ rects, elements }) => {
    Object.assign(elements.floating.style, {
      width: `${rects.reference.width}px`,
    });
  },
};

export const limitHeight = (margin = 0): FloatingSizeOptions => ({
  apply: ({ availableHeight, elements }) => {
    Object.assign(elements.floating.style, {
      maxHeight: `${availableHeight - margin}px`,
    });
  },
});
