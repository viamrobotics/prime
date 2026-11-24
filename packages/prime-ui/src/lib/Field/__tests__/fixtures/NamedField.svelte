<script lang="ts">
	import type { AccessibleName } from '../../../accessible-name.ts';

	import Input from '../../../Input/Input.svelte';
	import Label from '../../../Label/Label.svelte';
	import Field from '../../Field.svelte';

	interface Props {
		name: AccessibleName;
		placeLabel?: boolean;
		inputLabel?: string;
	}

	const { name, placeLabel = false, inputLabel }: Props = $props();
</script>

<h2 id="heading">Contact</h2>
<Field {...name} data-testid="field">
	{#if placeLabel}
		<Label />
	{/if}
	<Input aria-label={inputLabel} />
</Field>
