<script lang="ts">
	import { Input } from '../../Input/input.ts';
	import { NumberInput } from '../../Input/number-input.ts';
</script>

<Input.Group>
	<NumberInput aria-label="Length" value={3} />
	<span>mm</span>
	<NumberInput.Stepper />
</Input.Group>
