---
title: 算法基础 - 数组转树（Array to Tree）
tags:
  - 算法基础
  - 哈希表
  - 树
  - 手写题
  - 数据结构
description: 扁平数组转树结构：哈希表索引 + 引用挂载，O(n) 一趟建树
aliases:
  - 数组转树
---

# 数组转树（Array to Tree）

**场景**：后端返回扁平列表 `[{id, parentId, ...}]`（菜单、部门、地区），前端需要组装成树形结构。

## 考点归类

**哈希表 + 引用传递**。核心套路：先用 Map 建 id 索引（O(1) 找父），再遍历一次挂载子树。

## 暴力解（不推荐）

每个节点都去数组里 find 父节点 → **O(n²)**，面试时先提它能体现复杂度意识，然后立刻给出优化版。

## 最优解（哈希表索引）

```javascript
function arrayToTree(items, rootId = 0) {
  const map = new Map()
  // 第一遍：建索引（item 存的是引用）
  for (const item of items) {
    map.set(item.id, item)
  }

  const tree = []
  for (const item of items) {
    item.children = []                          // 统一初始化，防乱序（父可能未遍历到）
    const parent = map.get(item.parentId)       // O(1) 找爹
    if (parent) parent.children.push(item)      // 挂到父节点（push 追加，不覆盖）
    else tree.push(item)                        // 找不到父 → 根（天然支持多根）
  }
  return tree
}
```

## 复杂度

| 解法 | 时间复杂度 | 空间复杂度 | 要点 |
|------|-----------|-----------|------|
| 暴力 find | O(n²) | O(1)（不计输出） | 每节点遍历找父 |
| 哈希表索引 | O(n) | O(n) | Map 存 n 个引用，两趟线性遍历 |

## 易错点

- **乱序**：数组不保证父在前，必须提前统一初始化 `children`，否则子节点先挂载时父的 `children` 是 undefined（报错），或覆盖式赋值丢子树
- **多根**：parentId 找不到父的节点就是根，返回数组天然支持多棵树
- **脏数据**：parentId 指向不存在的 id 会误判为根，业务上需校验
- **循环引用**：A 挂 B、B 挂 A 会死循环，可加 visited 检测（加分项）
- **传引用**：Map 里存的是原引用，改 `children` 即改树本身，这正是 O(1) 挂载的原理

## 变体

- **树转数组**：DFS/BFS 拍平，顺便带上 parentId
- **LeetCode 297**：[二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)（反序列化即数组重建树）

## 关键套路一句话总结

> **建索引（Map 存引用）→ 统一初始化 → 一趟挂载**，把"找父"从 O(n) 降到 O(1)。

## 相关笔记

- [[JavaScript 算法基础第三天|集合与字典]]（Map 的 O(1) 查找）
- [[JavaScript 算法基础第四天|树与二叉树]]（树的基础概念）
- [[JavaScript 算法基础第一天|复杂度分析]]（O(n²) vs O(n)）