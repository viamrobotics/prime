import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const PACKAGE_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const PACKAGE_BUILD_TIMEOUT_MS = 60_000;
const ROOT_DECLARATION = 'Chart/Chart.svelte.d.ts';

const declarationPaths = (directory: string): string[] =>
	readdirSync(directory, { withFileTypes: true, recursive: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith('.d.ts'))
		.map((entry) => join(entry.parentPath, entry.name));

function packageDeclarations(output: string): Map<string, string> {
	execFileSync(
		join(PACKAGE_ROOT, 'node_modules/.bin/svelte-package'),
		['--input', 'src/lib', '--output', output, '--tsconfig', 'tsconfig.package.json'],
		{ cwd: PACKAGE_ROOT, stdio: 'pipe' }
	);
	const declarations = new Map(
		declarationPaths(output).map((path) => [
			path.slice(output.length + 1),
			readFileSync(path, 'utf8')
		])
	);
	if (!declarations.has(ROOT_DECLARATION)) {
		throw new Error(`svelte-package emitted no ${ROOT_DECLARATION}`);
	}
	return declarations;
}

describe('published declarations', () => {
	let output: string;
	let declarations: Map<string, string>;

	beforeAll(() => {
		output = mkdtempSync(join(tmpdir(), 'prime-charts-declarations-'));
		declarations = packageDeclarations(output);
	}, PACKAGE_BUILD_TIMEOUT_MS);

	afterAll(() => {
		rmSync(output, { recursive: true, force: true });
	});

	const matching = (pattern: RegExp): string[] =>
		[...declarations].flatMap(([path, source]) => (pattern.test(source) ? [path] : []));

	it('name no LayerCake type', () => {
		expect(matching(/layercake/i)).toEqual([]);
	});

	it('import no untyped d3 module', () => {
		expect(matching(/from ['"]d3-|import\(['"]d3-/)).toEqual([]);
	});
});
