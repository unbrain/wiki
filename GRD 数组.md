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

[169. 多数元素](https://leetcode.cn/problems/majority-element/)

```javascript
var majorityElement = function(nums) {
    let count = 1
    let res = nums[0]
    for(let i = 1; i < nums.length; i++) {
        if(count === 0 && res !== nums[i]) {
            res = nums[i]
        }
        res !== nums[i] ? count-- : count++
    }
    return res
};
```

[217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate/)

```javascript
var containsDuplicate = function(nums) {
    let set = new Set()
    for(let num of nums) {
        if(set.has(num)) {
            return true
        } else {
            set.add(num)
        }
    }
    return false
};
```

[57. 插入区间](https://leetcode.cn/problems/insert-interval/)

```javascript

```