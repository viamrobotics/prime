import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

import {
  componentSchema,
  primeUiComponents,
} from "./loaders/prime-ui-components";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  components: defineCollection({
    loader: primeUiComponents(
      new URL("../../../packages/prime-ui/src/lib/", import.meta.url),
    ),
    schema: componentSchema,
  }),
};
