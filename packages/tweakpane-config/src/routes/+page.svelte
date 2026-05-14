<script lang="ts">
	import {
		Button,
		Checkbox,
		Color,
		List,
		Monitor,
		Pane,
		Point,
		RotationEuler,
		Slider,
		TabGroup,
		TabPage,
		type ListOptions,
		type PointValue3d,
		type RotationEulerValue
	} from 'svelte-tweakpane-ui';

	let sliderValue = $state(0.5);
	let checkboxValue = $state(true);
	let colorValue = $state('#2e67d3');

	const listOptions: ListOptions<string> = {
		Power_wire: 'power-wire',
		Solar_power: 'solar-power',
		Hologram: 'hologram',
		Cyberpunk: 'cyberpunk'
	};
	let listValue = $state('cyberpunk');

	let point: PointValue3d = $state({ x: 0, y: 0, z: 0 });
	let rotation: RotationEulerValue = $state({ x: 0, y: 0, z: 0 });

	let clickCount = $state(0);

	// Independent state for the dedicated Pane / TabGroup examples
	let paneSliderValue = $state(0.25);
	let tabPickedColor = $state('#a51aff');
	let tabSelectedIndex = $state(0);
</script>

<main class="mx-auto flex max-w-3xl flex-col gap-8 p-8">
	<header>
		<h1 class="text-heading text-3xl font-medium">@viamrobotics/tweakpane-config</h1>
		<p class="text-subtle-1 mt-2">
			Viam-themed defaults for
			<a class="text-link underline" href="https://kitschpatrol.com/svelte-tweakpane-ui">
				svelte-tweakpane-ui
			</a>. Every component below is rendered through <code>primeTheme</code>.
		</p>
	</header>

	<section class="grid gap-6 sm:grid-cols-2">
		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Slider</h2>
			<Slider bind:value={sliderValue} min={0} max={1} step={0.01} label="Slider" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">List</h2>
			<List bind:value={listValue} options={listOptions} label="List" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Checkbox</h2>
			<Checkbox bind:value={checkboxValue} label="Checkbox" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Color</h2>
			<Color bind:value={colorValue} label="Color" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Point (3D)</h2>
			<Point bind:value={point} label="Point" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">RotationEuler</h2>
			<RotationEuler bind:value={rotation} label="Rotation" />
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Button</h2>
			<Button
				title="Clicked {clickCount} times"
				label="Button"
				on:click={() => {
					clickCount += 1;
				}}
			/>
		</div>

		<div>
			<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Monitor</h2>
			<Monitor value={sliderValue} label="Monitor" graph interval={50} min={0} max={1} />
		</div>
	</section>

	<section>
		<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">Pane</h2>
		<Pane position="inline" title="Settings">
			<Slider bind:value={paneSliderValue} min={0} max={1} step={0.01} label="Amount" />
			<Checkbox bind:value={checkboxValue} label="Enabled" />
		</Pane>
	</section>

	<section>
		<h2 class="text-heading mb-2 text-sm font-medium tracking-wide uppercase">TabGroup / TabPage</h2>
		<TabGroup bind:selectedIndex={tabSelectedIndex}>
			<TabPage title="Color">
				<Color bind:value={tabPickedColor} label="Accent" />
			</TabPage>
			<TabPage title="Slider">
				<Slider bind:value={paneSliderValue} min={0} max={1} step={0.01} label="Amount" />
			</TabPage>
			<TabPage title="Toggle">
				<Checkbox bind:value={checkboxValue} label="Enabled" />
			</TabPage>
		</TabGroup>
	</section>
</main>
