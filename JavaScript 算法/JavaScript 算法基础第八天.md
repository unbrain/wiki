# 分治法

## 原理

分治法（Divide and Conquer）的核心思想：**分而治之**。

```
        原问题
        /    \
   子问题1  子问题2  ← 分解（Divide）
      ↓        ↓
   子结果1   子结果2   ← 递归求解（Conquer）
        \    /
       合并结果       ← 合并（Combine）
```

三个步骤：
1. **Divide（分解）** — 将原问题拆分为若干个规模更小的子问题
2. **Conquer（求解）** — 递归求解子问题，直到子问题足够小直接返回
3. **Combine（合并）** — 将子问题的解合并为原问题的解

### 适用特征
- 问题可以分解为**相互独立**的子问题（无重叠 → 分治；有重叠 → 动态规划）
- 子问题的解可以合并为原问题的解
- 子问题规模缩小到一定程度可直接求解

### 经典应用

| 算法/场景 | 分解 | 合并 |
|---------|------|------|
| 归并排序 | 从中间切分成两个子数组 | 合并两个有序数组 |
| 快速排序 | 选 pivot，分成左右两组 | 无需合并，递归组装 |
| 二分搜索 | 取中间值与目标比较，选一侧 | 无需合并 |
| 二叉树遍历 | 左子树 + 右子树 | 组合左右结果 |
| 汉诺塔 | n-1 个盘子移动 | 单盘移动 + 子问题组合 |

---

## 题目

- [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/) — 二分搜索分治，每次排除一半
```javascript
var guessNumber = function(n) {
    const rec = (low, high) => {
        if(low>high) return;
        let mid = Math.floor(low+high)
        const res = guess(mid)
        if(!res) {
            return mid
        } else if(res === 1) {
            return rec(mid+1, high)
        } else {
            return rec(low, mid-1)
        }
    }

    return rec(1, n)
};
```
- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) — 翻转左右子树，递归到叶子
```javascript
var invertTree = function(root) {
    if(!root) return null
    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
};
```
- [100. 相同的树](https://leetcode.cn/problems/same-tree/) — 比较根节点后递归比较左右子树
```javascript
var isSameTree = function(p, q) {
    if(!p && !q) return true
    if(p?.val === q?.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)) {
        return true
    }
    return false
};
```
- [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/) — 镜像比较两棵子树是否对称
