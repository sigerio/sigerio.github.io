---
layout: post
title: "Kconfig配置语法详解"
date: 2025-11-28
category: Linux
tags: [Kconfig, 嵌入式, 配置系统]
toc: true
---

Kconfig是Linux内核及嵌入式项目中广泛使用的配置系统，本文详解其核心语法。

## 参考文档

官方文档：[Kconfig Language](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html)

## 核心语法

### 1. depends on - 依赖关系

`depends` 修饰词指定条目的可见性，当父条目不可见时，该条目也不可见。

### 2. 类型声明

每个条目都必须声明类型：`int`、`string`、`bool` 等。

### 3. prompt - 提示词

`prompt` 用于替代类型后面的默认字符串，作为展示给用户的提示词。

### 4. select - 强制选中

当前条目被选中时，无论被启用条目是否可见，都会更改其选中状态。

```
config SELECT_A
    bool "Select A"
    select WILL_BE_ENABLED
```

### 5. imply - 软依赖

当条目被选中时，会同时选中依赖条目，但此依赖条目可手动取消。

### 6. visible if vs depends on

- `depends on` 隐藏的依赖项可以被kconfig菜单显示出来
- `visible if` 所隐藏的是真正的隐藏，在条件满足之前永远无法显示

### 7. menu/endmenu - 菜单定义

`menu` 和 `endmenu` 必须成对出现，用于将内部定义扩充在一个菜单内。

### 8. help - 帮助文本

help文本必须放到config项的最后。选中某个条目后输入 `?` 即可查看help内容。

### 9. tristate - 三元选择

`MODULES` 是启用三元项 `tristate` 的关键，必须在整个菜单首声明 `MODULES` 之后，才可以进行三元选择（y/m/n）。
