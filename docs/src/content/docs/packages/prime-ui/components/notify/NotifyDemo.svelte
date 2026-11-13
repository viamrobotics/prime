<script lang="ts">
  import {
    Checkbox,
    Field,
    Input,
    Label,
    Notify,
    provideNotify,
    Select,
    type NotifyVariant,
  } from "@viamrobotics/prime-ui";

  const variants: { value: NotifyVariant; label: string }[] = [
    { value: "info", label: "Info" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "danger", label: "Danger" },
    { value: "pending", label: "Pending" },
  ];

  const notify = provideNotify();

  let variant = $state<NotifyVariant>("danger");
  let title = $state("Failed to publish");
  let persist = $state(false);

  const selectVariant = (value: string) => {
    const match = variants.find((option) => option.value === value);
    if (match) variant = match.value;
  };
</script>

<div class="not-content flex max-w-md flex-col gap-3">
  <div class="grid grid-cols-2 gap-3">
    <Field class="flex flex-col gap-1">
      <Label>Variant</Label>
      <Select bind:value={() => variant, selectVariant} items={variants}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Items />
          </Select.Viewport>
        </Select.Content>
      </Select>
    </Field>
    <Field class="flex flex-col gap-1">
      <Label>Title</Label>
      <Input bind:value={title} />
    </Field>
  </div>
  <div class="flex items-center gap-4">
    <button
      type="button"
      class="button"
      onclick={() => notify[variant](title, "The module is unreachable.", { persist })}
    >
      Show notification
    </button>
    <Field class="flex items-center gap-2">
      <Checkbox bind:checked={persist} />
      <Label>Persist</Label>
    </Field>
  </div>
  <Notify />
</div>
