<script lang="ts">
  import { Toast, provideToast } from "@viamrobotics/prime-ui";

  const toast = provideToast();

  const remove = () => {
    toast.create({
      title: "Deleted report.csv",
      action: { label: "Undo", onclick: () => toast.success("Restored") },
    });
  };
</script>

<div class="not-content">
  <button type="button" class="button" onclick={remove}>Delete</button>
  <Toast />
</div>
