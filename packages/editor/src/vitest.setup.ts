import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';
import { vi } from 'vitest';

// See: https://github.com/jsdom/jsdom/issues/3002
// TypeError: range(...).getClientRects is not a function
// (required for codemirror)
global.Range.prototype.getBoundingClientRect = vi.fn();
global.Range.prototype.getClientRects = () => ({
  item: vi.fn(),
  length: 0,
  [Symbol.iterator]: vi.fn(),
});
