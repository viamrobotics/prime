const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        'text-heading': '#131414',
        'text-default': '#282829',
        'text-subtle-1': '#4e4f52',
        'text-subtle-2': '#7a7c80',
        'text-disabled': '#9c9ca4',
        'text-link': '#0066cc',
        black: '#131414',
        'gray-9': '#282829',
        'gray-8': '#4e4f52',
        'gray-7': '#7a7c80',
        'gray-6': '#9c9ca4',
        'gray-5': '#c5c6cc',
        'gray-4': '#d7d7d9',
        'gray-3': '#e4e4e6',
        'gray-2': '#edeef0',
        'gray-1': '#f7f7f8',
        'danger-fg': '#be3536',
        'danger-bg': '#fcecea',
        'warning-fg': '#935d00',
        'warning-bg': '#fef8ca',
        'success-fg': '#3d7d3f',
        'success-bg': '#e0fae3',
        'info-fg': '#0066cc',
        'info-bg': '#e1f3ff',
        'disabled-fg': '#9c9ca4',
        'disabled-bg': '#f2f2f4',
        'bg-1': '#ffffff',
        'bg-2': '#f7f7f8',
        'bg-3': '#f1f1f4',
        'border-1': '#e4e4e6',
        'border-2': '#d7d7d9',
        'text-highlight': '#e2f1fd',
      },
      boxShadow: {
        solid4: '4px 4px 0px #000',
      },
    },
  },
  variants: {
    extend: {},
  },
};
