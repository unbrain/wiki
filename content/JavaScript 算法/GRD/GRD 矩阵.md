---
title: GRD 矩阵刷题
tags:
  - LeetCode
  - GRD
  - 矩阵
  - 数组
description: 螺旋矩阵等矩阵高频题
aliases:
  - 矩阵刷题
---

[54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

```javascript
var spiralOrder = function (matrix) {
    if (matrix.length === 0) return []
    const rows = matrix.length, cols = matrix[0].length
    const res = []
    const DIRS = { right: [1,0], down: [0,1], left: [-1,0], up: [0,-1] }
    let top = 0, bottom = rows - 1, left = 0, right = cols - 1
    let dir = 'right', x = 0, y = 0

    while (res.length < rows * cols) {
        res.push(matrix[y][x])          // ① 先收集当前格
        if (dir === 'right' && x === right) { dir = 'down'; top++ }        // 撞右墙→上边完成，收 top
        else if (dir === 'down' && y === bottom) { dir = 'left'; right-- } // 撞底墙→右边完成，收 right
        else if (dir === 'left' && x === left) { dir = 'up'; bottom-- }    // 撞左墙→下边完成，收 bottom
        else if (dir === 'up' && y === top) { dir = 'right'; left++ }      // 撞顶墙→左边完成，收 left
        const [dx, dy] = DIRS[dir]
        x += dx; y += dy            // ② 沿当前方向走一步
    }
    return res
};
```

详细思路见 [[54 螺旋矩阵]]

## 相关笔记

- [[经典 150 矩阵]]（经典150矩阵专题）