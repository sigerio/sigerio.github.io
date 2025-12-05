---
description: 创建新的 OpenSpec 变更提案并严格验证。
argument-hint: 请求或功能描述
---
<!-- OPENSPEC:START -->
**防护措施**
- 优先采用简单、最小化的实现，只有在明确要求或必要时才增加复杂性。
- 将变更范围严格限制在请求的结果内。
- 如需额外的 OpenSpec 约定或说明，请参阅 `openspec/AGENTS.md`（位于 `openspec/` 目录内——如果找不到，请运行 `ls openspec` 或 `openspec update`）。
- 识别任何模糊或不明确的细节，在编辑文件之前提出必要的后续问题。
- 在提案阶段不要编写任何代码。只创建设计文档（proposal.md、tasks.md、design.md 和规格增量）。实施在批准后的应用阶段进行。

**步骤**
1. 查看 `openspec/project.md`，运行 `openspec list` 和 `openspec list --specs`，并检查相关代码或文档（例如通过 `rg`/`ls`）以使提案基于当前行为；记录任何需要澄清的差距。
2. 选择一个以动词开头的唯一 `change-id`，并在 `openspec/changes/<id>/` 下创建 `proposal.md`、`tasks.md` 和 `design.md`（如需要）。
3. 将变更映射为具体的能力或需求，将多范围的工作分解为具有明确关系和顺序的独立规格增量。
4. 当解决方案跨越多个系统、引入新模式或需要在提交规格之前讨论权衡时，在 `design.md` 中记录架构推理。
5. 在 `changes/<id>/specs/<capability>/spec.md` 中起草规格增量（每个能力一个文件夹），使用 `## ADDED|MODIFIED|REMOVED Requirements`，每个需求至少有一个 `#### Scenario:`，并在相关时交叉引用相关能力。
6. 将 `tasks.md` 起草为有序的小型可验证工作项列表，这些工作项能提供用户可见的进展，包括验证（测试、工具），并突出依赖关系或可并行的工作。
7. 使用 `openspec validate <id> --strict` 验证，并在分享提案之前解决每个问题。

**参考**
- 验证失败时，使用 `openspec show <id> --json --deltas-only` 或 `openspec show <spec> --type spec` 检查详情。
- 在编写新需求之前，使用 `rg -n "Requirement:|Scenario:" openspec/specs` 搜索现有需求。
- 使用 `rg <keyword>`、`ls` 或直接读取文件来探索代码库，使提案与当前实现现实保持一致。

$ARGUMENTS
<!-- OPENSPEC:END -->
