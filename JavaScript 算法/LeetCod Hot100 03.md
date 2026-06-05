
[169. 多数元素](https://leetcode.cn/problems/majority-element/)

```javascript
var majorityElement = function(nums) {
    let num = 1
    let max = nums[0]
    for(let i =1; i < nums.length;i++) {
        if(num === 0) {
            max = nums[i]
        }

        if(nums[i] === max) {
            num++
        } else {
            num--
        }
    }
    return max
};
```

[238. 除了自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

```javascript
var productExceptSelf = function(nums) {
    const len = nums.length
    const res = new Array(len).fill(1)

    for(let i = 1; i < len; i++) {
        res[i] = res[i-1] * nums[i-1]
    }
    let right = 1
    for(let i = len-1; i>=0; i--) {
        res[i] = res[i] * right
        right = right * nums[i]
    }
    return res
};
```

