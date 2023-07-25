'use strict';

const baseConfig = require('@viamrobotics/prettier-config');

module.exports = {
  ...baseConfig,
  // TODO(mc, 2023-03-22): eslint-plugin-svelte does not respect single-quote for HTML
  // https://github.com/sveltejs/prettier-plugin-svelte/issues/253
  plugins: ['prettier-plugin-svelte'],
  svelteIndentScriptAndStyle: false,
};
