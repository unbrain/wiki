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

