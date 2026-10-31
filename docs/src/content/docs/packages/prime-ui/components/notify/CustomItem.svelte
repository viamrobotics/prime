<script lang="ts">
  import { Banner, Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();
</script>

<div class="not-content">
  <button type="button" class="button" onclick={() => notify.success("Deployed", "Version 1.4.0")}>
    Deploy
  </button>
  <Notify>
    {#snippet item(notification)}
      <Banner variant={notification.variant === "pending" ? "info" : notification.variant}>
        <Banner.Title>{notification.title}</Banner.Title>
        <Banner.Description>
          {typeof notification.description === "string" ? notification.description : ""}
        </Banner.Description>
        <Banner.Close onclick={notification.dismiss} />
      </Banner>
    {/snippet}
  </Notify>
</div>
