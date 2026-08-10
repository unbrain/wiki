---
title: LeetCode Hot100 - 二叉树(三)
tags:
  - LeetCode
  - Hot100
  - 二叉树
  - 树形DP
  - BST
description: 打家劫舍III(337)、BST转累加树(538)等
aliases:
  - 二叉树(三)
---

[337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)

```javascript
var rob = function(root) {
    if(!root) return 0
    const dfs = (node) => {
        if(!node) return [0,0]

        let left = dfs(node.left)
        let right = dfs(node.right)
        let dp0 = Math.max(...left) + Math.max(...right)
        let dp1 = node.val + left[0] + right[0]
        return [dp0, dp1]
    }
    
    return Math.max(...dfs(root, [0, 0]))
};
```


[538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)

```javascript
var convertBST = function(root) {
    if(!root) return root
    let pre = 0
    const dfs = (node) => {
        if(!node) return node
        dfs(node.right)
        pre+=node.val
        node.val = pre
        dfs(node.left)
    }
    dfs(root)
    return root
};
```

[124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

```javascript
var maxPathSum = function(root) {
    let res = -Infinity
    const dfs = (node) => {
        if(!node) return 0

        let left = Math.max(0, dfs(node.left));
        let right = Math.max(0, dfs(node.right));
        res = Math.max(res, node.val + left + right)

        return node.val + Math.max(left , right)
    }
    dfs(root)
    return res
};
```


[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

```javascript
var pathSum = function(root, targetSum) {
    let map = new Map()
    map.set(0, 1)
    let count = 0
    const dfs = (node, preSum) => {
        if(!node) return

        preSum = node.val + preSum
        let target = preSum - targetSum
        if(map.has(target)) {
            count += map.get(target)
        }
        map.set(preSum, (map.get(preSum) || 0) + 1)
        dfs(node.left, preSum)
        dfs(node.right, preSum)
        map.set(preSum, map.get(preSum) -1)
    }
    dfs(root, 0)
    return count
};
```

## 相关笔记

- [[JavaScript 算法基础第四天|树与二叉树]]
- [[LeetCode Hot100 二叉树|二叉树(一)]]
- [[LeetCode Hot100 二叉树 二|二叉树(二)]]
- [[LeetCode Hot100 二叉树 回顾与总结|二叉树总结]]
- [[LeetCode Hot100 动态规划|动态规划]]
- [[GRD 二叉树|GRD 二叉树刷题]]