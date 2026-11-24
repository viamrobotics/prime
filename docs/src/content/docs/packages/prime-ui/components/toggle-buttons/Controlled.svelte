<script lang="ts">
  import { Field, ToggleButtons } from "@viamrobotics/prime-ui";

  const items = [
    { value: "free", label: "Free" },
    { value: "team", label: "Team" },
    { value: "enterprise", label: "Enterprise" },
  ];

  let plan = $state("free");
</script>

<div class="not-content">
  <Field aria-label="Plan">
    <ToggleButtons
      {items}
      bind:value={
        () => plan,
        (next) => {
          if (next !== "enterprise") plan = next;
        }
      }
    />
  </Field>

  <p class="mt-3 text-sm text-subtle-2">
    value: <code>{plan}</code>. Enterprise is declined by the setter.
  </p>
</div>
