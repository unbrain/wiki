---
title: 算法基础 - 复杂度与数据结构
tags:
  - 算法基础
  - 算法
  - 数据结构
  - 时间复杂度
  - 空间复杂度
  - 栈
  - 队列
description: 数据结构与算法入门，时间/空间复杂度分析，栈和队列的实现与应用
---

## 数据结构与算法简介

> **比喻**：数据结构是**容器**，算法是**操作方法**。
> 就像厨房里——食材怎么放（容器），决定了做菜时拿取快不快（操作）。

### 什么是数据结构？

**数据结构**是计算机存储、组织数据的方式。好的数据结构能让算法更高效。

| 类别   | 示例         | 特点           |     |
| ---- | ---------- | ------------ | --- |
| 线性结构 | 数组、链表（详见 [[JavaScript 算法基础第二天]]）、栈、队列 | 数据按顺序排列      |     |
| 树形结构 | 二叉树、平衡树、堆（详见 [[JavaScript 算法基础第四天]]） | 一对多层级关系      |     |
| 图形结构 | 有向图、无向图（详见 [[JavaScript 算法基础第五天]]） | 多对多网状关系      |     |
| 哈希结构 | 哈希表、哈希集合（详见 [[JavaScript 算法基础第三天]]） | 键值映射，O(1) 查找 |     |

### 什么是算法？

**算法**是解决问题的步骤和方法。与数据结构配合使用，决定程序的效率。

### 为什么需要学？

- 性能优化：同一道题，不同算法可能差成千上万倍
- 应对面试：大厂必考
- 工程能力：写出可维护、可扩展的代码

### 核心概念

- **时间复杂度**：算法执行时间随输入规模增长的趋势
- **空间复杂度**：算法占用内存随输入规模增长的趋势

---

## 时间复杂度

衡量算法执行时间随输入规模增长的变化趋势，使用 **大 O 表示法**。

| 记号 | 名称 | 示例 |
|------|------|------|
| O(1) | 常数阶 | 数组随机访问 |
| O(log n) | 对数阶 | 二分查找 |
| O(n) | 线性阶 | 遍历数组 |
| O(n log n) | 线性对数阶 | 归并排序、堆排序 |
| O(n²) | 平方阶 | 冒泡排序、嵌套循环 |
| O(2ⁿ) | 指数阶 | 斐波那契递归（未优化） |
| O(n!) | 阶乘阶 | 旅行商问题（暴力解） |

### 趋势对比

O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

**增长曲线图（n=16 时）**

