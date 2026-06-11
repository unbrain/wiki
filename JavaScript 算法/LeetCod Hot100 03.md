
[169. 多数元素](https://leetcode.cn/problems/majority-element/)（见[[LeetCode Hot100 hash表]]）

```javascript
var majorityElement = function(nums) {
    let num = 1
    let max = nums[0]
    for(let i =1; i < nums.length;i++) {
        if(num === 0) {
            max = nums[i]
        }

        if(nums[i] === max) {
            num++
        } else {
            num--
        }
    }
    return max
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是数组的长度。只需遍历数组一次。

空间复杂度：O(1)，只使用了常数额外空间。

[238. 除了自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

```javascript
var productExceptSelf = function(nums) {
    const len = nums.length
    const res = new Array(len).fill(1)

    for(let i = 1; i < len; i++) {
        res[i] = res[i-1] * nums[i-1]
    }
    let right = 1
    for(let i = len-1; i>=0; i--) {
        res[i] = res[i] * right
        right = right * nums[i]
    }
    return res
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是数组的长度。两次线性遍历（左→右，右→左）。

空间复杂度：O(1)，除输出数组外只使用了常数额外空间。


[155. 最小栈](https://leetcode.cn/problems/min-stack/)

```javascript
var MinStack = function() {
    this.stack = []
    this.minStack = []
};

/** 
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function(value) {
    this.stack.push(value)
    
    if(this.minStack.length === 0) {
        this.minStack.push(value)
    } else {
        const min = this.getMin()
        this.minStack.push(min<value ? min : value)
    }
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
    this.minStack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1]
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

复杂度分析

- **push / pop / top / getMin**：每个操作的时间复杂度均为 O(1)
- 空间复杂度：O(n)，其中 n 为栈内元素个数，使用了辅助栈存储当前最小值。


[152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)

```javascript
var maxProduct = function(nums) {
    const len = nums.length
    let max = nums[0]
    let min = nums[0]
    let res = max

    for(let i = 1; i< len; i++) {
        let curr = nums[i]

        if(curr < 0) {
            [max, min] = [min, max]
        }
        max = Math.max(curr, max * curr)
        min = Math.min(curr, min * curr)

        res = Math.max(res, max)
    }
    return res
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是数组的长度。只需遍历数组一次。

空间复杂度：O(1)，只使用了常数额外空间（滚动变量替代 DP 数组）。


[148. 排序链表](https://leetcode.cn/problems/sort-list/)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]）

```javascript
var sortList = function(head) {
    if(!head || !head.next) return head
    let slow = head
    let fast = head
    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
    }
    let mid = slow.next
    slow.next = null
    let left = sortList(head)
    let right = sortList(mid)
    return merge(left, right)
};

const merge = (l, r) => {
    let dummy = new ListNode(0)
    let curr = dummy
    while(l && r) {
        if(l.val < r.val) {
            curr.next = l
            l=l.next
        }else {
            curr.next = r
            r = r.next
        }
        curr = curr.next
    }
    curr.next = l || r
    return dummy.next
}
```

复杂度分析

时间复杂度：O(n log n)，其中 n 是链表的长度。归并排序，每层合并 O(n)，递归深度 O(log n)。

空间复杂度：O(log n)，递归调用栈的深度（自顶向下归并）。


[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)（见[[LeetCode Hot100 链表]]）
```javascript
var LRUCache = function(capacity) {
    this.map = new Map()
    this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.map.has(key)) return -1

    const res = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, res)
    return res
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)) {
        this.map.delete(key)
    }
    this.map.set(key, value)

    if(this.map.size > this.capacity) {
        const res = this.map.keys().next().value
        this.map.delete(res)
    }
};

```

复杂度分析

- **get**：时间复杂度 O(1)
- **put**：时间复杂度 O(1)
- 空间复杂度：O(capacity)，其中 capacity 为缓存的容量。