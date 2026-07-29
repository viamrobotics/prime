export interface CommandContext {
  cwd: string;
  dryRun: boolean;
}

export interface InitContext extends CommandContext {
  force: boolean;
}

export interface DoctorContext extends CommandContext {
  json: boolean;
  fix: boolean;
  prune: boolean;
}
