const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        'black/20': '#E9E9E9',
        'black/50': '#9D9D9D',
        'black/70': '#555555',
        'blue/90': '#045681',
        'gray/200': '#e5e7eb',
        'gray/800': '#1f2937',
        'green/80': '#49A25C',
        'green/90': '#397F48',
        'green/100': '#295B33',
        'green/200': '#bbf7d0',
        'green/900': '#14532d',
        'orange/90': '#FF9900',
        'orange/200': '#fed7aa',
        'orange/900': '#7c2d12',
        'red/90': '#BE3026',
        'red/200': '#fecaca',
        'red/900': '#7f1d1d',
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
