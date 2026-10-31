<script lang="ts">
  import { Checkbox, Field, Input, Label } from "@viamrobotics/prime-ui";
  import { formatKeybinding, useHotkey } from "@viamrobotics/prime-ui";

  let count = $state(0);
  let saved = $state(0);
  let isEnabled = $state(true);

  const increment = useHotkey({
    id: "counter.increment",
    description: "Add one",
    group: "Counter",
    key: "j",
    when: () => isEnabled,
    run: () => count++,
  });

  const reset = useHotkey({
    id: "counter.reset",
    description: "Reset",
    group: "Counter",
    key: "j",
    shift: true,
    when: () => isEnabled,
    run: () => (count = 0),
  });

  const save = useHotkey({
    id: "counter.save",
    description: "Save",
    group: "Counter",
    key: "s",
    mod: true,
    preventDefault: true,
    run: () => saved++,
  });
</script>

<div class="flex flex-col gap-2">
  <p class="text-sm">Count: {count}. Saved: {saved} times.</p>
  <p class="text-sm">
    Press <kbd>{formatKeybinding(increment)}</kbd> to add,
    <kbd>{formatKeybinding(reset)}</kbd> to reset, and
    <kbd>{formatKeybinding(save)}</kbd> to save.
  </p>
  <Field class="flex items-center gap-2">
    <Checkbox bind:checked={isEnabled} />
    <Label>Shortcuts enabled</Label>
  </Field>
  <Field class="flex flex-col gap-1">
    <Label>Notes</Label>
    <Input placeholder="Typing here does not add" />
  </Field>
</div>
