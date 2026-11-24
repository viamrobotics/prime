<script lang="ts">
	import { untrack } from 'svelte';

	import Checkbox from '../../Checkbox.svelte';

	interface Props {
		indeterminate?: boolean;
	}

	const props: Props = $props();

	let checked = $state(false);
	let indeterminate = $state(untrack(() => props.indeterminate ?? false));
</script>

<Checkbox bind:checked bind:indeterminate aria-label="Accept" />
<span data-testid="owner">{checked}</span>
<span data-testid="owner-indeterminate">{indeterminate}</span>
