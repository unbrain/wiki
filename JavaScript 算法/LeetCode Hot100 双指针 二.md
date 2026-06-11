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

双指针 0往左边放 2 往右边放 1 自然在中间

```javascript
var sortColors = function(nums) {
    let left = 0
    let right = nums.length-1
    let p1 = 0
    while(left<=right) {
        if(nums[left] === 0){
            [nums[left], nums[p1]] = [nums[p1], nums[left]]
            p1++
            left++
        } else if(nums[left]=== 2) {
            [nums[left], nums[right]] = [nums[right], nums[left]]
            right--
        } else {
            left++
        }
    }
};
```


[581. 最短无序连续子数组](https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/)

```javascript
var findUnsortedSubarray = function(nums) {
    let right = 0
    let maxRight = nums[right]
    let left = nums.length-1
    let minLeft = nums[left]

    for(let i = 1; i < nums.length; i++){
        if(nums[i] < maxRight) {
            right = i
        } else {
            maxRight = nums[i]
        }

        let j = nums.length-1-i
        if(nums[j]> minLeft) {
            left = j
        } else{
            minLeft = nums[j]
        }
    }

    return right > left ? right - left + 1 : 0
};
```


[15. 三数之和](https://leetcode.cn/problems/3sum/)

解题思路：
双指针 先排序 固定一个数寻找另两个数

注意边处理与不重复

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = []
    const len = nums.length
    if(len < 3) return res
    nums.sort((a,b) => a - b)

    for(let i = 0 ; i< len -2; i++){
        if(nums[i]>0) break
        if(i>0 && nums[i] === nums[i-1]) continue

        let left = i+1
        let right = len-1

        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            if(sum === 0) {
                res.push([nums[i], nums[left], nums[right]])
                while(left < right && nums[left] === nums[left+1]) left++
                while(left < right && nums[right] === nums[right-1]) right --
                left++
                right--
            } else if(sum<0) {
                left++
            } else {
                right--
            }
        }
    }

    return res
};
```
