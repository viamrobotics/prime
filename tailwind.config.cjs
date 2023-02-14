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
        'gray/200': '#E5E7EB',
        'gray/800': '#1F2937',
        'green/80': '#49A25C',
        'green/90': '#397F48',
        'green/100': '#295B33',
        'green/200': '#BBF7D0',
        'green/900': '#14532D',
        'orange/90': '#FF9900',
        'orange/200': '#FED7AA',
        'orange/900': '#7C2D12',
        'red/90': '#BE3026',
        'red/200': '#FECACA',
        'red/900': '#7F1D1D',
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
