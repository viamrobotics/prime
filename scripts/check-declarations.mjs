#!/usr/bin/env node
/**
 * Fails when a packaged Svelte component has no type declaration, or has one that types it as
 * `any`. `svelte-package` prints a failed declaration emit and still exits 0, so without this
 * check a component can publish untyped.
 *
 * Usage: `node scripts/check-declarations.mjs <dist-dir>`
 *
 * Exit codes: 0 when every component is typed, 1 when one is not or the directory is missing.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const TEST_DIRECTORY = '__tests__';
const COMPONENT_SUFFIX = '.svelte';
const DECLARATION_SUFFIX = '.d.ts';
const ANY_TYPED_COMPONENT = /declare const \w+: any;/;

/** Every packaged component under `directory`, skipping test fixtures. */
function componentsIn(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			return entry.name === TEST_DIRECTORY ? [] : componentsIn(path);
		}
		return entry.name.endsWith(COMPONENT_SUFFIX) ? [path] : [];
	});
}

/** Why `component` would publish untyped, or `undefined` when its declaration is sound. */
function problemWith(component) {
	const declaration = `${component}${DECLARATION_SUFFIX}`;
	if (!existsSync(declaration)) {
		return 'has no type declaration';
	}
	if (ANY_TYPED_COMPONENT.test(readFileSync(declaration, 'utf8'))) {
		return 'is typed as any';
	}
	return undefined;
}

const [distDirectory] = process.argv.slice(2);

if (!distDirectory || !existsSync(distDirectory)) {
	console.error(`check-declarations: no such directory: ${distDirectory ?? '(none given)'}`);
	process.exit(1);
}

const components = componentsIn(distDirectory);
const problems = components.flatMap((component) => {
	const problem = problemWith(component);
	return problem ? [`${component} ${problem}`] : [];
});

if (problems.length > 0) {
	console.error(
		`check-declarations: ${problems.length} of ${components.length} components would publish untyped:`
	);
	for (const problem of problems) {
		console.error(`  ${problem}`);
	}
	process.exit(1);
}

console.log(`check-declarations: ${components.length} components, all typed`);
