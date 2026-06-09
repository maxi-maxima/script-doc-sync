#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { scanProject, writeDemo } from "./runner.js";
import type { ScriptDocReport } from "./types.js";

const program = new Command();

program
  .name("script-doc-sync")
  .description("Catch drift between README commands and package.json scripts.")
  .version("0.1.0");

program.command("scan").option("--out <dir>", "output directory", "reports/script-doc-sync").action(async (options: { out: string }) => {
  const report = await scanProject(process.cwd(), options.out);
  printSummary(report);
  console.log(`Reports: ${options.out}`);
  process.exitCode = report.totals.errors > 0 ? 1 : 0;
});

program.command("demo").option("--out <dir>", "output directory", "reports/demo").action(async (options: { out: string }) => {
  const report = await writeDemo(options.out);
  printSummary(report);
  console.log(`Reports: ${options.out}`);
});

program.parse();

function printSummary(report: ScriptDocReport): void {
  const status = report.totals.errors > 0 ? pc.red("FAIL") : report.totals.warnings > 0 ? pc.yellow("WARN") : pc.green("PASS");
  console.log(`Script Doc Sync ${status}`);
  console.log(`Scripts: ${report.totals.scripts}`);
  console.log(`Documented commands: ${report.totals.documented}`);
  console.log(`Errors: ${report.totals.errors}`);
  console.log(`Warnings: ${report.totals.warnings}`);
}
