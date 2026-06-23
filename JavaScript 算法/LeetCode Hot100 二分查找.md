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