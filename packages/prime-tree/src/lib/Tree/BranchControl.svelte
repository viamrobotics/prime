<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { deferFocus } from './defer-focus.ts';
	import { disableActivation } from './disabled-node.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLDivElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const toggle = () => {
		const { value, expanded, disabled } = current.state;
		if (disabled) return;
		if (expanded) tree.api.collapse([value]);
		else tree.api.expand([value]);
	};

	const toggleOnActivation = (event: KeyboardEvent) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		event.stopPropagation();
		toggle();
	};

	const attrs = $derived.by(() => {
		const zagProps = {
			...disableActivation(
				deferFocus(
					tree.api.getBranchControlProps({ node: current.node, indexPath: current.indexPath })
				),
				current.state.disabled
			),
			// Focus rests on this button, not on the treeitem that zag gives aria-expanded to.
			'aria-expanded': current.state.expanded
		};

		if (tree.branchClick !== 'toggle') return mergeProps(zagProps, rest);

		// zag's click selects the branch, so in toggle mode the row takes its own click and keys.
		return mergeProps(
			{ ...zagProps, onclick: undefined },
			{ onclick: toggle, onkeydown: toggleOnActivation },
			rest
		);
	});
</script>

<div {...attrs}>
	{@render children?.()}
</div>
