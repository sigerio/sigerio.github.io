# 变更提案：格式化FOC系列文章

## 变更ID
`format-foc-posts`

## 概述
对 `_posts` 目录下新增的三篇FOC（磁场定向控制）学习笔记进行格式规范化，补充专有名词解释和公式LaTeX化。

## 涉及文件
| 原文件名 | 新文件名 | 标题 |
|---------|---------|------|
| `2025-12-2-foc-01.md` | `2025-12-02-foc-01.md` | 我与FOC的相识 |
| `2025-12-2-foc-02-clark.md` | `2025-12-02-foc-02-clark.md` | 克拉克(Clark)变换 |
| `2025-12-2-foc-03-park.md` | `2025-12-02-foc-03-park.md` | 帕克(Park)变换 |

## 修改内容

### 一、通用格式修改
1. **文件名日期补零**：`2025-12-2` → `2025-12-02`
2. **tags格式修正**：空格分隔改为逗号分隔数组
3. **添加章节标题层级**：使用Markdown标题结构化内容

### 二、专有名词补充

#### 文件1 (foc-01.md)

| 术语 | 全称 | 解释 |
|------|------|------|
| FOC | Field-Oriented Control | 磁场定向控制，将交流电机控制问题转化为直流电机控制问题 |
| SVPWM | Space Vector PWM | 空间矢量脉宽调制，电压利用率比SPWM高约15% |
| Hall传感器 | Hall Sensor | 霍尔传感器，用于检测转子磁场位置 |
| EKF | Extended Kalman Filter | 扩展卡尔曼滤波，无感控制中估计转子位置和速度 |
| Vα/Vβ | Alpha/Beta Voltage | 两相静止坐标系电压分量 |
| Iq | Q-axis Current | Q轴电流，转矩电流 |
| Id | D-axis Current | D轴电流，励磁电流，通常设为0 |
| BLDC | Brushless DC Motor | 无刷直流电机 |

#### 文件2 (foc-02-clark.md)
- Clark变换定义：由伊迪丝·克拉克(Edith Clarke)于1937-1938年提出
- 等幅值变换系数2/3的物理意义说明

#### 文件3 (foc-03-park.md)
- Park变换定义：将αβ静止坐标系转换为dq旋转坐标系
- dq坐标系与转子同步旋转的说明

### 三、公式LaTeX化

#### Clark变换公式
```latex
$$ I_\alpha = I_a $$
$$ I_\beta = \frac{1}{\sqrt{3}}(I_a + 2I_b) $$
```

#### Park变换公式
```latex
$$ I_d = I_\alpha \cos\theta + I_\beta \sin\theta $$
$$ I_q = -I_\alpha \sin\theta + I_\beta \cos\theta $$
```

#### Park变换矩阵
```latex
$$ \begin{bmatrix} I_d \\ I_q \end{bmatrix} = \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix} \begin{bmatrix} I_\alpha \\ I_\beta \end{bmatrix} $$
```

## 参考资料
- 维基百科：克拉克变换
- CSDN：FOC之Clarke变换和Park变换
- 电子工程专辑：SVPWM原理
