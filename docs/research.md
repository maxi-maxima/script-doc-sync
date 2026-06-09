# Research Notes

This project was selected after avoiding overlap with the user's existing public-launch repos:

- `mcp-fire-drill`: MCP and agent security drills
- `context-cal`: agent context budget auditing
- `screenlint`: rendered UI checking
- `mcp-flightcheck`: MCP server contract checks
- `webmcp-formkit`: WebMCP form metadata migration
- `agent-pr-brief`: deterministic PR review brief generation
- `test-lane-finder`: verification lane planning
- `import-proof`: package API hallucination checks
- `cmd-receipt`: command execution receipts
- `help-contract`: CLI help contract auditing

The opportunity is documentation drift in agent-facing workflows. Agents copy commands from README files just like humans do. Stale script names cause avoidable loop failures.

Existing Markdown linters focus on prose and formatting. Package managers know available scripts. This tool joins the two surfaces without executing anything.

Useful current references:

- https://docs.npmjs.com/cli/v10/commands/npm-run-script
- https://pnpm.io/cli/run
- https://classic.yarnpkg.com/lang/en/docs/cli/run/
- https://bun.sh/docs/cli/run
