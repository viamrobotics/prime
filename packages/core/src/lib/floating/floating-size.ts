import type { FloatingSizeOptions } from './floating-style';

export const matchWidth: FloatingSizeOptions = {
  apply({ rects, elements }) {
    Object.assign(elements.floating.style, {
      width: `${rects.reference.width}px`,
    });
  },
};
