# 规格：文章目录功能

## 能力标识
- **capability**: `toc-feature`
- **关联变更**: `enhance-blog-features`

---

## MODIFIED Requirements

### REQ-TOC-001：文章目录自动生成

**描述**：文章页面应自动从正文标题生成可点击的目录导航。

**优先级**：高

**验收标准**：
- 目录从 `<h2>` 和 `<h3>` 标签自动提取
- 目录项可点击，跳转到对应章节
- 目录支持层级缩进显示
- 无标题的文章不显示目录区域

#### Scenario: 文章包含多级标题
- **GIVEN** 文章正文包含 h2 和 h3 标题
- **WHEN** 页面加载完成
- **THEN** 目录区域显示所有 h2 和 h3 标题
- **AND** h3 标题相对于 h2 有缩进

#### Scenario: 文章无标题
- **GIVEN** 文章正文不包含任何 h2 或 h3 标题
- **WHEN** 页面加载完成
- **THEN** 目录区域隐藏或显示"无目录"提示

#### Scenario: 点击目录项
- **GIVEN** 目录已生成
- **WHEN** 用户点击某个目录项
- **THEN** 页面平滑滚动到对应章节位置

---

### REQ-TOC-002：目录可通过 Front Matter 控制

**描述**：作者可通过文章 Front Matter 的 `toc` 字段控制是否显示目录。

**优先级**：中

**验收标准**：
- `toc: true` 或省略时显示目录
- `toc: false` 时隐藏目录

#### Scenario: 禁用目录
- **GIVEN** 文章 Front Matter 包含 `toc: false`
- **WHEN** 页面加载
- **THEN** 不生成目录，不显示目录区域

---

## REMOVED Requirements

### REQ-TOC-OLD-001：Liquid toc_only 过滤器

**描述**：移除不存在的 `toc_only` Liquid 过滤器调用。

**原因**：该过滤器不是 Jekyll 标准功能，导致目录无法渲染。
