---
title: Retina 屏幕 1px 物理像素边框解决方案
description: 探讨移动端设备像素比 DPR、transform scale 0.5 缩放、border-image 与 viewport 缩放方案
aliases:
  - 1px 方案
tags:
  - css
  - mobile
  - engineering
---

# 移动端 Retina 屏幕 1px 边框解决方案

在高清 Retina 显示屏（DPR = 2 或 3）上，CSS 中的 `1px` 逻辑像素会被映射为 2 或 3 个物理像素，导致边框看起来比设计稿更粗。

## 方案对比与最佳实践

### 1. 伪元素 + Transform Scale（最通用推荐）

通过 `::after` 绝对定位撑满容器，生成 `1px` 边框，再通过 `transform: scale(0.5)` 进行缩小，配合 `transform-origin` 和 `pointer-events: none`：

```css
.border-1px {
  position: relative;
}

.border-1px::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #e0e0e0;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
  pointer-events: none;
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .border-1px::after {
    width: 300%;
    height: 300%;
    transform: scale(0.3333);
  }
}
```

### 2. Box-shadow 阴影模拟

```css
.box-shadow-1px {
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.15);
}
```

### 3. SVG 背景渐变方案

使用 Base64 编码的 1px 高度 SVG 作为 `background-image`。
