<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();

  let id = $state<string>();

  const start = () => {
    id = notify.pending("Publishing module").id;
  };

  const finish = () => {
    if (id === undefined) return;
    notify.update(id, { variant: "success", title: "Module published" });
    id = undefined;
  };
</script>

<div class="not-content flex gap-2">
  <button type="button" class="button" onclick={start} disabled={id !== undefined}>Publish</button>
  <button type="button" class="button" onclick={finish} disabled={id === undefined}>Finish</button>
  <Notify />
</div>
