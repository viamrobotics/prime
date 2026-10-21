<script lang="ts">
	import type { FieldState } from '../state.ts';

	import { Field } from '../field.ts';

	const { state, iconClass }: { state?: FieldState; iconClass?: string } = $props();
</script>

<Field {state}>
	<Field.StateIcon class={iconClass} />
</Field>
