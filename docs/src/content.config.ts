import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

import { componentSchema, packageComponents } from "./loaders/components";

const packageLib = (name: string) =>
  new URL(`../../packages/${name}/src/lib/`, import.meta.url);

const components = (name: string, links: "pages" | "anchors") =>
  defineCollection({
    loader: packageComponents({ name, lib: packageLib(name), links }),
    schema: componentSchema,
  });

/**
 * One component collection per Svelte package, keyed by package name, which is the
 * `collection` the `doc/` components take. prime-ui documents one component per page,
 * the others document the whole package on one page.
 */
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  "prime-ui": components("prime-ui", "pages"),
  "prime-panes": components("prime-panes", "anchors"),
  "prime-tree": components("prime-tree", "anchors"),
};
