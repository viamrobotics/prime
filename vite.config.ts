import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { defineConfig } from 'vite'
import path from 'node:path'

const preprocess = sveltePreprocess()

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['fonts'],
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess
    })
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    lib: {
      entry: path.resolve(__dirname, 'src/elements/index.ts'),
      name: 'Prime',
      fileName: (format) => `prime.${format}.js`
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    },
  }
})
