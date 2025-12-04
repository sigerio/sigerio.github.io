---
description: 归档已部署的 OpenSpec 变更并更新规格。
argument-hint: change-id
---
<!-- OPENSPEC:START -->
**防护措施**
- 优先采用简单、最小化的实现，只有在明确要求或必要时才增加复杂性。
- 将变更范围严格限制在请求的结果内。
- 如需额外的 OpenSpec 约定或说明，请参阅 `openspec/AGENTS.md`（位于 `openspec/` 目录内——如果找不到，请运行 `ls openspec` 或 `openspec update`）。

**步骤**
1. 确定要归档的变更 ID：
   - 如果此提示已包含特定的变更 ID（例如在由斜杠命令参数填充的 `<ChangeId>` 块中），请在去除空白后使用该值。
   - 如果对话中松散地引用了某个变更（例如通过标题或摘要），运行 `openspec list` 以显示可能的 ID，分享相关候选项，并确认用户意图。
   - 否则，查看对话，运行 `openspec list`，并询问用户要归档哪个变更；在继续之前等待确认的变更 ID。
   - 如果仍无法确定单一变更 ID，停止并告知用户目前无法归档任何内容。
2. 通过运行 `openspec list`（或 `openspec show <id>`）验证变更 ID，如果变更缺失、已归档或未准备好归档，则停止。
3. 运行 `openspec archive <id> --yes`，让 CLI 移动变更并应用规格更新而无需提示（仅对纯工具类工作使用 `--skip-specs`）。
4. 查看命令输出，确认目标规格已更新且变更已移至 `changes/archive/`。
5. 使用 `openspec validate --strict` 验证，如有异常使用 `openspec show <id>` 检查。

**参考**
- 归档前使用 `openspec list` 确认变更 ID。
- 使用 `openspec list --specs` 检查刷新后的规格，并在移交前解决任何验证问题。

$ARGUMENTS
<!-- OPENSPEC:END -->
