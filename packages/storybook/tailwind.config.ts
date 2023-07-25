import type { Config } from 'tailwindcss';
import { theme } from '@viamrobotics/prime-core/theme';

export { theme } from '@viamrobotics/prime-core/theme';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,vue,svelte,component}',
    './node_modules/@viamrobotics/prime-core/**/*.{ts,svelte}',
  ],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
