import type { Config } from 'tailwindcss';
import { theme } from './dist/theme.js';

export { theme } from './dist/theme.js';

export default {
  content: ['./index.html', './src/**/*.{ts,vue,svelte,component}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
