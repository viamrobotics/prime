<script lang="ts">
  import { Combobox, Field, Input, Label } from "@viamrobotics/prime-ui";

  const groups = [
    {
      heading: "Arms",
      items: [
        { value: "arm-01", label: "Arm 01" },
        { value: "arm-02", label: "Arm 02" },
      ],
    },
    {
      heading: "Rovers",
      items: [
        { value: "rover-alpha", label: "Rover Alpha" },
        { value: "rover-beta", label: "Rover Beta" },
        { value: "rover-gamma", label: "Rover Gamma" },
      ],
    },
    {
      heading: "Fixed installations",
      items: [
        { value: "gantry-east", label: "Gantry East" },
        { value: "sorter-line-3", label: "Sorter Line 3" },
      ],
    },
  ];

  const machines = groups.flatMap((group) => group.items);

  let machine = $state("");
  let query = $state("");

  const visible = $derived(
    groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.label.toLowerCase().includes(query.trim().toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0)
  );
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Machine</Label>
    <Combobox bind:value={machine} bind:query items={machines}>
      <Input.Group>
        <Combobox.Input placeholder="Search machines" />
        <Combobox.Trigger />
      </Input.Group>
      <Combobox.Content>
        <Combobox.Viewport>
          {#each visible as group (group.heading)}
            <Combobox.Group>
              <Combobox.GroupHeading>{group.heading}</Combobox.GroupHeading>
              {#each group.items as item (item.value)}
                <Combobox.Item value={item.value} label={item.label} />
              {/each}
            </Combobox.Group>
          {/each}
          <Combobox.Empty>No matching machine</Combobox.Empty>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox>
  </Field>
</div>
