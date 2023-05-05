import path from 'node:path';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import vue from '@vitejs/plugin-vue';
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
    // TODO(mc, 2023-05-05): remove vue as a dev dependency from prime
    vue({
      reactivityTransform: true,
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
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
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },
  server: {
    open: '/playground/',
    base: '/playground/',
    port: 5174,
  },
});
