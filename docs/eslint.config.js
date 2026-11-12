import { includeIgnoreFile } from '@eslint/compat';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import path from 'node:path';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

// Lints the `.astro` components only. The Svelte islands get their accessibility checks
// from the Svelte compiler, through `check`.
export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['public/**'] },
	astro.configs.recommended,
	astro.configs['jsx-a11y-recommended']
);
