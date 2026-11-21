<script lang="ts">
	import type { FieldState } from '../state.ts';

	import { Field } from '../field.ts';

	const { state: fieldState, iconClass }: { state?: FieldState; iconClass?: string } = $props();
</script>

<Field state={fieldState}>
	<Field.StateIcon class={iconClass} />
</Field>