```
n=16 时的操作次数（示意）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O(n²)   ████████████████████████████████████████████████ 256
O(2ⁿ)   ████████████████████████████████████████████████ 65536
O(n!)   ████████████████████████████████████████████████ 2.1e13
O(n log n) ████████████████████ 59
O(n)      ██████████ 16
O(log n)  ████ 4
O(1)     █ 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

| n=10 | O(1) | O(log n) | O(n) | O(n log n) | O(n²) | O(2ⁿ) |
|------|------|----------|------|------------|-------|-------|
| 操作数 | 1 | 3 | 10 | 33 | 100 | 1024 |
| 耗时(1ms/次) | 1ms | 3ms | 10ms | 33ms | 0.1s | 1s |
| 耗时(10ms/次) | 10ms | 30ms | 0.1s | 0.33s | 1s | 10s |

### 简化规则

- 忽略常数系数：O(2n) → O(n)
- 忽略低阶项：O(n² + n) → O(n²)
- 取最大阶：O(n² + n log n) → O(n²)

### 常见递归时间复杂度

- T(n) = T(n-1) + O(1) → O(n)
- T(n) = T(n/2) + O(1) → O(log n)
- T(n) = 2T(n/2) + O(n) → O(n log n)（归并、快排平均）
- T(n) = 2T(n-1) + O(1) → O(2ⁿ)（斐波那契递归）

---

## 空间复杂度

衡量算法运行时额外占用的存储空间随输入规模增长的变化趋势。

| 记号 | 含义 | 示例 |
|------|------|------|
| O(1) | 常数额外空间 | 原地交换、指针操作 |
| O(n) | 线性额外空间 | 哈希表、数组副本 |
| O(n²) | 平方额外空间 | 二维矩阵、邻接矩阵 |

### 注意点

- 空间复杂度一般不考虑输入本身的存储，只考虑**额外空间**
- 递归调用的**栈空间**也要计入空间复杂度
- 递归深度为 n 时，空间复杂度为 O(n)


## 栈（Stack）

**先进后出（LIFO, Last In First Out）**，就像叠盘子，后放上去的先拿走。

### 基本操作

| 操作 | 含义 | 时间复杂度 |
|------|------|-----------|
| `push` | 入栈（栈顶添加） | O(1) |
| `pop` | 出栈（栈顶移除） | O(1) |
| `peek` / `top` | 查看栈顶元素 | O(1) |
| `isEmpty` | 判空 | O(1) |

### 常见应用

- 函数调用堆栈（Call Stack）
- 十进制转二进制（除 2 取余，逆序输出）
- 括号匹配检查（LeetCode 20）
- 浏览器的前进/后退
- 撤销操作（Undo）
- DFS（深度优先搜索）

### 栈的 JavaScript 实现

```javascript
class Stack {
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }
}
```

### 常见题型

- 括号匹配（有效括号、生成括号）
- 表达式求值（中缀转后缀、逆波兰表达式）
- 单调栈（接雨水、柱状图中最大矩形、每日温度）
- 栈与递归（DFS、二叉树遍历）
- 用栈实现队列

### 题目：有效的括号（LeetCode 20）

给定一个只包括 `'('`、`')'`、`'{'`、`'}'`、`'['`、`']'` 的字符串 `s`，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合
2. 左括号必须以正确的顺序闭合
3. 每个右括号都有一个对应的相同类型的左括号

**示例：**
```
输入：s = "()"        → 输出：true
输入：s = "()[]{}"    → 输出：true
输入：s = "(]"        → 输出：false
输入：s = "([)]"      → 输出：false
输入：s = "{[]}"      → 输出：true
```

**代码骨架：**

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 在这里实现
  if (s.length % 2 === 1)
    return false
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i])
    }
    else {
      let top = stack[stack.length - 1]
      if ((s[i] === ')' && top === '(') || (s[i] === ']' && top === '[') || (s[i] === '}' && top === '{')) {
        stack.pop()
      }
      else {
        return false
      }
    }
  }

return stack.length === 0
}

```javascript
var isValid = function (s) {
  // 在这里实现
  if (s.length % 2 === 1)
    return false
  let hash = {
    '[': ']',
    '{': '}',
    '(': ')',
  }

  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]]) {
      stack.push(s[i])
    }
    else {
      let top = stack[stack.length - 1]
      if (hash[top] === s[i]) {
        stack.pop()
      }
      else {
        return false
      }
    }
  }

  return stack.length === 0
}
```
---

### LeetCode 更多推荐

| 题号 | 题目 | 说明 |
|------|------|------|
| 155 | 最小栈 | 设计支持 getMin 的栈 |
| 232 | 用栈实现队列 | 双栈模拟队列 |
| 394 | 字符串解码 | 栈处理嵌套结构 |
| 739 | 每日温度 | 单调栈 |
| 42 | 接雨水 | 单调栈 / 双指针 |
| 84 | 柱状图中最大矩形 | 单调栈 |

## 队列（Queue）

**先进先出（FIFO, First In First Out）**，就像排队买票，先来的人先买到。

### 基本操作

| 操作 | 含义 | 时间复杂度 |
|------|------|-----------|
| `enqueue` / `push` | 入队（队尾添加） | O(1) |
| `dequeue` / `shift` | 出队（队首移除） | O(1) |
| `front` | 查看队首元素 | O(1) |
| `isEmpty` | 判空 | O(1) |

### 常见应用

- 任务调度（打印队列、任务队列）
- BFS（广度优先搜索）
- 消息队列、事件循环
- 12306 火车票购票排队
- 树的层序遍历

### 队列的 JavaScript 实现

```javascript
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(element) {
    this.items.push(element)
  }

  dequeue() {
    return this.items.shift()
  }

  front() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }
}
```

### 循环队列

用数组实现队列时，dequeue 操作会导致元素移动，时间复杂度 O(n)。循环队列通过** front 和 rear 指针**实现 O(1) 的入队和出队。

```javascript
class CircularQueue {
  constructor(k) {
    this.k = k
    this.queue = new Array(k)
    this.front = -1
    this.rear = -1
  }

  enqueue(value) {
    if (this.isFull()) return false
    if (this.isEmpty()) this.front = 0
    this.rear = (this.rear + 1) % this.k
    this.queue[this.rear] = value
    return true
  }

