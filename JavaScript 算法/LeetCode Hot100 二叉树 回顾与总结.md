
满二叉树： 节点个数为 2^h - 1 h 为深度

完全二叉树 最后一层可以不满 且完全二叉树至少有一颗满二叉树

二叉搜索树 BST 左子树的每一个节点的值都要小于其父节点的值 而右子树节点值要大于其父节点的值

# 递归遍历（DFS）

```javascript
class TreeNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
	}
}

const dfs = (root) => {
	if(!root) retutn 
	dfs(root.left)
	dfs(root.right)
}
```