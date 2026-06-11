[461. 汉明距离](https://leetcode.cn/problems/hamming-distance/)

```javascript
var hammingDistance = function(x, y) {
    return (x ^ y).toString(2).split('').filter(item => +item).length
};
```

[494. 目标和](https://leetcode.cn/problems/target-sum/)

```javascript
var findTargetSumWays = function(nums, target) {
    let count = 0

    const backtrack = (nums, target, index, sum) => {
        if(index === nums.length) {
            if(sum === target) {
                count++
            }
        } else {
            backtrack(nums, target, index+1, sum+nums[index])
            backtrack(nums, target, index+1, sum-nums[index])
        }
    }
    backtrack(nums, target, 0, 0)
    return count
};
```

[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

```javascript
var coinChange = function(coins, amount) {
    if(!amount) {
        return 0
    }

    let dp = Array.from({length: amount+1}, () => Infinity)

    dp[0] = 0
    for(let i = 0; i< coins.length; i++) {
        for(let j = coins[i]; j<= amount; j++) {
            dp[j] = Math.min(dp[j -coins[i]]+1, dp[j])
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
};
```

[448. 找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)（见[[LeetCode Hot100 hash表]]）

```javascript
var findDisappearedNumbers = function(nums) {
    const hash = {}
    for(let i = 0; i< nums.length; i++) {
        const cur = Math.abs(nums[i])
        let num = cur -1
        nums[num] = -1 * Math.abs(nums[num])
    }
    const ret = []
    for(let i = 0; i< nums.length; i++) {
        if(nums[i]>0) {
            ret.push(i+1)
        }
    }
    return ret
};
```
