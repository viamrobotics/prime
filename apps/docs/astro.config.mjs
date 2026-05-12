import { fileURLToPath } from 'node:url';

import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import starlightThemeNova from 'starlight-theme-nova';

const base = process.env.DOCS_BASE ?? '/prime/';
const site = process.env.DOCS_SITE ?? 'https://viamrobotics.github.io';

// Resolve workspace component libraries from source rather than from their
// built `dist/`. This lets the docs site build without first running
// `svelte-package` in each library, and means the docs always reflect the
// current source.
const primeUiSrc = fileURLToPath(
	new URL('../../packages/prime-ui/src/lib/index.ts', import.meta.url)
);

export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			plugins: [starlightThemeNova()],
			// starlight-theme-nova defaults expressiveCode to false; re-enable so
			// <Code> from @astrojs/starlight/components works in MDX.
			expressiveCode: true,
			title: 'Viam Prime',
			description: 'Viam component libraries and design system documentation.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/viamrobotics/prime'
				}
			],
			customCss: [
				'@fontsource-variable/public-sans',
				'@fontsource-variable/roboto-mono',
				'@fontsource-variable/space-grotesk',
				'./src/tailwind.css'
			],
			sidebar: [
				{ label: 'Introduction', link: '/' },
				{
					label: 'Packages',
					items: [
						{ label: '@viamrobotics/prime-ui', link: '/packages/prime-ui/' },
						{
							label: '@viamrobotics/tailwind-config',
							link: '/packages/tailwind-config/'
						}
					]
				},
				{
					label: 'Components',
					items: [
						{ label: 'Icon', link: '/components/icon/' },
						{ label: 'Input', link: '/components/input/' },
						{ label: 'Label', link: '/components/label/' }
					]
				}
			]
		}),
		svelte()
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@viamrobotics/prime-ui': primeUiSrc
			}
		}
	}
});
