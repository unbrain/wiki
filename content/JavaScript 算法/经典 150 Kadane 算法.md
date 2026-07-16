[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

```javascript
var maxSubArray = function(nums) {
    let sum = nums[0],  pre = 0

    for(let i =1; i< nums.length; i++) {
        pre = Math.max(pre+nums[i], nums[i])
        sum = Math.max(sum, pre)
    }
    return sum
};
```

[918. 环形子数组的最大和](https://leetcode.cn/problems/maximum-sum-circular-subarray/)


```javascript
let total = 0, maxSum = nums[0], minSum = nums[0]
    let curMax = 0, curMin = 0

    for (let num of nums) {
        curMax = Math.max(curMax + num, num)
        maxSum = Math.max(maxSum, curMax)
        curMin = Math.min(curMin + num, num)
        minSum = Math.min(minSum, curMin)
        total += num
    }

    return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum
```