<script lang="ts">
	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';

	let value = $state<string>();
</script>

<RadioGroupRoot bind:value name="contact" aria-label="Contact">
	<RadioGroupItem value="email" description="We send a code." class="wrapper-class">
		{#snippet details()}
			<input aria-label="Email address" />
		{/snippet}
		Email
	</RadioGroupItem>
	<RadioGroupItem value="sms" description="Standard rates apply.">Text message</RadioGroupItem>
	<RadioGroupItem value="none" class="plain-class">None</RadioGroupItem>
</RadioGroupRoot>
