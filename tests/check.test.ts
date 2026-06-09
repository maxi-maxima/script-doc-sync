import { describe, expect, it } from "vitest";
import { checkScriptDocs } from "../src/check.js";

describe("checkScriptDocs", () => {
  it("reports README commands that reference missing scripts", () => {
    const report = checkScriptDocs(
      {
        test: "vitest run",
        build: "tsc -p tsconfig.json",
        check: "npm run test && npm run build"
      },
      "Run `npm run check` and `npm run missing`."
    );

    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "error",
        code: "documented-script-missing",
        script: "missing"
      })
    );
  });

  it("warns when important scripts are undocumented", () => {
    const report = checkScriptDocs(
      {
        test: "vitest run",
        build: "tsc -p tsconfig.json",
        lint: "eslint .",
        check: "npm run lint && npm run test && npm run build"
      },
      "Run `npm run check`."
    );

    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "important-script-undocumented",
        script: "test"
      })
    );
  });
});
