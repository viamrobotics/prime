'use strict';

const baseConfig = require('@viamrobotics/prettier-config');

module.exports = {
  ...baseConfig,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  svelteIndentScriptAndStyle: false,
};
