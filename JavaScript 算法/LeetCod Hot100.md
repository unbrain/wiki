
[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```javascript
var getIntersectionNode = function (headA, headB) {
    let p1 =headA
    let p2 = headB
    while(p1 !==  p2) {
        p1 = p1 === null ? headB : p1.next
        p2 = p2 === null ? headA : p2.next
    }

    return p1
};
```

复杂度分析

时间复杂度：O(m+n)，其中 m 和 n 是分别是链表 headA 和 headB 的长度。两个指针同时遍历两个链表，每个指针遍历两个链表各一次。

空间复杂度：O(1)。

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root ===null || root === q || root===p) {
        return root
    }

    const l = lowestCommonAncestor(root.left, p, q)
    const r = lowestCommonAncestor(root.right, p, q)

    if(l !==null && r !== null) {
        return root
    }

    return l ? l : r
};
```


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let slow = head
    let fast = head

    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let prev = null
    let curr = slow.next

    while(curr !== null) {
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }

    let p1 = head
    let p2 = prev
    let res = true

    while(p2) {
        if(p1.val === p2.val) {
            p1 = p1.next
            p2 = p2.next
        } else {
            res = false
            break
        }
    }
    return res
};
```


[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

```javascript
var invertTree = function(root) {
    if(!root) return root

    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
};
```

[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    let arr = []
    for(let i = 0; i < temperatures.length; i++) {
        let j = i
        while(j<temperatures.length) {
            if(temperatures[j]>temperatures[i]) {
                break
            }
            j++
        }
        arr.push(j === temperatures.length ? 0 : j-i)
    }
    return arr
};
```

暴力能解但是海量数据超时 时间复杂度达到 $O(N^2)$

引入单调栈

```javascript
var dailyTemperatures = function(temperatures) {
    const arr = new Array(temperatures.length).fill(0)
    const stack = []
    for(let i = 0; i < temperatures.length; i++) {
        while(stack.length && temperatures[i] > temperatures[stack[stack.length-1]]) {
            const res = stack.pop()
            arr[res] = i -res
        }
        stack.push(i)
    }
    return arr
};
```