  dequeue() {
    if (this.isEmpty()) return false
    const value = this.queue[this.front]
    if (this.front === this.rear) {
      this.front = -1
      this.rear = -1
    } else {
      this.front = (this.front + 1) % this.k
    }
    return value
  }

  front() {
    return this.isEmpty() ? -1 : this.queue[this.front]
  }

  rear() {
    return this.isEmpty() ? -1 : this.queue[this.rear]
  }

  isEmpty() {
    return this.front === -1
  }

  isFull() {
    return (this.rear + 1) % this.k === this.front
  }
}
```

### 双端队列（Deque）

两端都可以入队和出队的队列。

```javascript
class Deque {
  constructor() {
    this.items = []
  }

  addFront(element) {
    this.items.unshift(element)
  }

  addBack(element) {
    this.items.push(element)
  }

  removeFront() {
    return this.items.shift()
  }

  removeBack() {
    return this.items.pop()
  }

  front() {
    return this.items[0]
  }

  back() {
    return this.items[this.items.length - 1]
  }
}
```

### 优先队列（Priority Queue）

元素按照优先级出队，优先级高的先出队。通常用**堆**实现。

```javascript
class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element, priority) {
    const queueElement = { element, priority }
    let added = false
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement)
        added = true
        break
      }
    }
    if (!added) this.items.push(queueElement)
  }

  dequeue() {
    return this.items.shift().element
  }
}
```

### 常见题型

- 用队列实现栈（LeetCode 232）
- 用栈实现队列（LeetCode 225）
- 循环队列设计（LeetCode 622）
- 滑动窗口最大值（LeetCode 239）
- 最近的请求次数（LeetCode 933）

### 题目：最近的请求次数（LeetCode 933）

写一个 `RecentCounter` 类来计算最近的请求。

```
输入：ping = [1, 100, 3001, 3002]
输出：[1, 2, 3, 4]

解释：
ping(1) → 范围 [1-3000, 1] → 1 次
ping(100) → 范围 [100-3000, 100] → 2 次
ping(3001) → 范围 [1, 3001] → 3 次
ping(3002) → 范围 [2, 3002] → 4 次
```

```javascript
class RecentCounter {
  constructor() {
    this.queue = []
  }

  ping(t) {
    this.queue.push(t)
    while(t-this.queue[0] > 3000) {
	    this.queue.shift()
    }
    return this.queue.length
  }
}
```

### 题目：滑动窗口最大值（LeetCode 239）

给定一个数组和滑动窗口的大小，求每个窗口内的最大值。

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
```

```javascript
function maxSlidingWindow(nums, k) {
  const result = []
  const deque = []

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop()
    }
    deque.push(i)

    while (deque[0] <= i - k) {
      deque.shift()
    }

    if (i >= k - 1) {
      result.push(nums[deque[0]])
    }
  }

  return result
}
```

### LeetCode 更多推荐

| 题号 | 题目 | 说明 |
|------|------|------|
| 622 | 设计循环队列 | 数组实现循环队列 |
| 641 | 设计循环双端队列 | 双端循环队列 |
| 225 | 用队列实现栈 | 两个队列模拟栈 |
| 232 | 用栈实现队列 | 双栈模拟队列 |
| 239 | 滑动窗口最大值 | 单调队列 |
| 933 | 最近的请求次数 | 队列应用 |
| 200 | 岛屿数量 | BFS 遍历 |

---

## 事件循环与任务队列

JavaScript 是**单线程**语言，通过**事件循环（Event Loop）**处理异步任务。

```
┌─────────────────────┐
│    Microtasks       │ ← Promise、async/await
│  (优先级高，先执行)  │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│     Tasks           │ ← setTimeout、setInterval、I/O
│  (宏任务，后执行)    │
└─────────────────────┘
```

执行顺序：
1. 执行同步代码
2. 执行所有微任务
3. 执行一个宏任务
4. 循环执行微任务 → 宏任务 → 微任务...

---

## 相关笔记

- [[JavaScript 算法基础第二天|链表]]
- [[JavaScript 算法基础第三天|集合与字典]]
- [[JavaScript 算法基础第四天|树]]
- [[JavaScript 算法基础第五天|图]]
- [[JavaScript 算法基础第六天|堆]]
- [[经典 150 栈|栈相关题目]]
- [[GRD 栈|GRD 栈刷题]]
