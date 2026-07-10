# 树

## 概念

树是一种非线性数据结构，由节点和边组成，具有层次关系。每个节点可以有多个子节点，但只有一个父节点（根节点除外）。

## 场景

- DOM 树
- 级联选择组件
- 树形控件
- 文件系统

## 结构定义

```javascript
class TreeNode {
  constructor(val) {
    this.val = val
    this.children = []
  }
}
```

## 树的遍历

### 广度优先遍历（BFS）

```javascript
const bfs = (tree) => {
  const queue = [tree]
  while (queue.length) {
    const node = queue.shift()
    console.log(node.val)
    queue.push(...node.children)
  }
}
```

### 深度优先遍历（DFS）

```javascript
const dfs = (tree) => {
  console.log(tree.val)
  tree.children.forEach(dfs)
}
```

## 二叉树

每个节点最多有两个子节点（左子节点、右子节点）。

```javascript
class BinaryTreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
```

### 前序遍历

根 → 左 → 右

```javascript
// 递归
const preorder = (root) => {
  if (!root) return
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}

// 非递归（栈）
const preorder = (root) => {
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    console.log(node.val)
    stack.push(node.right)
    stack.push(node.left)
  }
}
```

### 中序遍历

左 → 根 → 右

```javascript
// 递归
const inorder = (root) => {
  if (!root) return
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}

// 非递归（栈）
const inorder = (root) => {
  const stack = []
  let node = root
  while (stack.length || node) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    console.log(node.val)
    node = node.right
  }
}
```

### 后序遍历

左 → 右 → 根

```javascript
// 递归
const postorder = (root) => {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}

// 非递归（栈）
const postorder = (root) => {
  const stack = [root]
  const output = []
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    output.push(node.val)
    stack.push(node.left)
    stack.push(node.right)
  }
  output.reverse()
  console.log(output)
}
```

### 遍历对比

| 遍历方式 | 顺序 | 递归 |
|----------|------|------|
| 前序 | 根 → 左 → 右 | 自顶向下 |
| 中序 | 左 → 根 → 右 | 左 → 根 → 右 |
| 后序 | 左 → 右 → 根 | 自底向上 |
| BFS | 逐层 | 队列实现 |

## 练习题

- [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree)

```javascript
var maxDepth = function (root) {
  if (!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree)

```javascript
var minDepth = function (root) {
  if (!root) return 0
  if (!root.left) return minDepth(root.right) + 1
  if (!root.right) return minDepth(root.left) + 1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal)

```javascript
var levelOrder = function (root) {
  if (!root) return []
  const queue = [root]
  const result = []
  while (queue.length) {
    const level = []
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal)

```javascript
var inorderTraversal = function (root) {
  const stack = []
  const result = []
  let node = root
  while (stack.length || node) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    result.push(node.val)
    node = node.right
  }
  return result
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [112. 路径总和](https://leetcode.cn/problems/path-sum)

```javascript
var hasPathSum = function (root, targetSum) {
  if (!root) return false
  if (!root.left && !root.right) return root.val === targetSum
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val)
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

遍历 json 所有节点值

```javascript
const json = {
a: {b: {c:1}}
d: [1,2]
}

const dfs = (json, path) => {
	console.log(json, path)
	Object.keys(json).forEach(node => {
		dfs(json[node], path.contact(node))
	})
}

dfs(json, [])
```


渲染 Antd 的树组件

