<script lang="ts">
	import Field from '../../../Field/Field.svelte';
	import Switch from '../../Switch.svelte';

	let checked = $state(false);
</script>

<Field label="Switch">
	<Switch bind:checked />
</Field>
<span data-testid="owner">{checked}</span>
