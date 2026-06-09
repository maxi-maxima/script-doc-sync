import type { ScriptDocReport } from "./types.js";

export function toMarkdown(report: ScriptDocReport): string {
  const lines = [
    "# Script Doc Sync Report",
    "",
    "| Scripts | Documented commands | Errors | Warnings |",
    "| ---: | ---: | ---: | ---: |",
    `| ${report.totals.scripts} | ${report.totals.documented} | ${report.totals.errors} | ${report.totals.warnings} |`,
    "",
    "## Documented Commands",
    "",
    "| Line | Command | Script |",
    "| ---: | --- | --- |"
  ];

  for (const command of report.documented) {
    lines.push(`| ${command.line} | \`${command.raw}\` | \`${command.script}\` |`);
  }

  lines.push("");
  lines.push("## Findings");
  lines.push("");
  if (report.findings.length === 0) {
    lines.push("No findings.");
  } else {
    lines.push("| Severity | Code | Script | Line | Message |");
    lines.push("| --- | --- | --- | ---: | --- |");
    for (const finding of report.findings) {
      lines.push(
        `| ${finding.severity} | \`${finding.code}\` | ${finding.script ? `\`${finding.script}\`` : ""} | ${finding.line ?? ""} | ${finding.message} |`
      );
    }
  }

  lines.push("");
  lines.push("## Package Scripts");
  lines.push("");
  for (const script of report.scripts) {
    lines.push(`- \`${script}\``);
  }
  lines.push("");
  return lines.join("\n");
}
