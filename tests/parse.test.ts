import { describe, expect, it } from "vitest";
import { parseDocumentedCommands } from "../src/parse.js";

describe("parseDocumentedCommands", () => {
  it("extracts npm, pnpm, yarn, and bun run commands from markdown", () => {
    const commands = parseDocumentedCommands(`Use \`npm run check\`.

\`\`\`bash
pnpm test
yarn build
bun run lint
npm run build.prod
\`\`\`
`);

    expect(commands.map((command) => `${command.manager}:${command.script}`)).toEqual([
      "npm:check",
      "pnpm:test",
      "yarn:build",
      "bun:lint",
      "npm:build.prod"
    ]);
  });
});
