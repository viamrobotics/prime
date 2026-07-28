import { markdownTable as build } from "markdown-table";

type Row = readonly [string, string];

/**
 * Two-column GitHub-flavored table. Cells are padded to the column width so the
 * generated markdown stays readable in source and re-renders byte-identically,
 * which is what lets `doctor` compare regions exactly.
 */
export function markdownTable(headers: Row, rows: readonly Row[]): string {
  return build([[...headers], ...rows.map((row) => [...row])]);
}
