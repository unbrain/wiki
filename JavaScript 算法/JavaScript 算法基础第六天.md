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
