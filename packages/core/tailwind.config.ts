import type { Config } from 'tailwindcss';
import { theme } from './src/theme.js';

export default {
  content: ['./src/**/*.{ts,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
