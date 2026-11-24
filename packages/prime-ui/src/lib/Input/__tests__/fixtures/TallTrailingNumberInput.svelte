<script lang="ts">
	import { Input } from '../../input.ts';
	import { NumberInput } from '../../number-input.ts';
</script>

<Input.Group data-testid="group" class="input-compact">
	<NumberInput aria-label="Length" value={1} />
	<span class="h-8 w-4 shrink-0"></span>
	<NumberInput.Stepper />
</Input.Group>
