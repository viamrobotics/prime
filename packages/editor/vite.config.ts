import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['prime.css'],
    },
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
  test: {
    include: ['src/**/__tests__/*.spec.ts'],
    setupFiles: ['src/vitest.setup.ts'],
    environment: 'jsdom',
    mockReset: true,
    unstubGlobals: true,
  },
}));
