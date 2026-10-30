<script lang="ts">
  import { useNotify } from "@viamrobotics/prime-ui";

  const notify = useNotify();
</script>

<button
  type="button"
  class="button"
  onclick={() => notify.danger("Lost connection", "Retrying in the background.")}
>
  Disconnect
</button>
