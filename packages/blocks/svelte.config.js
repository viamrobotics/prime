import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    /*
     * Merge our own includes with the generated includes from SvelteKit
     * so that our JS config can be properly type-checked / linted
     */
    typescript: {
      config: (tsconfig) => ({
        ...tsconfig,
        include: [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ...tsconfig.include,
          '../.eslintrc.cjs',
          '../.prettierrc.cjs',
          '../postcss.config.js',
          '../svelte.config.js',
          '../tailwind.config.ts',
          '../theme.ts',
        ],
      }),
    },
  },
};

export default config;
