<script lang="ts">
	import Field from '../../Field/Field.svelte';
	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';
</script>

<Field state="error">
	<RadioGroupRoot name="size">
		<RadioGroupItem value="sm">Small</RadioGroupItem>
		<RadioGroupItem value="md">Medium</RadioGroupItem>
	</RadioGroupRoot>
</Field>
