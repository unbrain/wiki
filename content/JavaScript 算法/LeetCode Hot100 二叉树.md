---
title: LeetCode Hot100 - 二叉树
tags:
  - LeetCode
  - Hot100
  - 二叉树
  - 递归
  - DFS
description: 最近公共祖先(236)、翻转二叉树(226)等二叉树题目
aliases:
  - 二叉树
---

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root === null || root === p || root === q){
        return root
    }

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if(right !== null && left !== null) {
        return root
    }

    return left || right
};
```

[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

```javascript
var invertTree = function(root) {
    if(!root) return root
    return {
        val: root.val,
        right: invertTree(root.left),
        left: invertTree(root.right)
    }
};
```

[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

```javascript
var inorderTraversal = function (root) {
    if(!root) return []
    let stack = []
    let res = []
    let p = root
    while(stack.length || p) {
        while(p){
            stack.push(p)
            p = p.left
        }
        let item = stack.pop()
        res.push(item.val)
        item.right && (p = item.right)
    }
    return res
};
```

[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)


```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return false
    const isMirror = (left, right) => {
        if(!left && !right) return true
        if(left?.val === right?.val && isMirror(left?.left, right?.right) && isMirror(left?.right, right?.left)) {
            return true
        }
        return false
    }

    return isMirror(root.left, root.right)
};
```

[543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)

```javascript
var diameterOfBinaryTree = function(root) {
    let max = 0

    const findLong = (node) => {
        if(node === null) {
            return 0
        }

        let leftLong = findLong(node.left)
        let rightLong = findLong(node.right)

        max = Math.max(max, leftLong+rightLong)

        return Math.max(leftLong, rightLong) + 1
    }

    findLong(root)
    return max
};
```


[617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)

```javascript
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
    if(root1 === null) {
        return root2
    }
    if(root2 === null) {
        return root1
    }
    root1.val+=root2.val
    root1.left = mergeTrees(root1.left, root2.left)
    root1.right = mergeTrees(root1.right, root2.right)

    return root1
};
```

## 相关笔记

- [[JavaScript 算法基础第四天|树与二叉树]]
- [[LeetCode Hot100 二叉树 二|二叉树(二)]]
- [[LeetCode Hot100 二叉树 三|二叉树(三)]]
- [[LeetCode Hot100 二叉树 回顾与总结|二叉树总结]]