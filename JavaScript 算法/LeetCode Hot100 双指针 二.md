[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

解题思路：
双指针  
两头对齐，向中靠拢
谁矮算谁，木桶效应
大则更新，小则灌水

```javascript
    while(left <= right) {
        if (height[left] < height[right]) {
            if(height[left] >= maxLeft) {
                maxLeft = height[left]
            } else {
                count += maxLeft - height[left]
            }
            left++
        } else {
            if(height[right]>=maxRight) {
                maxRight = height[right]
            } else {
                count+=maxRight -height[right]
            }
            right--
        }
    }



    return count
```


[31. 下一个排列](https://leetcode.cn/problems/next-permutation/)

// 1. 爬山：从右往左，只要是上坡(>=)就继续，直到遇到下坡
// 2. 找备胎：从右往左，找第一个比 i 大的数交换
// 3. 逆袭：把 i 后面的降序全部“掀翻”变成升序

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let len = nums.length
    let i = len - 2
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--
    }
    if (i >= 0) {
        let j = len - 1
        while (j>0 && nums[j] <= nums[i]) {
            j--
        }
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
    }


    let left = i + 1
    let right = len - 1
    while (left < right) {
        ;[nums[left], nums[right]] = [nums[right], nums[left]]
        left++
        right--
    }
};
```

[75. 颜色分类](https://leetcode.cn/problems/sort-colors/)

