import type { Config } from 'tailwindcss';
import { theme } from '@viamrobotics/prime-core/theme';

export default {
  content: ['./src/**/*.{ts,svelte}', '../core/dist/**/*.{ts,js,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
