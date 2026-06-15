
[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

解题思路

根据二叉树原理 左子树不能大于其任意更节点 右子树不能小于任意根节点

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

[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

解题思路 使用 队列 先进先出 遍历每一层

```javascript
var levelOrder = function(root) {
    if(!root) return []
    const queue = [root]
    const res = []
    while(queue.length) {
        let len = queue.length
        res.push([])
        while(len--){
            const current = queue.shift()
            res[res.length-1].push(current.val)
            current.left && queue.push(current.left)
            current.right && queue.push(current.right)
        }
    }
    return res
};
```

[114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

```javascript
var flatten = function(root) {
    let pre = null

    const dfs = (node) => {
        if(!node) return
        dfs(node.right)
        dfs(node.left)

        node.right = pre
        node.left = null
        pre = node
    }
    dfs(root)
};
```


[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root === q || root === p || !root) {
        return root
    }

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if(left !== null && right !== null) {
        return root
    }
    return left || right
};
```


[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```javascript

```