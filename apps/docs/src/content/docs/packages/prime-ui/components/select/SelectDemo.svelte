<script lang="ts">
  import { Select } from "@viamrobotics/prime-ui";

  const groups = [
    {
      heading: "Planet Express",
      items: [
        { value: "fry", label: "Philip J. Fry" },
        { value: "leela", label: "Turanga Leela" },
        { value: "bender", label: "Bender Bending Rodriguez" },
      ],
    },
    {
      heading: "Robot Mafia",
      items: [
        { value: "donbot", label: "Donbot" },
        { value: "clamps", label: "Clamps" },
      ],
    },
  ];

  const characters = groups.flatMap((group) => group.items);

  let value = $state("");

  const selected = $derived(characters.find((c) => c.value === value)?.label ?? "None");
</script>

<div class="not-content flex max-w-xs flex-col gap-2">
  <Select items={characters} bind:value>
    <Select.Trigger>
      <Select.Value placeholder="Pick a character" />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content>
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
      </Select.Content>
    </Select.Portal>
  </Select>
  <p class="text-subtle-2 text-sm">Selected: {selected}</p>
</div>
