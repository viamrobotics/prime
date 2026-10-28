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
		{
			group: 'Pending',
			tokens: ['pending-light', 'pending-medium-light', 'pending-medium', 'pending-bright', 'pending-dark']
		},
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

	const buttonVariants = [
		{ name: 'Secondary', modifier: '' },
		{ name: 'Primary', modifier: 'button-primary' },
		{ name: 'Ghost', modifier: 'button-ghost' },
		{ name: 'Danger', modifier: 'button-danger' },
		{ name: 'Outline danger', modifier: 'button-outline-danger' },
		{ name: 'Success', modifier: 'button-success' }
	];

	const iconButtonVariants = [
		{ name: 'Primary', modifier: '' },
		{ name: 'Secondary', modifier: 'icon-button-secondary' },
		{ name: 'Danger', modifier: 'icon-button-danger' }
	];

	const badgeVariants = [
		{ name: 'Inactive', modifier: '' },
		{ name: 'Success', modifier: 'badge-success' },
		{ name: 'Warning', modifier: 'badge-warning' },
		{ name: 'Danger', modifier: 'badge-danger' },
		{ name: 'Neutral', modifier: 'badge-neutral' }
	];

	const pillVariants = [
		{ name: 'Default', modifier: '' },
		{ name: 'Outline', modifier: 'pill-outline' }
	];

	const surfaces = ['bg-extralight', 'bg-light', 'bg-medium'];
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

