<script lang="ts">
  import { Select } from "@viamrobotics/prime-ui";

  const groups = [
    {
      heading: "Planet Express",
      items: [
        { value: "fry", label: "Philip J. Fry" },
        { value: "leela", label: "Turanga Leela" },
        { value: "bender", label: "Bender Bending Rodriguez" },
        { value: "farnsworth", label: "Hubert J. Farnsworth" },
        { value: "hermes", label: "Hermes Conrad" },
        { value: "amy", label: "Amy Wong" },
        { value: "zoidberg", label: "Zoidberg" },
        { value: "nibbler", label: "Nibbler" },
      ],
    },
    {
      heading: "Robot Mafia",
      items: [
        { value: "donbot", label: "Donbot" },
        { value: "clamps", label: "Clamps" },
        { value: "joey", label: "Joey Mousepad" },
      ],
    },
    {
      heading: "DOOP",
      items: [
        { value: "zapp", label: "Zapp Brannigan" },
        { value: "kif", label: "Kif Kroker" },
      ],
    },
    {
      heading: "Omicronians",
      items: [
        { value: "lrrr", label: "Lrrr" },
        { value: "ndnd", label: "Ndnd" },
      ],
    },
    {
      heading: "Law Enforcement",
      items: [
        { value: "url", label: "URL" },
        { value: "smitty", label: "Smitty" },
      ],
    },
    {
      heading: "News",
      items: [
        { value: "morbo", label: "Morbo" },
        { value: "linda", label: "Linda the Reporter" },
      ],
    },
    {
      heading: "Robots",
      items: [
        { value: "calculon", label: "Calculon" },
        { value: "flexo", label: "Flexo" },
        { value: "roberto", label: "Roberto" },
      ],
    },
    {
      heading: "Others",
      items: [
        { value: "mom", label: "Mom" },
        { value: "wernstrom", label: "Professor Ogden Wernstrom" },
        { value: "slurms", label: "Slurms McKenzie" },
      ],
    },
  ];

  // bits-ui resolves the closed trigger's label from a flat list.
  const characters = groups.flatMap((group) => group.items);

  let character = $state("");
</script>

{#snippet options()}
  {#each groups as group (group.heading)}
    <Select.Group>
      <Select.GroupHeading>{group.heading}</Select.GroupHeading>
      {#each group.items as item (item.value)}
        <Select.Item value={item.value} label={item.label} />
      {/each}
    </Select.Group>
  {/each}
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Long grouped list, with scroll buttons</p>
    <div class="max-w-xs">
      <Select items={characters} bind:value={character}>
        <Select.Trigger aria-label="Character">
          <Select.Value placeholder="Pick a character" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
              {@render options()}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
    <p class="text-sm text-subtle-2">value: <code>{character || "none"}</code></p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <div class="max-w-xs">
      <Select items={characters} value="bender" disabled>
        <Select.Trigger aria-label="Character">
          <Select.Value placeholder="Pick a character" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport>
              {@render options()}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  </div>
</div>
