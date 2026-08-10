---
title: LeetCode Hot100 - 二叉树回顾与总结
tags:
  - LeetCode
  - Hot100
  - 二叉树
  - BST
  - 满二叉树
  - 完全二叉树
description: 二叉树知识点总结：满二叉树、完全二叉树、BST、DFS/BFS遍历
aliases:
  - 二叉树总结
---

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

# 层序遍历（BFS）

```javascript
const levelOrder = (root) => {
	if(!root) return null
	let queue = [root]
	while(queue.length) {
		let node = queue.shift()
		node.left && queue.push(node.left)
		node.right && queue.push(node.right)
	}
}

const levelOrderNormal = (root) => {
	if(!root) return null
	let queue = [root]
	let deep = 0
	while(queue.length) {
		let len = queue.length
		for(let i =0; i<len; i++) {
			let node = queue.shift()
			node.left && queue.push(node.left)
			node.right && queue.push(node.right)
		}
		deep++
	}
}
```

# hoot 100 链表题目分类

### LeetCode HOT 100 - 二叉树专题题解思路归纳表

| **分类大项**                                                        | **对应题目**                                                                                                                                             | **难度** | **核心切入点 / 解题大招**                                                                            |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| **1. 基础 DFS 与同步递归**<br><br>  <br><br>_(培养树形递归的直觉)_              | [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal?envType=problem-list-v2&envId=2cktkvj)                                     | 简单     | 基础递归模板（或使用迭代栈）。                                                                             |
|                                                                 | [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree?envType=problem-list-v2&envId=2cktkvj)                                                      | 简单     | **双指针同步递归**：同时比较 `left.left` 与 `right.right`，以及 `left.right` 与 `right.left`。                |
|                                                                 | [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree?envType=problem-list-v2&envId=2cktkvj)                                                  | 简单     | 从根节点开始，递归交换每个节点的左右子树。                                                                       |
|                                                                 | [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees?envType=problem-list-v2&envId=2cktkvj)                                              | 简单     | 同步遍历两棵树，将对应节点的值相加，若某方为空则直接接入另一方的子树。                                                         |
| **2. 自底向上信息回溯**<br><br>  <br><br>_(利用子树返回的状态做决策)_               | [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree?envType=problem-list-v2&envId=2cktkvj)                                     | 简单     | 经典自底向上计数：`max(左子树深度, 右子树深度) + 1`。                                                           |
|                                                                 | [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree?envType=problem-list-v2&envId=2cktkvj)                        | 中等     | **经典回溯**：DFS 寻找目标节点。若左右子树都有返回值，说明当前节点为最近公共祖先；若只有单侧有值，向上传递该值。                                |
| **3. BFS 与层序遍历**<br><br>  <br><br>_(按“层”处理的唯一解法)_               | [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal?envType=problem-list-v2&envId=2cktkvj)                                | 中等     | **队列（Queue）模板**：每轮通过 `size = queue.size()` 锁死当前层节点数，一次性弹完一整层。                               |
| **4. 二叉搜索树（BST）特性利用**<br><br>  <br><br>_(掌握 `左 < 根 < 右` 与中序升序)_ | [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree?envType=problem-list-v2&envId=2cktkvj)                                        | 中等     | 方法一：中序遍历看结果是否递增。<br><br>  <br><br>方法二：DFS 传递上下界动态约束 `(min, max)`。                           |
|                                                                 | [538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree?envType=problem-list-v2&envId=2cktkvj)                                  | 中等     | **反向中序遍历（右 -> 根 -> 左）**：遍历结果是降序的，配合全局变量一路累加并赋值。                                             |
|                                                                 | [96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees?envType=problem-list-v2&envId=2cktkvj)                                        | 中等     | **动态规划（卡特兰数）**：枚举每个节点 $i$ 做根，其组合数 = `左边 (i-1) 个节点的 BST 树量` $\times$ `右边 (n-i) 个节点的 BST 树量`。 |
| **5. 树形 DP 与全局状态打卡**<br><br>  <br><br>_(树里的进阶高频大厂题)_            | [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree?envType=problem-list-v2&envId=2cktkvj)                                            | 简单     | 递归函数返回**单侧最大高度**；但在递归内部，动态用 `左高度 + 右高度` 更新全局最大直径。                                           |
|                                                                 | [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum?envType=problem-list-v2&envId=2cktkvj)                                   | 困难     | 与 543 题同理：递归返回**单侧最大路径和**（负数贡献则舍弃）；内部用 `左路径 + 右路径 + 根` 更新全局最大和。                             |
|                                                                 | [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii?envType=problem-list-v2&envId=2cktkvj)                                                 | 中等     | **树形 DP**：递归返回数组 `[偷当前节点的值, 不偷当前节点的值]`。当前节点偷，子节点就绝不能偷。                                      |
|                                                                 | [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii?envType=problem-list-v2&envId=2cktkvj)                                                     | 中等     | **DFS + 哈希前缀和**：类似数组前缀和，向下遍历时哈希表记录累加和，查找是否存在 `当前和 - 目标值` 的历史记录。                             |
| **6. 序列重构与指针扁平化**<br><br>  <br><br>_(考察对空间存储结构的理解)_             | [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal?envType=problem-list-v2&envId=2cktkvj) | 中等     | 前序首位确定根节点，在中序中用哈希表定位根节点，切分出左右子树边界，递归构建。                                                     |
|                                                                 | [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list?envType=problem-list-v2&envId=2cktkvj)                               | 中等     | 寻找左子树的最右下角节点（前序遍历中的前驱节点），将原右子树接到它后面，然后把整个左子树移到右边。                                           |
|                                                                 | [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree?envType=problem-list-v2&envId=2cktkvj)                        | 困难     | 用带 `null` 标记的前序 DFS（或 BFS）将树压成一维字符串；反序列化时按同样顺序还原。                                           |

## 相关笔记

- [[JavaScript 算法基础第四天|树与二叉树]]
- [[LeetCode Hot100 二叉树|二叉树(一)]]
- [[LeetCode Hot100 二叉树 二|二叉树(二)]]
- [[LeetCode Hot100 二叉树 三|二叉树(三)]]
