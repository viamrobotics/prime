<script lang="ts">
  import { Field, Hint, Label, Textarea } from "@viamrobotics/prime-ui";

  let reason = $state("");
  let touched = $state(false);

  const fieldState = $derived(touched && reason.trim() === "" ? "error" : "none");
</script>

<Field class="not-content flex max-w-xs flex-col gap-1" state={fieldState} required>
  <Label>Reason</Label>
  <Textarea bind:value={reason} onblur={() => (touched = true)} />
  <Hint>{fieldState === "error" ? "A reason is required." : "Validated on blur."}</Hint>
</Field>
