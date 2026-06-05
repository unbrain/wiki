
[169. 多数元素](https://leetcode.cn/problems/majority-element/)

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


[148. 排序链表](https://leetcode.cn/problems/sort-list/)

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