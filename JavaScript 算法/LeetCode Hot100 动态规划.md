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

