# 贡献指南

感谢你改进 Script Doc Sync。

## 本地开发

```bash
npm install
npm run check
```

## 开发原则

- 不执行 package scripts。
- 解析规则保持确定、保守。
- 新增包管理器命令形式时需要补测试。
- 报告要同时方便人和 agent 阅读。

## Pull Request

请说明：

- 示例 README 文本
- 示例 package scripts
- `npm run check` 的验证结果
