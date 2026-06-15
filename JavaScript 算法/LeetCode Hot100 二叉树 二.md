
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