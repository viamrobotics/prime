# @viamrobotics/prime-tree

Headless tree view for Svelte 5. The package owns behavior and accessibility, including keyboard navigation, roving focus, selection, and expansion. You own the markup of every row through a `node` snippet.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-tree @viamrobotics/tailwind-config @zag-js/tree-view @zag-js/svelte
```

Requires `svelte` `^5.29.0`. Import the stylesheet once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-tree/styles.css';
```

## Usage

```svelte
<script lang="ts">
	import { Tree } from '@viamrobotics/prime-tree';

	interface FileNode {
		path: string;
		name: string;
		children?: FileNode[];
	}

	const files: FileNode[] = [
		{
			path: 'src',
			name: 'src',
			children: [
				{ path: 'src/index.ts', name: 'index.ts' },
				{ path: 'src/app.svelte', name: 'app.svelte' }
			]
		},
		{ path: 'package.json', name: 'package.json' }
	];

	let expanded = $state<string[]>(['src']);
	let selected = $state<string[]>([]);
</script>

<Tree
	nodes={files}
	nodeToValue={(file) => file.path}
	nodeToString={(file) => file.name}
	nodeToChildren={(file) => file.children}
	bind:expanded
	bind:selected
	aria-label="Files"
>
	{#snippet node(file, state)}
		{#if state.isBranch}
			<Tree.Branch>
				<Tree.BranchControl style="padding-inline-start: calc(var(--depth) * 1rem)">
					<Tree.BranchTrigger aria-label={state.expanded ? 'Collapse' : 'Expand'}>
						<Tree.Indicator>{state.expanded ? '▾' : '▸'}</Tree.Indicator>
					</Tree.BranchTrigger>
					{file.name}
				</Tree.BranchControl>
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item style="padding-inline-start: calc(var(--depth) * 1rem)">
				{file.name}
			</Tree.Item>
		{/if}
	{/snippet}
</Tree>
```

## Keyboard

| Key                     | Action                                                  |
| ----------------------- | ------------------------------------------------------- |
| Arrow Down / Arrow Up   | Move focus to the next or previous visible row          |
| Arrow Right             | Expand a collapsed branch, or move into an expanded one |
| Arrow Left              | Collapse an expanded branch, or move to the parent      |
| Home / End              | Move focus to the first or last visible row             |
| Enter or Space          | Select the focused row                                  |
| Shift + Arrow Up / Down | Extend a multiple selection                             |
| `*`                     | Expand every sibling of the focused row                 |
| Printable characters    | Type-ahead by `nodeToString`                            |

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-tree/) for the snippet contract, parts, state, bindings, and accessibility.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
