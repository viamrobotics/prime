'use strict';

/** @type {import('node:path')} */
const path = require('node:path');

/** @type {import('@viamrobotics/prettier-config/svelte')} */
const baseConfig = require('@viamrobotics/prettier-config/svelte');

module.exports = {
  ...baseConfig,
  tailwindConfig: path.join(__dirname, 'tailwind.config.ts'),
};
