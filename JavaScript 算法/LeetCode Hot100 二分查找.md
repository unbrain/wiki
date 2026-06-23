[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)

```javascript
var lengthOfLIS = function(nums) {
    if(!nums.length) return 0
    const tails = []

    for(let num of nums) {
        let left = 0
        let right = tails.length - 1

        while(left <=right) {
            let mid = Math.floor((left+right) / 2)
            if(tails[mid]<num) {
                left = mid + 1
            } else {
                right = mid-1
            }
        }

        tails[left] = num
    }
    return tails.length
};
```

[287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

```javascript
var findDuplicate = function(nums) {
    let slow = nums[0]
    let fast = nums[0]

    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while(fast != slow)
    slow = nums[0]

    while(fast !== slow) {
        slow = nums[slow]
        fast = nums[fast]
    }

    return fast
};
```

```javascript
var findDuplicate = function(nums) {
    let low = 1
    let high = nums.length -1

    while(low < high) {
        let mid = Math.floor((low+high) / 2)
        let count = 0
        for(let num of nums) {
            if(num<= mid) {
                count++
            }
        }

        if(count > mid) {
            high = mid
        } else {
            low = mid+1
        }
    }

    return low
};
```


[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

```javascript
var searchMatrix = function(matrix, target) {
    let row = 0
    let col = matrix[0].length -1

    while(row < matrix.length && col>=0) {
        let num = matrix[row][col]
        if(num === target) {
            return true
        } else if(num > target) {
            col--
        } else {
            row++
        }
    }
    return false
};
```

[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

```javascript
var searchRange = function(nums, target) {
    const lowerBound = (val) => {
        let left = 0
        let right = nums.length - 1
        let ans = nums.length

        while(left <= right) {
            let mid = Math.floor((left + right) / 2)
            if(nums[mid] >= val) {
                ans = mid
                right = mid -1
            } else {
                left = mid+1
            }
        }
        return ans
    }
    
    let start = lowerBound(target)

    if(start === nums.length || nums[start] !== target) {
        return [-1,-1]
    }
    const end = lowerBound(target+1)-1
    return [start, end]
};
```