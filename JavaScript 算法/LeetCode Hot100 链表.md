[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```javascript
var getIntersectionNode = function (headA, headB) {
        let p1 = headA
    let p2 = headB

    while(p1 !== p2) {
        p1 = p1 !== null ? p1.next : headB
        p2 = p2 !== null ? p2.next : headA
    }
    return p1
};
```


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)
```javascript
var isPalindrome = function(head) {
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
    }

    let mid = slow.next
    slow.next = null
    let prev = null
    let cur = mid
    while(cur) {
        let temp = cur.next
        cur.next = prev
        prev = cur
        cur = temp
    }

    let p1 = head
    let p2 = prev

    while(p1 && p2) {
        if(p1.val === p2.val) {
            p1 = p1.next
            p2 = p2.next
        } else {
            return false
        }
    }
    return true
};
```

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```javascript
var reverseList = function(head) {
    let prev = null
    let curr = head
    while(curr) {
        const temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
};
```

[148. 排序链表](https://leetcode.cn/problems/sort-list/)

```javascript
const merge = (l, r) => {
    let dummy = new ListNode()
    let cur = dummy
    while(l&&r){
        if(l.val < r.val){
            cur.next = l
            l = l.next
        }else {
            cur.next = r
            r=r.next
        }
        cur = cur.next
    }
    cur.next = l||r
    return dummy.next
}
var sortList = function(head) {
    if(!head || !head.next) return head
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let mid = slow.next
    slow.next = null

    let left = sortList(head)
    let right = sortList(mid)

    return merge(left, right)
};
```

[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

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

    const val = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, val)
    return val
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

141 同下
[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)
```javascript
var detectCycle = function(head) {
    if(!head) return head

    let fast = head
    let slow = head

    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) {
            slow = head
            while(slow !== fast) {
                fast = fast.next
                slow = slow.next
            }
            return slow
        }
    }
    return null
};
```