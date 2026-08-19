# GRD 递归

[46. 全排列](https://leetcode.cn/problems/permutations/)

```javascript
var permute = function (nums) {
    const res = []
    const used = new Array(nums.length).fill(false)
    const path = []
    const backtrack = () => {
        if (path.length === nums.length) {
            res.push([...path])   // 必须拷贝：path 是引用，后续 pop 会改掉已存结果
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue   // 该位置已被选过
            path.push(nums[i])
            used[i] = true
            backtrack()
            path.pop()              // 撤销选择，与"做选择"对称
            used[i] = false
        }
    }
    backtrack()
    return res
};
```

- 时间复杂度：O(n!·n)，n! 个排列，每个拷贝 path 花费 O(n)
- 空间复杂度：O(n)，递归深度 n + path + used（不含 res 结果集）

关键套路：回溯 = 递归 + 撤销选择，做几个操作撤销时对称撤回几个；`used` 按下标标记位置，不是标记值本身。

[78. 子集](https://leetcode.cn/problems/subsets/)

```javascript
var subsets = function(nums) {
    const res = []
    const path = []
    const backtrack = (start) => {
        res.push([...path])                  // 每个节点都是答案，进函数无条件收集
        for(let i = start; i < nums.length; i++) {  // 只往前走，不许回头
            path.push(nums[i])
            backtrack(i+1)                   // 下一层从 i+1 开始，防止重复选
            path.pop()
        }
    }
    backtrack(0)
    return res
};
```

- 时间复杂度：O(n·2ⁿ)，2ⁿ 个子集，每个拷贝 path 花费 O(n)
- 空间复杂度：O(n)，递归深度 n + path（不含 res 结果集）

关键套路：子集与全排列的区别——全排列用 `used` 数组（可回头防重选），子集用 `start` 指针（不许回头）；子集**每层都收答案**，全排列选满才收。

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

```javascript
var letterCombinations = function(digits) {
    if(!digits.length) return []
    const phoneMap = {
        2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
        6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz'
    }
    const res = []
    const path = []
    const backtrack = (start) => {
        if(path.length === digits.length) {
            res.push(path.join(''))   // join 生成新字符串，无需拷贝
            return
        }
        const num = phoneMap[digits[start]]
        for(let i = 0; i < num.length; i++) {
            path.push(num[i])
            backtrack(start+1)
            path.pop()
        }
    }
    backtrack(0)
    return res
};
```

- 时间复杂度：O(3ᵐ × 4ⁿ)，m 个映射 3 字母的数字，n 个映射 4 字母的数字
- 空间复杂度：O(m + n)，递归深度 + path（不含 res 结果集）

关键套路：每层选**不同按键**的字母，天然不重复，不需要 used 也不需要 start 防回头，用 index 当层指针即可；横向换兄弟靠 for 循环迭代，纵向走深靠递归。