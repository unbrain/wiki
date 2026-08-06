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