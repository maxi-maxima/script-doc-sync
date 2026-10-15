import type { DocumentedCommand } from "./types.js";

export function parseDocumentedCommands(markdown: string): DocumentedCommand[] {
  const commands: DocumentedCommand[] = [];
  const seen = new Set<string>();
  const lines = markdown.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const match of line.matchAll(/\b(npm|pnpm|yarn|bun)\s+(?:run\s+)?([A-Za-z0-9:_.-]+)\b/g)) {
      const manager = match[1] as DocumentedCommand["manager"];
      const script = normalizeScript(manager, match[2]);
      const key = `${manager}:${script}:${index + 1}:${match[0]}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      commands.push({
        manager,
        script,
        raw: match[0],
        line: index + 1
      });
    }
  });

  return commands;
}

function normalizeScript(manager: DocumentedCommand["manager"], rawScript: string): string {
  if (manager === "npm" && rawScript === "t") {
    return "test";
  }
  return rawScript;
}
