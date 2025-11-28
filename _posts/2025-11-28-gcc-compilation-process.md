---
layout: post
title: "GCC编译流程详解"
date: 2025-11-28
category: Linux
tags: [GCC, 编译, C语言]
toc: true
---

GCC将源代码编译为可执行文件的完整流程。

## 一、预编译

展开所有以`#`开头的预处理指令（宏定义、头文件包含等）。

```bash
# 基本预编译
gcc -E *.c -o *.i

# 指定头文件路径（多个路径需要多个-I）
gcc -E -Iinclude1 -Iinclude2 *.c -o *.i
```

## 二、编译

将预处理后的文件编译成汇编文件，同时检查语法。

```bash
gcc -S *.i -o *.s
```

## 三、汇编

将汇编文件翻译成二进制目标文件。

```bash
gcc -c *.s -o *.o
```

## 四、链接

将所有目标文件链接成可执行文件。

```bash
gcc file1.o file2.o -o target
```

## 静态库与动态库

### 静态库
- 在编译阶段引入
- 每次引用都会复制一份到程序中
- 占用存储空间较大

### 动态库
- 在系统中只存储一份
- 运行时才调用
- 常用于进程间资源共享

## 简化编译

对于单个文件：

```bash
gcc *.c -o output.out
```
