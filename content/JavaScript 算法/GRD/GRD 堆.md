---
title: GRD 堆刷题
tags:
  - LeetCode
  - GRD
  - 堆
  - 优先队列
description: 奇偶跳、任务调度器、数据流的中位数、合并 K 个升序链表等堆高频题
aliases:
  - 堆刷题
---

[973. 最接近原点的 K 个点](https://leetcode.cn/problems/k-closest-points-to-origin/)

```javascript
var kClosest = function (points, k) {
    const heap = new Maxheap()          // 最大堆：按点的平方距离比较

    for (let point of points) {
        heap.insert(point)
        if (heap.size() > k) {
            heap.pop()                  // 超容量，踢掉最远的（堆顶）
        }
    }
    return heap.heap                    // 堆里剩的就是最近的 K 个
}

class Maxheap {
    constructor() {
        this.heap = []
    }
    parentIndex(index) {
        return (index - 1) >> 1
    }
    leftIndex(index) {
        return index * 2 + 1
    }
    rightIndex(index) {
        return index * 2 + 2
    }
    dist([x, y]) {
        return x * x + y * y
    }
    swap(x, y) {
        [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]]
    }
    needChange(x, y) {
        return this.dist(this.heap[x]) < this.dist(this.heap[y])
    }
    size() {
        return this.heap.length
    }
    insert(point) {
        this.heap.push(point)
        this.shiftUp(this.size() - 1)
    }
    pop() {
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
    }
    shiftUp(index) {
        if (index === 0) return
        let pi = this.parentIndex(index)
        if (this.needChange(pi, index)) {
            this.swap(pi, index)
            this.shiftUp(pi)
        }
    }
    shiftDown(index) {
        let li = this.leftIndex(index)
        let ri = this.rightIndex(index)
        if (li < this.size() && this.needChange(index, li)) {
            this.swap(index, li)
            this.shiftDown(li)
        }
        if (ri < this.size() &&this.needChange(index, ri)) {
            this.swap(index, ri)
            this.shiftDown(ri)
        }
    }
}
```

[621. 任务调度器](https://leetcode.cn/problems/task-scheduler/)

```javascript

```

[295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)

```javascript

```

[23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

```javascript

```

## 相关笔记

- [[JavaScript 算法基础第六天|堆与优先队列]]（最小堆实现、Top-K）
- [[LeetCode Hot100 动态规划与贪心]]（前 K 个高频元素）
- [[LeetCode Hot100 链表]]（合并 K 个升序链表）
