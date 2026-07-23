export function message(text: string, ...data: unknown[]) {
  if (data.length === 0) return console.log(text);
  console.log(text, ...data);
}

export function indent(spaces: number, text: string, ...data: unknown[]) {
  const pad = " ".repeat(spaces);
  message(
    text
      .split("\n")
      .map((line) => pad + line)
      .join("\n"),
    ...data,
  );
}

export function error(error: string | Error) {
  console.error(error instanceof Error ? error.message : error);
}

export function json(json: unknown) {
  message(JSON.stringify(json, null, 2));
}

export function line(text: string, ...data: unknown[]) {
  message(`\n${text}`, ...data);
}
