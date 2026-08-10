---
title: 算法基础 - 堆
tags:
  - 算法基础
  - 堆
  - 优先队列
  - 数据结构
  - Top-K
description: 堆的概念、最小堆实现、Top-K问题应用
aliases:
  - 堆
  - 优先队列
---

# 堆

## 目录
- [最小堆类](#最小堆类)
- [题目 215. 数组中的第K个最大元素](#215-数组中的第k个最大元素)
- [题目 347. 前 K 个高频元素](#347-前-k-个高频元素)
- [题目 23. 合并 K 个升序链表](#23-合并-k-个升序链表)
- [复杂度分析](#复杂度分析)
- [可优化点](#可优化点)
- [注意点](#注意点)
- [各版本差异](#各版本差异)

## 最小堆类

```javascript
class MinHeap {
	constructor() {
	 this.heap = []
	}
	size() {
		return this.heap.length
	}
	peak (){
		return this.heap[0]
	}
	swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
	}
	insert(val) {
		this.heap.push(val)
		this.shiftUp(this.size() - 1)
	}
	parentIndex(index) {
		return (index-1) >> 1
	}
	leftIndex(index) {
		return index * 2+1
	}
	rightIndex(index) {
		return index * 2 + 2
	}
	shiftUp(index) {
		if(index === 0) return
		let pi = this.parentIndex(index)
		if(this.heap[index]<this.heap[pi]) {
			this.swap(pi, index)
			this.shiftUp(pi)
		}
	}
	shiftDown(index) {
		let li = this.leftIndex(index)
		let ri = this.rightIndex(index)

		if(this.heap[index]>this.heap[li]) {
			this.swap(index, li)
			this.shiftDown(li)
		}
		if(this.heap[index]>this.heap[ri]) {
			this.swap(index, ri)
			this.shiftDown(ri)
		}
	}
	pop() {
		this.heap[0] = this.heap.pop()
		this.shiftDown(0)
	}
}
```

## 215. 数组中的第K个最大元素

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findKthLargest = function(nums, k) {
class MinHeap {
	constructor() {
	 this.heap = []
	}
	size() {
		return this.heap.length
	}
	peak (){
		return this.heap[0]
	}
	swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
	}
	insert(val) {
		this.heap.push(val)
		this.shiftUp(this.size() - 1)
	}
	parentIndex(index) {
		return (index-1) >> 1
	}
	leftIndex(index) {
		return index * 2+1
	}
	rightIndex(index) {
		return index * 2 + 2
	}
	shiftUp(index) {
		if(index === 0) return
		let pi = this.parentIndex(index)
		if(this.heap[index]<this.heap[pi]) {
			this.swap(pi, index)
			this.shiftUp(pi)
		}
	}
	shiftDown(index) {
		let li = this.leftIndex(index)
		let ri = this.rightIndex(index)

        const min = this.heap[li] > this.heap[ri] ? ri : li

        if(min < this.size() && this.heap[index] > this.heap[min] ) {
            this.swap(index, min)
			this.shiftDown(min)
        }
	}
	pop() {
		this.heap[0] = this.heap.pop()
		this.shiftDown(0)
	}
}
    const heap = new MinHeap()

    nums.forEach((item) => {
        heap.insert(item)
        if(heap.size() > k) {
            heap.pop()
        }
    })

    return heap.peak()
};
```

### 复杂度分析

| 指标 | 值 | 说明 |
|------|----|------|
| 时间 | O(n log k) | 遍历 n 个元素，每次 insert/pop 操作 O(log k) |
| 空间 | O(k) | 堆中最多保留 k 个元素 |

## 复杂度分析

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| `insert` | O(log n) | push + shiftUp 堆化 |
| `pop` | O(log n) | 栈顶替换 + shiftDown 堆化 |
| `peak` | O(1) | 直接返回栈顶 |
| 堆排序（n 次 insert） | O(n log n) | 建堆后逐个 pop |
| 第 K 大（本题） | O(n log k) | n 个元素插入大小为 k 的堆，log k 受限于 k |

**空间复杂度**：O(n) — 堆数组存储所有元素；本题优化后 O(k)。

## 可优化点

### 1. 建堆优化：Heapify（O(n)）
逐个 insert 建堆是 O(n log n)。如果已知初始数据，用 heapify 只需 O(n)：

```javascript
constructor(arr) {
    this.heap = arr || []
    if (arr) {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.shiftDown(i)
        }
    }
}
```

### 2. LeetCode 215 的优化方案

| 方案 | 时间复杂度 | 空间 | 说明 |
|------|-----------|------|------|
| 最小堆（k 大小） | O(n log k) | O(k) | 遍历一次，堆只保留 k 个最大元素 |
| 快速选择（QuickSelect） | O(n) avg / O(n²) worst | O(1) | 类似快排的 partition，原地操作 |
| 排序 | O(n log n) | O(n) | 全排序取第 k 大，最简单但最慢 |

**推荐**：面试中堆实现最稳妥（结构清晰、性能稳定），追求最优时间用 QuickSelect。

### 3. 类结构可优化
- 提取为公共工具类，避免在函数内重复定义
- 支持泛型（传入比较器 comparator）实现最大堆/最小堆通用

## 347. 前 K 个高频元素

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    class MinHeap {
        constructor() {
            this.heap = []
        }
        size() {
            return this.heap.length
        }
        parentIndex(i) {
            return (i-1)>>1
        }
        leftIndex(i) {
            return i * 2 +1
        }
        rightIndex(i) {
            return i * 2 +2
        }
        swap(i, j) {
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
        }
        shiftUp(index) {
            let i = index
            while(i>0) {
                let pi = this.parentIndex(i)
                if(this.heap[pi].val > this.heap[i].val) {
                    this.swap(i, pi)
                    i = pi
                } else break
            }
        }
        shiftDown(i) {
            let li = this.leftIndex(i)
            let ri = this.rightIndex(i)

            let si = this.heap[li]?.val > this.heap[ri]?.val ? ri: li
            if(this.heap[si] && this.heap[si].val < this.heap[i].val) {
                this.swap(si, i)
                this.shiftDown(si)
            }
        }
        push(item) {
            this.heap.push(item)
            this.shiftUp(this.size() - 1)
        }
        pop() {
            this.heap[0] = this.heap.pop()
            this.shiftDown(0)
        }
    }

    const map = new Map()
    nums.forEach(item => {
        map.set(item, map.get(item) ? map.get(item) + 1 : 1)
    })
    const heap = new MinHeap()
    for([key, val] of map) {
        heap.push({key, val})
        if(heap.size() > k) {
            heap.pop()
        }
    }
    return heap.heap.map(item => item.key)
};
```

### 复杂度分析

| 指标 | 值 | 说明 |
|------|----|------|
| 时间 | O(n log k) | 哈希统计 O(n)，n 个元素入堆，堆大小限制 k |
| 空间 | O(n + k) | 哈希表 O(n) + 堆 O(k) |

## 注意点

### 215 题
- `insert` 中 `this.shiftUp(this.size() - 1)` 传的是数值索引，不要写成 `this.heap[this.size() - 1]`（那会传值本身）
- 堆的大小限制为 k，堆顶恰好是第 k 大的元素

### 347 题
- `swap` 需确认左右值不同：`[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]`
- 存储对象时比较字段要统一用 `.val` 或 `.freq`
- `for...of` 记得加 `const`：`for (const [key, val] of map)`

### 通用
- `shiftDown` 应先找左右子中较小者再交换，避免两个独立 `if` 导致重复比较
- 空堆 `pop` 时需 `return null` 保护
- 单元素堆 `pop` 直接用 `this.heap.pop()`

### 23 题
- `shiftUp` 必须加 `else break`，否则当父子值相等时 `while` 死循环
- `shiftDown` 需先检查 `li >= size()` 提前返回，避免 `?.` 隐式依赖

---

## 各版本差异

文档中有 4 个 MinHeap 实现，核心区别对比如下：

| 实现位置 | 比较方式 | shiftUp | shiftDown | pop 返回值 | 边界保护 |
|---------|---------|---------|-----------|-----------|---------|
| 开头基础版 | 直接比较数值 `this.heap[i]` | 递归 + if | 两个独立 if（有缺陷） | 无 | ❌ |
| 215 题内 | 直接比较数值 `this.heap[i]` | 递归 + if | 找较小子后单次 swap | 无 | `min < size()` |
| 347 题内 | 对象属性 `.val` | while + else break | `?.` 隐式保护 | 无 | `this.heap[si] &&` |
| 23 题内 | 对象属性 `.val` | while + else break | 显式 `li >= size()` return | 返回弹出值 | `?.` + 显式 return |

### 关键差异点
- **基础版/215 版**：存数值，直接比较；**347/23 版**：存对象，比较 `.val`
- **shiftUp**：递归版没有 `else`，相等时不做交换但函数结束（不会死循环）；while 版必须手动加 `else break`
- **pop**：仅 23 版 `return` 了弹出的值（其他版本无返回值，仅修改堆结构）


## 23. 合并 K 个升序链表（见[[LeetCode Hot100 链表]]）

[题目链接](https://leetcode.cn/problems/merge-k-sorted-lists/)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    class MinHeap {
        constructor() {
            this.heap = []
        }
        size() {
            return this.heap.length
        }
        swap(i, j) {
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
        }
        parentIndex(i) {
            return (i - 1) >> 1
        }
        leftIndex(i) {
            return i * 2 + 1
        }
        rightIndex(i) {
            return i * 2 + 2
        }
        shiftUp(index) {
            let i = index
            while (i > 0) {
                const pi = this.parentIndex(i)
                if (this.heap[pi].val > this.heap[i].val) {
                    this.swap(pi, i)
                    i = pi
                } else break
            }
        }
        shiftDown(i) {
            let li = this.leftIndex(i)
            let ri = this.rightIndex(i)
            if (li >= this.size()) return
            let si = this.heap[li]?.val > this.heap[ri]?.val ? ri : li
            if (this.heap[si]?.val < this.heap[i].val) {
                this.swap(i, si)
                this.shiftDown(si)
            }
        }
        push(val) {
            this.heap.push(val)
            this.shiftUp(this.size() - 1)
        }
        pop() {
            if (this.size() === 1) return this.heap.pop()
            const temp = this.heap[0]
            this.heap[0] = this.heap.pop()
            this.shiftDown(0)
            return temp
        }
    }

    const dummy = new ListNode(0)
    let p = dummy
    const heap = new MinHeap()
    lists.forEach(item => {
        if (item) heap.push(item)
    })
    while (heap.size()) {
        const item = heap.pop()
        p.next = item
        p = p.next
        if (item.next) heap.push(item.next)
    }
    console.log(dummy)

    return dummy.next
};
```

### 复杂度分析

| 指标 | 值 | 说明 |
|------|----|------|
| 时间 | O(n log k) | 每个节点入堆/出堆一次，k 为链表数量，n 为总节点数 |
| 空间 | O(k) | 堆中最多同时存放 k 个链表头节点 |

### 其他解法对比

| 方案 | 时间 | 空间 | 说明 |
|------|------|------|------|
| 堆（本题） | O(n log k) | O(k) | 最推荐，思路清晰 |
| 分治归并 | O(n log k) | O(1) / O(log k) | 两两合并，常数更小 |
| 顺序合并 | O(nk) | O(1) | 逐条链表合并，最慢 |

## 相关笔记

- [[JavaScript 算法基础第一天|栈与队列]]（优先队列基础）
- [[LeetCode Hot100 06|堆相关题目]]（前 K 个高频元素）
- [[LeetCode Hot100 链表|合并 K 个有序链表]]（分治归并方案）
