<!--
@component
Up and down buttons that mirror the browser's spin buttons for the
[`NumberInput`](./NumberInput.svelte) in the same [`Input.Group`](./InputGroup.svelte). A
`NumberInput` always shows one: standalone it renders its own, and a group that holds one renders
one as its last child, after a suffix or a [`Field.StateIcon`](../Field/StateIcon.svelte). Placing
this part as the group's last child does the same and keeps the group from adding a second. It sits
flush against the frame's right edge at the frame's full height.

A press calls the input's `stepUp()` or `stepDown()`, so it moves one `step` within `min` and
`max`, then fires `input` and `change` like a native spin button. A held press repeats. Like the
native buttons it is for a pointer only: it takes no focus, keeps focus where it is, and is hidden
from assistive technology, since the input is already a spinbutton that steps on ArrowUp and
ArrowDown. It shows while the frame is hovered or holds focus, and always under a coarse pointer.
A disabled or readonly input hides it.

```svelte
<Input.Group>
	<NumberInput aria-label="Length" bind:value />
	<span class="text-subtle-2">mm</span>
	<NumberInput.Stepper />
</Input.Group>
```
-->
<script lang="ts">
	import SpinButtons from './SpinButtons.svelte';
	import { useInputGroup } from './useInputGroup.ts';

	const group = useInputGroup();
	const removeStepper = group?.addStepper();

	$effect(() => removeStepper);
</script>

<SpinButtons />
