
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