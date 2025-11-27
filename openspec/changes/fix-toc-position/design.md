# 设计文档：固定文章目录位置

## 变更标识
- **change-id**: `fix-toc-position`

## 架构决策

### ADR-1：目录固定定位方案

#### 背景
当前使用 `position: sticky`，目录会在容器边界内滚动。

#### 方案对比

| 方案 | 定位方式 | 优点 | 缺点 |
|------|----------|------|------|
| sticky | 粘性定位 | 容器内滚动 | 随容器滚动 |
| fixed | 固定定位 | 完全固定 | 需手动计算位置 |

#### 决策
采用 **position: fixed** 方案。

#### 实现要点
```css
.post-toc {
  position: fixed;
  right: calc((100vw - 1200px) / 2 + 2rem); /* 基于容器宽度计算 */
  top: 80px;
  width: 220px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
```

---

### ADR-2：滚动条样式优化

#### 实现要点
```css
/* 自定义滚动条样式 */
.post-toc::-webkit-scrollbar {
  width: 6px;
}

.post-toc::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.post-toc::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
}
```

---

## 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `assets/css/main.css` | 修改 | 更改 TOC 定位方式，添加滚动条样式 |

## 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 窄屏幕定位问题 | 中 | 中 | 响应式隐藏或调整 |
