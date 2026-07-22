<script lang="ts">
	// Swatches build `bg-<token>` class names dynamically from these lists. Tailwind
	// can't see dynamic class names, so the swatch backgrounds are safelisted via
	// `@source inline(...)` in layout.css — that forces the utilities (and their
	// `--color-*` variables) to be generated, including brand/illustration tokens no
	// other utility references. The interactive examples below use literal classes.

	const grayscale = [
		'white',
		'gray-1',
		'gray-2',
		'gray-3',
		'gray-4',
		'gray-5',
		'gray-6',
		'gray-7',
		'gray-8',
		'gray-9',
		'black'
	];

	const semantic = [
		{
			group: 'Danger',
			tokens: ['danger-light', 'danger-medium-light', 'danger-medium', 'danger-bright', 'danger-dark']
		},
		{
			group: 'Success',
			tokens: ['success-light', 'success-medium-light', 'success-medium', 'success-bright', 'success-dark']
		},
		{ group: 'Info', tokens: ['info-light', 'info-medium-light', 'info-medium', 'info-bright', 'info-dark'] },
		{
			group: 'Warning',
			tokens: ['warning-light', 'warning-medium-light', 'warning-medium', 'warning-bright', 'warning-dark']
		},
		{ group: 'Pending', tokens: ['pending-light', 'pending-medium-light', 'pending-medium', 'pending-dark'] },
		{ group: 'Disabled', tokens: ['disabled-light', 'disabled-dark'] }
	];

	const brand = [
		'power-wire',
		'pcb',
		'power-button',
		'solar-power',
		'mars-rover',
		'raspberry',
		'hologram',
		'yoshimi',
		'cyberpunk',
		'hyperlink'
	];

	const brandExtensions = [
		'power-button-light',
		'power-button-medium',
		'power-button-dark',
		'cyberpunk-light',
		'cyberpunk-medium',
		'cyberpunk-dark',
		'mars-rover-light',
		'mars-rover-medium',
		'mars-rover-dark'
	];

	const illustration = ['pixel-red', 'pixel-green', 'pixel-teal', 'pixel-blue'];

	const textColors = ['heading', 'default', 'subtle-1', 'subtle-2', 'disabled', 'link'];

	const fonts = [
		{ name: 'Space Grotesk', token: 'space-grotesk' },
		{ name: 'Roboto Mono', token: 'roboto-mono' },
		{ name: 'Public Sans', token: 'public-sans' }
	];

	const textSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];

	const vehicles = [
		{ id: 1, make: 'BMW', model: 'M6', year: 2008, vin: 'WA1VMAFE5DD146017' },
		{ id: 2, make: 'GMC', model: 'Savana', year: 2009, vin: '2C3CA1CV7AH145612' },
		{ id: 3, make: 'Ford', model: 'Fusion', year: 2013, vin: '1G6KD57Y59U958937' },
		{ id: 4, make: 'Mercedes-Benz', model: 'G-Class', year: 2010, vin: '5N1BA0ND0FN963537' },
		{ id: 5, make: 'Dodge', model: 'Ram Wagon B250', year: 1992, vin: 'JHMFA3F28BS566074' }
	];
</script>

