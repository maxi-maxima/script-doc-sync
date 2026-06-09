export interface DocumentedCommand {
  manager: "npm" | "pnpm" | "yarn" | "bun";
  script: string;
  raw: string;
  line: number;
}

export interface Finding {
  severity: "error" | "warning";
  code: string;
  message: string;
  script?: string;
  line?: number;
}

export interface ScriptDocReport {
  scripts: string[];
  documented: DocumentedCommand[];
  findings: Finding[];
  totals: {
    scripts: number;
    documented: number;
    errors: number;
    warnings: number;
  };
}
