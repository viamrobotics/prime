<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";

  let shown = $state(true);
</script>

<div class="not-content flex flex-col gap-3">
  {#if shown}
    <Banner variant="success">
      <Banner.Description>Your changes were saved.</Banner.Description>
      <Banner.Close onclick={() => (shown = false)} />
    </Banner>
  {:else}
    <button type="button" class="button w-fit" onclick={() => (shown = true)}>Show banner</button>
  {/if}
</div>
