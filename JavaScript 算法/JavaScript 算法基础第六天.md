堆

最小堆类

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

相关题目：
- [215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/) — 维护大小为 K 的最小堆求第 K 大

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


[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

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
            [this.heap[i], this.heap[j]] = [this.heap[i], this.heap[j]]
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
        heap.push([key, val])
        if(heap.size() > k) {
            heap.pop()
        }
    }
    console.log(heap)
};
```