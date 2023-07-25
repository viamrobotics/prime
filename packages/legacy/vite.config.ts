import path from 'node:path';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  assetsInclude: ['fonts'],
  plugins: [
    svelte({
      extensions: ['.svelte'],
      compilerOptions: { customElement: true },
    }),
    // TODO(mp, 2023-06-12): svelte 3 web components are all or nothing, remove when migrating to svelte 4
    svelte({
      extensions: ['.component'],
      compilerOptions: { customElement: false },
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
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: ({ name }) => {
          return name === 'style.css' ? 'prime.css' : name!;
        },
      },
    },
  },
  server: {
    open: '/playground/',
    base: '/playground/',
    port: 5174,
    host: true,
  },
});