{#snippet swatch(token: string)}
	<div class="flex flex-col gap-1">
		<div class="border-light h-12 w-full rounded border bg-{token}"></div>
		<span class="text-subtle-2 font-mono text-xs">{token}</span>
	</div>
{/snippet}

{#snippet section(title: string, subtitle?: string)}
	<div class="mb-1">
		<h2 class="text-heading text-sm font-medium tracking-wide uppercase">{title}</h2>
		{#if subtitle}
			<p class="text-subtle-2 mt-1 text-xs">{subtitle}</p>
		{/if}
	</div>
{/snippet}

<main class="mx-auto flex max-w-4xl flex-col gap-12 p-8 pt-16">
	<header>
		<h1 class="text-heading text-3xl font-medium">@viamrobotics/tailwind-config</h1>
		<p class="text-subtle-1 mt-2 max-w-2xl">
			A live preview of the Viam design tokens and utilities. Use the toggle in the corner to switch
			between the light theme and the opt-in
			<code class="text-code-string">@viamrobotics/tailwind-config/dark</code> theme — every section
			below reflects the active theme.
		</p>
	</header>

	<!-- Grayscale -->
	<section class="flex flex-col gap-4">
		{@render section('Grayscale')}
		<div class="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
			{#each grayscale as token (token)}
				{@render swatch(token)}
			{/each}
		</div>
	</section>

	<!-- Semantic -->
	<section class="flex flex-col gap-4">
		{@render section('Semantic colors')}
		<div class="flex flex-col gap-5">
			{#each semantic as { group, tokens } (group)}
				<div class="flex flex-col gap-2">
					<span class="text-subtle-1 text-xs font-medium">{group}</span>
					<div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
						{#each tokens as token (token)}
							{@render swatch(token)}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Brand -->
	<section class="flex flex-col gap-4">
		{@render section('Brand colors')}
		<div class="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
			{#each brand as token (token)}
				{@render swatch(token)}
			{/each}
		</div>
		<span class="text-subtle-1 mt-2 text-xs font-medium">Extensions</span>
		<div class="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
			{#each brandExtensions as token (token)}
				{@render swatch(token)}
			{/each}
		</div>
	</section>

	<!-- Illustration -->
	<section class="flex flex-col gap-4">
		{@render section('Illustration pixels')}
		<div class="grid grid-cols-4 gap-3">
			{#each illustration as token (token)}
				{@render swatch(token)}
			{/each}
		</div>
	</section>

	<!-- Typography -->
	<section class="flex flex-col gap-4">
		{@render section('Text colors')}
		<div class="flex flex-col gap-2">
			{#each textColors as token (token)}
				<p class="text-lg text-{token}">
					text-{token} — The quick brown fox jumps over the lazy dog
				</p>
			{/each}
		</div>
	</section>

	<section class="flex flex-col gap-4">
		{@render section('Font families')}
		<div class="flex flex-col gap-3">
			{#each fonts as { name, token } (token)}
				<div>
					<span class="text-subtle-2 text-xs">font-{token}</span>
					<p class="text-default text-lg font-{token}">
						{name} — Pretty Rad Interactive Modular Elements 0123456789
					</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Text sizes -->
	<section class="flex flex-col gap-4">
		{@render section('Text sizes')}
		<div class="flex flex-col gap-3">
			{#each textSizes as size (size)}
				<div class="flex items-baseline gap-4">
					<span class="text-subtle-2 w-20 shrink-0 font-mono text-xs">text-{size}</span>
					<span class="text-default text-{size}">The quick brown fox</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Buttons -->
	<section class="flex flex-col gap-4">
		{@render section('Buttons')}
		<div class="flex flex-wrap items-center gap-3">
			<button type="button" class="bg-gray-9 text-white hover:bg-gray-8 rounded px-4 py-1.5 text-sm font-medium">
				Primary
			</button>
			<button
				type="button"
				class="bg-light border-medium hover:bg-medium rounded border px-4 py-1.5 text-sm font-medium"
			>
				Secondary
			</button>
			<button
				type="button"
				class="bg-danger-light hover:bg-danger-medium-light active:bg-danger-medium rounded px-4 py-1.5 text-sm font-medium text-danger-dark border border-danger-medium"
			>
				Danger
			</button>
			<button
				type="button"
				class="bg-success-light hover:bg-success-medium-light active:bg-success-medium rounded px-4 py-1.5 text-sm font-medium text-success-dark border border-success-medium"
			>
				Success
			</button>
			<button
				type="button"
				class="bg-info-light hover:bg-info-medium-light active:bg-info-medium rounded px-4 py-1.5 text-sm font-medium text-info-dark border border-info-medium"
			>
				Info
			</button>
			<button
				type="button"
				class="bg-warning-light hover:bg-warning-medium-light active:bg-warning-medium rounded px-4 py-1.5 text-sm font-medium text-warning-dark border border-warning-medium"
			>
				Warning
			</button>
			<button
				type="button"
				class="bg-pending-light hover:bg-pending-medium-light active:bg-pending-medium rounded px-4 py-1.5 text-sm font-medium text-pending-dark border border-pending-medium"
			>
				Pending
			</button>
			<button
				type="button"
				class="text-default hover:bg-ghost-medium rounded px-4 py-1.5 text-sm font-medium"
			>
				Ghost
			</button>
			<button
				type="button"
				disabled
				class="bg-disabled-light text-disabled-dark cursor-not-allowed rounded px-4 py-1.5 text-sm font-medium"
			>
				Disabled
			</button>
		</div>
	</section>

	<!-- Feedback -->
	<section class="flex flex-col gap-4">
		{@render section('Alerts')}
		<div class="flex flex-col gap-3">
			<div class="border-danger-medium bg-danger-light text-danger-dark rounded border p-3 text-sm">
				Danger — something went wrong.
			</div>
			<div class="border-success-medium bg-success-light text-success-dark rounded border p-3 text-sm">
				Success — your changes were saved.
			</div>
			<div class="border-info-medium bg-info-light text-info-dark rounded border p-3 text-sm">
				Info — here is something to note.
			</div>
			<div class="border-warning-medium bg-warning-light text-warning-dark rounded border p-3 text-sm">
				Warning — double-check this action.
			</div>
			<div class="border-pending-medium bg-pending-light text-pending-dark rounded border p-3 text-sm">
				Pending — this is a pending action.
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		{@render section('Badges')}
		<div class="flex flex-wrap gap-2">
			<span class="bg-danger-light text-danger-dark rounded-full px-2 py-0.5 text-xs font-medium">Danger</span>
			<span class="bg-success-light text-success-dark rounded-full px-2 py-0.5 text-xs font-medium">Success</span>
			<span class="bg-info-light text-info-dark rounded-full px-2 py-0.5 text-xs font-medium">Info</span>
			<span class="bg-warning-light text-warning-dark rounded-full px-2 py-0.5 text-xs font-medium">Warning</span>
			<span class="bg-pending-light text-pending-dark rounded-full px-2 py-0.5 text-xs font-medium">Pending</span>
		</div>
	</section>

	<!-- Form controls -->
	<section class="flex flex-col gap-4">
		{@render section('Form controls')}
		<div class="grid gap-6 sm:grid-cols-2">
			<label class="flex flex-col gap-1">
				<span class="text-subtle-1 text-xs font-medium">Text input</span>
				<input
					type="text"
					placeholder="Type here…"
					class="border-medium bg-white text-default focus:border-info-dark rounded border px-2 py-1.5 text-sm outline-none"
				/>
			</label>

			<label class="flex flex-col gap-1">
				<span class="text-subtle-1 text-xs font-medium">Select</span>
				<select
					value="power-button"
					class="border-medium bg-white text-default focus:border-info-dark rounded border px-2 py-1.5 text-sm outline-none"
				>
					<option value="power-button">Power button</option>
					<option value="cyberpunk">Cyberpunk</option>
					<option value="hologram">Hologram</option>
				</select>
			</label>

			<label class="flex flex-col gap-1 sm:col-span-2">
				<span class="text-subtle-1 text-xs font-medium">Textarea</span>
				<textarea
					rows="2"
					placeholder="Multi-line input…"
					class="border-medium bg-white text-default focus:border-info-dark rounded border px-2 py-1.5 text-sm outline-none"
				></textarea>
			</label>

			<div class="flex flex-col gap-2">
				<span class="text-subtle-1 text-xs font-medium">Checkbox & radio</span>
				<label class="text-default flex items-center gap-2 text-sm">
					<input type="checkbox" checked class="accent-info-dark" />
					Enabled
				</label>
				<label class="text-default flex items-center gap-2 text-sm">
					<input type="radio" group="radio" value="a" checked class="accent-info-dark" />
					Option A
				</label>
				<label class="text-default flex items-center gap-2 text-sm">
					<input type="radio" group="radio" value="b" class="accent-info-dark" />
					Option B
				</label>
			</div>

			<label class="flex flex-col gap-2">
				<span class="text-subtle-1 text-xs font-medium">Range (slider-* utilities)</span>
				<input
					type="range"
					min="0"
					max="100"
					value="50"
					class="slider-track-gray-3 slider-track-h-1.5 slider-thumb-info-dark slider-thumb-w-4 slider-thumb-h-4 slider-thumb-border w-full appearance-none bg-transparent"
				/>
			</label>
		</div>
	</section>

	<!-- Table -->
	<section id="table" class="flex flex-col gap-4">
		{@render section('Table', 'table-container / table-header / table-cell utilities')}
		<div class="overflow-x-auto">
			<table class="table-container border-collapse">
				<thead>
					<tr class="table-header">
						<th class="table-header-cell text-left">ID</th>
						<th class="table-header-cell text-left">Make</th>
						<th class="table-header-cell text-left">Model</th>
						<th class="table-header-cell text-left">Model year</th>
						<th class="table-header-cell text-left">VIN</th>
					</tr>
				</thead>
				<tbody>
					{#each vehicles as vehicle (vehicle.id)}
						<tr>
							<td class="table-cell">{vehicle.id}</td>
							<td class="table-cell">
								<a href="#table" class="table-cell-link">{vehicle.make}</a>
							</td>
							<td class="table-cell">{vehicle.model}</td>
							<td class="table-cell">{vehicle.year}</td>
							<td class="table-cell font-mono text-xs">{vehicle.vin}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Surfaces -->
	<section class="flex flex-col gap-4">
		{@render section('Surfaces & shadow')}
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="bg-white border-light rounded border p-4 shadow-sm">
				<p class="text-default text-sm font-medium">Card</p>
				<p class="text-subtle-2 text-xs">bg-white + shadow-sm</p>
			</div>
			<div class="bg-light rounded p-4">
				<p class="text-default text-sm font-medium">bg-light</p>
			</div>
			<div class="bg-medium rounded p-4">
				<p class="text-default text-sm font-medium">bg-medium</p>
			</div>
		</div>
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="border-light rounded border-2 p-4 text-center text-xs text-subtle-1">border-light</div>
			<div class="border-medium rounded border-2 p-4 text-center text-xs text-subtle-1">border-medium</div>
			<div class="border-dark rounded border-2 p-4 text-center text-xs text-subtle-1">border-dark</div>
		</div>
	</section>

	<!-- Scrollbar -->
	<section class="flex flex-col gap-4">
		{@render section('Scrollbar', 'scrollbar-thin / scrollbar-thumb-* / scrollbar-track-*')}
		<div
			class="scrollbar-thin scrollbar-thumb-gray-5 scrollbar-track-gray-2 border-light h-28 overflow-y-auto rounded border p-3"
		>
			{#each Array.from({ length: 12 }, (_, i) => i + 1) as line (line)}
				<p class="text-subtle-1 text-sm">Scrollable line {line}</p>
			{/each}
		</div>
	</section>

	<!-- Code -->
	<section class="flex flex-col gap-4">
		{@render section('Code colors', 'text-code-* tokens')}
		<pre class="bg-gray-1 border-light overflow-x-auto rounded border p-4 font-mono text-sm leading-relaxed"><code
				><span class="text-code-line-number">1</span>  &#123;
<span class="text-code-line-number">2</span>    <span class="text-code-property-keys">"name"</span>: <span class="text-code-string">"prime"</span>,
<span class="text-code-line-number">3</span>    <span class="text-code-property-keys">"version"</span>: <span class="text-code-number">2</span>,
<span class="text-code-line-number">4</span>    <span class="text-code-property-keys">"stable"</span>: <span class="text-code-boolean">true</span>,
<span class="text-code-line-number">5</span>    <span class="text-code-property-keys">"deprecated"</span>: <span class="text-code-null">null</span>
<span class="text-code-line-number">6</span>  &#125;</code
			></pre>
	</section>
</main>
