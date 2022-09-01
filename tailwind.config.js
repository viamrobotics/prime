const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue,svelte,mdx}'],
  theme: {
    extend: {
      colors: {
        'black/20': '#E9E9E9',
        'black/50': '#9D9D9D',
        'black/70': '#555555',
        'blue/90': '#045681',
        'green/80': '#49A25C',
        'green/90': '#397F48',
        'green/100': '#295B33',
        'orange/90': '#FF9900',
        'red/90': '#BE3026',
      },
      boxShadow: {
        'solid4': '4px 4px 0px #000',
      }
    },
  },
  variants: {
    extend: {},
  },
}
