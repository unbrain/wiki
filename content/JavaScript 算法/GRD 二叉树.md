
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