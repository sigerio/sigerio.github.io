# sigerio.github.io

个人学习笔记博客，基于 Jekyll + GitHub Pages 构建。

## 在线访问

🔗 **博客地址**：[https://sigerio.github.io](https://sigerio.github.io)

---

## 快速开始

### 1. 如何增加科目分类

在 `_categories/` 目录下创建一个新的 `.md` 文件，文件名即为分类标识。

**示例：创建 RTOS 分类**

创建文件 `_categories/RTOS.md`，内容如下：

```yaml
---
layout: category
title: RTOS 笔记
category_name: RTOS
description: 实时操作系统学习笔记
---
```

**字段说明：**
| 字段 | 说明 |
|------|------|
| `layout` | 固定为 `category` |
| `title` | 分类页面标题 |
| `category_name` | 分类标识，需与文件名一致 |
| `description` | 分类描述（可选） |

创建后，侧边栏和首页会自动显示新分类。

---

### 2. 如何对文章进行分类

在文章的 Front Matter 中设置 `category` 字段，值为分类标识。

**示例：**

```yaml
---
layout: post
title: "文章标题"
date: 2025-11-27
category: Linux    # 分类标识，需与 _categories 中的 category_name 一致
tags: [标签1, 标签2]
toc: true
---
```

**注意：** 每篇文章只能属于一个分类。

---

### 3. 如何增加文章

在 `_posts/` 目录下创建一个新的 `.md` 文件。

**文件命名规则：** `YYYY-MM-DD-文章标题.md`

**示例：创建一篇 Linux 文章**

创建文件 `_posts/2025-11-27-linux-network-config.md`，内容如下：

```markdown
---
layout: post
title: "Linux 网络配置入门"
date: 2025-11-27
category: Linux
tags: [网络, 配置]
toc: true
---

这里是文章正文内容...

## 第一章

### 1.1 小节

正文内容...
```

**Front Matter 字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `layout` | 是 | 固定为 `post` |
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `category` | 是 | 分类标识 |
| `tags` | 否 | 标签列表 |
| `toc` | 否 | 是否显示目录，默认 `true` |

---

### 4. 如何添加图片

**步骤：**
1. 将图片放入 `assets/images/` 目录（如目录不存在请创建）
2. 在文章中使用 Markdown 语法引用

**语法：**

| 类型 | 语法 |
|------|------|
| 基础图片 | `![描述](/assets/images/文件名.png)` |
| 带标题 | `![描述](/assets/images/文件名.png "标题")` |
| 指定宽度 | `<img src="/assets/images/文件名.png" width="500">` |

**示例：**

```markdown
![网络拓扑图](/assets/images/network-topology.png)
```

**建议：**
- 文件名使用英文或拼音，避免中文和空格
- 推荐格式：PNG（截图/图表）、JPG（照片）、GIF（动图）
- 大图建议压缩后上传，加快页面加载

---

## 目录结构

```
sigerio.github.io/
├── _posts/           # 博客文章
├── _categories/      # 分类定义
├── _layouts/         # 页面布局模板
├── _includes/        # 可复用组件
├── assets/           # 静态资源 (CSS/JS/图片)
├── _config.yml       # Jekyll 配置
└── index.html        # 首页
```

## 部署

推送到 `main` 分支后，GitHub Pages 会自动构建部署。