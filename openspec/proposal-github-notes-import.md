# GitHub笔记导入博客计划

## 概述

扫描 sigerio GitHub账户的所有仓库，收集笔记性md文档，分类后导入到博客 `_posts` 目录。

## 扫描结果

### 仓库总览（共18个）

| 仓库名 | 类型 | 笔记数量 |
|--------|------|----------|
| study_esp32 | 自建 | 2篇 |
| study_kconfig_sconscrip | 自建 | 1篇 |
| learn_rust | 自建 | 0（仅代码） |
| my_function_lib | 自建 | 0（仅代码） |
| TTS_Learn | 自建 | 0（空项目） |
| learn_OpenGL | 自建 | 0（空项目） |
| tools | 自建 | 0（工具存储） |
| project_work | 自建 | 0（空项目） |
| M23-RTT-FRT | 自建 | 0（仅代码） |
| 其他Fork仓库 | Fork | 不处理 |

### 发现的笔记文档

#### 1. ESP32环境配置笔记
- **来源**: `study_esp32/1、认识esp32库`
- **内容摘要**:
  - WSL2下ESP-IDF环境配置
  - usbipd串口转发方法
  - idf.py常用命令（set-target、menuconfig、build、flash、monitor）
  - flash擦除命令
- **建议分类**: ESP32
- **建议标题**: ESP32开发环境搭建与基础命令

#### 2. ESP32组件开发笔记
- **来源**: `study_esp32/2、esp32之初识组件`
- **内容摘要**:
  - 组件创建命令
  - CMakeLists.txt配置方法
  - Kconfig配置方法
- **建议分类**: ESP32
- **建议标题**: ESP32组件开发入门

#### 3. Kconfig语法笔记
- **来源**: `study_kconfig_sconscrip/note.md`
- **内容摘要**:
  - Kconfig关键字解析（depends、select、imply、menu等）
  - 三元选择（tristate）配置
  - help文本使用方法
- **建议分类**: Linux（或新建"嵌入式开发"分类）
- **建议标题**: Kconfig配置语法详解

## 决策结果

### Kconfig笔记的分类归属

**已决定**: 归类到现有的 `Linux` 分类

## 执行计划

### 阶段1: 分类确认
- 确认Kconfig笔记的分类归属
- 确认是否需要新建分类

### 阶段2: 文章转换
- 将笔记转换为Jekyll博客格式
- 添加front matter（layout、title、date、category、tags、toc）
- 优化格式和排版

### 阶段3: 文件创建
- 在 `_posts` 目录创建对应的md文件
- 文件命名格式：`YYYY-MM-DD-标题.md`

## 预期产出

| 文章标题 | 分类 | 标签 |
|----------|------|------|
| ESP32开发环境搭建与基础命令 | ESP32 | [ESP-IDF, WSL2, 环境配置] |
| ESP32组件开发入门 | ESP32 | [ESP-IDF, 组件, CMake] |
| Kconfig配置语法详解 | Linux | [Kconfig, 嵌入式, 配置系统] |
| Rust变量与数据类型基础 | Rust | [变量, 数据类型, 入门] |
