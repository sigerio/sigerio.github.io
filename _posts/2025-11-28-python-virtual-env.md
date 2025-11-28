---
layout: post
title: "Python虚拟环境搭建(pyenv)"
date: 2025-11-28
category: Python
tags: [Python, pyenv, 虚拟环境]
toc: true
---

使用pyenv管理Python版本和虚拟环境。

## 安装pyenv

```bash
curl https://pyenv.run | bash
```

## 配置环境变量

添加到 `~/.bashrc`：

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

加载配置：

```bash
source ~/.bashrc
```

## 常用命令

```bash
# 安装Python版本
pyenv install 3.11.7

# 查看已安装版本
pyenv versions

# 创建虚拟环境
pyenv virtualenv 3.11.7 name_of_env

# 激活环境
pyenv activate name_of_env

# 关闭环境
pyenv deactivate name_of_env
```
