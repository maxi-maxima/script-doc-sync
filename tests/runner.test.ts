import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { writeDemo } from "../src/runner.js";

describe("writeDemo", () => {
  it("writes JSON and Markdown drift reports", async () => {
    const out = await mkdtemp(path.join(os.tmpdir(), "script-doc-sync-"));

    const report = await writeDemo(out);

    expect(report.totals.errors).toBe(1);
    await expect(readFile(path.join(out, "script-doc-sync.json"), "utf8")).resolves.toContain("documented-script-missing");
    await expect(readFile(path.join(out, "script-doc-sync.md"), "utf8")).resolves.toContain("Script Doc Sync Report");
  });
});
