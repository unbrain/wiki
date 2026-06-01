# 动态规划 & 贪心

## 动态规划

### 原理

动态规划（Dynamic Programming, DP）的核心思想：**记住过去，避免重复计算**。

```
          fib(5)
         /      \
    fib(4)     fib(3)
    /    \      /    \
 fib(3) fib(2) fib(2) fib(1)  ← 大量重复
```

**DP vs 分治**：
- 分治：子问题**相互独立**（如归并排序）
- DP：子问题**存在重叠**，需要记忆化

### 三大要素

| 要素 | 说明 | 示例（斐波那契） |
|------|------|-----------------|
| 最优子结构 | 问题的最优解包含子问题的最优解 | fib(5) = fib(4) + fib(3) |
| 重叠子问题 | 子问题被重复计算 | fib(3) 在 fib(5) 和 fib(4) 中都出现 |
| 状态转移方程 | 问题间的递推关系 | dp[i] = dp[i-1] + dp[i-2] |

### 两种实现方式

| 方式 | 方向 | 特点 |
|------|------|------|
| 自顶向下（递归 + 备忘录） | 从大问题向下拆解 | 更直观，但有递归开销 |
| 自底向上（迭代填表） | 从小问题向上推导 | 性能更好，无递归栈开销 |

### 解题模板

```
1. 定义状态（dp[i] 的含义）
2. 找出状态转移方程
3. 确定初始条件 / base case
4. 确定遍历顺序
5. 返回目标结果
```

### 经典题型

| 类型 | 特征 | 示例 |
|------|------|------|
| 一维 DP | 单序列递推 | 斐波那契、爬楼梯、打家劫舍 |
| 二维 DP | 双序列 / 网格 | 最长公共子序列、最小路径和 |
| 背包问题 | 选与不选决策 | 0-1 背包、完全背包 |
| 区间 DP | 区间内合并求最优 | 最长回文子串、石子合并 |
| 树形 DP | 树结构上递推 | 二叉树最大路径和 |

---

## 贪心

### 原理

贪心算法（Greedy）的核心思想：**局部最优 → 全局最优**。

```
每一步都选当前最优的决策，
期望最终结果就是全局最优。
```

### DP vs 贪心

| 对比 | 动态规划 | 贪心 |
|------|---------|------|
| 决策方式 | 考虑所有可能后选最优 | 只选当前最优 |
| 子问题 | 依赖子问题结果 | 独立决策，不依赖 |
| 适用范围 | 更广 | 有限（需满足贪心选择性质） |
| 证明 | 无需 | 需要证明贪心策略正确性 |

### 贪心正确性条件

1. **贪心选择性质** — 通过局部最优能得到全局最优
2. **最优子结构** — 同 DP，子问题的最优解是原问题最优解的一部分

### 经典题型

| 类型 | 特征 | 贪心策略 |
|------|------|---------|
| 区间调度 | 不重叠区间最多数量 | 按结束时间最早选 |
| 跳跃游戏 | 能否跳到末尾 / 最少步数 | 维护最远可达位置 |
| 买卖股票 | 多笔交易求最大利润 | 每天涨幅都吃 |
| 分发饼干 | 满足最多孩子 | 最小饼干满足最小胃口 |

---

## 题目

### 动态规划

- [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/) — 一维 DP，斐波那契递推 | 时间 O(n) 空间 O(1)（优化后）
```javascript
var climbStairs = function(n) {
    if(n<=2) return n
    return climbStairs(n-1) + climbStairs(n-2)
};
```

```javascript
var climbStairs = function(n) {
    const dp = []
    dp[0] = 1
    dp[1] = 2
    if(n<=2) return dp[n-1]
    for(let i =2 ; i< n;i++) {
        temp = dp[0] + dp[1]
        dp[0] = dp[1]
        dp[1] = temp
    }
    return dp[1]
};
```

- [198. 打家劫舍](https://leetcode.cn/problems/house-robber/) — 一维 DP，相邻不能选 | 时间 O(n) 空间 O(n) / O(1)（滚动变量优化）
```javascript
var rob = function(nums) {
    if(nums.length === 1) return nums[0]
    const dp = [nums[0], Math.max(nums[0], nums[1])]
    for(let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i])
    }
    return dp[dp.length-1]
};
```

**空间优化**：dp[i] 只依赖 dp[i-1] 和 dp[i-2]，可用两个变量滚动替代数组 → O(1)：

```javascript
var rob = function(nums) {
    if(nums.length === 1) return nums[0]
    const dp = [nums[0], Math.max(nums[0], nums[1])]
    for(let i = 2; i < nums.length; i++) {
        let temp = Math.max(dp[1], dp[0]+nums[i])
        dp[0] = dp[1]
        dp[1] = temp
    }
    return dp[dp.length-1]
};
```
- [0-1 背包](https://leetcode.cn/problems/partition-equal-subset-sum/) — 二维 DP，选与不选的经典决策（可用 416. 分割等和子集作为入门）
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    const count = nums.reduce((a,b)=>a+b)
    const mid = count / 2
    if(Math.floor(mid) !== mid) return false
const dp = new Array(nums.length).fill(false).map(() => new Array(mid + 1).fill(false));
    if(nums[0] <=  mid) {
        dp[0][nums[0]] = true
    }
    for (let i = 0; i < nums.length; i++) {
        dp[i][0] = true;
    }
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j <=  mid; j++) {
            dp[i][j] = dp[i-1][j]
            if(nums[i] < j) {
                dp[i][j] = dp[i][j] || dp[i-1][j - nums[i]]
            } else if (nums[i] === j) {
                dp[i][j] = true
            }
        }
    }
    return dp[nums.length-1][mid]
};
```
### 贪心

- [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/) — 贪心入门，小饼干喂小胃口
```javascript
var findContentChildren = function(g, s) {
    g.sort((a, b) => a-b)
    s.sort((a,b) => a-b)
    let res=0
    for(let i=0; i< s.length; i++){
        if(g[res]<=s[i]) {
            res++
        }
    }
    return res
};
```
- [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/) — 所有正收益都吃
```javascript
var maxProfit = function(prices) {
    let res = 0
    for(let i=1;i<prices.length;i++) {
        if(prices[i] > prices[i-1]) {
            res+=prices[i] - prices[i-1]
        }
    }
    return res
};
```
