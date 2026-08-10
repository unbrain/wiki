---
title: LeetCode Hot100 - 未分类
tags:
  - LeetCode
  - Hot100
  - 数组
  - 矩阵
description: 旋转图像(48)、合并区间(56)等未分类题目
---

[48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

解题思路 对角线加对称

```javascript
var rotate = function(matrix) {
    let n = matrix.length
    for(let i = 0; i< n; i++) {
        for(let j = i+1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }

    for(let i = 0; i< n;i++){
        matrix[i].reverse()
    }
    return matrix
};
```

  
[56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

```javascript
var merge = function(intervals) {
    if(!intervals.length) return []
    intervals.sort((a, b) => a[0] - b[0])
    const res = [intervals[0]]
    let last = res[0]

    for(let i = 1; i< intervals.length;i++) {
        let curr = intervals[i]
        let last = res[res.length - 1]
        if(curr[0]>last[1]) {
            res.push(curr)
            last = curr
        } else {
            last[1] < curr[1] && (last[1] = curr[1])
        }
    }

    return res
};
```


[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

```javascript
var minPathSum = function(grid) {
    let col = grid.length
    let row = grid[0].length

    for(let i = 1; i < col; i++){
        grid[i][0] += grid[i-1][0]
    }

    for(let i = 1; i < row; i++){
        grid[0][i] += grid[0][i-1]
    }

    for(let i = 1; i< col; i++) {
        for(let j = 1; j<row; j++) {
            grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1])
        }
    }

    return grid[col - 1][row - 1]
};    
```

## 相关笔记

- [[LeetCode Hot100 动态规划|动态规划]]（最小路径和）
- [[LeetCode Hot100 二分查找|二分查找]]
- [[经典 150 矩阵|矩阵]]（旋转图像）
- [[经典 150 区间|区间]]（合并区间）