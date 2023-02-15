const plugin = require('tailwindcss/plugin')
const { theme } = require('../tailwind.config.cjs')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue}', '../src/**/*.{ts,svelte}'],
  theme,
  variants: {
    extend: {},
  },
}
