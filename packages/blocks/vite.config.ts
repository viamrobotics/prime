import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['prime-blocks.css'],
    },
  },
  test: {
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/vitest.setup.ts'],
    environment: 'jsdom',
    mockReset: true,
  },
});
