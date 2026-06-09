import type { ScriptDocReport } from "./types.js";
import { parseDocumentedCommands } from "./parse.js";

export function checkScriptDocs(scripts: Record<string, string>, markdown: string): ScriptDocReport {
  const scriptNames = Object.keys(scripts).sort((a, b) => a.localeCompare(b));
  const documented = parseDocumentedCommands(markdown);
  const documentedScriptNames = new Set(documented.map((command) => command.script));
  const findings = [];

  for (const command of documented) {
    if (!scriptNames.includes(command.script)) {
      findings.push({
        severity: "error" as const,
        code: "documented-script-missing",
        message: `README references ${command.raw}, but package.json has no ${command.script} script.`,
        script: command.script,
        line: command.line
      });
    }
  }

  for (const important of ["test", "build", "lint", "check"]) {
    if (scriptNames.includes(important) && !documentedScriptNames.has(important)) {
      findings.push({
        severity: "warning" as const,
        code: "important-script-undocumented",
        message: `package.json has an important ${important} script, but README does not mention it.`,
        script: important
      });
    }
  }

  return {
    scripts: scriptNames,
    documented,
    findings,
    totals: {
      scripts: scriptNames.length,
      documented: documented.length,
      errors: findings.filter((finding) => finding.severity === "error").length,
      warnings: findings.filter((finding) => finding.severity === "warning").length
    }
  };
}
