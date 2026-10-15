<script lang="ts">
  import Rocket from "@lucide/svelte/icons/rocket";
  import { Icon } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex items-center gap-4 text-default">
  <Icon icon="viam-service" size="xl" />
  <Icon icon={Rocket} size="xl" />
  <Icon icon="alert-circle" size="xl" class="text-danger-dark" />
</div>
