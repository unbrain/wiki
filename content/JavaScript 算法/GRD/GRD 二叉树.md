---
title: GRD 二叉树刷题
tags:
  - LeetCode
  - GRD
  - 二叉树
  - DFS
  - BFS
description: 翻转二叉树、平衡二叉树、最大深度、层序遍历等二叉树高频题
aliases:
  - 二叉树刷题
---

[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

```javascript
var invertTree = function(root) {
    if(!root) return root
    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
};
```

[110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

```javascript
var isBalanced = function(root) {
    const height = (node) => {
        if(!node) return 0
        let left = height(node.left)
        if(left === -1) return -1
        let right = height(node.right)
        if(right === -1) return -1
        if(Math.abs(left-right)>1) return -1
        return Math.max(left, right)+1
    }
    return height(root) !== -1
};
```

[543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)

```javascript
var diameterOfBinaryTree = function(root) {
    let max = 0
    const dfs = (node) => {
        if(!node) return 0
        const left = dfs(node.left)
        const right = dfs(node.right)
        max = Math.max(max, left+right)
        return Math.max(left, right) + 1
    }
    dfs(root)
    return max
};
```

## 相关笔记

- [[JavaScript 算法基础第四天|树与二叉树基础]]
- [[经典 150 二叉树|二叉树题目]]
- [[LeetCode Hot100 二叉树|二叉树专题]]（翻转、最大深度、层序遍历）

[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

```javascript
var maxDepth = function(root) {
    if(!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

```javascript
var levelOrder = function(root) {
   if(!root) return []
   const res = []
   const queue = [root]
   while(queue.length) {
        let len = queue.length
        res.push([])
        while(len--){
            let curr = queue.shift()
            res[res.length-1].push(curr.val)
            curr.left && queue.push(curr.left)
            curr.right && queue.push(curr.right)
        }

   }
   return res
};
```