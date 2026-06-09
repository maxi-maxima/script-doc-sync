import { describe, expect, it } from "vitest";
import { toMarkdown } from "../src/markdown.js";
import type { ScriptDocReport } from "../src/types.js";

describe("toMarkdown", () => {
  it("renders totals and findings", () => {
    const markdown = toMarkdown({
      scripts: ["test"],
      documented: [{ manager: "npm", script: "missing", raw: "npm run missing", line: 4 }],
      findings: [
        {
          severity: "error",
          code: "documented-script-missing",
          message: "README references npm run missing, but package.json has no missing script.",
          script: "missing",
          line: 4
        }
      ],
      totals: {
        scripts: 1,
        documented: 1,
        errors: 1,
        warnings: 0
      }
    } satisfies ScriptDocReport);

    expect(markdown).toContain("# Script Doc Sync Report");
    expect(markdown).toContain("documented-script-missing");
    expect(markdown).toContain("npm run missing");
  });
});
