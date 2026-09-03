---
title: "linux 下 python 版本管理"
date: 2019/01/15
tags:
  - 早期博客
  - 朝花夕拾
  - 编程
description: "linux 下 python 版本管理 - 早期技术探索与总结沉淀"
---

> [!note] [[朝花夕拾/index|朝花夕拾 · 历史成长档案]] · 早期足迹
> 本文记录于 2017-2019 年早期前端探索时期，保留当时的真实成长轨迹与思考，归档作技术演进参考。

# linux 下 python 版本管理
### [StartFragment  安装 Mac 包管理软件 brew](https://docs.brew.sh/Linuxbrew)：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
```

bash 报错

```bash
Warning: /home/linuxbrew/.linuxbrew/bin is not in your PATH.
```

参看安装文档还需要

```bash
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
```



<!-- ![1550561657989](/tmp/1550561657989.png) -->
