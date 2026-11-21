import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	ts.config({
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				projectService: {
					allowDefaultProject: ['eslint.config.js', 'svelte.config.js'],
					defaultProject: './tsconfig.json'
				}
			}
		}
	}),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		plugins: { perfectionist },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			'perfectionist/sort-imports': ['error', { type: 'natural' }],
			// A wrapper's props are an empty interface over the wrapped component's props, so the published
			// declaration has a name to print. An alias fails that emit. See scripts/check-declarations.mjs.
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{ allowInterfaces: 'with-single-extends' }
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['eslint.config.js', 'svelte.config.js'],
					defaultProject: './tsconfig.json'
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		rules: {
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/valid-compile': 'error'
		}
	}
);
