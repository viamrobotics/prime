import { loadManifest, ManifestError } from "../core/manifest.js";
import { buildPlan } from "../core/plan.js";
import type { RenderPlan } from "../types.js";
import * as log from "./log.js";

interface RenderSuccess {
  success: true;
  plan: RenderPlan;
}

interface RenderError {
  success: false;
}

type RenderResult = RenderSuccess | RenderError;

export function renderPlan(cwd: string): RenderResult {
  let plan: RenderPlan;
  try {
    plan = buildPlan(loadManifest(cwd));
  } catch (error) {
    if (error instanceof ManifestError) {
      log.error(error);
      return { success: false };
    }

    throw error;
  }

  return { success: true, plan };
}
