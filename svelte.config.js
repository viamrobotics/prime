import preprocess from 'svelte-preprocess';

export default {
  // https://github.com/sveltejs/svelte-preprocess
  preprocess: preprocess({ sourceMap: true }),
  compilerOptions: { customElement: true },
};
