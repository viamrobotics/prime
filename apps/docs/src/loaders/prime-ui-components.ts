import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseComponentSource, rewriteSvelteLinks } from "./parse-component";

const prop = z.object({
  name: z.string(),
  type: z.string(),
  optional: z.boolean(),
  bindable: z.boolean(),
  description: z.string(),
  default: z.string().optional(),
});

export const componentSchema = z.object({
  /** Display name: `Input`, or `Select.Trigger` for a part. */
  name: z.string(),
  /** Id of the root component this entry belongs to. Equals the entry id for a root. */
  root: z.string(),
  isRoot: z.boolean(),
  /** Path under `src/lib`. */
  file: z.string(),
  propsType: z.string().optional(),
  external: z.boolean(),
  extends: z.string().optional(),
  props: z.array(prop),
});

type ComponentData = z.infer<typeof componentSchema>;

export interface Root {
  name: string;
  file: string;
  parts: { name: string; file: string }[];
}

const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const SINGLE_EXPORT =
  /export \{ default as (\w+) \} from '\.\/([\w-]+)\/(\w+)\.svelte'/g;
const COMPOUND_EXPORT = /export \{ (\w+) \} from '\.\/([\w-]+)\/([\w-]+)\.ts'/g;
const TYPE_EXPORT = /^export type \{[^}]*\}.*$/gm;
const BARREL_IMPORT = /import (\w+) from '\.\/(\w+)\.svelte'/g;
const BARREL_ASSIGN = /Object\.assign\((\w+),\s*\{([^}]*)\}/;

const readCompoundRoot = async (
  lib: string,
  name: string,
  folder: string,
  barrel: string,
): Promise<Root | undefined> => {
  const source = await readFile(join(lib, folder, `${barrel}.ts`), "utf8");
  const imports = new Map(
    [...source.matchAll(BARREL_IMPORT)].map((match) => [
      match[1],
      `${folder}/${match[2]}.svelte`,
    ]),
  );
  const assign = BARREL_ASSIGN.exec(source);
  if (!assign) return undefined;
  const rootFile = imports.get(assign[1]);
  if (!rootFile)
    throw new Error(
      `${folder}/${barrel}.ts: root ${assign[1]} is not imported`,
    );
  const parts = assign[2]
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const file = imports.get(part);
      if (!file)
        throw new Error(`${folder}/${barrel}.ts: part ${part} is not imported`);
      return { name: part, file };
    });
  return { name, file: rootFile, parts };
};

/**
 * Every public component, in `index.ts` export order, with its compound parts.
 * Type exports and value exports of modules without an `Object.assign` barrel are skipped.
 */
export const readRoots = async (lib: string): Promise<Root[]> => {
  const source = await readFile(join(lib, "index.ts"), "utf8");
  const index = source.replace(TYPE_EXPORT, "");
  const roots: Root[] = [];
  for (const match of index.matchAll(SINGLE_EXPORT)) {
    roots.push({
      name: match[1],
      file: `${match[2]}/${match[3]}.svelte`,
      parts: [],
    });
  }
  for (const match of index.matchAll(COMPOUND_EXPORT)) {
    const root = await readCompoundRoot(lib, match[1], match[2], match[3]);
    if (root) roots.push(root);
  }
  return roots;
};

const partSlug = (root: Root, part: string) =>
  kebab(part.startsWith(root.name) ? part.slice(root.name.length) : part);

/** Maps a component file name (`SelectTrigger`) to the docs href that documents it. */
const linkResolver = (roots: Root[]) => {
  const hrefs = new Map<string, string>();
  for (const root of roots) {
    const rootId = kebab(root.name);
    hrefs.set(
      root.file.split("/").pop()!.replace(".svelte", ""),
      `../${rootId}/`,
    );
    for (const part of root.parts) {
      const file = part.file.split("/").pop()!.replace(".svelte", "");
      if (!hrefs.has(file))
        hrefs.set(file, `../${rootId}/#${rootId}-${partSlug(root, part.name)}`);
    }
  }
  return (file: string) => hrefs.get(file);
};

interface Entry {
  id: string;
  doc: string;
  data: ComponentData;
}

const readEntry = async (
  lib: string,
  id: string,
  data: Omit<ComponentData, "propsType" | "external" | "extends" | "props">,
  resolve: (file: string) => string | undefined,
): Promise<Entry> => {
  const parsed = parseComponentSource(
    await readFile(join(lib, data.file), "utf8"),
  );
  return {
    id,
    doc: rewriteSvelteLinks(parsed.doc, resolve),
    data: {
      ...data,
      propsType: parsed.propsType,
      external: parsed.external,
      extends: parsed.extends,
      props: parsed.props,
    },
  };
};

const collectEntries = async (lib: string): Promise<Entry[]> => {
  const roots = await readRoots(lib);
  const resolve = linkResolver(roots);
  const entries: Entry[] = [];
  for (const root of roots) {
    const rootId = kebab(root.name);
    entries.push(
      await readEntry(
        lib,
        rootId,
        { name: root.name, root: rootId, isRoot: true, file: root.file },
        resolve,
      ),
    );
    for (const part of root.parts) {
      entries.push(
        await readEntry(
          lib,
          `${rootId}/${partSlug(root, part.name)}`,
          {
            name: `${root.name}.${part.name}`,
            root: rootId,
            isRoot: false,
            file: part.file,
          },
          resolve,
        ),
      );
    }
  }
  return entries;
};

/**
 * Loads prime-ui's public components into a collection: one entry per root export
 * plus one per compound part, each with its `@component` block rendered and its
 * `Props` contract parsed from source. Reads `src/lib`, since `svelte-package`
 * strips the TypeScript the props table is built from.
 */
export const primeUiComponents = (lib: URL): Loader => {
  const dir = fileURLToPath(lib);
  return {
    name: "prime-ui-components",
    schema: componentSchema,
    async load({ store, parseData, renderMarkdown, watcher, logger }) {
      const sync = async () => {
        const entries = await collectEntries(dir);
        store.clear();
        for (const entry of entries) {
          const data = await parseData({ id: entry.id, data: entry.data });
          store.set({
            id: entry.id,
            data,
            rendered: await renderMarkdown(entry.doc),
          });
        }
        logger.info(`Loaded ${entries.length} prime-ui component entries`);
      };

      await sync();

      watcher?.add(dir);
      const resync = (path: string) => {
        if (path.startsWith(dir)) void sync();
      };
      watcher?.on("change", resync);
      watcher?.on("add", resync);
      watcher?.on("unlink", resync);
    },
  };
};
