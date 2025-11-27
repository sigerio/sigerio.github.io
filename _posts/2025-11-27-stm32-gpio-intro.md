---
layout: post
title: "STM32 GPIO 基础配置"
date: 2025-11-27
category: STM32
tags: [GPIO, HAL库, 入门]
toc: true
---

学习 STM32 GPIO 外设的基础配置方法。

## GPIO 简介

GPIO（General Purpose Input/Output）是通用输入输出端口，是单片机最基本的外设。

## 使用 HAL 库配置 GPIO

### 初始化结构体

```c
GPIO_InitTypeDef GPIO_InitStruct = {0};

// 配置为推挽输出
GPIO_InitStruct.Pin = GPIO_PIN_13;
GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
GPIO_InitStruct.Pull = GPIO_NOPULL;
GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;

HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);
```

### 控制 LED 闪烁

```c
while (1)
{
    // 翻转 LED 状态
    HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
    
    // 延时 500ms
    HAL_Delay(500);
}
```

## GPIO 模式说明

| 模式 | 说明 |
|------|------|
| GPIO_MODE_INPUT | 输入模式 |
| GPIO_MODE_OUTPUT_PP | 推挽输出 |
| GPIO_MODE_OUTPUT_OD | 开漏输出 |
| GPIO_MODE_AF_PP | 复用推挽 |

## 总结

GPIO 是学习 STM32 的基础，掌握好 GPIO 配置对后续学习其他外设非常重要。
