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
      heading: "Others",
      items: [
        { value: "mom", label: "Mom" },
        { value: "wernstrom", label: "Professor Ogden Wernstrom" },
        { value: "calculon", label: "Calculon" },
        { value: "morbo", label: "Morbo" },
      ],
    },
  ];

  // The closed trigger resolves its label from this flat list.
  const characters = groups.flatMap((group) => group.items);

  let character = $state("");
</script>

<div class="not-content">
  <div class="max-w-xs">
    <Select items={characters} bind:value={character}>
      <Select.Trigger class="w-64" aria-label="Character">
        <Select.Value placeholder="Pick a character" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {#each groups as group (group.heading)}
              <Select.Group>
                <Select.GroupHeading>{group.heading}</Select.GroupHeading>
                {#each group.items as item (item.value)}
                  <Select.Item value={item.value} label={item.label} />
                {/each}
              </Select.Group>
            {/each}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select>
  </div>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{character || "none"}</code></p>
</div>
