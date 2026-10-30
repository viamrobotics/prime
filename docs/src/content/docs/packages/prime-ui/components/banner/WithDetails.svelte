<script lang="ts">
  import { Banner } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Banner variant="danger">
    <Banner.Title>Failed to start module</Banner.Title>
    <Banner.Description>The module exited before it became ready.</Banner.Description>
    <Banner.Details summary="Error output">
      <pre>exit status 1: missing config attribute "board"</pre>
    </Banner.Details>
    <Banner.Close />
  </Banner>
</div>
