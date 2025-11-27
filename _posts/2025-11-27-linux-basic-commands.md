---
layout: post
title: "Linux 常用命令入门"
date: 2025-11-27
category: Linux
tags: [命令行, 入门, Shell]
toc: true
---

这是一篇关于 Linux 常用命令的学习笔记。

## 文件操作命令

### ls - 列出目录内容

```bash
# 列出当前目录
ls

# 列出详细信息
ls -l

# 显示隐藏文件
ls -la
```

### cd - 切换目录

```bash
# 进入目录
cd /home/user

# 返回上级目录
cd ..

# 返回家目录
cd ~
```

## 文本处理

### grep - 文本搜索

```bash
# 在文件中搜索关键词
grep "keyword" filename.txt

# 递归搜索目录
grep -r "pattern" /path/to/dir
```

## 数学公式示例

行内公式：质能方程 $E = mc^2$

块级公式：

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

## 图片示例

插入图片的语法：

```markdown
![图片描述](/assets/images/example.png)
```

## 总结

以上是 Linux 入门的基础命令，熟练掌握这些命令是学习 Linux 的第一步。
