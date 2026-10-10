# 更新记录

## [1.0.0] - 2026-10-10

首个版本，基于 `laiyueji.claude-code-zh` 2.4.20（Claude Code 2.1.295）。

### 改造

- **移除繁体**：移除繁体（`translations/zh-TW.json`）、语言切换命令与 `claudeCodeZh.language` 设置项，以及配套的自动侦测逻辑。本扩展只有简体中文一套文案。
- **移除更新**（`lib/updater.js`）：「检查更新」「还原为内置翻译包」两个命令一并移除。翻译包改为随扩展发布，更新由 VS Code 市场分发。

### 修正（相对 laiyueji.claude-code-zh 2.4.20，共 89 处）

经过对 1812 条规则的全量逐条校对，修正结果直接烘焙进 `translations/zh-CN.json`：

- 🐞 **功能性缺陷 6 条**：`install_plugin`、`uninstall_plugin`、`set_plugin_enabled`、`add_marketplace`、`remove_marketplace`、`refresh_marketplace` 这 6 个 webview → 扩展宿主的通信字段值被译成了中文，而宿主侧代码没有翻译，导致插件安装/卸载/启停与市场增删刷新失效。已还原为英文。
- 🏷️ **Plan 模式显示为「套餐」**：上游的 `"Plan"` → `"套餐"` 规则本意是订阅面板的字段，却把模式选择器的 `label:"Plan"` 一并命中。已加锚点把模式标签固定为「规划模式」，订阅面板的「套餐」不受影响。
- ✍️ **措辞与术语统一 67 条**：例如 `authentication` 原译在「认证」「验证」之间摇摆（统一为「身份验证」）、`output style` 在「样式」「风格」之间摇摆（统一为「输出样式」）、`onboarding` 有「新手引导」「上手引导」两种、`side question` 有「侧边提问」「题外话」两种、`Thinking` 被译成别家产品用语的「深度思考」。另确定 `Rewind`→「回退」、`Restore`→「还原」、`Resume`→「恢复」三词一一对应，不再互相打架。
- 📝 **漏翻补译 16 条**：成品界面中确实可见却完全没翻的文案，包括一段讲解 Plan Mode 的新手引导。

### 备注

- 翻译规则 1812 → **1833 条**（15 条新锚点 + 6 条还原 + 1812 条上游规则，其中 68 条上游条目的译文被就地修正）。