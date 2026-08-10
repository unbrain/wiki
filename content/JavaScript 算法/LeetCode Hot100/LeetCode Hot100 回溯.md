---
title: LeetCode Hot100 - 回溯
tags:
  - LeetCode
  - Hot100
  - 回溯
  - 递归
  - 括号
description: 括号生成(22)、目标和(494)等回溯题目
aliases:
  - 回溯
---

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


### LeetCode Hot100 回溯题目解题思路一览表

|**题号与题目**|**核心解题思路（怎么想）**|**状态管理（怎么写）**|**关键剪枝与去重技巧（怎么优化）**|
|---|---|---|---|
|**[22. 括号生成](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#22-%E6%8B%AC%E5%8F%B7%E7%94%9F%E6%88%90)**|**合法括号对拼接**<br><br>  <br><br>从空字符串开始，每次面临加 `(` 还是加 `)` 的抉择。|**隐式回溯**<br><br>  <br><br>通过 `str + '('` 传参，利用字符串不可变性由系统栈自动恢复。|**分支限界**：<br><br>  <br><br>1. 左括号数量 `< n` 才能加左括号。<br><br>  <br><br>2. 右括号数量 `< 左括号数量` 才能加右括号。|
|**[494. 目标和](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#494-%E7%9B%AE%E6%A0%87%E5%92%8C)**|**二叉决策树穷举**<br><br>  <br><br>对数组中的每一个数字，分别尝试在其前面加上 `+` 号或 `-` 号。|**隐式回溯**<br><br>  <br><br>通过 `count + nums[index]` 传参，无需手动还原累加值。|**边界触底**：<br><br>  <br><br>当 `index === nums.length` 时判定结果是否等于 `target`，无中途剪枝。|
|**[46. 全排列](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#46-%E5%85%A8%E6%8E%92%E5%88%97)**|**置换无重复数组**<br><br>  <br><br>每一层都从头遍历整个数组，选择未被使用的数字填入当前位置。|**显式回溯**<br><br>  <br><br>需要手动 `path.push(nums[i])`，并在递归返回后 `path.pop()`。|**哈希标记**：<br><br>  <br><br>维护一个 `used` 布尔数组，遇到 `used[i] === true` 的元素直接跳过。|
|**[39. 组合总和](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#39-%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C)**|**可重复选取的完全背包**<br><br>  <br><br>维护一个剩余目标值 `remind`，每次决策从当前索引开始往后选。|**显式回溯**<br><br>  <br><br>路径数组使用 `path.push()` 与 `path.pop()` 维护，同时递归传入当前 `i`。|**排序 + 提前终止**：<br><br>  <br><br>数组先升序排序。循环中一旦遇到 `candidates[i] > remind`，直接 `break` 终止当前层循环。|
|**[17. 电话号码的字母组合](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#17-%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E7%9A%84%E5%AD%97%E6%AF%8D%E7%BB%84%E5%90%88)**|**多重树状映射组合**<br><br>  <br><br>根据数字输入，逐层映射到对应的字母字符串，遍历字符向下递归。|**显式回溯**<br><br>  <br><br>虽然是字符串组合，但代码中采用了 `path.push(char)` 与 `path.pop()` 数组维护。|**按长收网**：<br><br>  <br><br>当 `path.length === digits.length` 时将结果转为字符串并收集返回。|
|**[78. 子集](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#78-%E5%AD%90%E9%9B%86)**|**收集所有树节点**<br><br>  <br><br>遍历生成幂集的过程，每个节点都是一个合法的子集。|**显式回溯**<br><br>  <br><br>使用 `path.push()` 和 `path.pop()` 并在进入递归时拷贝路径 `[...path]`。|**防止回头**：<br><br>  <br><br>通过控制循环起点 `i = index`，在递归时传入 `i + 1`，保证元素只向后组合，避免产生重复组合。|
|**[79. 单词搜索](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#79-%E5%8D%95%E8%AF%8D%E6%90%9C%E7%B4%A2)**|**二维网格图深度优先搜索**<br><br>  <br><br>在矩阵中寻找匹配起点，然后向上下左右四个方向扩散匹配下一个字符。|**显式回溯（网格置空）**<br><br>  <br><br>访问时 `board[i][j] = ''` 标记已访问，四向探索完后 `board[i][j] = cur` 还原。|**全局前置剪枝**：<br><br>  <br><br>在启动 DFS 之前先统计网格所有字母频率，如果网格中某个字母总数少于 word 中的需要量，**直接返回 false**。|
|**[301. 删除无效的括号](https://github.com/unbrain/wiki/blob/main/content/JavaScript%20%E7%AE%97%E6%B3%95/LeetCode%20Hot100/LeetCode%20Hot100%20%E5%9B%9E%E6%BA%AF.md#301-%E5%88%A0%E9%99%A4%E6%97%A0%E6%95%88%E7%9A%84%E6%8B%AC%E5%8F%B7)**|**高级 DFS（保留与删除双决策）**<br><br>  <br><br>先算出必须删除的 `remL` 和 `remR` 数量。DFS 过程中对每个括号做“留”或“删”的选择。|**隐式回溯**<br><br>  <br><br>新串通过 `currentStr + c` 累加传递，不改变当前层状态。|**相邻同字符去重**：<br><br>  <br><br>只有当前括号不等于新串末尾括号时才允许执行删除（`canDelete`），防止因删除连续相同括号产生重复结果。|

---

### 💡 复习核心口诀

- **算组合，控起点：** 只要是求**组合/子集**（如 39、78），递归时一定要控制 `index`，防止回头选到重复组合。
    
- **算排列，用 `used`：** 只要是求**全排列**（如 46），每次都要从 `0` 重新遍历，必须用 `used` 数组或哈希表防止重复选同一个位置。
    
- **传引用，必 `pop`：** 只要你的路径变量 `path` 是一个**数组**，在调用完递归函数后，绝对不要漏掉 `path.pop()` 撤销选择！

## 相关笔记

- [[JavaScript 算法基础第十天|回溯基础]]
- [[LeetCode Hot100 动态规划|动态规划]]
- [[LeetCode Hot100 二叉树|二叉树]]

