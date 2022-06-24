const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        'green/80': '#49A25C',
        'green/100': '#295B33',
        'red/90': '#BE3026',
      }
    },
  },
  variants: {
    extend: {},
  },
}
