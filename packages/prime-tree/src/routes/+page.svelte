<script lang="ts">
	import './layout.css';

	import { Tree } from '../lib/index.ts';
	import type { TreeBranchClick } from '../lib/index.ts';

	interface FileNode {
		id: string;
		name: string;
		kind: 'folder' | 'file';
		children?: FileNode[];
		disabled?: boolean;
	}

	let nodes = $state<FileNode[]>([
		{
			id: 'src',
			name: 'src',
			kind: 'folder',
			children: [
				{
					id: 'src/lib',
					name: 'lib',
					kind: 'folder',
					children: [
						{ id: 'src/lib/index.ts', name: 'index.ts', kind: 'file' },
						{ id: 'src/lib/tree.ts', name: 'tree.ts', kind: 'file' }
					]
				},
				{ id: 'src/main.ts', name: 'main.ts', kind: 'file' },
				{ id: 'src/legacy.ts', name: 'legacy.ts', kind: 'file', disabled: true }
			]
		},
		{
			id: 'docs',
			name: 'docs',
			kind: 'folder',
			children: [
				{ id: 'docs/intro.md', name: 'intro.md', kind: 'file' },
				{ id: 'docs/guide.md', name: 'guide.md', kind: 'file' }
			]
		},
		{ id: 'assets', name: 'assets', kind: 'folder', children: [] },
		{ id: 'package.json', name: 'package.json', kind: 'file' },
		{ id: 'README.md', name: 'README.md', kind: 'file' }
	]);

	let expanded = $state<string[]>(['src']);
	let selected = $state<string[]>([]);
	let selectionMode = $state<'single' | 'multiple'>('single');
	let branchClick = $state<TreeBranchClick>('toggle-and-select');
	let addedFileCount = 0;

	const addFileToSrc = () => {
		addedFileCount += 1;
		nodes[0]?.children?.push({
			id: `src/new-${addedFileCount}.ts`,
			name: `new-${addedFileCount}.ts`,
			kind: 'file'
		});
	};

	const ROW_CLASS = 'rounded-sm py-1 text-sm focus-ring hover:bg-light data-[selected]:bg-medium';

	const collapseAll = () => {
		expanded = [];
	};
</script>

<main class="mx-auto flex max-w-xl flex-col gap-4 bg-light p-6 text-default">
	<h1 class="text-lg font-medium text-heading">prime-tree</h1>

	<div class="flex flex-wrap items-center gap-4">
		<label class="flex items-center gap-2 text-sm">
			Selection mode
			<select class="input" bind:value={selectionMode}>
				<option value="single">single</option>
				<option value="multiple">multiple</option>
			</select>
		</label>
		<label class="flex items-center gap-2 text-sm">
			Branch click
			<select class="input" bind:value={branchClick}>
				<option value="toggle-and-select">toggle and select</option>
				<option value="toggle">toggle</option>
				<option value="select">select</option>
			</select>
		</label>
		<button type="button" class="button" onclick={addFileToSrc}> Add file to src </button>
		<button type="button" class="button" onclick={collapseAll}> Collapse all </button>
	</div>

	<Tree
		aria-label="Project files"
		class="rounded-sm border border-medium p-1"
		{nodes}
		bind:expanded
		bind:selected
		{selectionMode}
		{branchClick}
		nodeToValue={(file) => file.id}
		nodeToString={(file) => file.name}
		nodeToChildren={(file) => file.children}
		nodeToChildrenCount={(file) =>
			file.kind === 'folder' ? (file.children?.length ?? 0) : undefined}
		isNodeDisabled={(file) => file.disabled === true}
	>
		{#snippet node(file, state)}
			{#if state.isBranch}
				<Tree.Branch>
					<Tree.BranchControl
						class={[ROW_CLASS, 'flex items-center gap-1']}
						style="padding-inline-start: calc(var(--depth) * 1rem)"
					>
						<Tree.BranchTrigger
							class="flex items-center"
							aria-label={state.expanded ? 'Collapse' : 'Expand'}
						>
							<Tree.Indicator class="inline-block [&[data-state=open]]:rotate-90"
								>&gt;</Tree.Indicator
							>
						</Tree.BranchTrigger>
						{file.name}
					</Tree.BranchControl>
					<Tree.BranchContent />
				</Tree.Branch>
			{:else}
				<Tree.Item
					class={[ROW_CLASS, file.disabled && 'text-disabled']}
					style="padding-inline-start: calc(var(--depth) * 1rem)"
				>
					{file.name}
				</Tree.Item>
			{/if}
		{/snippet}
	</Tree>

	<p class="text-sm text-subtle-2">Expanded: {expanded.join(', ') || 'none'}</p>
	<p class="text-sm text-subtle-2">Selected: {selected.join(', ') || 'none'}</p>
	<p class="text-sm text-subtle-2">
		<kbd class="kbd">Up</kbd> <kbd class="kbd">Down</kbd> move, <kbd class="kbd">Right</kbd>
		expands,
		<kbd class="kbd">Left</kbd> collapses, <kbd class="kbd">Enter</kbd> selects.
	</p>
</main>
