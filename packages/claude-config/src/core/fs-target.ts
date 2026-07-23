import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

/** Reads and writes files within a target repo, honoring `--dry-run`. */
export class TargetRepo {
  constructor(
    readonly cwd: string,
    readonly dryRun: boolean,
  ) {}

  path(relativePath: string): string {
    return join(this.cwd, relativePath);
  }

  read(relativePath: string): string | null {
    try {
      return readFileSync(this.path(relativePath), "utf8");
    } catch {
      return null;
    }
  }

  exists(relativePath: string): boolean {
    return existsSync(this.path(relativePath));
  }

  write(relativePath: string, content: string): void {
    if (this.dryRun) return;
    const absolute = this.path(relativePath);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }

  remove(relativePath: string): void {
    if (this.dryRun) return;
    rmSync(this.path(relativePath), { force: true });
  }
}
