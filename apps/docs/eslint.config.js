import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	perfectionist.configs['recommended-natural'],
	svelte.configs.recommended,
	astro.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommends disabling no-undef on TS projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		// Use perfectionist for import sorting only; disable everything else it ships with.
		name: 'viam/perfectionist',
		rules: {
			'perfectionist/sort-array-includes': 'off',
			'perfectionist/sort-classes': 'off',
			'perfectionist/sort-decorators': 'off',
			'perfectionist/sort-enums': 'off',
			'perfectionist/sort-export-attributes': 'off',
			'perfectionist/sort-exports': 'off',
			'perfectionist/sort-heritage-clauses': 'off',
			'perfectionist/sort-interfaces': 'off',
			'perfectionist/sort-intersection-types': 'off',
			'perfectionist/sort-jsx-props': 'off',
			'perfectionist/sort-maps': 'off',
			'perfectionist/sort-modules': 'off',
			'perfectionist/sort-named-exports': 'off',
			'perfectionist/sort-named-imports': 'off',
			'perfectionist/sort-object-types': 'off',
			'perfectionist/sort-objects': 'off',
			'perfectionist/sort-sets': 'off',
			'perfectionist/sort-switch-case': 'off',
			'perfectionist/sort-union-types': 'off',
			'perfectionist/sort-variable-declarations': 'off',

			'perfectionist/sort-imports': [
				'error',
				{
					internalPattern: [String.raw`^\$`]
				}
			]
		}
	}
);
