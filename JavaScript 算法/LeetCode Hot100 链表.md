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

