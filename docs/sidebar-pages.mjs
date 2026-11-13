import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";

const CONTENT_ROOT = fileURLToPath(new URL("./src/content/docs/", import.meta.url));
const SIDEBAR_ORDER = /^sidebar:\n(?:[ \t]+.*\n)*?[ \t]+order:[ \t]*(-?\d+)/m;

const pageFile = (directory, entry) => {
  if (entry.isFile()) return entry.name.endsWith(".mdx") ? join(directory, entry.name) : undefined;

  const index = join(directory, entry.name, "index.mdx");
  return existsSync(index) ? index : undefined;
};

/**
 * Sidebar items for every page directly under a content directory, as one flat list.
 * A page is either `<slug>.mdx` or `<slug>/index.mdx` with its islands beside it.
 * Starlight's `autogenerate` would turn each such folder into a group of its own.
 *
 * Pages sort by their `sidebar.order` frontmatter, then by slug, and take their
 * label from their title.
 *
 * @param directory The content directory, relative to `src/content/docs`.
 */
export const sidebarPages = (directory) =>
  readdirSync(join(CONTENT_ROOT, directory), { withFileTypes: true })
    .map((entry) => ({ entry, file: pageFile(join(CONTENT_ROOT, directory), entry) }))
    .filter(({ file }) => file !== undefined)
    .map(({ entry, file }) => ({
      order: Number(readFileSync(file, "utf8").match(SIDEBAR_ORDER)?.[1] ?? Infinity),
      slug: `${directory}/${parse(entry.name).name}`,
    }))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
    .map(({ slug }) => slug);
