#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, '..');
const repoRoot = resolve(docsRoot, '..', '..');

// Add an entry here for each library package whose src/routes/ should be embedded
// as a playground under /playground/<name>/ in the docs site. Each package must
// build a static SvelteKit app to <pkgDir>/build/ when `vite build` is invoked
// with BASE_PATH set.
const playgrounds = [
	{ name: 'prime-ui', filter: '@viamrobotics/prime-ui', pkgDir: 'packages/prime-ui' }
];

const docsBase = (process.env.DOCS_BASE ?? '/prime/').replace(/\/$/, '');

for (const { name, filter, pkgDir } of playgrounds) {
	const basePath = `${docsBase}/playground/${name}`;
	console.log(`[playgrounds] building ${name} with BASE_PATH=${basePath}`);

	execSync(`pnpm --filter ${filter} exec vite build`, {
		cwd: repoRoot,
		env: { ...process.env, BASE_PATH: basePath },
		stdio: 'inherit'
	});

	const src = resolve(repoRoot, pkgDir, 'build');
	const dest = resolve(docsRoot, 'public', 'playground', name);
	if (existsSync(dest)) rmSync(dest, { recursive: true });
	mkdirSync(dirname(dest), { recursive: true });
	cpSync(src, dest, { recursive: true });
	console.log(`[playgrounds] copied ${pkgDir}/build/ -> apps/docs/public/playground/${name}/`);
}
