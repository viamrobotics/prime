<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";

  let elapsed = $state(0);
  let timer: ReturnType<typeof setInterval> | undefined;

  const stop = () => {
    clearInterval(timer);
    timer = undefined;
  };

  const restart = () => {
    stop();
    elapsed = 0;
    timer = setInterval(() => {
      elapsed += 2;
      if (elapsed >= 100) stop();
    }, 100);
  };

  $effect(() => {
    restart();
    return stop;
  });
</script>

<div class="not-content flex flex-col items-start gap-2">
  <Banner variant="pending" class="self-stretch">
    <Banner.Description>Restarting the machine.</Banner.Description>
    <Banner.Progress value={elapsed} label="Time until the restart finishes" />
  </Banner>
  <button type="button" class="button" onclick={restart}>Restart</button>
</div>
