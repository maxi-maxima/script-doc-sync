<div align="center">

# Script Doc Sync

**Catch drift between README commands and package.json scripts.**

[简体中文](README.zh-CN.md)

</div>

Agents and humans copy commands from README files. If the README says `npm run verify` but `package.json` only has `check`, everyone wastes time.

`script-doc-sync` compares documented package-manager commands with actual `package.json` scripts.

No command execution. No API keys. No model call.

## 30 Second Demo

```bash
npx github:maxi-maxima/script-doc-sync demo
```

The demo writes:

```text
reports/demo/script-doc-sync.json
reports/demo/script-doc-sync.md
```

## Scan A Project

```bash
npx github:maxi-maxima/script-doc-sync scan --out reports/script-doc-sync
```

`scan` reads:

- `package.json`
- `README.md`

It reports:

- README commands that reference missing scripts
- important scripts that README does not mention: `test`, `build`, `lint`, `check`

## Supported Command Forms

```bash
npm run check
npm test
pnpm test
yarn build
bun run lint
```

Script names containing dots, such as `build.prod`, are supported.

Inline Markdown commands are also detected:

```md
Run `npm run check` before opening a PR.
```

## What It Is Not

`script-doc-sync` does not execute scripts, validate shell syntax, or check every command in your docs. It is narrowly focused on package-manager scripts that agents and contributors commonly copy.

## Development

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## License

MIT
