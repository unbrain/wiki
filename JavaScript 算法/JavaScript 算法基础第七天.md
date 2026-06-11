## 排序

### 冒泡排序


```javascript
function bubble(arr) {
	let j = arr.length - 1
	for(let num = 0; num < arr.length-2; num++) {
		let i = 0
		while(i<j) {
			if(arr[i] > arr[i+1]) {
				[arr[i], arr[i+1]] = [arr[i+1], arr[i]]	
			}
			i = i+1
		}
		j--
	}
	return arr
}
```

```javascript
funtion buble(arr) {
	for(let i = 0; i < arr.length -1; i++) {
		for(let j = 0; j < arr.length -1 -i; j++) {
			if(arr[j] > arr[j+1]) {
				[arr[j], arr[j+1]] = [arr[j+1]， arr[j]]
			}
		}
	}
	return arr
}
```

### 选择排序

```javascript
const selectionSort = (arr) => {
	for(let i=0; i< arr.length -1; i++) {
		let max = i
		for(let j = i+1; j< arr.length; j++) {
			if(arr[j] > arr[max]) {
				max = j
			}
		}
		if(max !== i) {
			[arr[i], arr[max]] = [arr[max], arr[i]]
		}
	}
	return arr
}
```

### 插入排序

```javascript
const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        for(let j = i;j > 0; j--) {
            if(arr[j]< arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
            }
        }
    }
    return arr
}
```

```javascript
const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        let j = i-1
        while(j>=0 && arr[j]>temp) {
	        arr[j+1] = arr[j]
	        j--
        }
        arr[j+1] = temp
    }
    return arr
}
```

### 归并排序

```javascript
const mergeSort = (arr) => {
	const rec = (arr) => {
		if(arr.length === 1) return arr
		const mid = Math.floor(arr.length / 2)
		const left = arr.slice(0, mid)
		const right = arr.slice(mid, arr.length)
		const leftOrder = rec(left)
		const rightOrder = rec(right)
		let res = []
		while(leftOrder.length || rightOrder.length) {
			if(leftOrder.length && rightOrder.length) {
				res.push(leftOrder[0] < rightOrder[0] ? leftOrder.shift() : rightOrder.shift())
			} else if(leftOrder.length) {
				res.push(leftOrder.shift())
			} else {
				res.push(rightOrder.shift())
			} 
		}
		return res
	}
	
	return rec(arr)
}
```

 `shift()` 让合并变 O(n²)

`shift()` 每次删除头部元素都会重新索引剩余元素，合并阶段从 O(n) 退化到 O(n²)。改用索引指针更好：

```javascript
const mergeSort = (arr) => {
	const rec = (arr) => {
		if(arr.length <= 1) return arr
		const mid = Math.floor(arr.length / 2)
		const left = arr.slice(0, mid)
		const right = arr.slice(mid, arr.length)
		const leftOrder = rec(left)
		const rightOrder = rec(right)
		let res = []
		let l = 0 ,r = 0
		while(l < leftOrder.length && r < rightOrder.length) {
			res.push(leftOrder[l] < rightOrder[r] ? leftOrder[l++] : rightOrder[r++])
		}
		return res.concat(leftOrder.slice(l), rightOrder.slice(r))
	}
	
	return rec(arr)
}
```

### 快速排序
```javascript
const quickSort = (arr) => {
	if(arr.length <= 1) return arr
	const mid = Math.floor(arr.length / 2)
	const pivot = arr[0]
	const left = []
	const right = []
	for(let i = 1; i< arr.length; i++) {
		arr[i] > pivot ? right.push(arr[i]) : left.push(arr[i])
	}
	
	return [...quickSort(left), pivot, ...quickSort(right)]
}
```

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)（见[[LeetCode Hot100 链表]]）


```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0)

    let p = dummy
    let p1 = list1
    let p2 = list2

    while(p1 && p2) {
        if(p1.val < p2.val) {
            p.next = p1
            p1 = p1.next
        } else {
            p.next = p2
            p2 = p2.next
        }
        p = p.next
    }
    p.next = p1 ? p1 : p2
    return dummy.next
};
```


[374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/)（见[[JavaScript 算法基础第八天]]）

```javascript
var guessNumber = function(n) {
    let low = 1
    let heigh = n

    while(low <= heigh) {
        let mid = Math.floor((low + heigh) / 2)

        let res = guess(mid)
        if(!res) {
            return mid
        } else if(res === 1) {
            low = mid + 1
        } else {
            heigh = mid - 1
        }
    }
};
```