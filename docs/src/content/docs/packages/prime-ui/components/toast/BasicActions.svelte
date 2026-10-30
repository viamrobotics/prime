<script lang="ts">
  import { useToast } from "@viamrobotics/prime-ui";

  const toast = useToast();
</script>

<button type="button" class="button" onclick={() => toast.success("Saved")}>Save</button>
