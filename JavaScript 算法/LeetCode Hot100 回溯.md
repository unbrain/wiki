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

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

```javascript
var letterCombinations = function(digits) {
    if(!digits.length) return []
    const phoneMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }

    const res = []
    const backtrack = (path, index) => {
        if(path.length === digits.length) {
            res.push(path.join(''))
            return
        }
        for(let char of phoneMap[digits[index]]) {
            path.push(char)
            backtrack(path, index+1)
            path.pop()
        }
    }
    backtrack([], 0)
    return res
};
```


[78. 子集](https://leetcode.cn/problems/subsets/)

```javascript
var subsets = function(nums) {
    const res = []
    const path = []
    const backtrack = (index) => {
        res.push([...path])
        for(let i = index; i < nums.length; i++){
            path.push(nums[i])
            backtrack(i+1)
            path.pop()
        }
    }

    backtrack(0)
    return res
};
```


[79. 单词搜索](https://leetcode.cn/problems/word-search/)

```javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    if (word.length === 0) return true
    if (board.length === 0 || board[0].length === 0) return false

    const rows = board.length
    const cols = board[0].length

    const boardCounts = {}
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            boardCounts[board[i][j]] = (boardCounts[board[i][j]] || 0) + 1
        }
    }

    const wordCounts = {}
    for (const char of word) {
        wordCounts[char] = (wordCounts[char] || 0) + 1
        if (!boardCounts[char] || wordCounts[char] > boardCounts[char]) {
            return false
        }
    }

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    const find = (i, j, k) => {
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[k]) {
            return false
        }

        if (k === word.length - 1) return true
        const cur = board[i][j]
        board[i][j] = ''
        for (const [di, dj] of directions) {
            if (find(i + di, j + dj, k + 1)) {
                return true
            }
        }
        board[i][j] = cur
        return false
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (find(i, j, 0)) return true
        }
    }
    return false
};
```


[301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)

```javascript
var removeInvalidParentheses = function(s) {
    let remL = 0, remR = 0;
    for (const char of s) {
        if (char === '(') remL++;
        else if (char === ')') {
            if (remL) remL--;
            else remR++;
        }
    }
    const res = [];

    const dfs = (idx, remL, remR, count, currentStr) => {
        if (count < 0) return;
        if (idx === s.length) {
            if (remL === 0 && remR === 0 && count === 0) res.push(currentStr);
            return;
        }

        const c = s[idx];
        
        // 【终极记忆点】：只有当前括号，不等于我们“刚刚放进新串的那个括号”时，才允许删它！
        // 如果相同，说明刚才留了，现在就不删了，防止重复。
        const canDelete = (currentStr.length === 0 || c !== currentStr.at(-1));

        if (c === '(') {
            // 1. 先保留
            dfs(idx + 1, remL, remR, count + 1, currentStr + c);
            // 2. 后删除
            if (remL > 0 && canDelete) dfs(idx + 1, remL - 1, remR, count, currentStr);
            
        } else if (c === ')') {
            // 1. 先保留
            dfs(idx + 1, remL, remR, count - 1, currentStr + c);
            // 2. 后删除
            if (remR > 0 && canDelete) dfs(idx + 1, remL, remR - 1, count, currentStr);
            
        } else {
            // 字母直接留
            dfs(idx + 1, remL, remR, count, currentStr + c);
        }
    };

    dfs(0, remL, remR, 0, '');
    return res;
};
```