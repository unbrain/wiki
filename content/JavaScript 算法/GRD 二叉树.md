
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