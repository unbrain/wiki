[1. 两数之和](https://leetcode.cn/problems/two-sum/)

```javascript
var twoSum = function(nums, target) {
    const map = {}
    for(let i = 0; i< nums.length;i++) {
        if(map[nums[i]] !== undefined) return [i, map[nums[i]]] 
        let res = target - nums[i]
        map[res] = i
    }
};
```

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

```javascript
var maxProfit = function(prices) {
    let min = prices[0]
    let res = 0
    for(let i = 1; i<prices.length; i++) {
        min = Math.min(min, prices[i])
        res = Math.max(res, prices[i] - min)
    }
    return res
};
```