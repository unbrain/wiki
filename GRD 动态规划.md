
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