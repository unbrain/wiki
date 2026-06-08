
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

[406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)

```javascript
var reconstructQueue = function(people) {
	//从高到矮排序，身高相同 `k` 小的在前
    people.sort(([h1,k1], [h2, k2]) => {
        if(h1!==h2) {
            return h2-h1
        } else {
            return k1-k2
        }
    })
    const res = []
    //根据自己的 `k` 值，强行插队
    for(let i = 0; i< people.length;i++){
        const p = people[i]
        res.splice(p[1], 0, p)
    }
    return res
};
```