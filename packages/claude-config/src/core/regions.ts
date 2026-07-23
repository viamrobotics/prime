import type { RegionSpec } from "../types.js";

export type UpsertStatus = "created" | "replaced" | "inserted";

function buildBlock(body: string, { start, end }: RegionSpec): string {
  return `${start}\n${body.trimEnd()}\n${end}`;
}

interface Located {
  blockStart: number;
  blockEnd: number;
  innerStart: number;
  innerEnd: number;
}

function locate(content: string, spec: RegionSpec): Located | null {
  const start = content.indexOf(spec.start);
  if (start === -1) return null;
  const innerStart = start + spec.start.length;
  const innerEnd = content.indexOf(spec.end, innerStart);
  if (innerEnd === -1) return null;
  return {
    blockStart: start,
    blockEnd: innerEnd + spec.end.length,
    innerStart,
    innerEnd,
  };
}

/** The current body between the markers, or null when the markers are absent. */
export function extractBody(content: string, spec: RegionSpec): string | null {
  const found = locate(content, spec);
  if (!found) return null;
  return content
    .slice(found.innerStart, found.innerEnd)
    .replace(/^\n/, "")
    .replace(/\n$/, "");
}

/**
 * Inserts or replaces the managed block. When the host lacks markers, the block
 * is placed at the spec's anchor (after the first H1, or at end of file).
 */
export function upsertRegion(
  content: string | null,
  body: string,
  spec: RegionSpec,
): { content: string; status: UpsertStatus } {
  const block = buildBlock(body, spec);
  if (content === null || content === "") {
    return { content: `${block}\n`, status: "created" };
  }

  const found = locate(content, spec);
  if (found) {
    return {
      content:
        content.slice(0, found.blockStart) +
        block +
        content.slice(found.blockEnd),
      status: "replaced",
    };
  }

  if (spec.anchor === "after-h1") {
    const lines = content.split("\n");
    const h1 = lines.findIndex((line) => /^#\s/.test(line));
    if (h1 !== -1) {
      lines.splice(h1 + 1, 0, "", block);
      return { content: lines.join("\n"), status: "inserted" };
    }
  }
  const base = content.endsWith("\n") ? content : `${content}\n`;
  return { content: `${base}\n${block}\n`, status: "inserted" };
}
