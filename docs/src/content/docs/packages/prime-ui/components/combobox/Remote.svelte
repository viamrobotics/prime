<script lang="ts">
  import { Combobox, Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  const catalog = [
    "arm-01",
    "arm-02",
    "camera-front",
    "camera-rear",
    "gantry-east",
    "gantry-west",
    "rover-alpha",
    "rover-beta",
    "rover-gamma",
    "sorter-line-1",
    "sorter-line-2",
    "sorter-line-3",
  ].map((label, index) => ({ value: `m-${String(index + 1).padStart(4, "0")}`, label }));

  const fetchMachines = async (text: string) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return catalog
      .filter((machine) => machine.label.includes(text.trim().toLowerCase()));
  };

  let machine = $state("");
  let query = $state("");
  let results = $state<{ value: string; label: string }[]>([]);
  let loading = $state(false);

  $effect(() => {
    const text = query;
    loading = true;
    let stale = false;
    fetchMachines(text).then((found) => {
      if (stale) return;
      results = found;
      loading = false;
    });
    return () => {
      stale = true;
    };
  });
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Machine</Label>
    <Combobox bind:value={machine} bind:query items={results} filter={() => true}>
      <Input.Group>
        <Combobox.Input placeholder="Search machines" />
        <Combobox.Trigger />
      </Input.Group>
      <Combobox.Content>
        <Combobox.Viewport>
          <Combobox.Items />
          <Combobox.Empty>No matching machine</Combobox.Empty>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox>
    <p role="status" class="text-sm text-subtle-2">{loading ? "Searching..." : ""}</p>
    <Hint>Each keystroke runs a simulated lookup, and the list shows whatever it returned.</Hint>
  </Field>
</div>
