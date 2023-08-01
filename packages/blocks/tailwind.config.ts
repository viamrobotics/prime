import type { Config } from 'tailwindcss';
import { theme } from '../core/theme';

export default {
  content: ['./src/**/*.{ts,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
