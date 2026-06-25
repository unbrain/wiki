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