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

[46. 全排列](https://leetcode.cn/problems/permutations/)

```javascript
var permute = function (nums) {
    let res = []
    let path = []
    let used = Array.from({ length: nums.length }).fill(false)
    const backtrack = () => {
        if(path.length === nums.length) {
            res.push([...path])
            return
        }
        for(let i = 0; i< nums.length;i++) {
            if(!used[i]) {
                path.push(nums[i])
                used[i] = true
                backtrack()
                path.pop()
                used[i] = false
            }
        }
    }
    backtrack()
    return res
};
```


[39. 组合总和](https://leetcode.cn/problems/combination-sum/)

```javascript
var combinationSum = function(candidates, target) {
    const res = []
    const path = []
    candidates.sort((a, b) => a - b)
    const backtrack = (index, remind) => {
        if(remind === 0) {
            res.push([...path])
        }
        for(let i = index; i<candidates.length;i++) {
            if(candidates[i]>remind) break
            path.push(candidates[i])
            backtrack(i, remind-candidates[i])
            path.pop()
        }
    }
    backtrack(0, target)
    return res
};
```