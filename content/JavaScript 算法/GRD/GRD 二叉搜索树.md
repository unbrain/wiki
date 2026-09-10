---
title: GRD 二叉搜索树刷题
tags:
  - LeetCode
  - GRD
  - 二叉树
  - 二叉搜索树
  - DFS
  - 中序遍历
description: 二叉搜索树的最近公共祖先、验证二叉搜索树、第 K 小元素等 BST 高频题
aliases:
  - 二叉搜索树刷题
---

[235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(!root || root === p || root === q) {
        return root
    }
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if(left && right) {
        return root
    }
    return left || right
};
```

> 🔁 二刷 2026-09-09：一次通过。变化点：这次用 `root.val === p.val` 值比较，旧版是 `root === p` 引用比较——节点值唯一时两者等价，但树有重复值时值比较会在错误节点上提前命中，**引用比较更稳**。另外这是通用树 O(n) 模板；面试时主动补一句 BST 专用 O(h) 解（都比 root 小往左、都大往右、分岐即答案）是加分项。

[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

```javascript
var isValidBST = function(root) {
    if(!root) return true
    const isValid = (node, lower, upper) => {
        if(!node) return true
        if(node.val <= lower || node.val >= upper) return false
        return isValid(node.left, lower, node.val) && isValid(node.right, node.val, upper)
    }

    return isValid(root, -Infinity, Infinity)
};
```

> 🔁 二刷 2026-09-09：一次通过，上下界递归与旧版一致。边界用 `<=` / `>=` 正确处理了重复值判 false（实测 [2,2,2] → false）；另一种解法是中序遍历严格递增，面试可对比。

[230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)

```javascript
var kthSmallest = function(root, k) {
    const stack = []
    while(stack.length || root) {
        while(root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if(--k === 0) return root.val
        root = root.right
    }
};
```

> 🔄 二刷 2026-09-10：显式栈迭代中序遍历一次通过，时间 O(H + k)，空间 O(H)；早停剪枝避免整树遍历。面试 Follow-up：若树频繁增删且常查第 k 小，可在节点维护以其为根的子树节点数 count 优化至 O(H)。