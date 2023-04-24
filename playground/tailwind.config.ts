import type { Config } from 'tailwindcss';
import { theme } from '../theme';

export default {
  content: ['./index.html', './src/**/*.{ts,vue}', '../src/**/*.{ts,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
