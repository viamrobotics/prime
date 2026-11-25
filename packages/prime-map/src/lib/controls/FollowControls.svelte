<!--
@component
A checkbox that keeps the enclosing `<MapLibre>` map centered on a point. A wheel or a press on
the map stops following. The checkbox is disabled until both `lng` and `lat` are set.

```svelte
<MapLibre>
	<FollowControls lng={robot.lng} lat={robot.lat} bind:following />
</MapLibre>
```
-->
<script lang="ts">
	import { Checkbox, Field, Label } from '@viamrobotics/prime-ui';

	import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';

	interface Props {
		/** The longitude of the point to follow. */
		lng?: number;
		/** The latitude of the point to follow. */
		lat?: number;
		/** Whether the map follows the point. @default false */
		following?: boolean;
	}

	let { lng, lat, following = $bindable(false) }: Props = $props();

	const context = useMapLibre();

	const stop = () => {
		following = false;
	};

	$effect(() => {
		if (!following) {
			return;
		}

		const map = context.map;
		let frame = 0;
		const step = () => {
			const center = map.getCenter();
			if (lng !== undefined && lat !== undefined && (center.lng !== lng || center.lat !== lat)) {
				map.setCenter([lng, lat]);
			}
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);

		return () => {
			cancelAnimationFrame(frame);
		};
	});

	$effect(() => {
		const map = context.map;
		map.on('wheel', stop);
		map.on('mousedown', stop);

		return () => {
			map.off('wheel', stop);
			map.off('mousedown', stop);
		};
	});
</script>

<Field
	label="Follow"
	class="flex items-center gap-2"
	disabled={lng === undefined || lat === undefined}
>
	<Checkbox bind:checked={following} />
	<Label />
</Field>
