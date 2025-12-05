# 规格：分类动态管理

## 能力标识
- **capability**: `category-management`
- **关联变更**: `enhance-blog-features`

---

## MODIFIED Requirements

### REQ-CAT-001：分类列表动态生成

**描述**：侧边栏、首页、分类汇总页的分类列表应从 `_categories` 集合动态读取，而非硬编码。

**优先级**：中

**验收标准**：
- 分类列表从 `site.categories` 集合自动生成
- 新增分类只需在 `_categories/` 创建文件
- 删除分类只需删除对应文件
- 无需修改 sidebar.html、index.html 等模板

#### Scenario: 新增分类
- **GIVEN** 当前有 4 个分类（Linux、STM32、ESP32、Python）
- **WHEN** 在 `_categories/` 目录创建 `RTOS.md` 文件
- **AND** 文件包含正确的 Front Matter
- **THEN** 侧边栏自动显示 5 个分类
- **AND** 首页分类卡片显示 5 个

#### Scenario: 分类显示文章计数
- **GIVEN** 分类列表已动态生成
- **WHEN** Linux 分类下有 3 篇文章
- **THEN** 侧边栏 Linux 分类旁显示 "(3)"

#### Scenario: 空分类处理
- **GIVEN** 存在分类定义文件
- **WHEN** 该分类下无任何文章
- **THEN** 分类仍显示在列表中
- **AND** 文章计数显示 "(0)"

---

### REQ-CAT-002：分类排序

**描述**：分类列表应按固定或可配置的顺序显示。

**优先级**：低

**验收标准**：
- 分类按字母顺序或自定义顺序显示
- 可通过 Front Matter 中的 `order` 字段控制顺序（可选）

#### Scenario: 默认按名称排序
- **GIVEN** 未配置自定义排序
- **WHEN** 渲染分类列表
- **THEN** 分类按字母顺序（A-Z）显示

---

## 关联需求

- 参见 `openspec/project.md` "新增分类流程" 章节
