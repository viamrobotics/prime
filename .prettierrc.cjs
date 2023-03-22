module.exports = {
  plugins: ['prettier-plugin-svelte'],
  singleQuote: true,
  // TODO(mc, 2023-03-22): eslint-plugin-svelte does not respect single-quote for HTML
  // https://github.com/sveltejs/prettier-plugin-svelte/issues/253
  jsxSingleQuote: true,
  svelteIndentScriptAndStyle: false,
};
