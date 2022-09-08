import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
    svelte({
      compilerOptions: { customElement: true },
      preprocess: sveltePreprocess(),
    }),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
  }
})
