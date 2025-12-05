# 提案：博客功能增强与问题修复

## 变更标识
- **change-id**: `enhance-blog-features`
- **创建日期**: 2025-11-27
- **状态**: 草案

## 背景

基于 `openspec/project.md` 规范对当前代码进行审查，发现以下问题和改进点需要处理。

## 问题摘要

### 问题1：文章目录（TOC）功能不可用 [严重]

**现状**：`_layouts/post.html` 使用了 `{{ content | toc_only }}` 过滤器

**问题**：`toc_only` 不是 Jekyll/Liquid 标准过滤器，会导致目录无法渲染

**影响**：文章内目录功能完全失效

### 问题2：分类管理硬编码 [中等]

**现状**：`_includes/sidebar.html` 中分类列表硬编码为字符串
```liquid
{% assign categories = "Linux,STM32,ESP32,Python" | split: "," %}
```

**问题**：新增分类需要修改多处文件（sidebar.html、index.html、categories/index.html）

**影响**：不符合 project.md 中"便于维护"的要求

### 问题3：搜索数据作用域受限 [低]

**现状**：`searchData` 仅在 `search/index.html` 页面生成

**问题**：头部搜索框只能跳转到搜索页，无法即时搜索

**影响**：用户体验略有不便，但功能可用

### 问题4：Jekyll 配置与 GitHub Pages 兼容性 [低]

**现状**：`_config.yml` 使用了 `jekyll-feed`、`jekyll-sitemap`、`jekyll-seo-tag` 插件

**验证**：这些插件在 GitHub Pages 白名单内 ✓

**状态**：无需修改

## 范围

本提案聚焦于修复关键功能问题，不涉及新功能开发：

| 范围 | 包含 |
|------|------|
| 核心修复 | TOC 目录功能修复 |
| 优化改进 | 分类动态管理 |
| 暂不处理 | 搜索即时预览（当前方案可用） |

## 成功标准

1. 文章页面能正确显示目录导航
2. 新增分类只需在 `_categories/` 创建文件，无需修改其他代码
3. 所有现有功能保持正常运行

## 相关文档

- `openspec/project.md` - 项目规范
- `_layouts/post.html` - 文章布局
- `_includes/sidebar.html` - 侧边栏组件
