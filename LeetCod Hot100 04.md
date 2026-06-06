[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

```javascript
var detectCycle = function(head) {
    if(!head) return null
    let fast = head
    let slow = head
    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) {
            let res = head
            while(res !== slow) {
                res = res.next
                slow = slow.next
            }
            return res
        }
    }

    return null
};
```

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

```javascript
var hasCycle = function(head) {
    let fast = head
    let slow = head
    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast ===slow) {
            return true
        }
    }
    return false
};
```