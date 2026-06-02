## 回溯

**回溯** 是一种通过穷举所有可能来寻找解的算法。核心是"**递归 + 状态重置**"：一步步构建解，当发现当前选择无效时，撤销上一步（回溯），尝试其他选择。

### 模板

```typescript
function backtrack(path: number[], used: boolean[], result: number[][]): void {
  if (path.length === nums.length) {
    result.push([...path])
    return
  }

  for (const choice of choices) {
    if (used[choice]) continue
    // 做选择
    path.push(choice)
    used[choice] = true
    backtrack(path, used, result)
    // 撤销选择（回溯）
    path.pop()
    used[choice] = false
  }
}
```

### LeetCode 经典题目

| 题号 | 题目 | 难度 | 解法关键词 |
|------|------|------|-----------|
| 46 | [全排列](https://leetcode.cn/problems/permutations/) | 🟡 中等 | used 数组标记已选 |
| 78 | [子集](https://leetcode.cn/problems/subsets/) | 🟠 中等 | 选或不选 / 回溯 |
| 39 | [组合总和](https://leetcode.cn/problems/combination-sum/) | 🟡 中等 | 可重复选，剪枝 |
| 40 | [组合总和 II](https://leetcode.cn/problems/combination-sum-ii/) | 🟡 中等 | 去重，排序剪枝 |
| 77 | [组合](https://leetcode.cn/problems/combinations/) | 🟡 中等 | startIndex 避免重复 |
| 79 | [单词搜索](https://leetcode.cn/problems/word-search/) | 🟡 中等 | 二维矩阵回溯 |
| 51 | [N 皇后](https://leetcode.cn/problems/n-queens/) | 🔴 困难 | 棋盘回溯 |
| 22 | [括号生成](https://leetcode.cn/problems/generate-parentheses/) | 🟡 中等 | 左右括号计数 |
| 131 | [分割回文串](https://leetcode.cn/problems/palindrome-partitioning/) | 🟡 中等 | 切割问题 |
| 47 | [全排列 II](https://leetcode.cn/problems/permutations-ii/) | 🟡 中等 | 去重 + 排序 |

### 剪枝优化

- **排序去重**：同一层不选相同数字（`i > start && nums[i] === nums[i-1]`）
- **可行性剪枝**：剩余数字不足以组成解时提前终止
- **最优性剪枝**：当前路径已不可能优于已知最优解

### 复杂度

- 时间：O(选择数 ^ 递归深度)，通常是指数/阶乘级别
- 空间：O(递归深度)，即调用栈深度