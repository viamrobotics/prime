import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	// Pre-bundled so a cold cache does not re-optimize mid-run and load a second Svelte runtime.
	optimizeDeps: {
		include: [
			'@codemirror/autocomplete',
			'@codemirror/commands',
			'@codemirror/lang-go',
			'@codemirror/lang-javascript',
			'@codemirror/lang-json',
			'@codemirror/lang-python',
			'@codemirror/lang-sql',
			'@codemirror/language',
			'@codemirror/merge',
			'@codemirror/state',
			'@codemirror/view',
			'@lezer/highlight'
		]
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
						viewport: { width: 1000, height: 1400 }
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
