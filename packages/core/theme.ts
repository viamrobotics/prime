import type { OptionalConfig } from 'tailwindcss/types/config';

export const theme = {
  extend: {
    fontFamily: {
      'space-grotesk':
        "'Space Grotesk Variable', 'Space Grotesk', system-ui, sans-serif",
      'roboto-mono':
        "'Roboto Mono Variable', 'Roboto Mono', ui-monospace, monospace",
      'public-sans': "'Public Sans Variable', 'Public Sans', sans-serif",
    },

    boxShadow: {
      sm: '0 4px 32px rgba(0, 0, 0, 0.06)',
    },
    textColor: {
      heading: '#131414',
      default: '#282829',
      'subtle-1': '#4e4f52',
      'subtle-2': '#7a7c80',
      disabled: '#9c9ca4',
      link: '#0066cc',

      // Code colors
      'code-boolean': '#201293',
      'code-line-number': '#4b758d',
      'code-null': '#708',
      'code-number': '#2f6447',
      'code-property-keys': '#000',
      'code-string': '#9c251d',
    },
    borderColor: {
      light: '#e4e4e6',
      medium: '#d7d7d9',
    },
    backgroundColor: {
      extralight: '#fbfbfc',
      light: '#f7f7f8',
      medium: '#f1f1f4',
    },
    colors: {
      black: '#131414',
      white: '#fff',
      'gray-9': '#282829',
      'gray-8': '#4e4f52',
      'gray-7': '#7a7c80',
      'gray-6': '#9c9ca4',
      'gray-5': '#c5c6cc',
      'gray-4': '#d7d7d9',
      'gray-3': '#e4e4e6',
      'gray-2': '#edeef0',
      'gray-1': '#f7f7f8',
      'danger-dark': '#be3536',
      'danger-light': '#fcecea',
      'danger-medium': '#edc0bf',
      'warning-dark': '#a6570f',
      'warning-light': '#fef3e0',
      'warning-medium': '#e9c89d',
      'warning-bright': '#ddab3f',
      'success-dark': '#3d7d3f',
      'success-light': '#e0fae3',
      'success-medium': '#b9dcbc',
      'info-dark': '#2e67d3',
      'info-light': '#e1f3ff',
      'info-medium': '#b6d1f4',
      'disabled-dark': '#9c9ca4',
      'disabled-light': '#f2f2f4',

      // Opaque grayscale
      'ghost-light': 'rgba(0,0,0,0.04)',
      'ghost-medium': 'rgba(0,0,0,0.08)',

      // Brand design colors
      'power-wire': '#ff0047',
      pcb: '#00501f',
      'power-button': '#00ef83',
      'solar-power': '#ffd400',
      'mars-rover': '#ff7D80',
      raspberry: '#9f0049',
      hologram: '#00e8e8',
      yoshimi: '#ff79ff',
      cyberpunk: '#a51aff',
      hyperlink: '#0000ea',
    },
    spacing: {
      '7.5': '1.875rem',
    },
    transitionProperty: {
      'expand-vertical': 'max-height,visibility',
    },
    zIndex: {
      max: '1000',
    },

    keyframes: {
      wiggle: {
        '25%': { transform: 'translateX(2px)' },
        '75%': { transform: 'translateX(-2px)' },
      },
      blink: {
        '29%': { opacity: '1' },
        '60%,72%': { opacity: '.3' },
        '100': { opacity: '1' },
      },
    },

    animation: {
      wiggle: 'wiggle 0.25s',
      blink: 'blink 1.7s ease-in-out infinite',
    },
  },
} satisfies OptionalConfig['theme'];
