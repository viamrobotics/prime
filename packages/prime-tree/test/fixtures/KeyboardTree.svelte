<script lang="ts">
	import '../../src/routes/layout.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors } from '../nodes.ts';
	import type { SampleNode } from '../nodes.ts';

	interface Props {
		selectionMode?: 'single' | 'multiple';
	}

	const { selectionMode = 'single' }: Props = $props();

	const nodes: SampleNode[] = [
		{
			id: 'docs',
			label: 'Docs',
			children: [
				{ id: 'readme', label: 'Readme' },
				{
					id: 'guides',
					label: 'Guides',
					children: [
						{ id: 'intro', label: 'Intro' },
						{ id: 'advanced', label: 'Advanced' }
					]
				}
			]
		},
		{
			id: 'apps',
			label: 'Apps',
			children: [
				{ id: 'alpha', label: 'Alpha' },
				{ id: 'beta', label: 'Beta' }
			]
		},
		{ id: 'zoo', label: 'Zoo', children: [{ id: 'zebra', label: 'Zebra' }] },
		{ id: 'notes', label: 'Notes' }
	];

	let expanded = $state<string[]>([]);
	let selected = $state<string[]>([]);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}
</script>

<Tree
	aria-label="Keyboard"
	{nodes}
	{selectionMode}
	bind:expanded
	bind:selected
	{...sampleAccessors}
>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.label}>
				<Tree.BranchControl>
					<Tree.BranchTrigger>
						<Tree.Indicator>&gt;</Tree.Indicator>
					</Tree.BranchTrigger>
					{item.label}
				</Tree.BranchControl>
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.label}>
				{item.label}
			</Tree.Item>
		{/if}
	{/snippet}
</Tree>
