const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        'green/80': '#49A25C',
        'green/100': '#295B33',
        'red/90': '#BE3026',
        'black/20': '#E9E9E9',
        'black/50': '#9D9D9D',
        'black/70': '#555555',
      }
    },
  },
  variants: {
    extend: {},
  },
}
