---
description: 实施已批准的 OpenSpec 变更并保持任务同步。
argument-hint: change-id
---
<!-- OPENSPEC:START -->
**防护措施**
- 优先采用简单、最小化的实现，只有在明确要求或必要时才增加复杂性。
- 将变更范围严格限制在请求的结果内。
- 如需额外的 OpenSpec 约定或说明，请参阅 `openspec/AGENTS.md`（位于 `openspec/` 目录内——如果找不到，请运行 `ls openspec` 或 `openspec update`）。

**步骤**
将这些步骤作为待办事项跟踪，逐一完成。
1. 阅读 `changes/<id>/proposal.md`、`design.md`（如有）和 `tasks.md`，确认范围和验收标准。
2. 按顺序完成任务，保持编辑最小化并专注于请求的变更。
3. 在更新状态之前确认完成——确保 `tasks.md` 中的每个项目都已完成。
4. 所有工作完成后更新检查清单，使每个任务都标记为 `- [x]` 并反映实际情况。
5. 需要额外上下文时，参考 `openspec list` 或 `openspec show <item>`。

**参考**
- 在实施过程中如需从提案获取额外上下文，请使用 `openspec show <id> --json --deltas-only`。

$ARGUMENTS
<!-- OPENSPEC:END -->
