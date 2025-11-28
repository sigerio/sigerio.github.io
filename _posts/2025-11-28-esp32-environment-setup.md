---
layout: post
title: "ESP32开发环境搭建与基础命令"
date: 2025-11-28
category: ESP32
tags: [ESP-IDF, WSL2, 环境配置]
toc: true
---

在WSL2环境下搭建ESP32开发环境，并掌握ESP-IDF的基础命令。

## 环境准备

### 1. 初始化ESP-IDF环境

每次在shell中执行ESP-IDF命令之前，需要先执行export脚本：

```bash
. export.sh
```

注意：`.` 后面需要添加一个空格。

### 2. WSL2串口转发

WSL2无法直接访问Windows的串口，需要使用usbipd进行端口转发。

在PowerShell中执行usbipd命令进行端口转发后，在WSL2中查看对应的串口：

```bash
ls /dev/tty*
```

记住ESP32对应的串口号（如 `/dev/ttyUSB0`）。

## ESP-IDF基础命令

### 1. 项目配置

```bash
# 设置目标芯片
idf.py set-target xxx  # xxx是目标板的芯片型号

# 打开菜单配置界面
idf.py menuconfig
```

### 2. 编译与烧录

```bash
# 编译程序（生成bin文件）
idf.py build

# 烧录代码到ESP32
idf.py -p /dev/ttyUSBx flash

# 监视串口输出
idf.py -p /dev/ttyUSBx monitor

# 烧录后直接进入监视
idf.py -p /dev/ttyUSBx flash monitor
```

### 3. Flash操作

```bash
# 擦除整个flash
idf.py -p /dev/ttyUSBx erase-flash
```

## 创建组件

在现有工程内创建自定义组件：

```bash
# 创建components目录
mkdir components

# 创建组件
idf.py -C components create-component my_component_name
```

执行后会在 `components/my_component_name` 目录下生成组件模板。
