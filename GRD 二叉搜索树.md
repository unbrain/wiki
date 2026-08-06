
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


