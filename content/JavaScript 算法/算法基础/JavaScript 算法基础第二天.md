---
title: 算法基础 - 链表与原型链
tags:
  - 算法基础
  - 链表
  - 数据结构
  - 双指针
  - 反转链表
  - 原型链
  - JavaScript
description: 链表的概念、类型、操作实现，以及JavaScript原型链原理
aliases:
  - 链表
---

# 链表

## 概念

链表是一种线性数据结构，由一系列节点组成，每个节点包含数据和指向下一个节点的指针。节点在内存中不必连续存储，通过指针链接。

## 结构定义

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

## 链表类型

| 类型 | 说明 |
|------|------|
| 单向链表 | 每个节点只包含数据和指向下一个节点的指针 |
| 双向链表 | 每个节点包含指向前一个和后一个节点的指针 |
| 循环链表 | 尾部节点 next 指向头部，形成环 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 插入/删除 O(1) | 访问元素 O(n) |
| 无需预分配内存 | 占用额外指针内存 |
| 动态扩展灵活 | 无法随机访问 |

## 常见操作

### 创建链表

```javascript
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}
```

### 插入节点

```javascript
function insertNode(head, position, val) {
  const newNode = new ListNode(val);
  if (position === 0) {
    newNode.next = head;
    return newNode;
  }
  let current = head;
  for (let i = 0; i < position - 1; i++) {
    current = current.next;
  }
  newNode.next = current.next;
  current.next = newNode;
  return head;
}
```

### 删除节点

```javascript
function deleteNode(head, position) {
  if (position === 0) return head.next;
  let current = head;
  for (let i = 0; i < position - 1; i++) {
    current = current.next;
  }
  current.next = current.next.next;
  return head;
}
```

### 反转链表

```javascript
function reverseList(head) {
  let prev = null, current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
```

## 链表 vs 数组

| 特性 | 链表 | 数组 |
|------|------|------|
| 插入/删除 | O(1) | O(n) |
| 访问 | O(n) | O(1) |
| 内存 | 灵活动态 | 固定连续 |
| 空间开销 | 高（有指针） | 低 |

## 时间复杂度

| 操作 | 复杂度 |
|------|--------|
| 查找 | O(n) |
| 插入（已知位置） | O(1) |
| 删除（已知位置） | O(1) |
| 空间 | O(n) |

## 适用场景

- 频繁插入/删除操作
- 未知数据规模
- 不需要随机访问

## 练习题

- [237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list)
- [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 反转链表与课程表]]）

```javascript
var reverseList = function (head) {
  let p1 = head; p2 = null

  while (p1) {
    const temp = p1.next
    p1.next = p2
    p2 = p1
    p1 = temp
  }

  return p2
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)
- [2. 两数相加](https://leetcode.cn/problems/add-two-numbers)（见[[LeetCode Hot100 链表]]）

```javascript
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode()
  let p1 = l1
  let p2 = l2
  let p3 = l3

  let carry = 0
  while (p1 || p2) {
    const v1 = p1?.val ?? 0
    const v2 = p2?.val ?? 0
    const v = v1 + v2 + carry
    carry = Math.floor(v / 10)
    p1 = p1?.next
    p2 = p2?.next
    p3.next = new ListNode(v % 10)
    p3 = p3.next
  }

  if (carry) { p3.next = new ListNode(carry) }
  return l3.next
}
```

- 时间复杂度：O(max(m, n))，m 和 n 为链表长度
- 空间复杂度：O(max(m, n))

- [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list)

```javascript
var deleteDuplicates = function (head) {
  let p = head
  while (p?.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next
    }
    else {
      p = p.next
    }
  }
  return head
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)

- [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]、[[LeetCode Hot100 环形链表]]）

```javascript
var hasCycle = function (head) {
  let fast = head
  let slow = head
  while (fast?.next?.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## js 原型链

### 概念

原型链是 JavaScript 实现继承的方式，本质上是一条由对象组成的链表，通过 `__proto__`（或 `Object.getPrototypeOf()`）属性串联。

### 结构

```css
对象 --__proto__--> 原型对象 --__proto__--> 上一层原型 --> ... --> null
```

### 各类对象原型链

```javascript
// 普通对象
obj = {}
obj.__proto__ === Object.prototype  // true

