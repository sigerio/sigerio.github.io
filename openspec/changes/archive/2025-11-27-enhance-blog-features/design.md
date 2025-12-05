# 设计文档：博客功能增强

## 变更标识
- **change-id**: `enhance-blog-features`

## 架构决策

### ADR-1：文章目录（TOC）实现方案

#### 背景
当前 `_layouts/post.html` 使用了不存在的 `toc_only` Liquid 过滤器，导致目录功能失效。

#### 方案对比

| 方案 | 实现方式 | GitHub Pages 兼容 | 自动化程度 | 维护成本 |
|------|----------|-------------------|------------|----------|
| kramdown {:toc} | 在文章中添加 `{:toc}` 标记 | ✓ | 低（需手动） | 低 |
| JS 客户端生成 | JavaScript 解析标题生成 | ✓ | 高（自动） | 中 |
| jekyll-toc 插件 | 第三方插件 | ✗（不在白名单） | 高 | 低 |

#### 决策
采用 **JavaScript 客户端生成** 方案。

#### 理由
1. 自动从文章内容提取标题，无需修改现有文章
2. 与项目现有 JS 架构一致
3. GitHub Pages 完全兼容
4. 可控制目录层级和样式

#### 实现要点
```javascript
// 在 main.js 中添加 TOC 生成函数
function generateTOC() {
  var content = document.querySelector('.post-content');
  var tocContainer = document.querySelector('.post-toc');
  if (!content || !tocContainer) return;
  
  var headings = content.querySelectorAll('h2, h3');
  // 生成目录 HTML...
}
```

---

### ADR-2：分类动态管理方案

#### 背景
当前分类列表在多处硬编码，不符合"便于维护"原则。

#### 方案对比

| 方案 | 数据源 | 维护方式 |
|------|--------|----------|
| 硬编码字符串 | sidebar.html 中定义 | 修改多个文件 |
| site.categories 集合 | Jekyll 自动从文章提取 | 无需维护 |
| _data/categories.yml | 数据文件定义 | 修改一个文件 |
| _categories 集合 | 从集合文件读取 | 创建/删除文件 |

#### 决策
采用 **_categories 集合** 方案，配合 `site.categories` 集合。

#### 理由
1. 已有 `_categories/` 目录结构
2. 可在分类文件中定义元数据（描述、图标等）
3. 符合 project.md 中定义的"新增分类流程"

#### 实现要点
```liquid
<!-- sidebar.html -->
{% for cat_page in site.categories %}
<li>
  <a href="{{ cat_page.url }}">{{ cat_page.title }}</a>
  <span class="count">({{ site.posts | where: "category", cat_page.category_name | size }})</span>
</li>
{% endfor %}
```

---

## 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `_layouts/post.html` | 修改 | 移除无效 toc_only，添加 TOC 容器 |
| `_includes/sidebar.html` | 修改 | 改为动态读取分类 |
| `assets/js/main.js` | 修改 | 添加 TOC 生成函数 |
| `index.html` | 修改 | 动态读取分类 |
| `categories/index.html` | 修改 | 动态读取分类 |
| `assets/css/main.css` | 可能修改 | TOC 样式调整（如需要） |

## 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| JS TOC 在无 JS 环境失效 | 低 | 低 | 降级为无目录显示 |
| 分类集合读取顺序不确定 | 中 | 低 | 添加排序逻辑 |
| 样式冲突 | 低 | 低 | 测试验证 |

## 向后兼容性

- 现有文章无需修改
- 现有分类文件无需修改
- URL 结构保持不变
