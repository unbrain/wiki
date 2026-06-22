[22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

```javascript
var generateParenthesis = function(n) {
    const res = []

    const backTrack = (left, right, str) => {
        if(str.length === 2*n) {
            res.push(str)
            return
        }

        if(left < n) {
            backTrack(left+1,right, str+'(')
        }

        if(right < left) {
            backTrack(left, right+1, str+')')
        }

    }

    backTrack(0, 0, '')
    return res
};
```


[494. 目标和](https://leetcode.cn/problems/target-sum/)

```javascript
var findTargetSumWays = function(nums, target) {
    let res = 0
    const backtrack = (count, index) => {
        if(index === nums.length ) {
            if(count === target) {
                res++
            }
        } else {
            backtrack(count + nums[index], index+1)
            backtrack(count - nums[index],index+1)
        } 
    }
    backtrack(0, 0)
    return res
};
```