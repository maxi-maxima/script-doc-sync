import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { checkScriptDocs } from "./check.js";
import { toMarkdown } from "./markdown.js";
import type { ScriptDocReport } from "./types.js";

export async function scanProject(root: string, outDir: string): Promise<ScriptDocReport> {
  const scripts = await readScripts(root);
  const readme = await readFile(path.join(root, "README.md"), "utf8");
  const report = checkScriptDocs(scripts, readme);
  await writeReport(report, outDir);
  return report;
}

export async function writeDemo(outDir: string): Promise<ScriptDocReport> {
  const scripts = {
    test: "vitest run",
    build: "tsc -p tsconfig.json",
    lint: "eslint .",
    check: "npm run lint && npm run test && npm run build"
  };
  const readme = `# Demo

Run \`npm run check\` before opening a PR.

\`\`\`bash
npm run missing
\`\`\`
`;
  const report = checkScriptDocs(scripts, readme);
  await writeReport(report, outDir);
  return report;
}

export async function writeReport(report: ScriptDocReport, outDir: string): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "script-doc-sync.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(outDir, "script-doc-sync.md"), toMarkdown(report), "utf8");
}

async function readScripts(root: string): Promise<Record<string, string>> {
  const raw = await readFile(path.join(root, "package.json"), "utf8");
  const parsed = JSON.parse(raw) as { scripts?: Record<string, string> };
  return parsed.scripts || {};
}
