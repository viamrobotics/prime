<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Banner variant="warning">
    <Banner.Title>Module deprecated</Banner.Title>
    <Banner.Description>
      my-camera uses a module that is no longer maintained.
    </Banner.Description>
    <Banner.Actions>
      <button type="button" class="button">Update module</button>
      <a href="#changelog" class="text-sm font-medium text-link">View changelog</a>
    </Banner.Actions>
    <Banner.Close />
  </Banner>
</div>
