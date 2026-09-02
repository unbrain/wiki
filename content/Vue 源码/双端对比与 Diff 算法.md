---
title: Vue 3 双端对比与最长递增子序列 Diff 算法
description: 深入解析 Vue 3 中 patchKeyedChildren 双端比较、中间乱序处理与 LIS 最长递增子序列优化
aliases:
  - patch
tags:
  - vue
  - diff
  - algorithm
  - source-code
---

# Vue 3 双端对比与 LIS Diff 算法

Vue 3 在对比有 key 的子节点序列（`patchKeyedChildren`）时，结合了**双端预判**与**最长递增子序列（Longest Increasing Subsequence）**，最大化减少真实 DOM 移动操作。

## 阶段一：头部与尾部双端预判

1. **左侧同步（Sync from start）**：从索引 `0` 开始对比，若新旧 `vnode` 相同则 patch，直到遇到不同节点停止。
2. **右侧同步（Sync from end）**：从两端末尾开始向左对比，直到遇到不同节点停止。

```typescript
// 1. sync from start
let i = 0;
const l2 = c2.length;
let e1 = c1.length - 1;
let e2 = l2 - 1;

while (i <= e1 && i <= e2) {
  const n1 = c1[i];
  const n2 = c2[i];
  if (isSameVNodeType(n1, n2)) {
    patch(n1, n2, container, parentComponent, parentAnchor);
  } else {
    break;
  }
  i++;
}

// 2. sync from end
while (i <= e1 && i <= e2) {
  const n1 = c1[e1];
  const n2 = c2[e2];
  if (isSameVNodeType(n1, n2)) {
    patch(n1, n2, container, parentComponent, parentAnchor);
  } else {
    break;
  }
  e1--;
  e2--;
}
```

## 阶段二：增删简单情况

- 若 `i > e1 && i <= e2`：旧节点已遍历完，新节点多出，执行**挂载新增节点**。
- 若 `i > e2 && i <= e1`：新节点已遍历完，旧节点多出，执行**卸载多余旧节点**。

## 阶段三：乱序与最长递增子序列（LIS）

当两侧对比完毕后，中间存在未知顺序的子序列：
1. 构建 `keyToNewIndexMap` 快速查找旧节点在新列表中的映射。
2. 构建 `newIndexToOldIndexMap`（初始为 0），记录新节点在旧列表里的索引位置。
3. 计算 `newIndexToOldIndexMap` 的**最长递增子序列**，得到保持相对稳定无需移动的索引列表。
4. 倒序遍历，对于不在 LIS 中的节点执行 `move`（插入），最大化复用已有 DOM。

```typescript
function getSequence(arr: number[]): number[] {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```
