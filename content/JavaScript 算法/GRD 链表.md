[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

```javascript
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode()
    let p = dummy, p1 = list1, p2 = list2
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
    p.next = p1 || p2
    return dummy.next
};
```

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

```javascript
var hasCycle = function(head) {
    let fast = head, slow = head
    while(fast?.next) {
        fast = fast.next.next
        slow = slow.next
        if(slow === fast) {
            return true
        }
    }
    return false
};
```

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```javascript
var reverseList = function(head) {
    let prev = null
    let curr = head

    while(curr) {
        let p = curr.next
        curr.next = prev
        prev = curr
        curr = p
    }

    return prev
};
```

[876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)

```javascript
var middleNode = function(head) {
    const dummy = new ListNode(0, head)
    let fast = dummy, slow = dummy
    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow.next
};
```

[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

```javascript

```