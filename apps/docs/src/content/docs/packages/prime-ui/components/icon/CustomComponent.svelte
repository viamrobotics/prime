<script lang="ts">
  import Rocket from "@lucide/svelte/icons/rocket";
  import { mdiAlertCircle } from "@mdi/js";
  import { Icon } from "@viamrobotics/prime-ui";
  import { ViamService } from "@viamrobotics/prime-ui/icons";
</script>

<div class="not-content flex items-center gap-4 text-default">
  <Icon icon={ViamService} size="xl" />
  <Icon icon={Rocket} size="xl" />
  <Icon icon={mdiAlertCircle} size="xl" class="text-danger-dark" />
</div>
