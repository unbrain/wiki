
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

解题思路 动态规划

左边是 i-1 个节点 右边是 n-i个节点

左子树 的组合数 与右子树的组合数相乘是当前 以 $i$ 为根节点的 BST 种类数

对于求 `dp[i]`，我们需要遍历所有可能的根节点 $j$（从 $1$ 到 $i$）：

$$dp[i] = \sum_{j=1}^{i} dp[j-1] \times dp[i-j]$$

```javascript
var numTrees = function(n) {
    const dp = new Array(n+1).fill(0)
    dp[0] = 1
    dp[1] = 1
    for(let i = 2; i<=n; i++) {
        for(let j = 1; j<=i; j++) {
            dp[i] +=dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
};
```

[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

解题思路

前序遍历 所以 preOrder[0] 是根节点  这样就可以将 inorder 分开成左右子树

0+1 又可以将 inorder 左边再次分为左右子树

```javascript
var buildTree = function (preorder, inorder) {
    const indexMap = new Map()

    for(let i = 0; i < inorder.length; i++) {
        indexMap.set(inorder[i], i)
    }

    const buildSubTree = (preLeft, preRight, inLeft, inRight) => {
        if(preLeft > preRight) return null

        const rootVal = preorder[preLeft]
        const root = new TreeNode(rootVal)

        const inorderIndex = indexMap.get(rootVal)
        const subTreeLeftLength = inorderIndex - inLeft

        root.left = buildSubTree(preLeft + 1, preLeft+subTreeLeftLength, inLeft, inorderIndex-1)
        root.right = buildSubTree(preLeft+subTreeLeftLength+1, preRight, inorderIndex + 1, inRight)

        return root
    }


    return buildSubTree(0, preorder.length-1, 0, inorder.length-1)
};
```