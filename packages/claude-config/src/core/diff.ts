interface Op {
  tag: " " | "-" | "+";
  text: string;
}

function ops(a: string[], b: string[]): Op[] {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      out.push({ tag: " ", text: a[i++] });
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ tag: "-", text: a[i++] });
    } else {
      out.push({ tag: "+", text: b[j++] });
    }
  }
  while (i < a.length) out.push({ tag: "-", text: a[i++] });
  while (j < b.length) out.push({ tag: "+", text: b[j++] });
  return out;
}

/**
 * Dependency-free line diff with limited context. `-` lines are on disk, `+`
 * lines are canonical (what `--fix` would change); long unchanged runs collapse
 * to a single ellipsis.
 */
export function unifiedDiff(from: string, to: string, context = 3): string {
  const list = ops(from.split("\n"), to.split("\n"));
  const keep = new Array<boolean>(list.length).fill(false);
  list.forEach((op, index) => {
    if (op.tag === " ") return;
    for (
      let k = Math.max(0, index - context);
      k <= Math.min(list.length - 1, index + context);
      k++
    ) {
      keep[k] = true;
    }
  });

  const lines: string[] = [];
  let collapsed = false;
  for (let index = 0; index < list.length; index++) {
    if (keep[index]) {
      lines.push(`${list[index].tag} ${list[index].text}`);
      collapsed = false;
    } else if (!collapsed) {
      lines.push("  …");
      collapsed = true;
    }
  }
  return lines.join("\n");
}
