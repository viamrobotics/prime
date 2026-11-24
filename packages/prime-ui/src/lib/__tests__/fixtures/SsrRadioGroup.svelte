<script lang="ts">
	import { RadioGroup } from '../../RadioGroup/radio-group.ts';
</script>

<RadioGroup aria-label="Mode" value="move">
	<RadioGroup.Item value="move" description="Move things">Move</RadioGroup.Item>
	<RadioGroup.Item value="rotate">Rotate</RadioGroup.Item>
</RadioGroup>
