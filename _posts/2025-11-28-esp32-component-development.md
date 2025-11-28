---
layout: post
title: "ESP32组件开发入门"
date: 2025-11-28
category: ESP32
tags: [ESP-IDF, 组件, CMake]
toc: true
---

学习如何在ESP-IDF中创建和配置自定义组件。

## 创建组件

使用以下命令创建组件：

```bash
idf.py -C components create-component components_name
```

创建完成后的文件结构：

```
components/
└── components_name
    ├── CMakeLists.txt
    ├── include
    │   └── components_name.h
    └── components_name.c
```

## 配置CMakeLists.txt

### 组件的CMakeLists.txt

在 `components/CMakeLists.txt` 中引入所需的依赖库：

```cmake
idf_component_register(SRCS "led_blink.c"
                    INCLUDE_DIRS "include"
                    REQUIRES other_components_name)
```

`REQUIRES` 用于声明依赖的其他组件，如 `driver`、`freertos` 等。

### 主程序的CMakeLists.txt

在 `main/CMakeLists.txt` 中添加组件依赖：

```cmake
idf_component_register(SRCS "main.c"
                    INCLUDE_DIRS "."
                    REQUIRES components_name)
```

然后在 `main.c` 中包含头文件：

```c
#include "components_name.h"
```

## 添加Kconfig配置

如果组件需要菜单配置，在组件目录下新建 `Kconfig` 文件：

```
menu "My Component Config"

config MY_COMPONENT_OPTION
    bool "Enable my option"
    default y
    help
        Enable or disable my component option.

endmenu
```

生成的menu将会在 `menuconfig` 的 **Component config** 最后显示。
