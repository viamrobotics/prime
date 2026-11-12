<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();

  let id = $state<string>();
  let progress = $state(0);

  const start = () => {
    progress = 0;
    id = notify.pending("Publishing module", undefined, { progress }).id;
  };

  const advance = () => {
    if (id === undefined) return;
    progress = Math.min(progress + 25, 100);
    notify.update(id, { progress });
  };

  const finish = () => {
    if (id === undefined) return;
    notify.update(id, { variant: "success", title: "Module published" });
    id = undefined;
  };
</script>

<div class="not-content flex gap-2">
  <button type="button" class="button" onclick={start} disabled={id !== undefined}>Publish</button>
  <button type="button" class="button" onclick={advance} disabled={id === undefined}>
    Advance
  </button>
  <button type="button" class="button" onclick={finish} disabled={id === undefined}>Finish</button>
  <Notify />
</div>
