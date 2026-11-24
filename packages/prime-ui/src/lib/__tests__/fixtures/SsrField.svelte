<script lang="ts">
	import { Field } from '../../Field/field.ts';
	import Label from '../../Label/Label.svelte';
</script>

<Field label="Email" state="error">
	<Label />
	<Field.StateIcon />
</Field>
