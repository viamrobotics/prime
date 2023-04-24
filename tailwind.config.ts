import type { Config } from 'tailwindcss';
import { theme } from './theme';

export { theme } from './theme';

export default {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
