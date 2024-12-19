import type { Config } from 'tailwindcss';
import { theme } from './src/lib/theme';
import { plugins } from './plugins';

export default {
  content: ['./src/**/*.{ts,svelte}'],
  plugins,
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
