import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';

// Mock URL.createObjectURL for MapLibre GL
Object.defineProperty(globalThis, 'URL', {
  value: {
    createObjectURL: () => 'mock-blob-url',
  },
  writable: true,
});
