<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";

  let elapsed = $state(0);

  $effect(() => {
    const timer = setInterval(() => {
      elapsed = elapsed >= 100 ? 0 : elapsed + 2;
    }, 100);
    return () => clearInterval(timer);
  });
</script>

<div class="not-content">
  <Banner variant="info">
    <Banner.Icon class="bg-light">
      <span class="progress-dots" aria-hidden="true"></span>
    </Banner.Icon>
    <Banner.Description>Restarting the machine.</Banner.Description>
    <Banner.Progress value={elapsed} label="Time until the restart finishes" />
  </Banner>
</div>
