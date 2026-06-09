# Security

`script-doc-sync` reads `package.json` and `README.md`, then writes local reports. It does not execute scripts.

## Reporting Issues

Please report security issues privately if you find:

- arbitrary file writes outside the output directory
- command execution despite read-only behavior
- unsafe handling of Markdown content
