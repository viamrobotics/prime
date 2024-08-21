import { plugins } from '@viamrobotics/prime-core/plugins';
import { theme } from '@viamrobotics/prime-core/theme';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@viamrobotics/prime-core/**/*.{ts,svelte}',
    './node_modules/@viamrobotics/prime-blocks/**/*.{ts,svelte}',
	],
	plugins,
  theme,
}
