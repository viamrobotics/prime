<script lang="ts">
	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';
</script>

<Tree aria-label="Sample" nodes={sampleNodes} {...sampleAccessors}>
	{#snippet node(item)}
		<Tree.Item aria-label={item.label}>{item.label}</Tree.Item>
	{/snippet}
	<Tree.Item aria-label="Stray">Stray</Tree.Item>
</Tree>
