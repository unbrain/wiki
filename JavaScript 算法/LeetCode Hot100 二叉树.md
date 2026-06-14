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

