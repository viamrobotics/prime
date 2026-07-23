export interface CommandContext {
  cwd: string;
  dryRun: boolean;
  json: boolean;
}

export interface InitContext extends CommandContext {
  force: boolean;
}

export interface DoctorContext extends CommandContext {
  fix: boolean;
  prune: boolean;
}
