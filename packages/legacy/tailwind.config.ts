import type { Config } from 'tailwindcss';
import { theme } from '@viamrobotics/prime-core/theme';

export { theme } from '@viamrobotics/prime-core/theme';

export default {
  content: ['./index.html', './src/**/*.{ts,vue,svelte,component}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
