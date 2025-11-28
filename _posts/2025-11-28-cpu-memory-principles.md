---
layout: post
title: "CPU与内存工作原理"
date: 2025-11-28
category: Linux
tags: [计算机组成, CPU, Cache, 内存]
toc: true
---

深入理解CPU如何访问内存、缓存机制以及多核数据一致性。

## 存储层次结构

从快到慢、从小到大的层次结构：

```
CPU内部: 寄存器
        L1 Cache (SRAM)
        L2 Cache (SRAM)
        L3 Cache (SRAM)
内存:    DRAM
硬盘:    SSD/HDD
```

存储器一般只与相邻的存储设备进行通信。

## Cache结构

Cache由多个Cache Line组成，Cache Line是CPU从内存读取数据的基本单位。

**Cache Line结构**: `Tag + Data Block`

其中Tag标记了Data Block的各种信息，如是否有效等。

## 直接映射

假设8个Cache Line，32个内存块：

```
Cache Line0: Block0 Block8  Block16 Block24
Cache Line1: Block1 Block9  Block17 Block25
...
Cache Line7: Block7 Block15 Block23 Block31
```

访问Block n时，计算 `n % m` 即可知道存在于哪个Cache Line。

## CPU写入机制

### 写直达
判断数据是否在cache中，在则直接写入内存，不在则先写入cache再写入内存。

### 写回
仅写入cache，当cache line被标记为dirty且被替换时才写回内存。

## MESI协议

解决多核系统的内存一致性问题：

| 状态 | 含义 |
|------|------|
| M (Modified) | 已修改，数据与内存不一致 |
| E (Exclusive) | 独占，可自由写入 |
| S (Shared) | 共享，需广播通知其他核心 |
| I (Invalidated) | 已失效，需重新加载 |

## 伪共享问题

当两个物理地址连续的数据处于同一Block中，多核分别修改会导致cache频繁失效。

**解决办法**: 将连续数据加载至不同的cache line中。
