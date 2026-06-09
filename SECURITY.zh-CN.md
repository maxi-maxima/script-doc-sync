# 安全说明

`script-doc-sync` 读取 `package.json` 和 `README.md`，然后写出本地报告。它不会执行 scripts。

## 报告问题

如果你发现以下问题，请私下报告：

- 写入输出目录之外的任意文件
- 在只读行为中执行了命令
- Markdown 内容处理不安全
