type Row = readonly [string, string];

function pad(text: string, width: number): string {
  return text + " ".repeat(width - text.length);
}

/**
 * Two-column GitHub-flavored table. Cells are padded to the column width so the
 * generated markdown stays readable in source and re-renders byte-identically,
 * which is what lets `doctor` compare regions exactly.
 */
export function markdownTable(headers: Row, rows: readonly Row[]): string {
  const widths = headers.map((header, column) =>
    Math.max(header.length, ...rows.map((row) => row[column].length)),
  );
  const line = (cells: Row): string =>
    `| ${pad(cells[0], widths[0])} | ${pad(cells[1], widths[1])} |`;
  return [
    line(headers),
    `| ${"-".repeat(widths[0])} | ${"-".repeat(widths[1])} |`,
    ...rows.map(line),
  ].join("\n");
}
