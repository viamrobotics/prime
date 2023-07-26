import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
