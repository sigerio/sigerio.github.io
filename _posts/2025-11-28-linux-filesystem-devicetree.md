---
layout: post
title: "Linux文件系统与设备树"
date: 2025-11-28
category: Linux
tags: [Linux, 文件系统, 设备树, DeviceTree]
toc: true
---

Linux文件系统结构及设备树语法详解。

## Linux文件系统

Linux不分盘符，用文件来区分内容：

| 目录 | 功能 |
|------|------|
| boot | 启动文件 |
| dev | 设备树目录 |
| etc | 配置目录 |
| lib | 库目录 |
| media | U盘等外设挂载目录 |
| opt | 可选程序 |
| proc | 挂载虚拟proc文件系统，查看进程信息 |
| var | 常态性变动文件（缓存、log等） |

## 设备树基础

### 版本指定

通过`/dts-v1/;`指定版本，写在dts第一行。

### 头文件包含

```dts
/include/ "xxx.dtsi"
```

### 节点格式

```dts
/dts-v1/;
/{                              // 根节点
    node1{                      // 节点1
        node1_child_node1{      // 子节点
        };
    };
};
```

### 地址和类型

节点名可包含硬件地址信息，如`i2c@1c2c0000`表示位于1c2c0000位置的I2C控制器。

**注意**：这只是增加可读性，实际地址由`reg`属性描述。

### 标签

通过标签可以动态向非根节点添加子节点：

```dts
uart1: serial@80000000 {     // uart1是节点标签
    node1{};
};

&uart1{
    node2{};                  // 通过标签添加节点
};
```

## 常用属性

### model

描述硬件型号，常写在根目录下。

### compatible

描述设备兼容的驱动文件，内核会遍历该属性找对应驱动。

### reg属性

描述节点的寄存器信息，属性值为整数类型。

#### cell语法

```dts
#address-cells = <2>;  // address由2个值表示
#size-cells = <1>;     // size由1个值表示
```

示例：

```dts
/{
    #address-cells = <1>;
    #size-cells = <1>;
    lable_node1:node@0x0000000100000000{
        #address-cells = <2>;
        #size-cells = <1>;
        reg = <0x01  0x20>;
        chile_node{
            reg = <0x0 0x0 0x0>;
        };
    };
};
```

**规则**：子节点继承父节点的规则，自身规则仅作用于其子节点。

### status属性

| 值 | 含义 |
|----|------|
| "okay" | 设备可操作，正常状态 |
| "disabled" | 当前不可操作，未来可能可用 |
| "fail" | 不可操作，检测到错误 |
| "fail-sss" | 同fail，sss为错误详情 |

### device_type

通常只用于cpu节点或memory节点：

```dts
device_type = "cpu";
```

### interrupts属性

```dts
interrupt-parent = <&gpio2>;
interrupts = <29 0>;  // gpio2第29号中断，0为触发方式
```

特殊写法（GIC中断）：

```dts
interrupts = <GIC_SPI 66 1>;  // SPI中断，实际中断号32+66=98，上升沿触发
```

## 注意事项

- 每个语法段结束必须加`;`
- 文件最后一行必须是空白行
- 同一父节点内不可有相同节点名称
- 当节点包含reg属性时，节点名最好包含`@address`
