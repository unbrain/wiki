---
title: LeetCode Hot100 - 动态规划
tags:
  - LeetCode
  - Hot100
  - 动态规划
  - DP
  - 路径问题
description: 不同路径(62)、完全平方数(279)等动态规划题目
aliases:
  - 动态规划
---

[62. 不同路径](https://leetcode.cn/problems/unique-paths/)

```javascript
var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1))
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1]
};
```

[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)

```javascript
var numSquares = function(n) {
    const dp = new Array(n+1).fill(n+1)
    dp[0] = 0
    for(let i=1;i<=n;i++) {
        for(let j=1; j*j<=i;j++) {
            dp[i] = Math.min(dp[i], dp[i-j*j]+1)
        }
    }
    return dp[n]
};
```

[309. 买卖股票的最佳时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

```javascript
var maxProfit = function(prices) {
    const n = prices.length
    if(n===0) return 0
    let dp0 = -prices[0]
    let dp1 = 0
    let dp2 = 0

    for(let i=0; i< n;i++) {
        let new0 = Math.max(dp0,dp2-prices[i])
        let new1 = dp0+prices[i]
        let new2 = Math.max(dp1, dp2)
        dp0 = new0
        dp1 = new1
        dp2 = new2
    }

    return Math.max(dp1, dp2)
};
```


[72. 编辑距离](https://leetcode.cn/problems/edit-distance/)

解题思路：

初始化一个 dp 二维数组


假设我们现在要计算 `dp[i][j]`，我们需要看 `word1` 的第 `i` 个字符（即 `word1[i-1]`）和 `word2` 的第 `j` 个字符（即 `word2[j-1]`）是否相等。

`dp[i][0]`  i -> 0 只能删除 i 个
`dp[0][j]` 0 到 j 只能插入 j 个

如果 word[i-1] === word[j-1] 那就不用操作了 `dp[i][j] === dp[i-1][j-1]`

不然就是去操作里数最小的

替换  `dp[i-1][j-1] +1`
删除  `dp[i-1][j] + 1`
插入  `dp[i][j-1] + 1`


```javascript
var minDistance = function(word1, word2) {
    let dp = Array.from({length: word1.length+1}, () => new Array(word2.length+1).fill(0))

    for(let i = 0; i<= word1.length;i++) {
        dp[i][0] = i
    }
    for(let j = 0; j <=word2.length;j++) {
        dp[0][j] = j
    }
    for(let i = 1; i <= word1.length; i++) {
        for(let j=1;j<=word2.length;j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1
            }
        }
    }
    return dp[word1.length][word2.length]
};
```

## 相关笔记

- [[JavaScript 算法基础第九天|动态规划基础]]
- [[LeetCod Hot100 05|DP与位运算]]
- [[LeetCode Hot100 回溯|回溯]]
- [[LeetCode Hot100 二分查找|二分查找]]