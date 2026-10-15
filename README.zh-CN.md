<div align="center">

# Script Doc Sync

**检查 README 命令和 package.json scripts 是否漂移。**

[English](README.md)

</div>

Agent 和人都会从 README 复制命令。如果 README 写着 `npm run verify`，但 `package.json` 里只有 `check`，所有人都会浪费时间。

`script-doc-sync` 会把文档里的包管理器命令和真实的 `package.json` scripts 做对比。

不执行命令。不需要 API key。不调用模型。

## 30 秒演示

```bash
npx github:maxi-maxima/script-doc-sync demo
```

演示会写出：

```text
reports/demo/script-doc-sync.json
reports/demo/script-doc-sync.md
```

## 扫描项目

```bash
npx github:maxi-maxima/script-doc-sync scan --out reports/script-doc-sync
```

`scan` 会读取：

- `package.json`
- `README.md`

它会报告：

- README 中引用了不存在的 scripts
- README 没有提到的重要 scripts：`test`、`build`、`lint`、`check`

## 支持的命令形式

```bash
npm run check
npm test
pnpm test
yarn build
bun run lint
```

支持包含点号的 script 名称，例如 `build.prod`。

也会检测 inline Markdown 命令：

```md
Run `npm run check` before opening a PR.
```

## 它不是什么

`script-doc-sync` 不执行 scripts，不验证 shell 语法，也不检查文档里的所有命令。它只聚焦 agent 和贡献者最常复制的 package-manager scripts。

## 开发

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## 许可证

MIT
