import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1000,
  },
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
    rollupOptions: {
      input: {
        appSchoool: fileURLToPath(new URL('./index.html', import.meta.url)),
        appStudent: fileURLToPath(new URL('./test.html', import.meta.url)),
      },
    },
  }
})
