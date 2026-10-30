<script lang="ts">
  import { mdiCheckCircle, mdiCircleMedium } from "@mdi/js";
  import { Checkbox, Field, Icon, Label } from "@viamrobotics/prime-ui";

  let checked = $state(true);
</script>

<Field class="not-content flex items-center gap-2">
  <Checkbox bind:checked>
    {#snippet children({ checked })}
      <Icon
        icon={checked ? mdiCheckCircle : mdiCircleMedium}
        size="xl"
        class={checked ? "text-info-dark" : "text-subtle-2"}
      />
    {/snippet}
  </Checkbox>
  <Label>Larger, round, and blue when checked</Label>
</Field>
