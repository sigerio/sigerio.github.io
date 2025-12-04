# 项目上下文

## 目的
个人学习笔记博客，用于记录 Linux、STM32、ESP32、Python 等领域的学习心得，基于 GitHub Pages 部署的静态网站。

## 技术栈
- **静态网站生成器**: Jekyll（GitHub Pages 原生支持）
- **模板引擎**: Liquid
- **内容格式**: Markdown + YAML Front Matter
- **样式**: 原生 CSS（无框架依赖）
- **脚本**: 原生 JavaScript（ES5 兼容）
- **数学公式**: KaTeX（CDN 引入）
- **代码高亮**: Rouge（Jekyll 内置）

## 项目约定

### 代码风格
- 所有注释使用中文
- HTML/CSS/JS 使用 2 空格缩进
- Markdown 文件使用 UTF-8 编码
- 文件命名使用小写字母和连字符

### 架构模式
```
sigerio.github.io/
├── _config.yml          # Jekyll 全局配置
├── _layouts/            # 页面布局模板
│   ├── default.html     # 基础布局
│   ├── post.html        # 文章布局
│   └── category.html    # 分类页布局
├── _includes/           # 可复用组件
│   ├── header.html      # 头部导航
│   ├── sidebar.html     # 侧边栏
│   └── footer.html      # 页脚
├── _posts/              # 博客文章（YYYY-MM-DD-title.md）
├── _categories/         # 分类定义页面
├── assets/              # 静态资源
│   ├── css/main.css     # 全局样式
│   ├── js/main.js       # 搜索等交互功能
│   └── images/          # 图片资源
├── categories/          # 分类汇总页
├── search/              # 搜索页面
└── index.html           # 首页
```

### 文章编写规范
- 文件名格式：`YYYY-MM-DD-标题.md`
- 必须包含 Front Matter：
  ```yaml
  ---
  layout: post
  title: "文章标题"
  date: YYYY-MM-DD
  category: Linux|STM32|ESP32|Python
  tags: [标签1, 标签2]
  toc: true
  ---
  ```

### 新增分类流程
1. 在 `_categories/` 目录创建 `分类名.md`
2. 更新 `_includes/sidebar.html` 中的分类列表
3. 更新 `_config.yml` 中的默认分类（如需要）

### Git 工作流程
- 主分支：`main`
- 提交信息格式：`类型: 简要描述`
  - `feat:` 新功能/新文章
  - `fix:` 修复问题
  - `style:` 样式调整
  - `docs:` 文档更新
- 推送到 `main` 分支后 GitHub Pages 自动部署

## 领域上下文

### 学科分类
| 分类 | 描述 |
|------|------|
| Linux | Linux 系统、命令行、Shell 脚本、系统管理 |
| STM32 | STM32 单片机、HAL 库、外设驱动、嵌入式开发 |
| ESP32 | ESP32 开发、WiFi/蓝牙、ESP-IDF、物联网 |
| Python | Python 编程、数据处理、自动化脚本 |

### 富文本功能
- **代码块**: 使用 Markdown 围栏代码块，支持语法高亮
- **数学公式**: 行内 `$公式$`，块级 `$$公式$$`（KaTeX 渲染）
- **图片**: `![描述](/assets/images/图片名.png)`
- **表格**: 标准 Markdown 表格语法

## 重要约束
- GitHub Pages 免费版限制：仓库大小 1GB，带宽 100GB/月
- Jekyll 构建由 GitHub 自动完成，无需本地构建
- 不支持 Jekyll 插件白名单外的插件
- 图片建议压缩后上传，单张不超过 5MB

## 外部依赖
| 依赖 | 用途 | 来源 |
|------|------|------|
| KaTeX | 数学公式渲染 | CDN (jsdelivr) |
| GitHub Pages | 网站托管和自动部署 | GitHub |
| Jekyll | 静态网站生成 | GitHub Pages 内置 |
