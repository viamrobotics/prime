<script lang="ts">
	import { Icon, IconPathsByName, type IconName, type IconSize } from '@viamrobotics/prime-ui';

	import type { Control } from './playground-controls.ts';

	import Playground from './Playground.svelte';

	const iconNames = Object.keys(IconPathsByName);
	const iconSizes: readonly IconSize[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];

	const controls: readonly Control[] = [
		{ name: 'name', type: 'select', options: iconNames, default: 'check-circle' },
		{ name: 'size', type: 'select', options: iconSizes, default: 'base' }
	];
</script>

<Playground componentName="Icon" {controls}>
	{#snippet preview(values)}
		<Icon name={values.name as IconName} size={values.size as IconSize} />
	{/snippet}
</Playground>
