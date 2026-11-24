// svelte-check has no Astro language support, so a `.ts` spec importing an `.astro` file needs this.
declare module "*.astro" {
  import type { AstroComponentFactory } from "astro/runtime/server/index.js";

  const component: AstroComponentFactory;
  export default component;
}
