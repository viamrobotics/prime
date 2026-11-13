<script lang="ts">
  import {
    Field,
    Input,
    Label,
    provideToast,
    Select,
    Toast,
    type ToastVariant,
  } from "@viamrobotics/prime-ui";

  const variants: { value: ToastVariant; label: string }[] = [
    { value: "info", label: "Info" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "danger", label: "Danger" },
  ];

  const toast = provideToast();

  let variant = $state<ToastVariant>("success");
  let title = $state("Saved");

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
  <div>
    <button type="button" class="button" onclick={() => toast.create({ title, variant })}>
      Show toast
    </button>
  </div>
  <Toast />
</div>
