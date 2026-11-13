import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

// The TypeScript config comes first: it sets a parser for every file, and the Svelte and
// Astro configs after it replace that parser for their own file types.
export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['public/**'] },
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	astro.configs.recommended,
	astro.configs['jsx-a11y-recommended'],
	prettier,
	svelte.configs.prettier,
	{
		plugins: { perfectionist },
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { tsconfigRootDir: import.meta.dirname }
		},
		rules: {
			// TypeScript resolves globals itself, so typescript-eslint recommends turning this off.
			'no-undef': 'off',
			'perfectionist/sort-imports': ['error', { type: 'natural' }],
			// A `\n` inside an attribute string stays a literal backslash, so an escaped string needs its mustache.
			'svelte/no-useless-mustaches': ['error', { ignoreStringEscape: true }],
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/valid-compile': 'error'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	}
);
