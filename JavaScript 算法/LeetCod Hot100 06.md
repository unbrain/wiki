
[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

```javascript
var canPartition = function(nums) {
    const sum = nums.reduce((a, b) => a+b)
    if(sum % 2 !== 0) return false
    const target = sum / 2
    const dp = new Array(target+1).fill(false)
    dp[0] = true
    for(let i = 0; i < nums.length; i++) {
        for(let j = target; j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j -nums[i]]
        }
    }

    return dp[target]
};
```