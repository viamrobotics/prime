<script lang='ts'>
  export let title: string
  export let snippet: string
</script>

<section class='py-4'>
  <h3 class='text-xl mb-2'>{title}</h3>

  <slot />

  <pre class="astro-code github-dark" style="background-color:#24292e;color:#e1e4e8;overflow-x:auto" tabindex="0" data-language="svelte"><code>{snippet}</code></pre>
</section>