// 函数对象
fn = function() {}
fn.__proto__ === Function.prototype  // true

// 数组
arr = []
arr.__proto__ === Array.prototype  // true
```

### 完整原型链

```javascript
obj
  ↓ __proto__
Object.prototype
  ↓ __proto__
null

fn
  ↓ __proto__
Function.prototype
  ↓ __proto__
Object.prototype
  ↓ __proto__
null

arr
  ↓ __proto__
Array.prototype
  ↓ __proto__
Object.prototype
  ↓ __proto__
null
```

### 属性查找机制

当访问对象的属性时，会沿着原型链向上查找，直到找到或到达 null。

```javascript
const obj = { a: 1 }
obj.b  // undefined，沿原型链找不到 b
```

### prototype vs __proto__

| 属性 | 说明 |
|------|------|
| `prototype` | 函数特有，指向原型对象，用于 new 创建实例 |
| `__proto__` | 对象特有，指向该对象的原型 |

```javascript
function Fn() {}
const f = new Fn()

f.__proto__ === Fn.prototype  // true
```

### 原型链终点

所有原型链的终点都是 `null`：

```javascript
Object.prototype.__proto__ === null  // true
```

### 继承实现

```javascript
function Parent() { this.name = 'parent' }
function Child() { this.age = 18 }

Child.prototype = new Parent()
Child.prototype.constructor = Child

const c = new Child()
c.name  // 'parent'，沿原型链找到
c.age   // 18，自己身上的属性
```


### instanceof 原理

如果对象 A 沿着原型链能找到构造函数的 prototype，那么 `A instanceof B` 为 true。

```javascript
function Parent() {}
function Child() {}

Child.prototype = new Parent()
const c = new Child()

c instanceof Child   // true
c instanceof Parent // true
c instanceof Object // true
```

原理：

```javascript
c.__proto__ = Child.prototype
         ↓
Child.prototype.__proto__ = Parent.prototype (通过 Child.prototype = new Parent())
         ↓
Parent.prototype.__proto__ = Object.prototype
         ↓
Object.prototype.__proto__ = null

c -> Child.prototype -> Parent.prototype -> Object.prototype -> null
```

所以：
- `c instanceof Child`：c 的原型链上有 `Child.prototype` → true
- `c instanceof Parent`：c 的原型链上有 `Parent.prototype` → true
- `c instanceof Object`：c 的原型链上有 `Object.prototype` → true


实现一个 instanceOf

```javascript
function intanceOf(a, b) {
  while (a) {
    if (a.__proto__ === b.prototype) {
      return true
    }
    a = a.__proto__
  }
  return false
}
```

### 属性查找机制

当访问对象属性时，如果对象本身没有该属性，会沿着原型链向上查找，直到找到或到达 null。

```javascript
const parent = { name: 'parent' }
const child = Object.create(parent)
child.age = 18

child.name  // 'parent'，自己身上没有，沿原型链找到
child.age   // 18，自己身上有
child.toString  // 沿原型链找到 Object.prototype.toString
```

查找过程：

```javascript
child.name
  → child 自身 → 没有
  → child.__proto__ (parent) → 找到 'parent'，返回
```

```javascript
child.valueOf  // 沿原型链找到 Object.prototype.valueOf
child.foo     // 沿原型链找到 null，返回 undefined
```

**注意**：赋值操作不会沿原型链，如果对象本身没有该属性，会直接在对象上创建。

```javascript
child.name = 'child'  // 直接在 child 上创建，不会修改 parent.name
child.name  // 'child'，现在是自己身上的属性
delete child.name    // 删除自己的属性
child.name  // 'parent'，恢复为原型链上的属性
```

---

## 相关笔记

- [[JavaScript 算法基础第一天|复杂度与数据结构]]
- [[LeetCode Hot100 链表|链表题目]]
- [[LeetCode Hot100 双指针|双指针题目]]
- [[GRD 链表|GRD 链表刷题]]