{#snippet label(name: string, classes: string)}
	<div class="flex flex-col">
		<span class="text-sm font-medium">{name}</span>
		<code class="text-code text-subtle-2">{classes}</code>
	</div>
{/snippet}

{#snippet subsection(title: string, subtitle: string)}
	<div>
		<h2 class="text-heading text-sm font-medium tracking-wide uppercase">{title}</h2>
		<p class="text-subtle-2 mt-1 text-xs">{subtitle}</p>
	</div>
{/snippet}

{#snippet plus()}
	<svg aria-hidden="true" class="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
		<path d="M8 3v10M3 8h10" />
	</svg>
{/snippet}

{#snippet contents(label: string)}
	<p class="font-medium">{label}</p>
	<p class="text-subtle-1 text-sm">
		<code class="text-code">dark:</code> is
		<span class="dark:hidden">inactive</span><span class="hidden dark:inline">active</span>
	</p>
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

	<!-- Chrome -->
	<section id="chrome" class="flex flex-col gap-4">
		{@render section('Chrome', 'Every component class and every state it reads. Each example shows the class list it wears.')}
		<div class="flex flex-col gap-4">
			{@render subsection('Button', 'States read: disabled, aria-disabled, aria-busy.')}
			{#each buttonVariants as variant (variant.name)}
				{@const classes = `button ${variant.modifier}`.trim()}
				<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
					{@render label(variant.name, classes)}
					<div class="flex flex-wrap items-center gap-3">
						<button type="button" class={classes}>Normal</button>
						<button type="button" class={classes} disabled>disabled</button>
						<button type="button" class={classes} aria-disabled="true">aria-disabled</button>
						<button type="button" class={classes} aria-busy="true">
							<span class="progress-dots" aria-hidden="true"></span>
							aria-busy
						</button>
					</div>
				</div>
			{/each}
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Leading icon', 'button + inline svg')}
				<div class="flex flex-wrap items-center gap-3">
					<button type="button" class="button">
						{@render plus()}
						Add item
					</button>
					<button type="button" class="button button-primary">
						{@render plus()}
						Add item
					</button>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Icon button', 'Carries aria-label. States read: disabled, aria-disabled, aria-busy.')}
			{#each iconButtonVariants as variant (variant.name)}
				{@const classes = `icon-button ${variant.modifier}`.trim()}
				<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
					{@render label(variant.name, classes)}
					<div class="flex flex-wrap items-center gap-3">
						<button type="button" class={classes} aria-label="Add {variant.name}">
							{@render plus()}
						</button>
						<button type="button" class={classes} aria-label="Add {variant.name} disabled" disabled>
							{@render plus()}
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Badge', 'No states.')}
			{#each badgeVariants as variant (variant.name)}
				{@const classes = `badge ${variant.modifier}`.trim()}
				<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
					{@render label(variant.name, classes)}
					<div class="flex flex-wrap items-center gap-3">
						<span class={classes}>{variant.name}</span>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Pill', 'States read: aria-readonly, aria-disabled.')}
			{#each pillVariants as variant (variant.name)}
				{@const classes = `pill ${variant.modifier}`.trim()}
				<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
					{@render label(variant.name, classes)}
					<div class="flex flex-wrap items-center gap-3">
						<span class={classes}>Normal</span>
						<span class={classes} aria-readonly="true">aria-readonly</span>
						<span class={classes} aria-disabled="true">aria-disabled</span>
						<span class={classes}>
							Removable
							<button type="button" aria-label="Remove {variant.name} pill">&times;</button>
						</span>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Kbd', 'No states.')}
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Keys', 'kbd')}
				<p class="text-sm">
					Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd> to search, or <kbd class="kbd">Esc</kbd> to close.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Avatar', 'Carries role="img" and aria-label.')}
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Initials', 'avatar')}
				<div class="flex flex-wrap items-center gap-3">
					<span class="avatar" role="img" aria-label="Ada Lovelace">al</span>
				</div>
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Image', 'avatar + img')}
				<div class="flex flex-wrap items-center gap-3">
					<span class="avatar" role="img" aria-label="Placeholder portrait">
						<img
							alt=""
							src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Crect width='30' height='30' fill='%23888'/%3E%3C/svg%3E"
						/>
					</span>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Progress dots', 'Carries role="status" and a visually hidden label.')}
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Dots', 'progress-dots')}
				<div class="flex flex-wrap items-center gap-3">
					<span class="progress-dots" role="status"><span class="sr-only">Loading</span></span>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			{@render subsection('Input', 'States read: hover, aria-invalid, data-field-state, readonly, disabled.')}
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Normal', 'input')}
				<input class="input" aria-label="Normal" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Placeholder', 'input')}
				<input class="input" placeholder="Placeholder" aria-label="Placeholder" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Invalid', 'input + aria-invalid')}
				<input class="input" aria-invalid="true" value="Invalid" aria-label="Invalid" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Warn', 'input + data-field-state="warn"')}
				<input class="input" data-field-state="warn" value="Warn" aria-label="Warn" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Readonly', 'input + readonly')}
				<input class="input" readonly value="Readonly" aria-label="Readonly" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Disabled', 'input + disabled')}
				<input class="input" disabled value="Disabled" aria-label="Disabled" />
			</div>
			<div class="grid grid-cols-[12rem_1fr] items-center gap-4">
				{@render label('Frame', 'input focus-ring-within flex')}
				<div class="input focus-ring-within flex">
					<input class="w-full bg-transparent outline-none" placeholder="Bare input in a frame" aria-label="Framed" />
				</div>
			</div>
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

	<!-- Dark mode scoping -->
	<section id="dark-mode" class="flex flex-col gap-4">
		{@render section('Dark mode scoping', 'Use the toggle in the corner to flip the page-level mode and watch which boxes change.')}
		<section class="border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-2 rounded border p-4">
			{@render contents('Follows the page')}
		</section>

		<section class="dark border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-4 rounded border p-4">
			{@render contents('Forced dark')}
			<div class="flex gap-4">
				{#each surfaces as surface (surface)}
					<div class="border-light text-default flex-1 rounded border p-4 text-sm {surface}">{surface}</div>
				{/each}
			</div>

			<div class="light border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-4 rounded border p-4">
				{@render contents('Forced light inside dark')}

				<div class="dark border-light bg-white text-default dark:bg-gray-1 flex flex-col gap-2 rounded border p-4">
					{@render contents('Dark re-nested inside light')}
					<p class="text-subtle-1 text-sm">
						Tokens flip here, but <code class="text-code">dark:</code> utilities stay inactive. This is a documented
						limitation.
					</p>
				</div>
			</div>
		</section>

		<section class="flex flex-col gap-2">
			<p class="text-display">Display 24/26 Space Grotesk 500</p>
			<code class="text-code">text-code: Roboto Mono at text-xs</code>
		</section>
	</section>
</main>
