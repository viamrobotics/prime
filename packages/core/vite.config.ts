import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['prime.css'],
    },
  },
  test: {
    include: ['src/**/__tests__/*.spec.ts'],
    setupFiles: ['src/vitest.setup.ts'],
    environment: 'jsdom',
    mockReset: true,
    // For testing svelte internals like onMount, see: https://github.com/vitest-dev/vitest/issues/2834
    alias: [{ find: /^svelte$/u, replacement: 'svelte/internal' }],
  },
});
