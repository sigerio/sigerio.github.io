# 设计文档：目录位置与分类点击优化

## 变更标识
- **change-id**: `improve-toc-and-category-ux`

## 架构决策

### ADR-1：TOC 右侧固定方案

#### 背景
当前 TOC 位于文章内容上方，滚动后不可见。

#### 方案对比

| 方案 | 实现方式 | 优点 | 缺点 |
|------|----------|------|------|
| CSS position:fixed | 纯 CSS 固定定位 | 简单，性能好 | 需处理滚动边界 |
| JS 监听滚动 | 动态计算位置 | 灵活 | 复杂，性能开销 |
| CSS position:sticky | 粘性定位 | 原生支持，简单 | 需要合适的容器结构 |

#### 决策
采用 **CSS position:sticky** 方案，配合调整 HTML 结构。

#### 理由
1. 浏览器原生支持，性能最佳
2. 无需 JavaScript，更简洁
3. 自动处理滚动边界

#### 实现要点
```html
<!-- post.html 调整为两栏布局 -->
<div class="post-wrapper">
  <article class="post">...</article>
  <aside class="post-toc-sidebar">
    <nav class="post-toc">...</nav>
  </aside>
</div>
```

```css
.post-wrapper {
  display: flex;
  gap: 2rem;
}
.post-toc-sidebar {
  width: 250px;
  flex-shrink: 0;
}
.post-toc {
  position: sticky;
  top: 80px; /* 头部高度 */
}
```

---

### ADR-2：分类卡片整体可点击方案

#### 背景
当前只有卡片内的 `<a>` 文字可点击。

#### 方案对比

| 方案 | 实现方式 | 优点 | 缺点 |
|------|----------|------|------|
| 卡片包裹 `<a>` | 整个卡片用 `<a>` 包裹 | 语义正确 | 需调整 HTML 结构 |
| JS 点击事件 | 监听卡片点击 | 无需改 HTML | 需 JS，语义不佳 |
| CSS 伪元素覆盖 | `::after` 覆盖整个卡片 | 无需改 HTML | 技巧性强 |

#### 决策
采用 **卡片包裹 `<a>`** 方案。

#### 理由
1. 语义正确，对无障碍友好
2. 无需 JavaScript
3. 实现简单直观

#### 实现要点
```html
<!-- 原结构 -->
<div class="category-card">
  <h3><a href="...">Linux</a></h3>
  <p>3 篇笔记</p>
</div>

<!-- 新结构 -->
<a href="..." class="category-card">
  <h3>Linux</h3>
  <p>3 篇笔记</p>
</a>
```

---

## 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `_layouts/post.html` | 修改 | TOC 移出文章，改为右侧边栏 |
| `assets/css/main.css` | 修改 | 添加右侧 TOC 样式，修改卡片样式 |
| `index.html` | 修改 | 分类卡片改为 `<a>` 包裹 |

## 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 移动端布局错乱 | 中 | 中 | 响应式隐藏右侧 TOC |
| 卡片样式变化 | 低 | 低 | 重置 `<a>` 默认样式 |

## 向后兼容性

- 现有文章无需修改
- URL 结构保持不变
