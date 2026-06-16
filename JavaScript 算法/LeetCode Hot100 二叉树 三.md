

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