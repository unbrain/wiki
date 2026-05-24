# 图

## 概念

图由**顶点（Vertex）**和**边（Edge）**组成，记作 `G(V, E)`，是多对多的网状关系。

| 分类 | 说明 |
|------|------|
| 有向图 | 边有方向，A → B 不等同于 B → A |
| 无向图 | 边无方向，A — B 双向互通 |
| 加权图 | 边有权重（距离、成本等） |
| 连通图 | 任意两个顶点之间都有路径相连 |

## 存储方式

### 邻接矩阵

用二维数组表示顶点之间的连接关系，`matrix[i][j]` 表示顶点 `i` 到 `j` 是否有边。

```javascript
// 无向图示例
//    0 — 1
//    |   |
//    2 — 3
const graph = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
]

// 判断 i, j 是否相邻
function isAdjacent(graph, i, j) {
  return graph[i][j] === 1
}
```

**特点：**
- 空间复杂度 O(V²)
- 判断两顶点是否相邻 O(1)
- 遍历所有邻接顶点 O(V)
- 适合稠密图

### 邻接表

用数组（或 Map）存储每个顶点的邻居列表。

```javascript
// 无向图示例
//    0 — 1
//    |   |
//    2 — 3
const graph = [
  [1, 2],    // 0 的邻居
  [0, 3],    // 1 的邻居
  [0, 3],    // 2 的邻居
  [1, 2],    // 3 的邻居
]

// 加权图用对象存储
const weightedGraph = [
  [{ to: 1, weight: 2 }, { to: 2, weight: 5 }],
  [{ to: 0, weight: 2 }, { to: 3, weight: 1 }],
  [{ to: 0, weight: 5 }, { to: 3, weight: 3 }],
  [{ to: 1, weight: 1 }, { to: 2, weight: 3 }],
]
```

**特点：**
- 空间复杂度 O(V + E)
- 遍历邻接顶点 O(deg(v))
- 判断两顶点是否相邻 O(deg(v))
- 适合稀疏图

### 通用图类

```javascript
class Graph {
  constructor() {
    this.adjacencyList = new Map()
  }

  addVertex(v) {
    if (!this.adjacencyList.has(v))
      this.adjacencyList.set(v, [])
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList.get(v1).push(weight ? { node: v2, weight } : v2)
    // 无向图加上反向边
    this.adjacencyList.get(v2).push(weight ? { node: v1, weight } : v1)
  }

  getNeighbors(v) {
    return this.adjacencyList.get(v) || []
  }
}
```

---

# 零阶矩阵

> LeetCode 73. 矩阵置零（Set Matrix Zeroes）

给定一个 `m × n` 的矩阵，如果某个元素为 `0`，则将其所在行和列的所有元素设为 `0`。

**要求：原地操作（O(1) 额外空间）**

```
输入：
[1, 1, 1]    [1, 0, 1]
[1, 0, 1] →  [0, 0, 0]
[1, 1, 1]    [1, 0, 1]
```

## 思路

用第一行和第一列作为标记位，记录对应列/行是否需要置零。

```javascript
function setZeroes(matrix) {
  const m = matrix.length
  const n = matrix[0].length
  let firstRowHasZero = false
  let firstColHasZero = false

  // 检查第一行和第一列是否有 0
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true
      break
    }
  }
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true
      break
    }
  }

  // 用第一行和第一列标记需要置零的行列
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0
        matrix[0][j] = 0
      }
    }
  }

  // 根据标记置零
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0)
        matrix[i][j] = 0
    }
  }

  // 处理第一行
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++)
      matrix[0][j] = 0
  }

  // 处理第一列
  if (firstColHasZero) {
    for (let i = 0; i < m; i++)
      matrix[i][0] = 0
  }

  return matrix
}
```

- 时间复杂度：O(m × n)
- 空间复杂度：O(1)

## 最简写法

```javascript
var setZeroes = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  let col0 = false

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) col0 = true
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0)
        matrix[i][0] = matrix[0][j] = 0
    }
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0)
        matrix[i][j] = 0
    }
    if (col0) matrix[i][0] = 0
  }

  return matrix
}
```

---

# 图的深度优先遍历（DFS）

沿着一条路径走到尽头，再回溯走另一条。

## 邻接表版本

```javascript
// 图结构
//   0 — 1 — 3
//   |   |
//   2 — 4
const graph = [
  [1, 2],    // 0
  [0, 3, 4], // 1
  [0, 4],    // 2
  [1],       // 3
  [1, 2],    // 4
]
```

### 递归实现

```javascript
function dfs(graph, start) {
  const visited = new Set()

  function traverse(node) {
    if (visited.has(node)) return
    console.log(node)
    visited.add(node)
    for (const neighbor of graph[node])
      traverse(neighbor)
  }

  traverse(start)
}
// 输出: 0 → 1 → 3 → 4 → 2
```

### 栈实现（非递归）

```javascript
function dfs(graph, start) {
  const visited = new Set()
  const stack = [start]

  while (stack.length) {
    const node = stack.pop()
    if (visited.has(node)) continue
    console.log(node)
    visited.add(node)
    for (const neighbor of graph[node])
      stack.push(neighbor)
  }
}
// 输出: 0 → 2 → 4 → 1 → 3（顺序依赖栈入栈顺序）
```

### 通用 Graph 类上的 DFS

```javascript
function dfs(graph, start) {
  const visited = new Set()
  const stack = [start]

  while (stack.length) {
    const node = stack.pop()
    if (visited.has(node)) continue
    console.log(node)
    visited.add(node)

    const neighbors = graph.adjacencyList.get(node) || []
    for (const neighbor of neighbors) {
      const next = neighbor.node || neighbor
      stack.push(next)
    }
  }
}
```

---

# 图的广度优先遍历（BFS）

逐层遍历，先访问离起点最近的顶点。

```javascript
function bfs(graph, start) {
  const visited = new Set()
  const queue = [start]
  visited.add(start)

  while (queue.length) {
    const node = queue.shift()
    console.log(node)

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
}
// 输出: 0 → 1 → 2 → 3 → 4
```

## 两层 BFS（记录层级）

```javascript
function bfsLevel(graph, start) {
  const visited = new Set()
  const queue = [start]
  visited.add(start)
  let level = 0

  while (queue.length) {
    const len = queue.length
    console.log(`level ${level}:`, queue.slice())
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    level++
  }
}
```

# DFS vs BFS 对比

| | DFS | BFS |
|------|------|-----|
| 数据结构 | 栈（或递归） | 队列 |
| 空间 | O(h)，h 为深度 | O(w)，w 为最大宽度 |
| 适用场景 | 连通性、路径存在、拓扑排序 | 最短路径、层级遍历 |
| 遍历顺序 | 先深后广 | 层层推进 |

# 练习题

| 题号 | 题目 | 说明 |
|------|------|------|
| 65 | [有效数字](https://leetcode.cn/problems/valid-number/) | 状态机 / 正则 |
| 133 | [克隆图](https://leetcode.cn/problems/clone-graph/) | DFS / BFS 拷贝 |
| 417 | [太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/) | 反向 DFS |
