import ts from "typescript";

export interface ComponentProp {
  name: string;
  type: string;
  optional: boolean;
  /** Declared with `$bindable()`, so `bind:` works on it. */
  bindable: boolean;
  description: string;
  default?: string;
}

export interface ParsedComponent {
  /** The `@component` block, markdown, with the `@component` marker stripped. */
  doc: string;
  /** The type annotation on `$props()`, such as `Props` or `Select.TriggerProps`. */
  propsType?: string;
  /** True when `propsType` is not an interface declared in the component. */
  external: boolean;
  /** The `extends` clause of the local `Props` interface, verbatim. */
  extends?: string;
  props: ComponentProp[];
}

const DOC_BLOCK = /<!--\s*@component\s*([\s\S]*?)-->/;
const SCRIPT_BLOCK = /<script[^>]*>([\s\S]*?)<\/script>/g;
// The type never spans a line, which keeps the match off the `'aria-x': alias` colons
// inside the destructuring pattern.
const PROPS_ANNOTATION = /:\s*([^=;\n]+?)\s*=\s*\$props\(\)/;
const BINDABLE = /(\w+)\s*=\s*\$bindable\(/g;
const DESTRUCTURE_BLOCK =
  /(?:const|let)\s*\{([\s\S]*?)\}\s*:\s*[^=]+=\s*\$props\(\)/;

const jsDocText = (comment: ts.JSDoc["comment"]) =>
  (ts.getTextOfJSDocComment(comment) ?? "").trim();

const destructureDefault = (
  script: string,
  name: string,
): string | undefined => {
  const block = DESTRUCTURE_BLOCK.exec(script)?.[1] ?? "";
  const match = new RegExp(`(?:^|[,{\\s])${name}\\s*=\\s*([^,\\n]+)`).exec(
    block,
  );
  if (!match) return undefined;
  const raw = match[1].trim();
  const bindable = /^\$bindable\((.*)\)$/.exec(raw);
  if (bindable) return bindable[1].trim() || undefined;
  return raw;
};

const propsInterface = (
  script: string,
  name: string | undefined,
): { file: ts.SourceFile; node?: ts.InterfaceDeclaration } => {
  const file = ts.createSourceFile(
    "component.ts",
    script,
    ts.ScriptTarget.Latest,
    true,
  );
  let node: ts.InterfaceDeclaration | undefined;
  file.forEachChild((child) => {
    if (ts.isInterfaceDeclaration(child) && child.name.text === name)
      node = child;
  });
  return { file, node };
};

const readProp = (
  member: ts.PropertySignature,
  file: ts.SourceFile,
  script: string,
  bindable: Set<string>,
): ComponentProp => {
  const name = member.name.getText(file).replace(/^['"]|['"]$/g, "");
  const description = ts
    .getJSDocCommentsAndTags(member)
    .filter(ts.isJSDoc)
    .map((doc) => jsDocText(doc.comment))
    .join(" ")
    .trim();
  const defaultTag = ts
    .getJSDocTags(member)
    .find((tag) => tag.tagName.text === "default");
  return {
    name,
    type: member.type?.getText(file) ?? "unknown",
    optional: member.questionToken !== undefined,
    bindable: bindable.has(name),
    description,
    default: defaultTag
      ? jsDocText(defaultTag.comment)
      : destructureDefault(script, name),
  };
};

/** Pull the `@component` doc block and the `Props` contract out of a Svelte component's source. */
export const parseComponentSource = (source: string): ParsedComponent => {
  const doc = DOC_BLOCK.exec(source)?.[1]?.trim() ?? "";
  const scripts = [...source.matchAll(SCRIPT_BLOCK)].map((match) => match[1]);
  const script =
    scripts.find((candidate) => candidate.includes("$props()")) ?? "";
  const propsType = PROPS_ANNOTATION.exec(script)?.[1]?.trim();
  const bindable = new Set(
    [...script.matchAll(BINDABLE)].map((match) => match[1]),
  );
  const { file, node } = propsInterface(script, propsType);

  return {
    doc,
    propsType,
    external: propsType !== undefined && node === undefined,
    extends: node?.heritageClauses
      ?.flatMap((clause) => clause.types.map((type) => type.getText(file)))
      .join(", "),
    props:
      node?.members
        .filter(ts.isPropertySignature)
        .map((member) => readProp(member, file, script, bindable)) ?? [],
  };
};

const SVELTE_LINK = /\]\(((?:\.{1,2}\/)+(?:[\w-]+\/)*)(\w+)\.svelte\)/g;

/**
 * Rewrite markdown links that point at sibling `.svelte` files, which make sense on
 * editor hover, into docs-site links. Links `resolve` cannot place are left alone.
 */
export const rewriteSvelteLinks = (
  doc: string,
  resolve: (componentFile: string) => string | undefined,
): string =>
  doc.replace(SVELTE_LINK, (whole, _path: string, file: string) => {
    const href = resolve(file);
    return href ? `](${href})` : whole;
  });
