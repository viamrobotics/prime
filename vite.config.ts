import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

const preprocess = sveltePreprocess();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  assetsInclude: ['fonts'],
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess,
    }),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    lib: {
      // eslint-disable-next-line unicorn/prefer-module
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Prime',
      fileName: (format) => `prime.${format}.js`,
    },

    rollupOptions: {
      // @ts-expect-error This is incorrectly typed
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },
});
