---
title: GRD 动态规划刷题
tags:
  - LeetCode
  - GRD
  - 动态规划
  - 背包
description: 爬楼梯、最大子数组和、零钱兑换等动态规划高频题
aliases:
  - 动态规划刷题
---

[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

```javascript
var climbStairs = function(n) {
    let dp  = []
    dp[0] = 1
    dp[1] = 2
    if(n < 2) return dp[n-1]

    for(let i = 2; i < n; i++) {
        let temp = dp[0] + dp[1]
        dp[0] = dp[1]
        dp[1] = temp
    }
    return dp[1]
};
```

[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

```javascript
var maxSubArray = function(nums) {
    let res = nums[0], pre = nums[0]
    for(let i = 1; i < nums.length; i++) {
        pre = Math.max(nums[i], nums[i]+ pre)
        res = Math.max(res, pre)
    }
    return res
};
```

[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

```javascript
var coinChange = function (coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i-coin]+1)
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
};
```

### 详解

- `dp[i]`：凑出金额 `i` 的最少硬币数；外层硬币、内层金额、i 正向（完全背包，硬币可无限复用）
- `dp[i] === Infinity` 则凑不出来，返回 -1
- 完整思路（遍历方向辨析、倒序变 0-1 背包、换序问题）见 [[322 零钱兑换]]

[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

```javascript
var canPartition = function(nums) {
    const sum = nums.reduce((a, b) => a+b, 0)
    if(sum % 2 !== 0) {
        return false
    }
    const target = sum / 2
    const dp = new Array(target + 1).fill(false)
    dp[0] = true

    for(const num of nums){
        for(let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i-num]
        }
    }

    return dp[target]
};
```


[62. 不同路径](https://leetcode.cn/problems/unique-paths/)

```javascript
var uniquePaths = function (m, n) {
    const dp = new Array(n).fill(1)
    for(let i = 1; i < m; i++) {
        for(let j = 1; j< n; j++) {
            dp[j] += dp[j-1]
        }
    }
    return dp[n-1]
};
```
## 相关笔记

- [[经典 150 Kadane 算法|Kadane 算法题目]]（最大子数组和）
- [[JavaScript 算法基础第九天|动态规划基础]]（爬楼梯、状态转移）
- [[LeetCode Hot100 动态规划|动态规划专题]]（不同路径、编辑距离等）
- [[LeetCode Hot100 06|背包与贪心题目]]（分割等和子集）
- [[LeetCode Hot100 05]]（零钱兑换）
- [[322 零钱兑换]]（零钱兑换完整解题思路）
```
